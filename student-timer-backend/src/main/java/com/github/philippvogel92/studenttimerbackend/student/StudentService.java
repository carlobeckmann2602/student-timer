package com.github.philippvogel92.studenttimerbackend.student;

import com.github.philippvogel92.studenttimerbackend.student.dto.StudentUpdateDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.Optional;

@Component
public class StudentService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public StudentService(StudentRepository studentRepository, PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
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
        String password = studentUpdateDTO.getPassword();
        String password2 = studentUpdateDTO.getPassword2();

        //Check if email address is already taken
        Optional<Student> studentOptional = studentRepository.findStudentByEmail(email);
        if (studentOptional.isPresent() && !Objects.equals(studentOptional.get().getId(), studentId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Email address already taken");
        }

        //Set password
        if (password != null) {
            if (!Objects.equals(password, password2)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Passwords are not matching");
            } else if (password.length() < 6 || password.length() > 200) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be between 6 and 200 " +
                        "characters");
            }
            //Password encryption
            String encryptedPassword = passwordEncoder.encode(password);
            student.setPassword(encryptedPassword);
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
