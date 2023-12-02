package com.github.philippvogel92.studenttimerbackend.student;

import com.github.philippvogel92.studenttimerbackend.student.dto.StudentUpdateDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.Optional;

@Component
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student getStudent(Long studentId) {
        return studentRepository.findById(studentId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student doesn't exists"));
    }

    public void deleteStudent(Long studentId) {
        if (!studentRepository.existsById(studentId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Student doesn't exist");
        }
        studentRepository.deleteById(studentId);
    }

    @Transactional
    public Student updateStudent(Long studentId, StudentUpdateDTO studentUpdateDTO) {
        Student student =
                studentRepository.findById(studentId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        String email = studentUpdateDTO.getEmail();
        String name = studentUpdateDTO.getName();
        String profilePicture = studentUpdateDTO.getProfilePicture();
        String studyCourse = studentUpdateDTO.getStudyCourse();

        //Check if email address is already taken
        Optional<Student> studentOptional = studentRepository.findStudentByEmail(email);
        if (studentOptional.isPresent() && !Objects.equals(studentOptional.get().getId(), studentId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Email address already taken");
        }

        //Set email
        if (!Objects.equals(student.getEmail(), email)) {
            student.setEmail(email);
        }

        //Set name
        if (!Objects.equals(student.getName(), name)) {
            student.setName(name);
        }

        //Set profile picture
        if (!Objects.equals(student.getProfilePicture(), profilePicture)) {
            student.setProfilePicture(profilePicture);
        }

        //Set study course
        if (!Objects.equals(student.getStudyCourse(), studyCourse)) {
            student.setStudyCourse(studyCourse);
        }

        return student;
    }
}
