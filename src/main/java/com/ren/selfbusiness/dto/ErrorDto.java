package com.ren.selfbusiness.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ErrorDto {
    private String code;
    private String message;
    private Integer httpCode = 200;

    public ErrorDto(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
