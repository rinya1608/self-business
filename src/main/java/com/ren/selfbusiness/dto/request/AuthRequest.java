package com.ren.selfbusiness.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class AuthRequest {
    private String email;
    private String password;
}
