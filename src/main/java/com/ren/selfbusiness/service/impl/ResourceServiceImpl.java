package com.ren.selfbusiness.service.impl;

import com.ren.selfbusiness.dto.request.ResourceRequest;
import com.ren.selfbusiness.dto.response.ResourceBody;
import com.ren.selfbusiness.enumarate.ResourceHistoryStatus;
import com.ren.selfbusiness.mapper.EntityMapper;
import com.ren.selfbusiness.model.*;
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
import java.util.*;

import static com.ren.selfbusiness.constant.ErrorCodeStorage.R_01;
import static com.ren.selfbusiness.constant.ErrorCodeStorage.R_02;

@Service
@Transactional(readOnly = true)
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
        ResourceType type = resourceTypeService.getResourceTypeById(req.typeId());
        type.addResource(resource);
        return resourceRepository.save(resource);
    }

    @Transactional
    @Override
    public void updateResource(Long id, ResourceRequest req) {
        Resource resource = resourceRepository.getReferenceById(id);
        if (req.count() != null) resource.setCount(req.count());
        if (req.price() != null) resource.setPrice(new BigDecimal(req.price()));
        if (req.typeId() != null) {
            ResourceType type = resourceTypeService.getResourceTypeById(req.typeId());
            resource.setTypeName(type.getName());
            resource.setUnit(type.getUnit());
        }
    }

    @Override
    public List<History> changeResourceCountForTemplate(Template template, int count, ResourceHistoryStatus historyStatus) {
        List<History> histories = new ArrayList<>();
        List<Ingredient> ingredients = template.getIngredients();
        ingredients.forEach(ingredient -> {
            List<Resource> resources = ingredient.getResourceType().getResources();
            List<Resource> sortResources = resources.stream()
                    .filter(r -> r.getCount() > 0)
                    .sorted(Comparator.comparing(Resource::getId))
                    .toList();

            Map<Long, Integer> deltaByResourceId = changeResourceCountByIngredient(sortResources, ingredient, count);
            if (deltaByResourceId.isEmpty())
                throw exceptionResolver.resolve(R_02, "Не хватает " + ingredient.getResourceType().getName());
            else sortResources.forEach((r) -> {
                Long resourceId = r.getId();
                if (deltaByResourceId.containsKey(resourceId)) {
                    History history = new History(deltaByResourceId.get(resourceId), historyStatus);
                    histories.add(history);
                    r.addResourceHistory(history);
                }
            });
        });

        return histories;
    }

    private Map<Long, Integer> changeResourceCountByIngredient(List<Resource> resources, Ingredient ingredient, int count) {
        Map<Long, Integer> deltaByResourceId = new HashMap<>();
        Integer ingredientCount = ingredient.getCount() * count;
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
            deltaByResourceId.put(r.getId(), delta);
            ingredientCount -= delta;
        }
        if (ingredientCount > 0) return Collections.emptyMap();

        return deltaByResourceId;
    }

    @Transactional
    @Override
    public void deleteResource(Long id) {
        resourceRepository.deleteById(id);
    }

    @Override
    public Page<ResourceBody> getAll(Pageable pageable, User user) {
        return resourceRepository.findAllByCreator(pageable, user).map(mapper::toDto);
    }

    @Override
    public Resource getResourceTypeById(Long id) {
        return resourceRepository.findById(id).orElseThrow(() -> exceptionResolver.resolve(R_01));
    }
}
