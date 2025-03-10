package com.mua.ghostmail.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Instant;
import java.util.Date;
import static java.util.Collections.emptyList;


public class JWTService {

    public static final long EXPIRATIONTIME = 86400000; //24h
    static final String SIGNINGKEY = "signingKey";
    static final String BEARER_PREFIX = "Bearer";

    static public void addJWTToken(HttpServletResponse response, String username) {
        String JwtToken = Jwts.builder().setSubject(username)
                .setExpiration(new Date(Date.from(Instant.now()).getTime() + EXPIRATIONTIME))
                .signWith(SignatureAlgorithm.HS512, SIGNINGKEY)
                .compact();
        response.addHeader("Authorization", BEARER_PREFIX + " " + JwtToken);
        response.addHeader("Access-Control-Expose-Headers", "Authorization, endDate, address, startDate, expires");
    }

    static public Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        System.out.println(token);
        if (token != null) {
            String user = Jwts.parser()
                    .setSigningKey(SIGNINGKEY)
                    .parseClaimsJws(token.replace(BEARER_PREFIX, ""))
                    .getBody()
                    .getSubject();

            if (user != null) {
                return new UsernamePasswordAuthenticationToken(user, null, emptyList());
            } else {
                throw new RuntimeException("Authentication failed");
            }
        }
        return null;
    }
}
