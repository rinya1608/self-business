package com.ren.selfbusiness.service;

import com.ren.selfbusiness.dto.request.ResourceRequest;
import com.ren.selfbusiness.dto.response.ResourceBody;
import com.ren.selfbusiness.model.Resource;
import com.ren.selfbusiness.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ResourceService {
    Resource addResource(ResourceRequest req, User user);

    void updateResource(Long id, ResourceRequest req);

    void deleteResource(Long id);

    Page<ResourceBody> getAll(Pageable pageable, User user);

    Resource getResourceTypeById(Long id);
}
