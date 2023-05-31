package com.ren.selfbusiness.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DateStatisticInfoBody {
    private String date;
    private String sum;
}
