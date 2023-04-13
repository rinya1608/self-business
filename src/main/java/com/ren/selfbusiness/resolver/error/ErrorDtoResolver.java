package com.ren.selfbusiness.resolver.error;

import com.ren.selfbusiness.dto.ErrorDto;

public interface ErrorDtoResolver {
    ErrorDto resolve(String errorCode);
}
