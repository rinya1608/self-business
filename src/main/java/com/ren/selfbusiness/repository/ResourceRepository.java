package com.ren.selfbusiness.repository;

import com.ren.selfbusiness.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
}
