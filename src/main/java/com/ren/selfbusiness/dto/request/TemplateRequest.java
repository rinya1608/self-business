package com.ren.selfbusiness.dto.request;

import java.util.List;

public record TemplateRequest(String name, String cost, List<IngredientRequest> ingredients) {
}
