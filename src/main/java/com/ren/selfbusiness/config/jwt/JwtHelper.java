package com.ren.selfbusiness.config.jwt;

import com.ren.selfbusiness.model.User;
import com.ren.selfbusiness.property.AppProperties;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Date;

@Component
@AllArgsConstructor
public class JwtHelper {
    private final AppProperties properties;

    public String generateJwtToken(Authentication authentication) {

        UserDetails userPrincipal = (User) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + properties.getJwt().getExpirationMs()))
                .signWith(SignatureAlgorithm.HS512, properties.getJwt().getSecret())
                .compact();
    }

    public String getEmailFromJwtToken(String token) {
        return Jwts.parser()
                .setSigningKey(properties.getJwt().getSecret())
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser()
                    .setSigningKey(properties.getJwt().getSecret())
                    .parseClaimsJws(authToken);
            return true;
        } catch (Exception e) {
            System.out.println(e);
        }

        return false;
    }

    public String parseJwt(String token) {
        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            return token.substring(7);
        }

        return null;
    }
}
