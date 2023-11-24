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
                Student student1 = new Student("Philipp", "Master Medieninformatik", "phil.jpg", "phil@test.de", "aionscoain232");
                Student student2 = new Student("Alex", "Bachelor Medientechnologie", "alex.jpg", "alex@test.de", "vsdfvsd4334");

                Module module1 = new Module("Datenbanksysteme 1", "#88A795", 5, LocalDate.of(2024, Month.JUNE, 10), student1 );
                Module module2 = new Module("Mathematik 1", "#66A715", 10, LocalDate.of(2024, Month.JANUARY, 12), student1);
                Module module3 = new Module("Mediengestaltung 1", "#22A715", 3, null, student1);
                Module module4 = new Module("Mediengestaltung 2", "#12A715", 3, LocalDate.of(2024, Month.MARCH, 31), student1);

                student1.setModules(List.of(module1,module2,module3,module4));

                repository.saveAll(
                        List.of(student1, student2)
                );

            };
        }


}
