package com.github.philippvogel92.studenttimerbackend.auth;

import com.github.philippvogel92.studenttimerbackend.auth.jwt.JwtTokenFilter;
import com.github.philippvogel92.studenttimerbackend.auth.jwt.accessToken.AccessTokenService;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import jakarta.servlet.DispatcherType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
@Configuration
@EnableWebSecurity
public class AuthConfiguration {

    @Autowired
    private AccessTokenService accessTokenService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(CsrfConfigurer::disable)
                .cors(CorsConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .dispatcherTypeMatchers(DispatcherType.ERROR).permitAll()
                        .requestMatchers("/documentation/**", "/documentation/docs", "/v3/api-docs", "/swagger" +
                                "-resources/**", "/swagger" +
                                "-ui/**", "/webjars/**", "/auth/**", "api/auth/**")
                        .permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(new JwtTokenFilter(accessTokenService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}