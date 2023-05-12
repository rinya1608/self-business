package com.ren.selfbusiness.repository;

import com.ren.selfbusiness.model.Purchase;
import com.ren.selfbusiness.model.ResourceType;
import com.ren.selfbusiness.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceTypeRepository extends JpaRepository<ResourceType, Long> {
    Page<ResourceType> findAllByCreator(Pageable pageable, User creator);
}
