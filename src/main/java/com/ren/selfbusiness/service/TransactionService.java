package com.ren.selfbusiness.service;

import com.ren.selfbusiness.dto.request.TransactionRequest;
import com.ren.selfbusiness.dto.response.TransactionBody;
import com.ren.selfbusiness.model.Transaction;
import com.ren.selfbusiness.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TransactionService {
    Transaction addTransaction(TransactionRequest req, User user);

    void deleteTransaction(Long id);

    Page<TransactionBody> getAll(Pageable pageable, User user);
}
