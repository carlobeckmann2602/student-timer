package com.github.philippvogel92.studenttimerbackend;

import com.github.philippvogel92.studenttimerbackend.learningSession.LearningSession;
import com.github.philippvogel92.studenttimerbackend.learningUnit.LearningUnit;
import com.github.philippvogel92.studenttimerbackend.learningUnit.LearningUnitEnum;
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
            Student student2 = new Student("Kim", "Bachelor Medientechnologie", "elephant.jpg", "kim@test.de",
                    passwordEncoder.encode("string"));

            Module module1 = new Module("Datenbanksysteme 1", "#3AAF6B", 15, LocalDate.of(2023, Month.JUNE, 10),
                    student1);
            Module module2 = new Module("Mathematik 1", "#52EBAB", 5, LocalDate.of(2024, Month.APRIL, 12), student1);
            Module module3 = new Module("Mediengestaltung 1", "#88A7F5", 9, null, student1);
            Module module4 = new Module("Mediengestaltung 2", "#5D7CB9", 20, LocalDate.of(2024, Month.MARCH, 31),
                    student1);

            LearningUnit learningUnit1 = new LearningUnit(LearningUnitEnum.Vorlesung, LocalDate.of(2023,
                    Month.APRIL, 10),
                    LocalDate.of(2023, Month.SEPTEMBER, 2), 240.0, module1);
            LearningUnit learningUnit2 = new LearningUnit(LearningUnitEnum.Praktikum, LocalDate.of(2023, Month.MAY, 2),
                    LocalDate.of(2023, Month.AUGUST, 12), 120.0, module1);
            LearningUnit learningUnit3 = new LearningUnit(LearningUnitEnum.Meeting, LocalDate.of(2023, Month.FEBRUARY
                    , 6),
                    LocalDate.of(2023, Month.SEPTEMBER, 22), 98.7, module1);

            LearningUnit learningUnit5 = new LearningUnit(LearningUnitEnum.Exkursion, LocalDate.of(2023, Month.APRIL,
                    1),
                    LocalDate.of(2023, Month.OCTOBER, 5), 45.0, module2);
            LearningUnit learningUnit6 = new LearningUnit(LearningUnitEnum.Nachhilfe, LocalDate.of(2023, Month.MARCH,
                    12),
                    LocalDate.of(2023, Month.JULY, 22), 180.0, module2);

            LearningUnit learningUnit8 = new LearningUnit(LearningUnitEnum.Projekt, LocalDate.of(2023, Month.APRIL, 10),
                    LocalDate.of(2023, Month.SEPTEMBER, 2), 200.0, module3);
            LearningUnit learningUnit9 = new LearningUnit(LearningUnitEnum.Vorlesung, LocalDate.of(2023, Month.MAY, 2),
                    LocalDate.of(2023, Month.AUGUST, 1), 60.0, module3);
            LearningUnit learningUnit10 = new LearningUnit(LearningUnitEnum.Nachhilfe, LocalDate.of(2023,
                    Month.FEBRUARY, 6),
                    LocalDate.of(2023, Month.SEPTEMBER, 22), 98.7, module3);
            LearningUnit learningUnit11 = new LearningUnit(LearningUnitEnum.Seminar, LocalDate.of(2023, Month.MARCH, 3),
                    LocalDate.of(2023, Month.SEPTEMBER, 4), 150.0, module3);
            LearningUnit learningUnit12 = new LearningUnit(LearningUnitEnum.Exkursion, LocalDate.of(2023, Month.MARCH
                    , 3),
                    LocalDate.of(2023, Month.SEPTEMBER, 4), 20.0, module3);

            LearningUnit learningUnit13 = new LearningUnit(LearningUnitEnum.Meeting, LocalDate.of(2023, Month.APRIL,
                    10),
                    LocalDate.of(2023, Month.SEPTEMBER, 2), 300.0, module4);
            LearningUnit learningUnit14 = new LearningUnit(LearningUnitEnum.Praktikum, LocalDate.of(2023, Month.MAY, 2),
                    LocalDate.of(2023, Month.AUGUST, 1), 300.0, module4);
            LearningUnit learningUnit15 = new LearningUnit(LearningUnitEnum.Nachhilfe, LocalDate.of(2023,
                    Month.FEBRUARY, 6),
                    LocalDate.of(2023, Month.SEPTEMBER, 22), 50.0, module4);

            module1.setLearningUnits(List.of(learningUnit1, learningUnit2, learningUnit3));
            module2.setLearningUnits(List.of(learningUnit5, learningUnit6));
            module3.setLearningUnits(List.of(learningUnit8, learningUnit9, learningUnit10, learningUnit11,
                    learningUnit12));
            module4.setLearningUnits(List.of(learningUnit13, learningUnit14, learningUnit15));

            LearningSession learningSession1 = new LearningSession(620, 550, 3, LocalDateTime.now().minusDays(4).minusMonths(2),
                    "Datenbankmanagementsystem", module1);
            LearningSession learningSession2 = new LearningSession(420, 370, 5, LocalDateTime.now().minusDays(3),
                    "Relationale Datenbanken", module1);
            LearningSession learningSession3 = new LearningSession(15, 10, 1, LocalDateTime.now().minusDays(8).minusMonths(1),
                    "SQL", module1);
            LearningSession learningSession4 = new LearningSession(740, 600, 4, LocalDateTime.now().minusDays(9).minusMonths(4),
                    "Join und Subqueries", module1);

            LearningSession learningSession5 = new LearningSession(187, 70, 1, LocalDateTime.now().minusDays(12),
                    "Mengen", module2);
                    LearningSession learningSession6 = new LearningSession(280, 170, 2, LocalDateTime.now().minusDays(16).minusMonths(2),
                    "Logik", module2);
            LearningSession learningSession7 = new LearningSession(500, 160, 2, LocalDateTime.now().minusDays(15),
                    "Matrizen", module2);
            LearningSession learningSession8 = new LearningSession(230, 130, 1, LocalDateTime.now().minusDays(3).minusMonths(1),
                    "Beweise", module2);

            LearningSession learningSession9 = new LearningSession(400, 290, 3, LocalDateTime.now().minusDays(18).minusMonths(1),
                    "Farbe, Form, Komposition", module3);
            LearningSession learningSession10 = new LearningSession(123, 100, 5, LocalDateTime.now().minusDays(20).minusMonths(3),
                    "Typographie", module3);

            LearningSession learningSession11 = new LearningSession(555, 333, 2, LocalDateTime.now().minusDays(4).minusMonths(1),
                    "Animation eines eigenen kleinen Films", module4);
            LearningSession learningSession12 = new LearningSession(480, 320, 4, LocalDateTime.now().minusDays(3).minusMonths(1),
                    "Retuschieren eines Bildes", module4);
            LearningSession learningSession13 = new LearningSession(140, 84, 2, LocalDateTime.now().minusDays(4).minusMonths(2),
                    "Aufbau von Webseiten", module4);
            LearningSession learningSession14 = new LearningSession(500, 45, 5, LocalDateTime.now().minusDays(2).minusMonths(1),
                    "Plakat zum Thema Typographie", module4);
            LearningSession learningSession15 = new LearningSession(220, 102, 2, LocalDateTime.now().minusDays(10),
                    "Komposition mit Farben", module4);
            LearningSession learningSession16 = new LearningSession(343, 278, 4, LocalDateTime.now().minusDays(4).minusMonths(5),
                    "Fotografie Alltagsgegenstände", module4);
            LearningSession learningSession17 = new LearningSession(190, 140, 2, LocalDateTime.now().minusDays(3).minusMonths(1),
                    "Kurzfilm einer eigenen Story", module4);
            LearningSession learningSession18 = new LearningSession(95, 71, 5, LocalDateTime.now().minusDays(5).minusMonths(1),
                    "Videoschnitt und Editing", module4);

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
