package com.ren.selfbusiness.service;

import com.ren.selfbusiness.dto.request.SaleRequest;
import com.ren.selfbusiness.model.User;

public interface SaleService {
    void addSale(SaleRequest req, User user);
}
