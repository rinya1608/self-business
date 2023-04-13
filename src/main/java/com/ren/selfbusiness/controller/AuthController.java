package com.ren.selfbusiness.controller;

import com.ren.selfbusiness.dto.request.AuthRequest;
import com.ren.selfbusiness.dto.request.RegistrationRequest;
import com.ren.selfbusiness.dto.response.AuthResponse;
import com.ren.selfbusiness.dto.response.MessageResponse;
import com.ren.selfbusiness.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> auth(@RequestBody AuthRequest req) {
        AuthResponse res = authService.auth(req);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> reg(@RequestBody RegistrationRequest req) {
        MessageResponse res = authService.reg(req);
        return ResponseEntity.ok(res);
    }
}
