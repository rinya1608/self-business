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
    public BusinessException(ErrorDto errorDto, Throwable e) {
        super(e);
        this.errorDto = errorDto;
    }
}
