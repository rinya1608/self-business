package com.ren.selfbusiness.dto.response;

public record ResourceBody(Long id, Integer count, String unitPrice, ResourceTypeBody type) {
}