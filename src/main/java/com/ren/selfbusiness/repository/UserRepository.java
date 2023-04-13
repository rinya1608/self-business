package com.ren.selfbusiness.repository;

import com.ren.selfbusiness.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
