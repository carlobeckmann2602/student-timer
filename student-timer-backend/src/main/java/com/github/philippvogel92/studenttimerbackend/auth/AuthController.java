package com.github.philippvogel92.studenttimerbackend.auth;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.github.philippvogel92.studenttimerbackend.auth.dto.LoginRequestDTO;
import com.github.philippvogel92.studenttimerbackend.auth.dto.LoginResponseDTO;
import com.github.philippvogel92.studenttimerbackend.auth.dto.SignUpRequestDTO;
import com.github.philippvogel92.studenttimerbackend.auth.dto.SignUpResponseDTO;
import com.github.philippvogel92.studenttimerbackend.auth.jwt.accessToken.AccessTokenService;
import com.github.philippvogel92.studenttimerbackend.auth.jwt.refreshToken.RefreshTokenService;
import com.github.philippvogel92.studenttimerbackend.auth.jwt.refreshToken.dto.RefreshTokenResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
    private final RefreshTokenService refreshTokenService;
    private final AccessTokenService accessTokenService;

    @Autowired
    public AuthController(AuthService authService, RefreshTokenService refreshTokenService,
                          AccessTokenService accessTokenService) {
        this.authService = authService;
        this.refreshTokenService = refreshTokenService;
        this.accessTokenService = accessTokenService;
    }

    @Operation(summary = "Login for student")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Access and refresh token are created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = LoginResponseDTO.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid request body supplied",
                    content = @Content),
            @ApiResponse(responseCode = "401", description = "Credentials are wrong",
                    content = @Content)
    })
    @PostMapping(path = "/login")
    public LoginResponseDTO login(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        return authService.login(loginRequestDTO);
    }

    @Operation(summary = "Create new access token with refresh token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "New access token created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = RefreshTokenResponseDTO.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid request body supplied",
                    content = @Content),
            @ApiResponse(responseCode = "403", description = "Refresh token not in database or invalid",
                    content = @Content)
    })
    @PostMapping(path = "/refreshToken")
    public RefreshTokenResponseDTO createNewAccessToken(@RequestBody String refreshToken) {
        return refreshTokenService.createNewAccessToken(refreshToken);
    }

    @Operation(summary = "ONLY FOR TESTING - Validate access token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token is valid",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(type = "studentId"))}),
            @ApiResponse(responseCode = "401", description = "Token is invalid",
                    content = @Content),
    })
    @PostMapping(path = "/verifyAccessToken")
    public String verifyAccessToken(@RequestBody String jwt) {
        DecodedJWT decoder = accessTokenService.verifyAccessToken(jwt);
        return decoder.getSubject();
    }

    @Operation(summary = "ONLY FOR TESTING - Validate refresh token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token is valid",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(name = "studentId", type = "string"))}),
            @ApiResponse(responseCode = "401", description = "Token is invalid or wrong request body",
                    content = @Content),
    })
    @PostMapping(path = "/verifyRefreshToken")
    public String verifyRefreshToken(@RequestBody String jwt) {
        DecodedJWT decoder = refreshTokenService.verifyRefreshToken(jwt);
        return decoder.getSubject();
    }

    @Operation(summary = "Sign up a new student and create it in database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Student created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = SignUpResponseDTO.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid request body supplied",
                    content = @Content),
    })
    @PostMapping(path = "/signUp")
    public SignUpResponseDTO addStudent(@Valid @RequestBody SignUpRequestDTO signUpRequestDTO) {
        return authService.signUp(signUpRequestDTO);
    }
}
