package com.ren.selfbusiness.service.impl;

import com.ren.selfbusiness.dto.request.ResourceTypeRequest;
import com.ren.selfbusiness.dto.response.ResourceTypeBody;
import com.ren.selfbusiness.mapper.EntityMapper;
import com.ren.selfbusiness.model.ResourceType;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.repository.ResourceTypeRepository;
import com.ren.selfbusiness.resolver.exception.ExceptionResolver;
import com.ren.selfbusiness.service.ResourceTypeService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ren.selfbusiness.constant.ErrorCodeStorage.RT_01;

@Service
@AllArgsConstructor
public class ResourceTypeServiceImpl implements ResourceTypeService {
    private final ResourceTypeRepository resourceTypeRepository;
    private final EntityMapper<ResourceTypeBody, ResourceType, Pair<ResourceTypeRequest, User>> mapper;
    private final ExceptionResolver exceptionResolver;

    @Transactional
    @Override
    public void addResourceType(ResourceTypeRequest req, User user) {
        ResourceType resourceType = mapper.toEntity(Pair.of(req, user));
        resourceTypeRepository.save(resourceType);
    }

    @Transactional
    @Override
    public void updateResourceType(Long id, ResourceTypeRequest req) {
        ResourceType resourceType = getResourceTypeById(id);
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

    @Override
    public ResourceType getResourceTypeById(Long id) {
        return resourceTypeRepository.findById(id).orElseThrow(() -> exceptionResolver.resolve(RT_01));
    }
}
