package com.ren.selfbusiness.dto.response;

import com.ren.selfbusiness.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserBody {
    private String jwtToken;
    private User user;
}
