package com.github.philippvogel92.studenttimerbackend.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.github.philippvogel92.studenttimerbackend.auth.dto.AuthCreateDTO;
import com.github.philippvogel92.studenttimerbackend.auth.dto.AuthResponseDTO;
import com.github.philippvogel92.studenttimerbackend.student.Student;
import com.github.philippvogel92.studenttimerbackend.student.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.Objects;
import java.util.UUID;

@Component
public class AuthService {

    private final StudentRepository studentRepository;
    private final AuthRepository authRepository;
    private final JwtConfig jwtConfig;

    @Autowired
    public AuthService(StudentRepository studentRepository, AuthRepository authRepository, JwtConfig jwtConfig) {
        this.studentRepository = studentRepository;
        this.authRepository = authRepository;
        this.jwtConfig = jwtConfig;
    }

    public AuthResponseDTO login(AuthCreateDTO authCreateDTO) {
        String email = authCreateDTO.getEmail();
        String password = authCreateDTO.getPassword();

        Student student =
                studentRepository.findStudentByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Credentials are wrong"));

        if (!Objects.equals(password, student.getPassword())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Credentials are wrong");
        }

        String accessToken = createAccessToken(student.getId(), email);
        String refreshToken = createRefreshToken(student);

        return new AuthResponseDTO(accessToken, refreshToken);
    }

    private String createAccessToken(Long userId, String email) {
        return JWT.create()
                .withIssuer(jwtConfig.getAccessTokenIssuer())
                .withSubject(userId.toString())
                .withClaim("userId", userId)
                .withClaim("email", email)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtConfig.getAccessTokenExpiration()))
                .withJWTId(UUID.randomUUID()
                        .toString())
                .sign(jwtConfig.getAccessTokenAlgorithm());
    }

    private String createRefreshToken(Student student) {
        Long studentId = student.getId();
        String email = student.getEmail();
        Date expiresAt = new Date(System.currentTimeMillis() + jwtConfig.getRefreshTokenExpiration());

        String refreshToken = JWT.create()
                .withIssuer(jwtConfig.getRefreshTokenIssuer())
                .withSubject(studentId.toString())
                .withClaim("studentId", studentId)
                .withClaim("email", email)
                .withIssuedAt(new Date())
                .withExpiresAt(expiresAt)
                .withJWTId(UUID.randomUUID()
                        .toString())
                .sign(jwtConfig.getRefreshTokenAlgorithm());

        Auth auth = new Auth(refreshToken, expiresAt, student);

        return authRepository.save(auth).getRefreshToken();
    }

    public DecodedJWT verifyRefreshToken(String jwt) {
        JWTVerifier verifier = JWT.require(jwtConfig.getRefreshTokenAlgorithm())
                .withIssuer(jwtConfig.getRefreshTokenIssuer())
                .build();
        try {
            return verifier.verify(jwt);
        } catch (JWTVerificationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not Authorized");
        }
    }

    public DecodedJWT verifyAccessToken(String jwt) {
        JWTVerifier verifier = JWT.require(jwtConfig.getAccessTokenAlgorithm())
                .withIssuer(jwtConfig.getAccessTokenIssuer())
                .build();
        try {
            return verifier.verify(jwt);
        } catch (JWTVerificationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not Authorized");
        }
    }
}
