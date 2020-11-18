package com.mua.ghostmail.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mua.ghostmail.security.CustomUserDetails;
import com.mua.ghostmail.model.UserCredentials;
import com.mua.ghostmail.security.JWTService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class LoginFilter extends AbstractAuthenticationProcessingFilter {

    public LoginFilter(String url, AuthenticationManager authManager) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
            throws AuthenticationException, IOException {

        UserCredentials userCredentials = new ObjectMapper()
                .readValue(req.getInputStream(), UserCredentials.class);

        return getAuthenticationManager().authenticate( new UsernamePasswordAuthenticationToken(
                userCredentials.getAddress(), userCredentials.getPassword(), Collections.emptyList()
                ));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res,
                                            FilterChain chain, Authentication auth) {

        CustomUserDetails principal = (CustomUserDetails) auth.getPrincipal();
        System.out.println(((CustomUserDetails) auth.getPrincipal()).getUsername() + " succesfull");
        String username = "";
        String endDate = "";
        String startDate = "";

        if(principal instanceof CustomUserDetails) {
            username = (principal).getUsername();
            endDate = (principal).getEndDateAsString();
            startDate = (principal).getStartDateAsString();
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,observe, address, endDate, expires");

        res.addHeader("Content-Type", "application/json");
        res.addHeader("expires", Long.toString(JWTService.EXPIRATIONTIME));
        res.addHeader("address", username);
        res.addHeader("endDate", endDate);
        res.addHeader("startDate", startDate);
        JWTService.addJWTToken(res, auth.getName());

    }

}
