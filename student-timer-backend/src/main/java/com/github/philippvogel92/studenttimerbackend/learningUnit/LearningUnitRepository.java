package com.github.philippvogel92.studenttimerbackend.learningUnit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningUnitRepository extends JpaRepository<LearningUnit, Long> {
}