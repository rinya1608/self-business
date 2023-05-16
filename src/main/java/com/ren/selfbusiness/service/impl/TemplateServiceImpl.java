package com.ren.selfbusiness.service.impl;

import com.ren.selfbusiness.dto.request.TemplateRequest;
import com.ren.selfbusiness.dto.response.TemplateBody;
import com.ren.selfbusiness.mapper.EntityMapper;
import com.ren.selfbusiness.model.Template;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.repository.TemplateRepository;
import com.ren.selfbusiness.resolver.exception.ExceptionResolver;
import com.ren.selfbusiness.service.TemplateService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ren.selfbusiness.constant.ErrorCodeStorage.T_01;

@Service
@Transactional(readOnly = true)
@AllArgsConstructor
public class TemplateServiceImpl implements TemplateService {
    private final EntityMapper<TemplateBody, Template, Pair<TemplateRequest, User>> mapper;
    private final TemplateRepository templateRepository;
    private final ExceptionResolver exceptionResolver;

    @Transactional
    @Override
    public void addTemplate(TemplateRequest req, User user) {
        Template template = mapper.toEntity(Pair.of(req, user));
        templateRepository.save(template);
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
    public Template getTemplateById(Long id) {
        return templateRepository.findById(id).orElseThrow(() -> exceptionResolver.resolve(T_01));
    }
}
