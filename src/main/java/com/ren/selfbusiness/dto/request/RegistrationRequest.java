package com.ren.selfbusiness.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class RegistrationRequest {
    @NotBlank
    private String email;
    @NotBlank
    private String name;
    @NotBlank
    private String password;
}
