package com.ren.selfbusiness.controller.advice;

import com.ren.selfbusiness.dto.response.ErrorResponse;
import com.ren.selfbusiness.exception.BusinessException;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Log4j2
public class DefaultAdviceController {

    @ExceptionHandler({BusinessException.class})
    public ResponseEntity<?> exceptionHandler(BusinessException e) {
        log.warn("error code: {} error message: {}", e.getCode(), e.getMessage());
        return ResponseEntity.status(e.getStatus().value()).body(new ErrorResponse(e.getCode(), e.getMessage()));
    }
}
