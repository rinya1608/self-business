package com.ren.selfbusiness.service;

import com.ren.selfbusiness.dto.request.RegistrationRequest;
import com.ren.selfbusiness.dto.response.JwtUserBody;
import com.ren.selfbusiness.dto.response.Response;
import com.ren.selfbusiness.model.User;


public interface UserService {

    Response<JwtUserBody> getCurrentUser(String jwt);

    void addUser(RegistrationRequest req);

    User findByEmail(String email);

    User parseAndFindByJwt(String jwt);
}
