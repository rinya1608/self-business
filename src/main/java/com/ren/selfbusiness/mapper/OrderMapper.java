package com.ren.selfbusiness.mapper;

import com.ren.selfbusiness.dto.request.ClientInfoRequest;
import com.ren.selfbusiness.dto.request.OrderRequest;
import com.ren.selfbusiness.dto.request.TemplateRequest;
import com.ren.selfbusiness.dto.response.*;
import com.ren.selfbusiness.model.Order;
import com.ren.selfbusiness.model.OrderTemplate;
import com.ren.selfbusiness.model.Template;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.service.TemplateService;
import com.ren.selfbusiness.vo.ClientInfo;
import lombok.AllArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Component
@AllArgsConstructor
public class OrderMapper implements EntityMapper<OrderBody, Order, Pair<OrderRequest, User>> {

    private EntityMapper<TemplateBody, Template, Pair<TemplateRequest, User>> templateMapper;
    private TemplateService templateService;

    @Override
    public OrderBody toDto(Order order) {
        List<OrderTemplateBody> templates = order.getTemplates().stream()
                .map(t -> new OrderTemplateBody(
                        templateMapper.toDto(t.getTemplate()),
                        t.getCount().toString(),
                        new ErrorIngredientBody(t.getIngredientErrorMessages())
                ))
                .toList();
        ClientInfo clientInfo = order.getClientInfo();
        String cost = order.getTemplates().stream()
                .map(t -> t.getTemplate().getNetProfit().multiply(new BigDecimal(t.getCount())))
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .toString();
        return new OrderBody(order.getId(), order.getDate().toString(), order.getStatus().name(),
                templates, new ClientInfoBody(clientInfo.getName(),
                clientInfo.getContact()), cost);
    }

    @Override
    public Order toEntity(Pair<OrderRequest, User> reqAndUser) {
        OrderRequest req = reqAndUser.getFirst();
        User user = reqAndUser.getSecond();
        ClientInfoRequest clientInfo = req.clientInfo();

        Order order = new Order(LocalDateTime.parse(req.date()),
                new ClientInfo(clientInfo.contact(), clientInfo.name()), user);

        List<OrderTemplate> orderTemplates = req.templates().stream()
                .map(t -> new OrderTemplate(templateService.getTemplateById(t.templateId()), t.count(), order))
                .toList();

        order.setTemplates(orderTemplates);

        return order;
    }
}
