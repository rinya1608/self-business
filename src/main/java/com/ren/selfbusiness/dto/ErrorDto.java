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
}
