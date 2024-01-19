package com.github.philippvogel92.studenttimerbackend.auth.dto;


import jakarta.validation.constraints.*;

public class SignUpRequestDTO {
    @NotBlank(message = "Name cannot be null or empty")
    private String name;
    private String studyCourse;
    private String profilePicture;
    @Email(message = "Email should be valid")
    private String email;
    @NotBlank(message = "Password cannot be null or empty")
    @Size(min = 6, max = 200, message = "Password must be between 6 and 200 characters")
    private String password;
    @NotBlank(message = "Second Password cannot be null or empty")
    @Size(min = 6, max = 200, message = "Second Password must be between 6 and 200 characters")
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
