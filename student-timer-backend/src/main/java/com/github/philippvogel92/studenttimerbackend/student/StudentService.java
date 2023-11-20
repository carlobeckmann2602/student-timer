package com.github.philippvogel92.studenttimerbackend.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Component
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }

    public Student getStudent(Long studentId){
        return studentRepository.findById(studentId).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND, "Student doesn't exists"));
    }

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public void deleteStudent(Long studentId){
        if (!studentRepository.existsById(studentId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Student doesn't exist");
        }
        studentRepository.deleteById(studentId);
    }
}
