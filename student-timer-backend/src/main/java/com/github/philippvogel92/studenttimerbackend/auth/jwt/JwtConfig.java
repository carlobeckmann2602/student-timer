package com.github.philippvogel92.studenttimerbackend.auth.jwt;

import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtConfig {
    private final Algorithm accessTokenAlgorithm;
    private final String tokenIssuer;
    private final Long accessTokenExpiration;

    private final Algorithm refreshTokenAlgorithm;
    private final Long refreshTokenExpiration;


    public JwtConfig(@Value("${accessTokenSecret}") String accessTokenSecret,
                     @Value("${refreshTokenSecret}") String refreshTokenSecret,
                     @Value("${tokenIssuer}") String tokenIssuer,
                     @Value("${accessTokenExpiration}") Long accessTokenExpiration,
                     @Value("${refreshTokenExpiration}") Long refreshTokenExpiration) {
        this.tokenIssuer = tokenIssuer;
        if (accessTokenSecret == null || accessTokenSecret.isEmpty()) {
            throw new IllegalArgumentException("accessTokenSecret cannot be null or empty");
        }
        if (refreshTokenSecret == null || refreshTokenSecret.isEmpty()) {
            throw new IllegalArgumentException("refreshTokenSecret cannot be null or empty");
        }
        this.accessTokenAlgorithm = Algorithm.HMAC256(accessTokenSecret);
        this.refreshTokenAlgorithm = Algorithm.HMAC256(refreshTokenSecret);
        this.accessTokenExpiration = accessTokenExpiration;
        this.refreshTokenExpiration = refreshTokenExpiration;
    }

    public Algorithm getAccessTokenAlgorithm() {
        return accessTokenAlgorithm;
    }

    public String getTokenIssuer() {
        return tokenIssuer;
    }

    public Long getAccessTokenExpiration() {
        return accessTokenExpiration;
    }

    public Algorithm getRefreshTokenAlgorithm() {
        return refreshTokenAlgorithm;
    }

    public Long getRefreshTokenExpiration() {
        return refreshTokenExpiration;
    }
}
