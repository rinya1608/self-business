package com.ren.selfbusiness.dto.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionFilterRequest {
    private boolean getIncome;
    private boolean getSales;
    private String dateFrom;
    private String dateTo;
}
