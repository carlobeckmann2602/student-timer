package com.github.philippvogel92.studenttimerbackend.learningUnit;

import com.github.philippvogel92.studenttimerbackend.module.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningUnitRepository extends JpaRepository<LearningUnit, Long> {
}