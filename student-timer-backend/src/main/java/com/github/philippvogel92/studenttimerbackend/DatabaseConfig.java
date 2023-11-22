package com.github.philippvogel92.studenttimerbackend;

import com.github.philippvogel92.studenttimerbackend.module.Module;
import com.github.philippvogel92.studenttimerbackend.module.ModuleRepository;
import com.github.philippvogel92.studenttimerbackend.student.Student;
import com.github.philippvogel92.studenttimerbackend.student.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;


@Configuration
public class DatabaseConfig {

        @Bean
        CommandLineRunner commandLineRunner(StudentRepository repository) {
            return args -> {
                Student phil = new Student("Philipp", "Master Medieninformatik", "phil.jpg");
                Student alex = new Student("Alex", "Bachelor Medientechnologie", "alex.jpg");

                Module datenbanksysteme = new Module("Datenbanksysteme 1", "#88A795", 5, LocalDate.of(2024, Month.JUNE, 10), phil );
                Module mathe = new Module("Mathematik 1", "#66A715", 10, LocalDate.of(2024, Month.JANUARY, 12), phil);
                Module mediengestaltung = new Module("Mediengestaltung 1", "#22A715", 3, null, phil);
                Module mediengestaltung2 = new Module("Mediengestaltung 2", "#12A715", 3, LocalDate.of(2024, Month.MARCH, 31), phil);

                phil.setModules(List.of(datenbanksysteme,mathe,mediengestaltung,mediengestaltung2));

                repository.saveAll(
                        List.of(phil, alex)
                );

            };
        }


}
