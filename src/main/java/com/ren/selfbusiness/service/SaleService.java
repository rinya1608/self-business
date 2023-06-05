package com.ren.selfbusiness.service;

import com.ren.selfbusiness.dto.request.SaleRequest;
import com.ren.selfbusiness.model.Template;
import com.ren.selfbusiness.model.User;

public interface SaleService {
    void addSale(SaleRequest req, User user);
    void addSale(Template template, User user);
}
