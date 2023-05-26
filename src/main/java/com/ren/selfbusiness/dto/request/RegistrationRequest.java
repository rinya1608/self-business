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
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\\W]).{6,}",
            message = "Пароль должен содержать не менее 6 символов, букву в нижнем и верхнем регистре, цифру и символ")
    private String password;
}
