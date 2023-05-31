package com.ren.selfbusiness.exception;

import com.ren.selfbusiness.dto.ErrorDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class BusinessException extends RuntimeException {
    private ErrorDto errorDto;
    private String customMessage;
    public BusinessException(ErrorDto errorDto, Throwable e) {
        super(e);
        this.errorDto = errorDto;
    }

    public BusinessException(ErrorDto errorDto) {
        this.errorDto = errorDto;
    }

    public BusinessException(ErrorDto errorDto, String customMessage, Throwable e) {
        super(e);
        this.errorDto = errorDto;
        this.customMessage = customMessage;
    }
}
