package com.github.philippvogel92.studenttimerbackend.student;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class StudentConfig {

/*    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository) {
        return args -> {
            Student phil = new Student("Philipp", LocalDate.of(1992, Month.JUNE, 10), "philipp@web.de");
            Student alex = new Student("Alex", LocalDate.of(1995, Month.JANUARY, 12), "alex@web.de");
            repository.saveAll(
                    List.of(phil, alex)
            );
        };
    }*/
}
