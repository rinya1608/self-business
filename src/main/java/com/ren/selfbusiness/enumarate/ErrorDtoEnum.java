package com.ren.selfbusiness.enumarate;

import com.ren.selfbusiness.constant.ErrorCodeStorage;
import com.ren.selfbusiness.dto.ErrorDto;
import lombok.Getter;


@Getter
public enum ErrorDtoEnum {
    AUTH_01_DTO(new ErrorDto(ErrorCodeStorage.AUTH_01, "Неверный email или пароль")),
    UNKNOWN_01_DTO(new ErrorDto(ErrorCodeStorage.UNKNOWN_01, "Неизвестная ошибка")),
    REG_01_DTO(new ErrorDto(ErrorCodeStorage.REG_01, "Пользователь с таким email уже существует")),
    REG_02_DTO(new ErrorDto(ErrorCodeStorage.REG_02, "Некорректные данные"));

    private final ErrorDto errorDto;

    ErrorDtoEnum(ErrorDto errorDto) {
        this.errorDto = errorDto;
    }
}
