package com.ren.selfbusiness.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TemplateStatisticInfoBody {
    private String templateName;
    private String sum;
    private Integer count;
}
