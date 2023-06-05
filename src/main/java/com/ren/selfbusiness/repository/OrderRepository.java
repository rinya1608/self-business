package com.ren.selfbusiness.repository;

import com.ren.selfbusiness.model.Order;
import com.ren.selfbusiness.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> getOrdersByUser(Pageable pageable, User user);
}
