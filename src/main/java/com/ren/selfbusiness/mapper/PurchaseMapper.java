package com.ren.selfbusiness.mapper;

import com.ren.selfbusiness.dto.request.PurchaseRequest;
import com.ren.selfbusiness.dto.request.ResourceRequest;
import com.ren.selfbusiness.dto.request.TransactionRequest;
import com.ren.selfbusiness.dto.response.PurchaseBody;
import com.ren.selfbusiness.dto.response.ResourceBody;
import com.ren.selfbusiness.dto.response.TransactionBody;
import com.ren.selfbusiness.model.Purchase;
import com.ren.selfbusiness.model.Resource;
import com.ren.selfbusiness.model.Transaction;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.service.ResourceService;
import com.ren.selfbusiness.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class PurchaseMapper implements EntityMapper<PurchaseBody, Purchase, Pair<PurchaseRequest, User>> {

    private final ResourceService resourceService;
    private final TransactionService transactionService;
    private final EntityMapper<ResourceBody, Resource, Pair<ResourceRequest, User>> resourceMapper;
    private final EntityMapper<TransactionBody, Transaction, Pair<TransactionRequest, User>> transactionMapper;

    @Override
    public PurchaseBody toDto(Purchase purchase) {
        ResourceBody resource = resourceMapper.toDto(purchase.getResource());
        TransactionBody transaction = transactionMapper.toDto(purchase.getTransaction());
        return new PurchaseBody(purchase.getId(), resource, transaction);
    }

    @Override
    public Purchase toEntity(Pair<PurchaseRequest, User> PurchaseReqAndUser) {
        PurchaseRequest req = PurchaseReqAndUser.getFirst();
        User user = PurchaseReqAndUser.getSecond();
        Resource resource = resourceService.addResource(req.resource(), user);
        Transaction transaction = transactionService.addTransaction(new TransactionRequest(resource.getPrice().toString()), user);
        return new Purchase(resource, transaction, user);
    }
}
