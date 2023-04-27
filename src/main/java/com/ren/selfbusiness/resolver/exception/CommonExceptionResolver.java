package com.ren.selfbusiness.resolver.exception;

import com.ren.selfbusiness.exception.BusinessException;
import com.ren.selfbusiness.resolver.error.ErrorDtoResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class CommonExceptionResolver implements ExceptionResolver {

    private final ErrorDtoResolver errorResolver;

    @Override
    public RuntimeException resolve(String errorCode) {
        return new BusinessException(errorResolver.resolve(errorCode));
    }

    @Override
    public RuntimeException resolve(String errorCode, Throwable e) {
        return new BusinessException(errorResolver.resolve(errorCode), e);
    }
}
