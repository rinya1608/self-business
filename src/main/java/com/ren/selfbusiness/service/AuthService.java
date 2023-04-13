package com.ren.selfbusiness.service;

import com.ren.selfbusiness.config.jwt.JwtHelper;
import com.ren.selfbusiness.constant.ErrorCodeStorage;
import com.ren.selfbusiness.dto.request.AuthRequest;
import com.ren.selfbusiness.dto.request.RegistrationRequest;
import com.ren.selfbusiness.dto.response.AuthResponse;
import com.ren.selfbusiness.dto.response.MessageResponse;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.resolver.exception.ExceptionResolver;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Log4j2
public class AuthService {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtHelper jwtHelper;
    private final ExceptionResolver exceptionResolver;

    public MessageResponse reg(RegistrationRequest req) {
        userService.addUser(req);
        return new MessageResponse("Пользователь успешно добавлен");
    }

    public AuthResponse auth(AuthRequest req) {
        return auth(req.getEmail(), req.getPassword());
    }

    public AuthResponse auth(String email, String password) {
        try {
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            SecurityContextHolder.getContext().setAuthentication(authenticate);
            String jwt = jwtHelper.generateJwtToken(authenticate);
            User user = ((User) authenticate.getPrincipal());
            return new AuthResponse(jwt, user);
        } catch (AuthenticationException e) {
            log.error(e.getMessage(), e);
            throw exceptionResolver.resolve(ErrorCodeStorage.AUTH_01);
        }
    }
}
