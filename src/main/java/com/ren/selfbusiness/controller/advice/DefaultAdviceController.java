package com.ren.selfbusiness.controller.advice;

import com.ren.selfbusiness.dto.response.ErrorBody;
import com.ren.selfbusiness.dto.response.Response;
import com.ren.selfbusiness.exception.BusinessException;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Log4j2
public class DefaultAdviceController {

    @ExceptionHandler({BusinessException.class})
    public ResponseEntity<?> exceptionHandler(BusinessException e) {
        log.warn("error code: {} error message: {}", e.getCode(), e.getMessage());
        return ResponseEntity.status(HttpStatus.OK).body(Response.builder().error(new ErrorBody(e.getCode(), e.getMessage())).build());
    }
}
