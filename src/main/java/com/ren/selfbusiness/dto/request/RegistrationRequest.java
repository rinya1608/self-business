package com.ren.selfbusiness.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class RegistrationRequest {
    @NotBlank
    @Email(message = "Значение не является email")
    private String email;
    @NotBlank
    private String name;
    @NotBlank
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
            message = "Пароль должен содержать не менее 8 символов, хотя бы один символ и одну цифру")
    private String password;
}
