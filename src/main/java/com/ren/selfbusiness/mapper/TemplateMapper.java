package com.ren.selfbusiness.mapper;

import com.ren.selfbusiness.dto.request.IngredientRequest;
import com.ren.selfbusiness.dto.request.TemplateRequest;
import com.ren.selfbusiness.dto.response.IngredientBody;
import com.ren.selfbusiness.dto.response.TemplateBody;
import com.ren.selfbusiness.model.Ingredient;
import com.ren.selfbusiness.model.Template;
import com.ren.selfbusiness.model.User;
import lombok.AllArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@AllArgsConstructor
public class TemplateMapper implements EntityMapper<TemplateBody, Template, Pair<TemplateRequest, User>> {
    private final EntityMapper<IngredientBody, Ingredient, IngredientRequest> ingredientMapper;

    @Override
    public TemplateBody toDto(Template entity) {
        List<IngredientBody> ingredientBodies = entity.getIngredients().stream().map(ingredientMapper::toDto).toList();
        return new TemplateBody(entity.getId(), entity.getName(), entity.getCost().toString(), entity.getNetProfit().toString(), ingredientBodies);
    }

    @Override
    public Template toEntity(Pair<TemplateRequest, User> dtoParam) {
        TemplateRequest request = dtoParam.getFirst();
        List<Ingredient> ingredients = request.ingredients().stream().map(ingredientMapper::toEntity).toList();
        return new Template(request.name(), new BigDecimal(request.cost()), dtoParam.getSecond(), ingredients);
    }
}
