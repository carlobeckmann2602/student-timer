package com.github.philippvogel92.studenttimerbackend.auth.dto;

import com.github.philippvogel92.studenttimerbackend.auth.OAuth2.Provider;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class LoginOAuth2RequestDTO {
    @Email(message = "Email is not valid")
    private String email;
    private String userSecret;
    private String name;
    @NotBlank(message = "Password cannot be empty or null")
    @Size(min = 6, max = 2000, message = "TokenId must be between 6 and 2000 characters")
    private String tokenId;
    @NotNull(message = "Provider cannot be empty or null")
    private Provider provider;

    public String getEmail() {
        return email;
    }

    public String getTokenId() {
        return tokenId;
    }

    public Provider getProvider() {
        return provider;
    }

    public String getUserSecret() {
        return userSecret;
    }

    public String getName() {
        return name;
    }

}
