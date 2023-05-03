package com.ren.selfbusiness.config.jwt;

import com.ren.selfbusiness.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@AllArgsConstructor
public class JwtUserDetailService implements UserDetailsService {
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return Optional.of(userService.findByEmail(username))
                .orElseThrow(() -> new UsernameNotFoundException("email " + username +  " not found"));
    }
}
