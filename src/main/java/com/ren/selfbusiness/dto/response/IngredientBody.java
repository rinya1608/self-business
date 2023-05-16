package com.ren.selfbusiness.dto.response;

import com.ren.selfbusiness.dto.request.ResourceTypeRequest;

public record IngredientBody(Long id, Integer count, ResourceTypeBody resourceType) {
}
