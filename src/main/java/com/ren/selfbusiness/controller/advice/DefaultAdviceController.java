package com.ren.selfbusiness.controller.advice;

import com.ren.selfbusiness.dto.ErrorDto;
import com.ren.selfbusiness.dto.response.ErrorBody;
import com.ren.selfbusiness.dto.response.Response;
import com.ren.selfbusiness.dto.response.ValidErrorBody;
import com.ren.selfbusiness.exception.BusinessException;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

import static com.ren.selfbusiness.enumarate.ErrorDtoEnum.VALID_01_DTO;

@RestControllerAdvice
@Log4j2
public class DefaultAdviceController {

    @ExceptionHandler({BusinessException.class})
    public ResponseEntity<?> exceptionHandler(BusinessException e) {
        ErrorDto error = e.getErrorDto();
        String message = StringUtils.isBlank(e.getCustomMessage()) ? error.getMessage() : e.getCustomMessage();
        log.warn("error code: {} error message: {}", error.getCode(), error.getMessage(), e);
        return ResponseEntity.status(error.getHttpStatus())
                .body(Response.builder().error(new ErrorBody(error.getCode(), message)).build());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        List<ValidErrorBody> errors = ex.getBindingResult().getAllErrors().stream().map((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            String code = error.getCode();
            return new ValidErrorBody(code, fieldName, errorMessage);
        }).toList();
        ErrorDto dto = VALID_01_DTO.getErrorDto();
        return ResponseEntity.status(200)
                .body(Response.builder()
                        .error(new ErrorBody(dto.getCode(), dto.getMessage(), errors))
                        .build()
                );
    }
}
