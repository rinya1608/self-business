package com.ren.selfbusiness.dto.request;

import java.util.List;

public record OrderRequest(String date, List<OrderTemplateRequest> templates, ClientInfoRequest clientInfo) {

}
