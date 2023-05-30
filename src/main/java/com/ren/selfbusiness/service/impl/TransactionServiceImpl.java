package com.ren.selfbusiness.service.impl;

import com.ren.selfbusiness.dto.request.TransactionFilterRequest;
import com.ren.selfbusiness.dto.request.TransactionRequest;
import com.ren.selfbusiness.dto.response.TemplateStatisticInfoBody;
import com.ren.selfbusiness.dto.response.TransactionBody;
import com.ren.selfbusiness.dto.response.TransactionalStatisticBody;
import com.ren.selfbusiness.dto.response.TypeStatisticInfoBody;
import com.ren.selfbusiness.mapper.EntityMapper;
import com.ren.selfbusiness.model.History;
import com.ren.selfbusiness.model.Transaction;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.repository.TransactionRepository;
import com.ren.selfbusiness.service.TransactionService;
import com.ren.selfbusiness.specification.TransactionSpecification;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Transactional(readOnly = true)
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
    public Page<TransactionBody> getAll(TransactionFilterRequest filterRequest, Pageable pageable, User user) {
        Specification<Transaction> sp = Specification
                .where(TransactionSpecification.userEqual(user))
                .and(TransactionSpecification.filter(filterRequest));

        return transactionRepository.findAll(sp, pageable).map(mapper::toDto);
    }

    @Override
    public TransactionalStatisticBody getStatistic(TransactionFilterRequest filterRequest, User user) {
        Specification<Transaction> sp = Specification
                .where(TransactionSpecification.userEqual(user))
                .and(TransactionSpecification.filter(filterRequest));

        List<Transaction> transactions = transactionRepository.findAll(sp);

        BigDecimal expenses = BigDecimal.ZERO;
        BigDecimal income = BigDecimal.ZERO;
        Map<String, TypeStatisticInfoBody> infoByTypeName = new HashMap<>();
        Map<String, TemplateStatisticInfoBody> infoByTemplateName = new HashMap<>();

        for (Transaction t :
                transactions) {
            BigDecimal transactionSum = t.getSum();
            if (t.getResource() != null) {
                expenses = expenses.add(transactionSum);

                String typeName = t.getResource().getType().getName();
                TypeStatisticInfoBody typeInfo = infoByTypeName.getOrDefault(typeName,
                        new TypeStatisticInfoBody(typeName, "0", 0));
                typeInfo.setCount(typeInfo.getCount() + t.getResource().getUsedCount());
                typeInfo.setSum(new BigDecimal(typeInfo.getSum()).add(transactionSum).toString());
                infoByTypeName.put(typeName, typeInfo);

            } else {
                income = income.add(transactionSum);

                String templateName = t.getTemplate().getName();
                TemplateStatisticInfoBody templateInfo = infoByTemplateName.getOrDefault(templateName,
                        new TemplateStatisticInfoBody(templateName, "0", 0));
                templateInfo.setCount(templateInfo.getCount() + 1);
                templateInfo.setSum(new BigDecimal(templateInfo.getSum()).add(transactionSum).toString());
                infoByTemplateName.put(templateName, templateInfo);
            }
        }

        return TransactionalStatisticBody.builder()
                .income(income.toString())
                .expenses(expenses.toString())
                .typeInfo(new ArrayList<>(infoByTypeName.values()))
                .templateInfo(new ArrayList<>(infoByTemplateName.values()))
                .build();
    }
}
