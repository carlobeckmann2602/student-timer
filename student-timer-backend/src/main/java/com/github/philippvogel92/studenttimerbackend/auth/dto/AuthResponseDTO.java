package com.github.philippvogel92.studenttimerbackend.auth.dto;

import jakarta.validation.constraints.NotBlank;

public class AuthResponseDTO {
    @NotBlank
    private String accessToken;
    @NotBlank
    private String refreshToken;

    public AuthResponseDTO(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
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
}
