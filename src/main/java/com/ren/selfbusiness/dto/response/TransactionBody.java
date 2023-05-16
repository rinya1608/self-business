package com.ren.selfbusiness.dto.response;

public record TransactionBody(Long id, String date, String sum, ResourceBody resource, TemplateBody template) {
}
