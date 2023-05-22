package com.ren.selfbusiness.controller;

import com.ren.selfbusiness.dto.request.ResourceRequest;
import com.ren.selfbusiness.dto.request.TransactionFilterRequest;
import com.ren.selfbusiness.dto.response.*;
import com.ren.selfbusiness.service.ResourceService;
import com.ren.selfbusiness.service.TransactionService;
import com.ren.selfbusiness.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@AllArgsConstructor
@RequestMapping("/api/transaction")
public class TransactionController {

    private final TransactionService transactionService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> getTransactions(@RequestHeader(name = "Authorization") String token,
                                             @RequestParam(defaultValue = "5") int size,
                                             @RequestParam(defaultValue = "0") int page,
                                             @RequestBody TransactionFilterRequest filterReq) {
        Page<TransactionBody> transactionBodies = transactionService.getAll(filterReq,
                PageRequest.of(page, size, Sort.by("date")),
                userService.parseAndFindByJwt(token));
        return ResponseEntity.ok(Response.<Page<TransactionBody>>builder().body(transactionBodies).build());
    }

    @PostMapping("/statistic")
    public ResponseEntity<?> getStatistic(@RequestHeader(name = "Authorization") String token,
                                             @RequestBody TransactionFilterRequest filterReq) {
        TransactionalStatisticBody statistic = transactionService.getStatistic(filterReq, userService.parseAndFindByJwt(token));
        return ResponseEntity.ok(Response.<TransactionalStatisticBody>builder().body(statistic).build());
    }
}