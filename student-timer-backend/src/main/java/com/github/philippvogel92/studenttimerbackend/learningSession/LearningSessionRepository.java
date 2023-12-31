package com.github.philippvogel92.studenttimerbackend.learningSession;

import com.github.philippvogel92.studenttimerbackend.student.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningSessionRepository extends JpaRepository<LearningSession, Long> {
    List<LearningSession> findLearningSessionsByModule_StudentOrderByCreatedAtDesc(Student student);
}