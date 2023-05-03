package com.ren.selfbusiness.service.impl;

import com.ren.selfbusiness.dto.request.ResourceTypeRequest;
import com.ren.selfbusiness.dto.response.ResourceTypeBody;
import com.ren.selfbusiness.enumarate.ErrorDtoEnum;
import com.ren.selfbusiness.exception.BusinessException;
import com.ren.selfbusiness.mapper.EntityMapper;
import com.ren.selfbusiness.model.ResourceType;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.repository.ResourceTypeRepository;
import com.ren.selfbusiness.service.ResourceTypeService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class ResourceTypeServiceImpl implements ResourceTypeService {
    private final ResourceTypeRepository resourceTypeRepository;
    private final EntityMapper<ResourceTypeBody, ResourceType, Pair<ResourceTypeRequest, User>> mapper;

    @Transactional
    @Override
    public void addResourceType(ResourceTypeRequest req, User user) {
        ResourceType resourceType = mapper.toEntity(Pair.of(req, user));
        resourceTypeRepository.save(resourceType);
    }

    @Transactional
    @Override
    public void updateResourceType(Long id, ResourceTypeRequest req, User user) {
        ResourceType resourceType = resourceTypeRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorDtoEnum.RT_01_DTO.getErrorDto()));
        if (StringUtils.isNotBlank(req.name())) {
            resourceType.setName(req.name());
        }
        if (StringUtils.isNotBlank(req.unit())) {
            resourceType.setUnit(req.unit());
        }
    }

    @Transactional
    @Override
    public void deleteResourceType(Long id) {
        resourceTypeRepository.deleteById(id);
    }

    @Override
    public Page<ResourceTypeBody> getAll(Pageable pageable) {
        return resourceTypeRepository.findAll(pageable).map(mapper::toDto);
    }
}
