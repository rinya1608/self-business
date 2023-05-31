package com.ren.selfbusiness.mapper;

import com.ren.selfbusiness.dto.request.ResourceRequest;
import com.ren.selfbusiness.dto.request.ResourceTypeRequest;
import com.ren.selfbusiness.dto.response.ResourceBody;
import com.ren.selfbusiness.dto.response.ResourceTypeBody;
import com.ren.selfbusiness.model.Resource;
import com.ren.selfbusiness.model.ResourceType;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.service.ResourceTypeService;
import lombok.AllArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@AllArgsConstructor
public class ResourceMapper implements EntityMapper<ResourceBody, Resource, Pair<ResourceRequest, User>> {
    private final EntityMapper<ResourceTypeBody, ResourceType, Pair<ResourceTypeRequest, User>> mapper;
    private final ResourceTypeService resourceTypeService;

    @Override
    public ResourceBody toDto(Resource resource) {
        return new ResourceBody(resource.getId(), resource.getCount(),
                resource.getPrice().toString(), resource.getUnitPrice().toString(), resource.getTypeName(), resource.getUnit());
    }

    @Override
    public Resource toEntity(Pair<ResourceRequest, User> resourceRequestAndUser) {
        ResourceRequest resourceRequest = resourceRequestAndUser.getFirst();
        ResourceType type = resourceTypeService.getResourceTypeById(resourceRequest.typeId());
        return new Resource(resourceRequest.count(), new BigDecimal(resourceRequest.price()),
                new BigDecimal(resourceRequest.unitPrice()), type, resourceRequestAndUser.getSecond());
    }
}
