package com.ren.selfbusiness.controller;

import com.ren.selfbusiness.dto.request.OrderRequest;
import com.ren.selfbusiness.dto.response.MessageBody;
import com.ren.selfbusiness.dto.response.OrderBody;
import com.ren.selfbusiness.dto.response.Response;
import com.ren.selfbusiness.enumarate.OrderStatusCommand;
import com.ren.selfbusiness.service.OrderService;
import com.ren.selfbusiness.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/order")
public class OrderController {
    private OrderService orderService;
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> addOrder(@RequestHeader(name = "Authorization") String token,
                                      @RequestBody OrderRequest request) {
        orderService.addOrder(request, userService.parseAndFindByJwt(token));
        return ResponseEntity.ok(Response.<MessageBody>builder().body(new MessageBody("Заказ добавлен")).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(@RequestBody OrderRequest request, @PathVariable Long id) {
        orderService.updateOrder(request, id);
        return ResponseEntity.ok(Response.<MessageBody>builder().body(new MessageBody("Заказ добавлен")).build());
    }

    @PutMapping("/{id}/{command}")
    public ResponseEntity<?> changeStatus(@RequestHeader(name = "Authorization") String token,
                                          @PathVariable Long id, @PathVariable String command) {
        orderService.changeStatus(id, command, userService.parseAndFindByJwt(token));
        return ResponseEntity.ok(Response.<MessageBody>builder().body(new MessageBody("Заказ добавлен")).build());
    }

    @GetMapping
    public ResponseEntity<?> getPageWithOrders(@RequestHeader(name = "Authorization") String token,
                                               @RequestParam(defaultValue = "10") int size,
                                               @RequestParam(defaultValue = "0") int page) {
        Page<OrderBody> pageWithOrders = orderService.getPageWithOrders(PageRequest.of(page, size),
                userService.parseAndFindByJwt(token));
        return ResponseEntity.ok(Response.<Page<OrderBody>>builder().body(pageWithOrders).build());
    }
}
