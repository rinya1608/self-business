package com.ren.selfbusiness.specification;

import com.ren.selfbusiness.dto.request.OrderFilterRequest;
import com.ren.selfbusiness.dto.request.TransactionFilterRequest;
import com.ren.selfbusiness.enumarate.OrderStatus;
import com.ren.selfbusiness.model.Order;
import com.ren.selfbusiness.model.Transaction;
import com.ren.selfbusiness.model.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.List;

public class OrderSpecification {

    public static Specification<Order> userEqual(User user) {
        return (root, query, builder) -> builder.equal(root.get("user"), user);
    }
    public static Specification<Order> statusIn(List<OrderStatus> statuses) {
        return (root, query, builder) -> root.get("status").in(statuses);
    }

    public static Specification<Order> filter(OrderFilterRequest filter) {
        List<OrderStatus> orderStatuses = filter.getOrderStatusList().stream().map(OrderStatus::valueOf).toList();
        return Specification
                .where(filter.getOrderStatusList() != null
                        ? OrderSpecification.statusIn(orderStatuses)
                        : null);
    }
}
