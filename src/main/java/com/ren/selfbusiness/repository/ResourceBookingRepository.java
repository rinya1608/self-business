package com.ren.selfbusiness.repository;

import com.ren.selfbusiness.model.Order;
import com.ren.selfbusiness.model.ResourceBooking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceBookingRepository extends JpaRepository<ResourceBooking, Long> {
    ResourceBooking findByOrder(Order order);
}
