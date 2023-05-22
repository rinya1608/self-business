package com.ren.selfbusiness.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class TypeStatisticInfoBody {
    String typeName;
    String sum;
    Integer count;
}
