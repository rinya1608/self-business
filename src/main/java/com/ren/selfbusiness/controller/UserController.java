package com.ren.selfbusiness.controller;

import com.ren.selfbusiness.dto.response.JwtUserBody;
import com.ren.selfbusiness.dto.response.Response;
import com.ren.selfbusiness.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@Log4j2
@RequestMapping("api/users")
public class UserController {
    private final UserService userService;

    @PostMapping("/current")
    public Response<JwtUserBody> getCurrentUser(@RequestHeader("Authorization") String token) {
        Response<JwtUserBody> currentUser = userService.getCurrentUser(token);
        log.debug("get current user " + currentUser.getBody().user().email());
        return currentUser;
    }
}
