package com.ren.selfbusiness.service;

import com.ren.selfbusiness.dto.request.OrderFilterRequest;
import com.ren.selfbusiness.dto.request.OrderRequest;
import com.ren.selfbusiness.dto.response.OrderBody;
import com.ren.selfbusiness.model.Order;
import com.ren.selfbusiness.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    void addOrder(OrderRequest request, User user);

    void updateOrder(OrderRequest request, Long id);

    void changeStatus(Long id, String command, User user);

    Page<OrderBody> getPageWithOrders(OrderFilterRequest filter, Pageable pageable, User user);

    Order getOrderById(Long id);
}
