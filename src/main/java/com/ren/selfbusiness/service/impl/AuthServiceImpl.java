package com.ren.selfbusiness.service.impl;

import com.ren.selfbusiness.config.jwt.JwtHelper;
import com.ren.selfbusiness.constant.ErrorCodeStorage;
import com.ren.selfbusiness.dto.request.AuthRequest;
import com.ren.selfbusiness.dto.request.RegistrationRequest;
import com.ren.selfbusiness.dto.response.JwtUserBody;
import com.ren.selfbusiness.dto.response.MessageBody;
import com.ren.selfbusiness.dto.response.Response;
import com.ren.selfbusiness.dto.response.UserBody;
import com.ren.selfbusiness.mapper.EntityMapper;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.resolver.exception.ExceptionResolver;
import com.ren.selfbusiness.service.AuthService;
import com.ren.selfbusiness.service.UserService;
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
public class AuthServiceImpl implements AuthService {
    private final UserService userService;
    private final EntityMapper<UserBody, User, RegistrationRequest> mapper;
    private final AuthenticationManager authenticationManager;
    private final JwtHelper jwtHelper;
    private final ExceptionResolver exceptionResolver;

    public Response<MessageBody> reg(RegistrationRequest req) {
        userService.addUser(req);
        return Response.<MessageBody>builder().body(new MessageBody("Пользователь успешно добавлен")).build();
    }

    public Response<JwtUserBody> auth(AuthRequest req) {
        return auth(req.getEmail(), req.getPassword());
    }

    private Response<JwtUserBody> auth(String email, String password) {
        try {
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            SecurityContextHolder.getContext().setAuthentication(authenticate);
            String jwt = jwtHelper.generateJwtToken(authenticate);
            User user = ((User) authenticate.getPrincipal());
            return Response.<JwtUserBody>builder().body(new JwtUserBody(jwt, mapper.toDto(user))).build();
        } catch (AuthenticationException e) {
            log.error(e.getMessage(), e);
            throw exceptionResolver.resolve(ErrorCodeStorage.AUTH_01, e);
        }
    }
}
