package com.github.philippvogel92.studenttimerbackend.module;

import com.github.philippvogel92.studenttimerbackend.student.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {

    List<Module> findByStudentId(Long studentId);
}