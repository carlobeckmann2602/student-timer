package com.github.philippvogel92.studenttimerbackend.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginResponseDTO {
    @NotBlank
    private String accessToken;
    @NotBlank
    private String refreshToken;
    @NotBlank
    private Long studentId;
    @NotBlank
    @Email
    private String email;
    private String tokenType;


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

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}
