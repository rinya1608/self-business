package com.ren.selfbusiness.service.impl;

import com.ren.selfbusiness.dto.request.ClientInfoRequest;
import com.ren.selfbusiness.dto.request.OrderFilterRequest;
import com.ren.selfbusiness.dto.request.OrderRequest;
import com.ren.selfbusiness.dto.response.OrderBody;
import com.ren.selfbusiness.enumarate.OrderStatus;
import com.ren.selfbusiness.enumarate.OrderStatusCommand;
import com.ren.selfbusiness.enumarate.ResourceHistoryStatus;
import com.ren.selfbusiness.mapper.EntityMapper;
import com.ren.selfbusiness.model.*;
import com.ren.selfbusiness.repository.OrderRepository;
import com.ren.selfbusiness.repository.ResourceBookingRepository;
import com.ren.selfbusiness.service.OrderService;
import com.ren.selfbusiness.service.ResourceService;
import com.ren.selfbusiness.service.SaleService;
import com.ren.selfbusiness.service.TemplateService;
import com.ren.selfbusiness.specification.OrderSpecification;
import com.ren.selfbusiness.specification.TransactionSpecification;
import com.ren.selfbusiness.vo.ClientInfo;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class OrderServiceImpl implements OrderService {
    private OrderRepository orderRepository;
    private ResourceBookingRepository resourceBookingRepository;
    private TemplateService templateService;
    private EntityMapper<OrderBody, Order, Pair<OrderRequest, User>> orderMapper;
    private ResourceService resourceService;
    private SaleService saleService;

    @Override
    @Transactional
    public void addOrder(OrderRequest request, User user) {
        Order order = orderMapper.toEntity(Pair.of(request, user));
        orderRepository.save(order);
    }

    @Override
    @Transactional
    public void updateOrder(OrderRequest request, Long id) {
        Order order = getOrderById(id);
        ClientInfoRequest clientInfo = request.clientInfo();
        if (clientInfo != null) {
            order.setClientInfo(new ClientInfo(clientInfo.contact(), clientInfo.name()));
        }
        if (StringUtils.isNotBlank(request.date())) {
            order.setDate(LocalDateTime.parse(request.date()));
        }
        if (request.templates() != null) {
            updateOrderTemplates(request, order);
        }
        orderRepository.save(order);
    }

    private void updateOrderTemplates(OrderRequest request, Order order) {
        Map<Long, Integer> countById = new HashMap<>();
        request.templates().forEach(t -> {
            countById.put(t.templateId(), t.count());
        });
        List<OrderTemplate> orderTemplates = templateService.getAllByIdIn(new ArrayList<>(countById.keySet()))
                .stream()
                .map(t -> new OrderTemplate(t, countById.get(t.getId()), order))
                .toList();
        ArrayList<OrderTemplate> orderTemplatesClone = new ArrayList<>(order.getTemplates());
        orderTemplatesClone.forEach(order::removeOrderTemplate);
        orderTemplates.forEach(order::addOrderTemplate);
    }

    @Override
    @Transactional
    public void changeStatus(Long id, String command, User user) {

        Order order = getOrderById(id);
        OrderStatus status = getStatusByOrderAndCommand(order, command);

        if (OrderStatus.READY.equals(status)) {
            prepareForChangeStatusToReady(order);
        } else {
            List<ResourceBooking> resourceBookingList = resourceBookingRepository.findByOrder(order);
            if (OrderStatus.GIVEN.equals(status)) {
                prepareForChangeStatusToGiven(order, user, resourceBookingList);
            } else if (OrderStatus.CANCELED.equals(status) && OrderStatus.READY.equals(order.getStatus())) {
                prepareForChangeCanceled(resourceBookingList);
            }
            resourceBookingRepository.saveAll(resourceBookingList);
            resourceBookingRepository.deleteAll(resourceBookingList);
        }
        order.setStatus(status);
        orderRepository.save(order);
    }

    private void prepareForChangeCanceled(List<ResourceBooking> resourceBookingList) {
        resourceBookingList.forEach(resourceBooking -> {
            resourceBooking.getHistories().forEach((h) -> {
                Resource resource = h.getResource();
                resource.setCount(resource.getCount() + h.getCount());
                resource.removeResourceHistory(h);
            });
        });

    }

    private void prepareForChangeStatusToGiven(Order order, User user, List<ResourceBooking> resourceBookingList) {
        resourceBookingList.forEach(resourceBooking -> {
            resourceBooking.getHistories().forEach((h) -> {
                h.setStatus(ResourceHistoryStatus.USED);
            });
        });

        order.getTemplates().forEach((t) -> {
            for (int i = 0; i < t.getCount(); i++) {
                saleService.addSale(t.getTemplate(), user);
            }
        });
    }

    private void prepareForChangeStatusToReady(Order order) {
        List<OrderTemplate> templates = order.getTemplates();
        templates.forEach((t) -> {
            List<History> histories = resourceService.changeResourceCountForTemplate(t.getTemplate(), t.getCount(), ResourceHistoryStatus.BOOKED);
            ResourceBooking resourceBooking = new ResourceBooking(order, histories);
            resourceBookingRepository.save(resourceBooking);
        });
    }

    private OrderStatus getStatusByOrderAndCommand(Order order, String command) {

        OrderStatus status = order.getStatus();
        int ordinal = status.ordinal();
        if (OrderStatusCommand.CANCEL.name().equals(command))
            status = OrderStatus.CANCELED;
        else {
            ordinal = OrderStatusCommand.NEXT.name().equals(command) ? ordinal + 1 : ordinal - 1;
            int finalOrdinal = ordinal;
            status = Arrays.stream(OrderStatus.values())
                    .filter(orderStatus -> orderStatus.ordinal() == finalOrdinal)
                    .findFirst().orElseThrow(() -> new RuntimeException());
        }
        return status;
    }


    @Override
    public Page<OrderBody> getPageWithOrders(OrderFilterRequest filter, Pageable pageable, User user) {
        Specification<Order> sp = Specification
                .where(OrderSpecification.userEqual(user))
                .and(OrderSpecification.filter(filter));
        return orderRepository.findAll(sp, pageable).map(orderMapper::toDto);
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException());
    }
}
