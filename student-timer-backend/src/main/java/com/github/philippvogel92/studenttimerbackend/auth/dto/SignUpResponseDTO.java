package com.github.philippvogel92.studenttimerbackend.auth.dto;

import com.github.philippvogel92.studenttimerbackend.student.Student;

public class SignUpResponseDTO {
    private Long studentId;
    private String name;
    private String email;
    private String studyCourse;
    private String profilPicture;
    private String accessToken;
    private String refreshToken;

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

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStudyCourse() {
        return studyCourse;
    }

    public void setStudyCourse(String studyCourse) {
        this.studyCourse = studyCourse;
    }

    public String getProfilPicture() {
        return profilPicture;
    }

    public void setProfilPicture(String profilPicture) {
        this.profilPicture = profilPicture;
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
