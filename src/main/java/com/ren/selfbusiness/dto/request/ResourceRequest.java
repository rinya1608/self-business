package com.ren.selfbusiness.dto.request;

import java.math.BigDecimal;

public record ResourceRequest(Integer count, BigDecimal unitPrice, Long typeId) {}
