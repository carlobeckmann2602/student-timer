package com.github.philippvogel92.studenttimerbackend.student;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.CommandLineRunner;

import java.util.List;

@Configuration
public class StudentConfig {
    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository) {
        return args -> {
            Student phil = new Student("Philipp", "Vogel", "Master Medieninformatik", "phil.jpg");
            Student alex = new Student("Alex", "Läffler", "Bachelor Medientechnologie", "alex.jpg");
            repository.saveAll(
                    List.of(phil, alex)
            );
        };
    }
}
