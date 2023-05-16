package com.ren.selfbusiness.dto.response;

import java.util.List;

public record TemplateBody(Long id, String name, String cost, String netProfit, List<IngredientBody> ingredients) {
}
