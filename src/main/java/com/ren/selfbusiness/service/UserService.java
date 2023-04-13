package com.ren.selfbusiness.service;

import com.ren.selfbusiness.config.jwt.JwtHelper;
import com.ren.selfbusiness.constant.ErrorCodeStorage;
import com.ren.selfbusiness.dto.request.RegistrationRequest;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.repository.UserRepository;
import com.ren.selfbusiness.resolver.exception.ExceptionResolver;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtHelper jwtHelper;
    private final ExceptionResolver exceptionResolver;
    private final PasswordEncoder passwordEncoder;

    public boolean userExists(String email) {
        return userRepository.existsById(email);
    }

    public User addUser(RegistrationRequest req) {
        if (userExists(req.getEmail()))
            throw exceptionResolver.resolve(ErrorCodeStorage.REG_01);

        if (StringUtils.isAllBlank(req.getEmail(), req.getName(), req.getPassword()))
            throw exceptionResolver.resolve(ErrorCodeStorage.REG_02);

        User user = new User(req.getEmail(), req.getName(), passwordEncoder.encode(req.getPassword()));
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findById(email).orElse(null);
    }

    public User findByJwt(String jwt) {
        return findByEmail(jwtHelper.getEmailFromJwtToken(jwt));
    }

    public User parseAndFindByJwt(String jwt) {
        return findByJwt(jwtHelper.parseJwt(jwt));
    }
}
