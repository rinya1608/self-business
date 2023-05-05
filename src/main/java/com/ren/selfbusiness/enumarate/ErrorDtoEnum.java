package com.ren.selfbusiness.enumarate;

import com.ren.selfbusiness.constant.ErrorCodeStorage;
import com.ren.selfbusiness.dto.ErrorDto;
import lombok.Getter;


@Getter
public enum ErrorDtoEnum {
    AUTH_01_DTO(new ErrorDto(ErrorCodeStorage.AUTH_01, "Неверный email или пароль", 200)),
    UNKNOWN_01_DTO(new ErrorDto(ErrorCodeStorage.UNKNOWN_01, "Неизвестная ошибка", 500)),
    REG_01_DTO(new ErrorDto(ErrorCodeStorage.REG_01, "Пользователь с таким email уже существует", 200)),
    REG_02_DTO(new ErrorDto(ErrorCodeStorage.REG_02, "Некорректные данные", 200)),
    RT_01_DTO(new ErrorDto(ErrorCodeStorage.RT_01, "Такой тип не найден", 200)),
    R_01_DTO(new ErrorDto(ErrorCodeStorage.R_01, "Такой ресурс не найден", 200));

    private final ErrorDto errorDto;

    ErrorDtoEnum(ErrorDto errorDto) {
        this.errorDto = errorDto;
    }
}
