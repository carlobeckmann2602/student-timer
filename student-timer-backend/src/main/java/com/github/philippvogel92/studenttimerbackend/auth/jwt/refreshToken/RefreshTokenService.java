package com.github.philippvogel92.studenttimerbackend.auth.jwt.refreshToken;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.github.philippvogel92.studenttimerbackend.auth.jwt.JwtConfig;
import com.github.philippvogel92.studenttimerbackend.auth.jwt.accessToken.AccessTokenService;
import com.github.philippvogel92.studenttimerbackend.auth.jwt.refreshToken.dto.RefreshTokenResponseDTO;
import com.github.philippvogel92.studenttimerbackend.student.Student;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.UUID;

@Component
public class RefreshTokenService {

    private final JwtConfig jwtConfig;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AccessTokenService accessTokenService;

    public RefreshTokenService(JwtConfig jwtConfig, RefreshTokenRepository refreshTokenRepository,
                               AccessTokenService accessTokenService) {
        this.jwtConfig = jwtConfig;
        this.refreshTokenRepository = refreshTokenRepository;
        this.accessTokenService = accessTokenService;
    }

    @Transactional
    public String createRefreshToken(Student student) {
        Long studentId = student.getId();
        String email = student.getEmail();
        Date expiresAt = new Date(System.currentTimeMillis() + jwtConfig.getRefreshTokenExpiration());

        String token = JWT.create()
                .withIssuer(jwtConfig.getTokenIssuer())
                .withSubject(studentId.toString())
                .withClaim("studentId", studentId)
                .withClaim("email", email)
                .withIssuedAt(new Date())
                .withExpiresAt(expiresAt)
                .withJWTId(UUID.randomUUID()
                        .toString())
                .sign(jwtConfig.getRefreshTokenAlgorithm());

        RefreshToken refreshToken = new RefreshToken(token, expiresAt, student);

        // save/update refresh token in database
        student.setRefreshToken(refreshToken);
        RefreshToken savedRefreshToken = refreshTokenRepository.save(refreshToken);

        return savedRefreshToken.getToken();
    }

    public DecodedJWT verifyRefreshToken(String jwt) {
        JWTVerifier verifier = JWT.require(jwtConfig.getRefreshTokenAlgorithm())
                .withIssuer(jwtConfig.getTokenIssuer())
                .build();
        try {
            return verifier.verify(jwt);
        } catch (JWTVerificationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token is invalid");
        }
    }


    public RefreshTokenResponseDTO createNewAccessToken(String refreshToken) {
        //Check if token is in db
        RefreshToken refreshTokenFromDatabase =
                refreshTokenRepository.findByToken(refreshToken).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh Token not in database"));

        //Verify if token is expired
        DecodedJWT decodedAndVerifiedRefreshToken = verifyRefreshToken(refreshTokenFromDatabase.getToken());

        //Create new access token
        Claim claimStudentId = decodedAndVerifiedRefreshToken.getClaim("studentId");
        Long studentId = claimStudentId.asLong();
        Claim claimEmail = decodedAndVerifiedRefreshToken.getClaim("email");
        String email = claimEmail.asString();
        String accessToken = accessTokenService.createAccessToken(studentId, email);

        return new RefreshTokenResponseDTO(accessToken, refreshToken);

    }
}
