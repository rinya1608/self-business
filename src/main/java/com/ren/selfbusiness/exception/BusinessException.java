package com.ren.selfbusiness.exception;

import com.ren.selfbusiness.dto.ErrorDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class BusinessException extends RuntimeException {
    private String code;
    private String message;

    public BusinessException(ErrorDto errorDto) {
        this.code = errorDto.getCode();
        this.message = errorDto.getMessage();
    }
    public BusinessException(ErrorDto errorDto, Throwable e) {
        super(e);
        this.code = errorDto.getCode();
        this.message = errorDto.getMessage();
    }
}
