package com.ren.selfbusiness.service.impl;

import com.ren.selfbusiness.dto.request.ResourceRequest;
import com.ren.selfbusiness.dto.response.ResourceBody;
import com.ren.selfbusiness.mapper.EntityMapper;
import com.ren.selfbusiness.model.Resource;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.repository.ResourceRepository;
import com.ren.selfbusiness.resolver.exception.ExceptionResolver;
import com.ren.selfbusiness.service.ResourceService;
import com.ren.selfbusiness.service.ResourceTypeService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

import static com.ren.selfbusiness.constant.ErrorCodeStorage.R_01;

@Service
@AllArgsConstructor
public class ResourceServiceImpl implements ResourceService {
    private final ResourceRepository resourceRepository;
    private final ResourceTypeService resourceTypeService;
    private final EntityMapper<ResourceBody, Resource, Pair<ResourceRequest, User>> mapper;
    private final ExceptionResolver exceptionResolver;

    @Transactional
    @Override
    public Resource addResource(ResourceRequest req, User user) {
        Resource resource = mapper.toEntity(Pair.of(req, user));
        return resourceRepository.save(resource);
    }

    @Transactional
    @Override
    public void updateResource(Long id, ResourceRequest req) {
        Resource resource = resourceRepository.getReferenceById(id);
        if (req.count() != null) resource.setCount(req.count());
        if (req.unitPrice() != null) resource.setUnitPrice(new BigDecimal(req.unitPrice()));
        if (req.typeId() != null) resource.setType(resourceTypeService.getResourceTypeById(req.typeId()));
    }

    @Transactional
    @Override
    public void deleteResource(Long id) {
        resourceRepository.deleteById(id);
    }

    @Override
    public Page<ResourceBody> getAll(Pageable pageable) {
        return resourceRepository.findAll(pageable).map(mapper::toDto);
    }

    @Override
    public Resource getResourceTypeById(Long id) {
        return resourceRepository.findById(id).orElseThrow(() -> exceptionResolver.resolve(R_01));
    }
}
