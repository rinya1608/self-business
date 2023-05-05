package com.ren.selfbusiness.dto.response;

import java.math.BigDecimal;

public record ResourceBody(Long id, Integer count, BigDecimal unitPrice, ResourceTypeBody type) {}