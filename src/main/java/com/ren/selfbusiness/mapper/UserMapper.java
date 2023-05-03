package com.ren.selfbusiness.mapper;

import com.ren.selfbusiness.dto.request.RegistrationRequest;
import com.ren.selfbusiness.dto.response.UserBody;
import com.ren.selfbusiness.model.User;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserMapper implements EntityMapper<UserBody, User, RegistrationRequest> {
    private final PasswordEncoder passwordEncoder;
    @Override
    public UserBody toDto(User user) {
        return new UserBody(user.getEmail(), user.getName());
    }

    @Override
    public User toEntity(RegistrationRequest req) {
        return new User(req.getEmail(), req.getName(), passwordEncoder.encode(req.getPassword()));
    }
}
