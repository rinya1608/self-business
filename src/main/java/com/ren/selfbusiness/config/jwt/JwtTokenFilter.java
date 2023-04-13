package com.ren.selfbusiness.config.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {
    private final JwtHelper jwtHelper;
    private final JwtUserDetailService detailService;

    public JwtTokenFilter(JwtHelper jwtHelper, @Lazy JwtUserDetailService detailService) {
        this.jwtHelper = jwtHelper;
        this.detailService = detailService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = parseRequestJwt(request);
            if (jwt != null && jwtHelper.validateJwtToken(jwt)) {
                String username = jwtHelper.getEmailFromJwtToken(jwt);

                UserDetails userDetails = detailService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            if (!request.getRequestURI().startsWith("/api/auth"))
                System.out.println(e);
        }

        filterChain.doFilter(request, response);
    }

    public String parseRequestJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        return jwtHelper.parseJwt(headerAuth);
    }
}
