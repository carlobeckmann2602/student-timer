package com.github.philippvogel92.studenttimerbackend.user;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.CommandLineRunner;

import java.util.List;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository) {
        return args -> {
            User phil = new User("Philipp", "Vogel", "Master Medieninformatik", "phil.jpg");
            User alex = new User("Alex", "Läffler", "Bachelor Medientechnologie", "alex.jpg");
            repository.saveAll(
                    List.of(phil, alex)
            );
        };
    }
}
