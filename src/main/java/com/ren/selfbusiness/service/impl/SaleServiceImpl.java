package com.ren.selfbusiness.service.impl;

import com.ren.selfbusiness.dto.request.SaleRequest;
import com.ren.selfbusiness.dto.response.SaleBody;
import com.ren.selfbusiness.mapper.EntityMapper;
import com.ren.selfbusiness.model.Sale;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.repository.SaleRepository;
import com.ren.selfbusiness.service.SaleService;
import lombok.AllArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class SaleServiceImpl implements SaleService {

    private final EntityMapper<SaleBody, Sale, Pair<SaleRequest, User>> mapper;
    private final SaleRepository saleRepository;

    @Transactional
    @Override
    public void addSale(SaleRequest req, User user) {
        Sale sale = mapper.toEntity(Pair.of(req, user));
        saleRepository.save(sale);
    }
}
