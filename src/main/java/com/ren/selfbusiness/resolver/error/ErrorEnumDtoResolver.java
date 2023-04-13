package com.ren.selfbusiness.resolver.error;

import com.ren.selfbusiness.dto.ErrorDto;
import com.ren.selfbusiness.enumarate.ErrorDtoEnum;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class ErrorEnumDtoResolver implements ErrorDtoResolver {
    @Override
    public ErrorDto resolve(String errorCode) {
        return Arrays.stream(ErrorDtoEnum.values())
                .map(ErrorDtoEnum::getErrorDto)
                .filter(error -> error.getCode().equalsIgnoreCase(errorCode))
                .findFirst()
                .orElse(ErrorDtoEnum.UNKNOWN_01_DTO.getErrorDto());
    }
}
