package com.github.philippvogel92.studenttimerbackend.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginResponseDTO {
    @NotBlank
    private final String accessToken;
    @NotBlank
    private final String refreshToken;
    @NotBlank
    private final Long studentId;
    @NotBlank
    @Email
    private final String email;
    private final String tokenType;


    public LoginResponseDTO(String accessToken, String refreshToken, Long studentId, String email) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.studentId = studentId;
        this.email = email;
        this.tokenType = "Bearer";
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public Long getStudentId() {
        return studentId;
    }

    public String getEmail() {
        return email;
    }

    public String getTokenType() {
        return tokenType;
    }

}
