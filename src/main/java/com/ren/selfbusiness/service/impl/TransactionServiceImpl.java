package com.ren.selfbusiness.service.impl;

import com.ren.selfbusiness.dto.request.TransactionRequest;
import com.ren.selfbusiness.dto.response.TransactionBody;
import com.ren.selfbusiness.mapper.EntityMapper;
import com.ren.selfbusiness.model.Transaction;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.repository.TransactionRepository;
import com.ren.selfbusiness.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final EntityMapper<TransactionBody, Transaction, Pair<TransactionRequest, User>> mapper;

    @Transactional
    @Override
    public Transaction addTransaction(TransactionRequest req, User user) {
        Transaction transaction = mapper.toEntity(Pair.of(req, user));
        return transactionRepository.save(transaction);
    }

    @Transactional
    @Override
    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    @Override
    public Page<TransactionBody> getAll(Pageable pageable, User user) {
        return transactionRepository.findAllByUser(pageable, user).map(mapper::toDto);
    }
}
