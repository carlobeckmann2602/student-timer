package com.github.philippvogel92.studenttimerbackend.module;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.github.philippvogel92.studenttimerbackend.student.Student;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Entity
@Table
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String colorCode;
    private Integer creditPoints;
    private LocalDate examDate;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Student student;

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Module(String name, String colorCode, Integer creditPoints, LocalDate examDate, Student student) {
        this.name = name;
        this.colorCode = colorCode;
        this.creditPoints = creditPoints;
        this.examDate = examDate;
        this.student =student;
    }

    public Module(Long id, String name, String colorCode, Integer creditPoints, LocalDate examDate) {
        this.id = id;
        this.name = name;
        this.colorCode = colorCode;
        this.creditPoints = creditPoints;
        this.examDate = examDate;
    }

    public Module() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColorCode() {
        return colorCode;
    }

    public void setColorCode(String colorCode) {
        this.colorCode = colorCode;
    }

    public Integer getCreditPoints() {
        return creditPoints;
    }

    public void setCreditPoints(Integer creditPoints) {
        this.creditPoints = creditPoints;
    }

    public LocalDate getExamDate() {
        return examDate;
    }

    public void setExamDate(LocalDate examDate) {
        this.examDate = examDate;
    }

    @Override
    public String toString() {
        return "Module{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", colorCode='" + colorCode + '\'' +
                ", creditPoints=" + creditPoints +
                ", examDate=" + examDate +
                ", student=" + student +
                '}';
    }

}
