package com.ren.selfbusiness.dto.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ErrorBody {
    private String code;
    private String message;
    private List<ValidErrorBody> validErrors;

    public ErrorBody(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
