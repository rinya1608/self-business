package com.ren.selfbusiness.service.impl;

import com.ren.selfbusiness.config.jwt.JwtHelper;
import com.ren.selfbusiness.constant.ErrorCodeStorage;
import com.ren.selfbusiness.dto.request.RegistrationRequest;
import com.ren.selfbusiness.dto.response.JwtUserBody;
import com.ren.selfbusiness.dto.response.Response;
import com.ren.selfbusiness.dto.response.UserBody;
import com.ren.selfbusiness.mapper.EntityMapper;
import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.repository.UserRepository;
import com.ren.selfbusiness.resolver.exception.ExceptionResolver;
import com.ren.selfbusiness.service.UserService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JwtHelper jwtHelper;
    private final ExceptionResolver exceptionResolver;
    private final EntityMapper<UserBody, User, RegistrationRequest> mapper;

    @Override
    public Response<JwtUserBody> getCurrentUser(String jwt) {
        User user = parseAndFindByJwt(jwt);
        String newJwt = jwtHelper.generateJwtToken(user);

        return Response.<JwtUserBody>builder().body(new JwtUserBody(newJwt, mapper.toDto(user))).build();
    }

    @Override
    public void addUser(RegistrationRequest req) {
        if (userExists(req.getEmail()))
            throw exceptionResolver.resolve(ErrorCodeStorage.REG_01);

        if (StringUtils.isAllBlank(req.getEmail(), req.getName(), req.getPassword()))
            throw exceptionResolver.resolve(ErrorCodeStorage.REG_02);

        User user = mapper.toEntity(req);
        userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findById(email).orElse(null);
    }

    @Override
    public User parseAndFindByJwt(String jwt) {
        return findByJwt(jwtHelper.parseJwt(jwt));
    }

    private boolean userExists(String email) {
        return userRepository.existsById(email);
    }

    private User findByJwt(String jwt) {
        return findByEmail(jwtHelper.getEmailFromJwtToken(jwt));
    }
}
