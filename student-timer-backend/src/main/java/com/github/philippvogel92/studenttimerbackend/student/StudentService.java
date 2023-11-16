package com.github.philippvogel92.studenttimerbackend.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }

    public Student getStudent(Long studentId){
        return studentRepository.getReferenceById(studentId);
    }
}
