package com.github.philippvogel92.studenttimerbackend.auth;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtConfig {
    private final Algorithm accessTokenAlgorithm;
    private final String accessTokenIssuer;
    private final Long accessTokenExpiration;

    private final Algorithm refreshTokenAlgorithm;
    private final String refreshTokenIssuer;
    private final Long refreshTokenExpiration;

    public JwtConfig() {
        this.accessTokenAlgorithm = Algorithm.HMAC256("Akd(dj3!kdcNml/ws)!");
        this.accessTokenIssuer = "StudentTimer";
        this.accessTokenExpiration = 60000L * 60L * 24L; // 24 Hours
        this.refreshTokenAlgorithm = Algorithm.HMAC256("Ldoge(skM(2!asScaeF?");
        this.refreshTokenIssuer = "StudentTimer";
        this.refreshTokenExpiration = 60000L * 60L * 24L * 30L; // 30 Days
    }

    public Algorithm getAccessTokenAlgorithm() {
        return accessTokenAlgorithm;
    }

    public String getAccessTokenIssuer() {
        return accessTokenIssuer;
    }

    public Long getAccessTokenExpiration() {
        return accessTokenExpiration;
    }

    public Algorithm getRefreshTokenAlgorithm() {
        return refreshTokenAlgorithm;
    }

    public String getRefreshTokenIssuer() {
        return refreshTokenIssuer;
    }

    public Long getRefreshTokenExpiration() {
        return refreshTokenExpiration;
    }
}
