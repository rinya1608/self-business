package com.ren.selfbusiness.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class Response <T> {
    private T body;
    private ErrorBody error;
}
