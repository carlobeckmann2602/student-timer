package com.github.philippvogel92.studenttimerbackend.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginRequestDTO {
    @Email(message = "Email is not valid")
    private String email;
    @NotBlank(message = "Password cannot be empty or null")
    @Size(min = 6, max = 200, message = "Password must be between 6 and 200 characters")
    private String password;

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

}
