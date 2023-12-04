package com.github.philippvogel92.studenttimerbackend.auth.jwt;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.philippvogel92.studenttimerbackend.auth.jwt.accessToken.AccessTokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    private final AccessTokenService accessTokenService;

    public JwtTokenFilter(AccessTokenService accessTokenService) {
        this.accessTokenService = accessTokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            final String requestTokenHeader = request.getHeader("Authorization");
            String uri = request.getRequestURI();
            String jwtToken = null;

            if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
                jwtToken = requestTokenHeader.substring(7);
            }

            if (jwtToken != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                DecodedJWT jwt = accessTokenService.verifyAccessToken(jwtToken);
                // Create authentification object
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        jwt.getSubject(), jwtToken, new ArrayList<>());
                // Set authentification object in security context
                SecurityContextHolder.getContext().setAuthentication(authentication);

                // ******Check if student is authorized for the specific resource*******

                // Extract studentId from uri
                String[] parts = uri.split("/");
                // Check if studentId matches studentId in JWT to grant access
                if (parts.length > 1) {
                    String studentId = parts[2];
                    if (!studentId.equals(jwt.getSubject())) {
                        throw new ResponseStatusException(UNAUTHORIZED, "StudentId does not match with JWT " +
                                "studentId");
                    }
                }

            }
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
        }
    }
}
