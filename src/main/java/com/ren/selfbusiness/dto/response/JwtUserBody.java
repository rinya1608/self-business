package com.ren.selfbusiness.dto.response;

import com.ren.selfbusiness.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public record JwtUserBody(String jwtToken, UserBody user) {}
