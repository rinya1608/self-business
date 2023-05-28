package com.ren.selfbusiness.controller;

import com.ren.selfbusiness.dto.request.SaleRequest;
import com.ren.selfbusiness.dto.response.MessageBody;
import com.ren.selfbusiness.dto.response.Response;
import com.ren.selfbusiness.service.SaleService;
import com.ren.selfbusiness.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sale")
@AllArgsConstructor
public class SaleController {
    private final SaleService saleService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> addSale(@RequestHeader(name = "Authorization") String token,
                                     @RequestBody SaleRequest req) {
        saleService.addSale(req, userService.parseAndFindByJwt(token));
        return ResponseEntity.ok(Response.<MessageBody>builder().body(new MessageBody("Продано")).build());
    }
}
