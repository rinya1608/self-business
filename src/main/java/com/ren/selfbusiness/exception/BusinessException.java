package com.ren.selfbusiness.exception;

import com.ren.selfbusiness.dto.ErrorDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
@Setter
public class BusinessException extends RuntimeException {
    private String code;
    private String message;

    private HttpStatus status = HttpStatus.OK;

    public BusinessException(ErrorDto errorDto) {
        this.code = errorDto.getCode();
        this.message = errorDto.getMessage();
        Integer httpCode = errorDto.getHttpCode();
        if (httpCode != 200) {
            this.status = HttpStatus.resolve(httpCode);
        }
    }
}
