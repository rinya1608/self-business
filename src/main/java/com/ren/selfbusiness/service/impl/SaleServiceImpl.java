package com.ren.selfbusiness.service.impl;

import com.ren.selfbusiness.dto.request.SaleRequest;
import com.ren.selfbusiness.dto.response.SaleBody;
import com.ren.selfbusiness.enumarate.ResourceHistoryStatus;
import com.ren.selfbusiness.mapper.EntityMapper;
import com.ren.selfbusiness.model.*;
import com.ren.selfbusiness.repository.SaleRepository;
import com.ren.selfbusiness.resolver.error.ErrorDtoResolver;
import com.ren.selfbusiness.resolver.exception.ExceptionResolver;
import com.ren.selfbusiness.service.ResourceService;
import com.ren.selfbusiness.service.SaleService;
import lombok.AllArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static com.ren.selfbusiness.constant.ErrorCodeStorage.R_02;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class SaleServiceImpl implements SaleService {

    private final EntityMapper<SaleBody, Sale, Pair<SaleRequest, User>> mapper;
    private final SaleRepository saleRepository;
    private final ResourceService resourceService;

    @Transactional
    @Override
    public void addSale(SaleRequest req, User user) {
        Sale sale = mapper.toEntity(Pair.of(req, user));
        resourceService.changeResourceCountForTemplate(sale.getTemplate(), 1, ResourceHistoryStatus.USED);

        saleRepository.save(sale);
    }

    @Transactional
    @Override
    public void addSale(Template template, User user) {
        Sale sale = mapper.toEntity(Pair.of(new SaleRequest(template.getId()), user));
        saleRepository.save(sale);
    }
}
