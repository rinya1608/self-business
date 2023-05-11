package com.ren.selfbusiness.service.impl;

import com.ren.selfbusiness.dto.request.PurchaseRequest;
import com.ren.selfbusiness.dto.response.PurchaseBody;
import com.ren.selfbusiness.mapper.EntityMapper;
import com.ren.selfbusiness.model.Purchase;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.repository.PurchaseRepository;
import com.ren.selfbusiness.service.PurchaseService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseRepository purchaseRepository;
    EntityMapper<PurchaseBody, Purchase, Pair<PurchaseRequest, User>> mapper;

    @Override
    public void addPurchase(PurchaseRequest req, User user) {
        purchaseRepository.save(mapper.toEntity(Pair.of(req, user)));
    }

    @Override
    public void deletePurchase(Long id) {
        purchaseRepository.deleteById(id);
    }

    @Override
    public Page<PurchaseBody> getAll(Pageable pageable) {
        return purchaseRepository.findAll(pageable).map(mapper::toDto);
    }
}
