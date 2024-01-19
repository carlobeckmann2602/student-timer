package com.github.philippvogel92.studenttimerbackend.auth.dto;

public class SignUpResponseDTO {
    private final Long studentId;
    private final String name;
    private final String email;
    private final String studyCourse;
    private final String profilPicture;
    private final String accessToken;
    private final String refreshToken;

    public SignUpResponseDTO(Long studentId, String name, String email, String studyCourse, String profilPicture,
                             String accessToken, String refreshToken) {
        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.studyCourse = studyCourse;
        this.profilPicture = profilPicture;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public Long getStudentId() {
        return studentId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getStudyCourse() {
        return studyCourse;
    }

    public String getProfilPicture() {
        return profilPicture;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

}
