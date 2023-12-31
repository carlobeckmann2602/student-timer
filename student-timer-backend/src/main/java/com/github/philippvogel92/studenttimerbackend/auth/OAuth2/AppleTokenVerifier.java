package com.github.philippvogel92.studenttimerbackend.auth.OAuth2;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.net.URL;
import java.security.interfaces.RSAKey;

import com.auth0.jwk.Jwk;
import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.UrlJwkProvider;

@Component
public class AppleTokenVerifier {
    public AppleTokenVerifier() {
    }

    public DecodedJWT verify(String jwtAppleToken, String userSecret) {

        String kid = JWT.decode(jwtAppleToken).getKeyId();
        System.out.println(kid);

        RSAKey publicKey = getPublicKey(kid);
        Algorithm algorithm = Algorithm.RSA256(publicKey);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer("https://appleid.apple.com")
                .withAudience("host.exp.Exponent")
                .withSubject(userSecret)
                .build();
        try {
            return verifier.verify(jwtAppleToken);
        } catch (JWTVerificationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token is invalid");
        }
    }

    private RSAKey getPublicKey(String kid) {
        RSAKey publicKey = null;
        try {
            URL url = new URL("https://appleid.apple.com/auth/keys");
            JwkProvider provider = new UrlJwkProvider(url);
            Jwk jwk = provider.get(kid);
            publicKey = (RSAKey) jwk.getPublicKey();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return publicKey;
    }
}
