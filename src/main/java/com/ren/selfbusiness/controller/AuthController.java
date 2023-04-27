package com.ren.selfbusiness.controller;

import com.ren.selfbusiness.dto.request.AuthRequest;
import com.ren.selfbusiness.dto.request.RegistrationRequest;
import com.ren.selfbusiness.dto.response.UserBody;
import com.ren.selfbusiness.dto.response.MessageBody;
import com.ren.selfbusiness.dto.response.Response;
import com.ren.selfbusiness.service.AuthService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@Log4j2
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> auth(@RequestBody(required = false) AuthRequest req) {
        Response<UserBody> res = authService.auth(req);
        log.debug("user has logged");
        return ResponseEntity.ok(res);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> reg(@RequestBody RegistrationRequest req) {
        Response<MessageBody> res = authService.reg(req);
        log.debug("user has registered");
        return ResponseEntity.ok(res);
    }
}
