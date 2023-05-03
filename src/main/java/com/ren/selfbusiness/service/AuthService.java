package com.ren.selfbusiness.service;

import com.ren.selfbusiness.dto.request.AuthRequest;
import com.ren.selfbusiness.dto.request.RegistrationRequest;
import com.ren.selfbusiness.dto.response.MessageBody;
import com.ren.selfbusiness.dto.response.Response;
import com.ren.selfbusiness.dto.response.JwtUserBody;

public interface AuthService {

    public Response<MessageBody> reg(RegistrationRequest req);

    public Response<JwtUserBody> auth(AuthRequest req);
}
