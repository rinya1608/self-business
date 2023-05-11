package com.ren.selfbusiness.controller;

import com.ren.selfbusiness.dto.request.PurchaseRequest;
import com.ren.selfbusiness.dto.response.MessageBody;
import com.ren.selfbusiness.dto.response.PurchaseBody;
import com.ren.selfbusiness.dto.response.Response;
import com.ren.selfbusiness.service.PurchaseService;
import com.ren.selfbusiness.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/purchase")
public class PurchaseController {
    private final PurchaseService purchaseService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> addPurchase(@RequestHeader(name = "Authorization") String token,
                                         @RequestBody PurchaseRequest req) {
        purchaseService.addPurchase(req, userService.parseAndFindByJwt(token));
        return ResponseEntity.ok(Response.<MessageBody>builder().body(new MessageBody("Покупка добавлена")).build());
    }

    @GetMapping
    public ResponseEntity<?> getPurchases(@RequestParam(defaultValue = "5") int size, @RequestParam(defaultValue = "0") int page) {
        Page<PurchaseBody> purchaseBodies = purchaseService.getAll(PageRequest.of(page, size));
        return ResponseEntity.ok(Response.<Page<PurchaseBody>>builder().body(purchaseBodies).build());
    }
}
