package com.ren.selfbusiness.mapper;

import com.ren.selfbusiness.dto.request.*;
import com.ren.selfbusiness.dto.response.*;
import com.ren.selfbusiness.model.*;
import com.ren.selfbusiness.service.ResourceService;
import com.ren.selfbusiness.service.TemplateService;
import com.ren.selfbusiness.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class SaleMapper implements EntityMapper<SaleBody, Sale, Pair<SaleRequest, User>> {
    private final EntityMapper<TemplateBody, Template, Pair<TemplateRequest, User>> templateMapper;
    private final EntityMapper<TransactionBody, Transaction, Pair<TransactionRequest, User>> transactionMapper;
    private final TemplateService templateService;

    @Override
    public SaleBody toDto(Sale entity) {
        return new SaleBody(entity.getId(),
                templateMapper.toDto(entity.getTemplate()),
                transactionMapper.toDto(entity.getTransaction()));
    }

    @Override
    public Sale toEntity(Pair<SaleRequest, User> dtoParam) {
        SaleRequest req = dtoParam.getFirst();
        Template template = templateService.getTemplateById(req.templateId());
        User user = dtoParam.getSecond();
        return new Sale(user, template, new Transaction(template.getNetProfit(), user));
    }
}
