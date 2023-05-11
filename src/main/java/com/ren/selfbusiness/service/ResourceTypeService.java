package com.ren.selfbusiness.service;

import com.ren.selfbusiness.dto.request.ResourceTypeRequest;
import com.ren.selfbusiness.dto.response.ResourceTypeBody;
import com.ren.selfbusiness.model.ResourceType;
import com.ren.selfbusiness.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ResourceTypeService {
    void addResourceType(ResourceTypeRequest req, User user);

    void updateResourceType(Long id, ResourceTypeRequest req);

    void deleteResourceType(Long id);

    Page<ResourceTypeBody> getAll(Pageable pageable);

    ResourceType getResourceTypeById(Long id);
}
