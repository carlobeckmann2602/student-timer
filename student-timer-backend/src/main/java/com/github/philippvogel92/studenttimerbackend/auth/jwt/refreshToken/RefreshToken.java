package com.github.philippvogel92.studenttimerbackend.auth.jwt.refreshToken;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.philippvogel92.studenttimerbackend.student.Student;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

@Entity
@Table
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "TEXT", unique = true)
    private String token;
    @NotNull
    private Date expiresAt;

    @OneToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore
    Student student;

    public RefreshToken(String token, Date expiresAt, Student student) {
        this.token = token;
        this.expiresAt = expiresAt;
        this.student = student;
    }

    public RefreshToken() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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
