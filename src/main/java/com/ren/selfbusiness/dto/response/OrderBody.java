package com.ren.selfbusiness.dto.response;

import java.util.List;

public record OrderBody(Long id, String date, String status, List<OrderTemplateBody> templates, ClientInfoBody clientInfo, String cost) {
}
