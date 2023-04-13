package com.ren.selfbusiness.controller.advice;

import com.ren.selfbusiness.dto.response.ErrorResponse;
import com.ren.selfbusiness.exception.BusinessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class DefaultAdviceController {

    @ExceptionHandler({BusinessException.class})
    public ResponseEntity<?> exceptionHandler(BusinessException e) {
        return ResponseEntity.status(e.getStatus().value()).body(new ErrorResponse(e.getCode(), e.getMessage()));
    }
}
