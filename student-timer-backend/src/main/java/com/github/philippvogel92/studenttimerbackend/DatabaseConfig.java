
package com.github.philippvogel92.studenttimerbackend;

import com.github.philippvogel92.studenttimerbackend.learningSession.LearningSession;
import com.github.philippvogel92.studenttimerbackend.learningUnit.LearningUnit;
import com.github.philippvogel92.studenttimerbackend.module.Module;
import com.github.philippvogel92.studenttimerbackend.student.Student;
import com.github.philippvogel92.studenttimerbackend.student.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;


@Configuration
public class DatabaseConfig {
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DatabaseConfig(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository) {
        return args -> {
            Student student1 = new Student("Philipp", "Master Medieninformatik", "phil.jpg", "phil@test.de",
                    passwordEncoder.encode("string"));
            Student student2 = new Student("Alex", "Bachelor Medientechnologie", "alex.jpg", "alex@test.de",
                    passwordEncoder.encode("string"));

            Module module1 = new Module("Datenbanksysteme 1", "#88A795", 15, LocalDate.of(2023, Month.JUNE, 10),
                    student1);
            Module module2 = new Module("Mathematik 1", "#66A715", 5, LocalDate.of(2024, Month.APRIL, 12), student1);
            Module module3 = new Module("Mediengestaltung 1", "#22A715", 9, null, student1);
            Module module4 = new Module("Mediengestaltung 2", "#12A715", 20, LocalDate.of(2024, Month.MARCH, 31),
                    student1);

            LearningUnit learningUnit1 = new LearningUnit("Vorlesung", LocalDate.of(2023, Month.APRIL, 10),
                    LocalDate.of(2023, Month.SEPTEMBER, 2), 240.0, module1);
            LearningUnit learningUnit2 = new LearningUnit("Praktikum", LocalDate.of(2023, Month.MAY, 2),
                    LocalDate.of(2023, Month.AUGUST, 1), 120.0, module1);
            LearningUnit learningUnit3 = new LearningUnit("Nachhilfe", LocalDate.of(2023, Month.FEBRUARY, 6),
                    LocalDate.of(2023, Month.SEPTEMBER, 22), 98.7, module1);
            LearningUnit learningUnit4 = new LearningUnit("Selbststudium", LocalDate.of(2023, Month.MARCH, 3),
                    LocalDate.of(2023, Month.SEPTEMBER, 4), 20.0, module1);

            LearningUnit learningUnit5 = new LearningUnit("Vorlesung", LocalDate.of(2023, Month.APRIL, 1),
                    LocalDate.of(2023, Month.SEPTEMBER, 20), 45.0, module2);
            LearningUnit learningUnit6 = new LearningUnit("Nachhilfe", LocalDate.of(2023, Month.MARCH, 12),
                    LocalDate.of(2023, Month.JULY, 22), 180.0, module2);
            LearningUnit learningUnit7 = new LearningUnit("Selbststudium", LocalDate.of(2023, Month.MARCH, 3),
                    LocalDate.of(2023, Month.NOVEMBER, 4), 72.8, module2);

            LearningUnit learningUnit8 = new LearningUnit("Projekttreffen", LocalDate.of(2023, Month.APRIL, 10),
                    LocalDate.of(2023, Month.SEPTEMBER, 2), .0, module3);
            LearningUnit learningUnit9 = new LearningUnit("Vorlesung", LocalDate.of(2023, Month.MAY, 2),
                    LocalDate.of(2023, Month.AUGUST, 1), 60.0, module3);
            LearningUnit learningUnit10 = new LearningUnit("Nachhilfe", LocalDate.of(2023, Month.FEBRUARY, 6),
                    LocalDate.of(2023, Month.SEPTEMBER, 22), 98.7, module3);
            LearningUnit learningUnit11 = new LearningUnit("Seminar", LocalDate.of(2023, Month.MARCH, 3),
                    LocalDate.of(2023, Month.SEPTEMBER, 4), 150.0, module3);
            LearningUnit learningUnit12 = new LearningUnit("Selbststudium", LocalDate.of(2023, Month.MARCH, 3),
                    LocalDate.of(2023, Month.SEPTEMBER, 4), 20.0, module3);

            LearningUnit learningUnit13 = new LearningUnit("Seminar", LocalDate.of(2023, Month.APRIL, 10),
                    LocalDate.of(2023, Month.SEPTEMBER, 2), 300.0, module4);
            LearningUnit learningUnit14 = new LearningUnit("Praktikum", LocalDate.of(2023, Month.MAY, 2),
                    LocalDate.of(2023, Month.AUGUST, 1), 300.0, module4);
            LearningUnit learningUnit15 = new LearningUnit("Nachhilfe", LocalDate.of(2023, Month.FEBRUARY, 6),
                    LocalDate.of(2023, Month.SEPTEMBER, 22), 50.0, module4);
            LearningUnit learningUnit16 = new LearningUnit("Selbststudium", LocalDate.of(2023, Month.MARCH, 3),
                    LocalDate.of(2023, Month.SEPTEMBER, 4), 80.0, module4);

            module1.setLearningUnits(List.of(learningUnit1, learningUnit2, learningUnit3, learningUnit4));
            module2.setLearningUnits(List.of(learningUnit5, learningUnit6, learningUnit7));
            module3.setLearningUnits(List.of(learningUnit8, learningUnit9, learningUnit10, learningUnit11, learningUnit12));
            module4.setLearningUnits(List.of(learningUnit13, learningUnit14, learningUnit15, learningUnit16));

            LearningSession learningSession1 = new LearningSession(620, 270, 3, LocalDateTime.now(), "Heute lernen" +
                    " wir angewandte Mathematik", module1);
            LearningSession learningSession2 = new LearningSession(420, 370, 5, LocalDateTime.now(), "Heute lernen" +
                    " wir Informatik", module1);
            LearningSession learningSession3 = new LearningSession(15, 10, 1, LocalDateTime.now(), "Heute lernen" +
                    " wir den Satz des Pythagoras", module1);
            LearningSession learningSession4 = new LearningSession(720, 600, 4, LocalDateTime.now(), "Heute lernen" +
                    " wir Java Spring Boot", module1);

            LearningSession learningSession5 = new LearningSession(420, 70, 1, LocalDateTime.now(), "Heute lernen" +
                    " wir angewandte Mathematik 2", module2);
            LearningSession learningSession6 = new LearningSession(280, 70, 5, LocalDateTime.now(), "Heute lernen" +
                    " wir Informatik 2", module2);
            LearningSession learningSession7 = new LearningSession(500, 400, 1, LocalDateTime.now(), "Heute lernen" +
                    " wir Javascript", module2);
            LearningSession learningSession8 = new LearningSession(230, 130, 4, LocalDateTime.now(), "Heute lernen" +
                    " wir Next.js", module2);

            LearningSession learningSession9 = new LearningSession(400, 347, 3, LocalDateTime.now(), "Heute lernen" +
                    " wir Restklassenringe kennen", module3);
            LearningSession learningSession10 = new LearningSession(123, 100, 5, LocalDateTime.now(), "Heute lernen" +
                    " wir etwas über polynomielle Reduktionen.", module3);

            LearningSession learningSession11 = new LearningSession(220, 110, 2, LocalDateTime.now(), "Heute lernen" +
                    " wir, was passiert, wenn in der Beschreibung ein seeeeeehr langer Text steht und dieser gut lesbar.", module4);
            LearningSession learningSession12 = new LearningSession(480, 70, 4, LocalDateTime.now(), "Heute lernen" +
                    " wir Differenzialgleichungen kennen.", module4);
            LearningSession learningSession13 = new LearningSession(140, 84, 2, LocalDateTime.now(), "Heute lernen" +
                    " wir Ableitungen kennen.", module4);
            LearningSession learningSession14 = new LearningSession(500, 45, 5, LocalDateTime.now(), "Heute lernen" +
                    " wir Monoide kennen.", module4);
            LearningSession learningSession15 = new LearningSession(220, 110, 2, LocalDateTime.now(), "Heute lernen" +
                    " wir, was passiert, wenn in der Beschreibung ein seeeeeehr langer Text steht und dieser gut lesbar.", module4);
            LearningSession learningSession16 = new LearningSession(480, 70, 4, LocalDateTime.now(), "Heute lernen" +
                    " wir Differenzialgleichungen kennen.", module4);
            LearningSession learningSession17 = new LearningSession(140, 84, 2, LocalDateTime.now(), "Heute lernen" +
                    " wir Ableitungen kennen.", module4);
            LearningSession learningSession18 = new LearningSession(500, 45, 5, LocalDateTime.now(), "Heute lernen" +
                    " wir Monoide kennen.", module4);

            module1.setLearningSessions(List.of(learningSession1, learningSession2, learningSession3,
                    learningSession4));
            module2.setLearningSessions(List.of(learningSession5, learningSession6, learningSession7,
                    learningSession8));
            module3.setLearningSessions(List.of(learningSession9, learningSession10));
            module4.setLearningSessions(List.of(learningSession11, learningSession12, learningSession13,
                    learningSession14, learningSession15, learningSession16, learningSession17, learningSession18));

            student1.setModules(List.of(module1, module2, module3, module4));

            repository.saveAll(
                    List.of(student1, student2)
            );

        };
    }


}
