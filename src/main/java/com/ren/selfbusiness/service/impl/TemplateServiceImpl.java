package com.ren.selfbusiness.service.impl;

import com.ren.selfbusiness.dto.request.IngredientRequest;
import com.ren.selfbusiness.dto.request.TemplateRequest;
import com.ren.selfbusiness.dto.response.TemplateBody;
import com.ren.selfbusiness.mapper.EntityMapper;
import com.ren.selfbusiness.model.Ingredient;
import com.ren.selfbusiness.model.ResourceType;
import com.ren.selfbusiness.model.Template;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.repository.TemplateRepository;
import com.ren.selfbusiness.resolver.exception.ExceptionResolver;
import com.ren.selfbusiness.service.ResourceTypeService;
import com.ren.selfbusiness.service.TemplateService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.ren.selfbusiness.constant.ErrorCodeStorage.T_01;

@Service
@Transactional(readOnly = true)
@AllArgsConstructor
public class TemplateServiceImpl implements TemplateService {
    private final EntityMapper<TemplateBody, Template, Pair<TemplateRequest, User>> mapper;
    private final TemplateRepository templateRepository;
    private final ResourceTypeService resourceTypeService;
    private final ExceptionResolver exceptionResolver;

    @Transactional
    @Override
    public void addTemplate(TemplateRequest req, User user) {
        Template template = mapper.toEntity(Pair.of(req, user));
        templateRepository.save(template);
    }

    @Transactional
    @Override
    public void updateTemplate(Long id, TemplateRequest req) {
        Template template = getTemplateById(id);
        if (req.name() != null) {
            template.setName(req.name());
        }
        if (req.cost() != null) {
            template.setCost(new BigDecimal(req.cost()));
        }
        updateTemplateIngredients(template, req.ingredients());

        templateRepository.save(template);
    }

    private void updateTemplateIngredients(Template template, List<IngredientRequest> ingredients) {
        ingredients.forEach((ingredientRequest) -> {
            Long typeId = ingredientRequest.resourceTypeId();
            Ingredient entityIngredient = template.getIngredients().stream()
                    .filter(i -> i.getResourceType().getId().equals(typeId))
                    .findFirst()
                    .orElse(null);
            Integer count = ingredientRequest.count();
            if (entityIngredient != null) entityIngredient.setCount(count);
            else template.addIngredient(new Ingredient(resourceTypeService.getResourceTypeById(typeId), count));
        });

        List<Ingredient> ingredientList = template.getIngredients().stream()
                .filter((i) -> ingredients.stream()
                        .noneMatch(reqIng -> Objects.equals(reqIng.resourceTypeId(), i.getResourceType().getId())))
                .toList();
        ingredientList.forEach(template::removeIngredient);
    }

    @Transactional
    @Override
    public void deleteTemplate(Long id) {
        templateRepository.deleteById(id);
    }

    @Override
    public Page<TemplateBody> getAll(Pageable pageable, User user) {
        return templateRepository.findAllByUser(pageable, user).map(mapper::toDto);
    }

    @Override
    public List<Template> getAllByIdIn(List<Long> ids) {
        return templateRepository.findAllByIdIsIn(ids);
    }

    @Override
    public Template getTemplateById(Long id) {
        return templateRepository.findById(id).orElseThrow(() -> exceptionResolver.resolve(T_01));
    }
}
