package com.ren.selfbusiness.service;

import com.ren.selfbusiness.dto.request.ResourceRequest;
import com.ren.selfbusiness.dto.request.TemplateRequest;
import com.ren.selfbusiness.dto.response.ResourceBody;
import com.ren.selfbusiness.dto.response.TemplateBody;
import com.ren.selfbusiness.model.Resource;
import com.ren.selfbusiness.model.Template;
import com.ren.selfbusiness.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TemplateService {
    void addTemplate(TemplateRequest req, User user);

    void updateTemplate(Long id, TemplateRequest req);

    void deleteTemplate(Long id);
    Page<TemplateBody> getAll(Pageable pageable, User user);

    List<Template> getAllByIdIn(List<Long> ids);

    Template getTemplateById(Long id);
}
