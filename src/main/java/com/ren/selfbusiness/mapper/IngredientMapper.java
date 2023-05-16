package com.ren.selfbusiness.mapper;

import com.ren.selfbusiness.dto.request.IngredientRequest;
import com.ren.selfbusiness.dto.request.ResourceTypeRequest;
import com.ren.selfbusiness.dto.response.IngredientBody;
import com.ren.selfbusiness.dto.response.ResourceTypeBody;
import com.ren.selfbusiness.model.Ingredient;
import com.ren.selfbusiness.model.ResourceType;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.service.ResourceTypeService;
import lombok.AllArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class IngredientMapper implements EntityMapper<IngredientBody, Ingredient, IngredientRequest>{

    private final EntityMapper<ResourceTypeBody, ResourceType, Pair<ResourceTypeRequest, User>> resourceTypeMapper;
    private final ResourceTypeService resourceTypeService;
    @Override
    public IngredientBody toDto(Ingredient entity) {
        return new IngredientBody(entity.getId(), entity.getCount(), resourceTypeMapper.toDto(entity.getResourceType()));
    }

    @Override
    public Ingredient toEntity(IngredientRequest dtoParam) {
        ResourceType type = resourceTypeService.getResourceTypeById(dtoParam.resourceTypeId());
        return new Ingredient(type, dtoParam.count());
    }
}
