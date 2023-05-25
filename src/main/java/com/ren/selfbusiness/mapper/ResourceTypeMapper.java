package com.ren.selfbusiness.mapper;

import com.ren.selfbusiness.dto.request.ResourceTypeRequest;
import com.ren.selfbusiness.dto.response.ResourceTypeBody;
import com.ren.selfbusiness.enumarate.ErrorDtoEnum;
import com.ren.selfbusiness.exception.BusinessException;
import com.ren.selfbusiness.model.ResourceType;
import com.ren.selfbusiness.model.User;
import lombok.AllArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ResourceTypeMapper implements EntityMapper<ResourceTypeBody, ResourceType, Pair<ResourceTypeRequest, User>> {

    @Override
    public ResourceTypeBody toDto(ResourceType entity) {
        User creator = entity.getCreator();
        if (creator == null) throw new BusinessException(ErrorDtoEnum.UNKNOWN_01_DTO.getErrorDto());
        return new ResourceTypeBody(entity.getId(), entity.getName(), entity.getUnit(), creator.getUsername(), String.valueOf(entity.getCount()));
    }

    @Override
    public ResourceType toEntity(Pair<ResourceTypeRequest, User> resourceTypeAndUser) {
        ResourceTypeRequest resourceType = resourceTypeAndUser.getFirst();
        return new ResourceType(resourceType.name(), resourceType.unit(), resourceTypeAndUser.getSecond());
    }
}
