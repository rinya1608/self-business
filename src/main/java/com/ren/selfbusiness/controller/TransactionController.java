package com.ren.selfbusiness.controller;

import com.ren.selfbusiness.dto.request.ResourceRequest;
import com.ren.selfbusiness.dto.response.MessageBody;
import com.ren.selfbusiness.dto.response.ResourceBody;
import com.ren.selfbusiness.dto.response.Response;
import com.ren.selfbusiness.dto.response.TransactionBody;
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

    @GetMapping
    public ResponseEntity<?> getTransactions(@RequestHeader(name = "Authorization") String token,
                                             @RequestParam(defaultValue = "5") int size,
                                             @RequestParam(defaultValue = "0") int page) {
        Page<TransactionBody> transactionBodies = transactionService.getAll(PageRequest.of(page, size, Sort.by("date")),
                userService.parseAndFindByJwt(token));
        return ResponseEntity.ok(Response.<Page<TransactionBody>>builder().body(transactionBodies).build());
    }
}