package com.github.philippvogel92.studenttimerbackend.student.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class StudentUpdateDTO {
    @NotBlank(message = "Name cannot be null or empty")
    private String name;
    private String studyCourse;
    private String profilePicture;
    @Email(message = "Email should be valid")
    private String email;
    private String password;
    private String password2;

    public String getName() {
        return name;
    }

    public String getStudyCourse() {
        return studyCourse;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getPassword2() {
        return password2;
    }

}
