package com.github.philippvogel92.studenttimerbackend.auth;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.github.philippvogel92.studenttimerbackend.auth.dto.AuthCreateDTO;
import com.github.philippvogel92.studenttimerbackend.auth.dto.AuthResponseDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(path = "/login")
    public AuthResponseDTO login(@Valid @RequestBody AuthCreateDTO authCreateDTO) {
        return authService.login(authCreateDTO);
    }

    @PostMapping(path = "/verifyAccessToken")
    public String verifyAccessToken(@RequestBody String jwt) {
        DecodedJWT decoder = authService.verifyAccessToken(jwt);
        return decoder.getSubject();
    }

    @PostMapping(path = "/verifyRefreshToken")
    public String verifyRefreshToken(@RequestBody String jwt) {
        DecodedJWT decoder = authService.verifyRefreshToken(jwt);
        return decoder.getSubject();
    }
}
