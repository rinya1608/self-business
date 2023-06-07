package com.ren.selfbusiness.repository;

import com.ren.selfbusiness.model.Order;
import com.ren.selfbusiness.model.ResourceBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResourceBookingRepository extends JpaRepository<ResourceBooking, Long> {
    List<ResourceBooking> findByOrder(Order order);
}
