package com.ren.selfbusiness.service;

import com.ren.selfbusiness.dto.request.PurchaseRequest;
import com.ren.selfbusiness.dto.response.PurchaseBody;
import com.ren.selfbusiness.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PurchaseService {
    void addPurchase(PurchaseRequest req, User user);

    void deletePurchase(Long id);

    Page<PurchaseBody> getAll(Pageable pageable);
}
