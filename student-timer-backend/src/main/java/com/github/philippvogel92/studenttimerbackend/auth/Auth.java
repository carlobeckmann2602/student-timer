package com.github.philippvogel92.studenttimerbackend.auth;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.philippvogel92.studenttimerbackend.student.Student;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table
public class Auth {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String refreshToken;
    private Date expiresAt;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonBackReference
    Student student;

    public Auth(String refreshToken, Date expiresAt, Student student) {
        this.refreshToken = refreshToken;
        this.expiresAt = expiresAt;
        this.student = student;
    }

    public Auth() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public Date getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(Date expiresAt) {
        this.expiresAt = expiresAt;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}
