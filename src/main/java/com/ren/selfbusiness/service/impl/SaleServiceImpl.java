package com.ren.selfbusiness.service.impl;

import com.ren.selfbusiness.dto.request.SaleRequest;
import com.ren.selfbusiness.dto.response.SaleBody;
import com.ren.selfbusiness.enumarate.ResourceHistoryStatus;
import com.ren.selfbusiness.mapper.EntityMapper;
import com.ren.selfbusiness.model.*;
import com.ren.selfbusiness.repository.SaleRepository;
import com.ren.selfbusiness.resolver.error.ErrorDtoResolver;
import com.ren.selfbusiness.resolver.exception.ExceptionResolver;
import com.ren.selfbusiness.service.SaleService;
import lombok.AllArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

import static com.ren.selfbusiness.constant.ErrorCodeStorage.R_02;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class SaleServiceImpl implements SaleService {

    private final EntityMapper<SaleBody, Sale, Pair<SaleRequest, User>> mapper;
    private final SaleRepository saleRepository;
    private final ExceptionResolver exceptionResolver;

    @Transactional
    @Override
    public void addSale(SaleRequest req, User user) {
        Sale sale = mapper.toEntity(Pair.of(req, user));
        List<Ingredient> ingredients = sale.getTemplate().getIngredients();
        ingredients.forEach(ingredient -> {
            List<Resource> resources = ingredient.getResourceType().getResources();
            List<Resource> sortResources = resources.stream()
                    .filter(r -> r.getCount() > 0)
                    .sorted(Comparator.comparing(Resource::getId))
                    .toList();

            changeResourceCountByIngredient(sortResources, ingredient);
        });
        saleRepository.save(sale);
    }

    private void changeResourceCountByIngredient(List<Resource> resources, Ingredient ingredient) {

        Integer ingredientCount = ingredient.getCount();
        for (Resource r :
                resources) {
            if (ingredientCount == 0) break;
            Integer resourceCount = r.getCount();
            Integer delta = resourceCount;
            if (resourceCount >= ingredientCount) {
                delta = ingredientCount;
                r.setCount(resourceCount - delta);
            }
            else r.setCount(0);
            r.addResourceHistory(new History(delta, ResourceHistoryStatus.USED));
            ingredientCount -= delta;
        }
        if (ingredientCount > 0) throw exceptionResolver.resolve(R_02, "Не хватает " + ingredient.getResourceType().getName());
    }
}
