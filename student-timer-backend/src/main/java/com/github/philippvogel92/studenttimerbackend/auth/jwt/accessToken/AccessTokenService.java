package com.github.philippvogel92.studenttimerbackend.auth.jwt.accessToken;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.github.philippvogel92.studenttimerbackend.auth.jwt.JwtConfig;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.UUID;

@Component
public class AccessTokenService {
    private final JwtConfig jwtConfig;

    public AccessTokenService(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    public String createAccessToken(Long studentId, String email) {
        return JWT.create()
                .withIssuer(jwtConfig.getTokenIssuer())
                .withSubject(studentId.toString())
                .withClaim("studentId", studentId)
                .withClaim("email", email)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtConfig.getAccessTokenExpiration()))
                .withJWTId(UUID.randomUUID()
                        .toString())
                .sign(jwtConfig.getAccessTokenAlgorithm());
    }


    public DecodedJWT verifyAccessToken(String jwt) {
        JWTVerifier verifier = JWT.require(jwtConfig.getAccessTokenAlgorithm())
                .withIssuer(jwtConfig.getTokenIssuer())
                .build();
        try {
            return verifier.verify(jwt);
        } catch (JWTVerificationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token is invalid");
        }
    }
}
