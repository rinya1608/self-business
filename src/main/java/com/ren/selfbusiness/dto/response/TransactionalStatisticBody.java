package com.ren.selfbusiness.dto.response;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionalStatisticBody {
    private String income;
    private String expenses;
    private List<TypeStatisticInfoBody> typeInfo;
    private List<TemplateStatisticInfoBody> templateInfo;
    private List<DateStatisticInfoBody> dateInfo;
}
