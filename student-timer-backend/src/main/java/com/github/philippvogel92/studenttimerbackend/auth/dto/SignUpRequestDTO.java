package com.github.philippvogel92.studenttimerbackend.auth.dto;


import jakarta.validation.constraints.*;

public class SignUpRequestDTO {
    @NotBlank(message = "Name cannot be null or empty")
    private String name;
    @NotBlank(message = "StudyCourse cannot be null or empty")
    private String studyCourse;
    @NotBlank(message = "ProfilePicture cannot be null or empty")
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

    public void setName(String name) {
        this.name = name;
    }

    public String getStudyCourse() {
        return studyCourse;
    }

    public void setStudyCourse(String studyCourse) {
        this.studyCourse = studyCourse;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword2() {
        return password2;
    }

    public void setPassword2(String password2) {
        this.password2 = password2;
    }
}
