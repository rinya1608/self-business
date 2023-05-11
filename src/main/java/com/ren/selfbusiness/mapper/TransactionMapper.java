package com.ren.selfbusiness.mapper;

import com.ren.selfbusiness.dto.request.ResourceRequest;
import com.ren.selfbusiness.dto.request.TransactionRequest;
import com.ren.selfbusiness.dto.response.ResourceBody;
import com.ren.selfbusiness.dto.response.TransactionBody;
import com.ren.selfbusiness.model.Resource;
import com.ren.selfbusiness.model.Transaction;
import com.ren.selfbusiness.model.User;
import lombok.AllArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@Component
public class TransactionMapper implements EntityMapper<TransactionBody, Transaction, Pair<TransactionRequest, User>> {
    EntityMapper<ResourceBody, Resource, Pair<ResourceRequest, User>> resourceMapper;
    @Override
    public TransactionBody toDto(Transaction transaction) {
        return new TransactionBody(transaction.getId(), transaction.getDate().toString(), transaction.getSum().toString(), resourceMapper.toDto(transaction.getResource()));
    }

    @Override
    public Transaction toEntity(Pair<TransactionRequest, User> transactionReqAndUser) {
        TransactionRequest req = transactionReqAndUser.getFirst();
        return new Transaction(new BigDecimal(req.sum()), transactionReqAndUser.getSecond());
    }
}
