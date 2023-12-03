package com.github.philippvogel92.studenttimerbackend;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@OpenAPIDefinition(info =
@Info(title = "Student Timer API", version = "1.0", description = "Student Timer API with Spring Boot"))
public class StudentTimerBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentTimerBackendApplication.class, args);
    }

}
