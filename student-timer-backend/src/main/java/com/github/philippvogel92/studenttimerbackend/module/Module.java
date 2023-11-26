package com.github.philippvogel92.studenttimerbackend.module;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.github.philippvogel92.studenttimerbackend.learningSession.LearningSession;
import com.github.philippvogel92.studenttimerbackend.learningUnit.LearningUnit;
import com.github.philippvogel92.studenttimerbackend.student.Student;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

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

    @OneToMany(orphanRemoval = true, cascade = CascadeType.ALL, mappedBy = "module", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<LearningUnit> learningUnit;

    @OneToMany(orphanRemoval = true, cascade = CascadeType.ALL, mappedBy = "module", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<LearningSession> learningSessions;

    public Module(String name, String colorCode, Integer creditPoints, LocalDate examDate, Student student) {
        this.name = name;
        this.colorCode = colorCode;
        this.creditPoints = creditPoints;
        this.examDate = examDate;
        this.student = student;
    }

    public Module(Long id, String name, String colorCode, Integer creditPoints, LocalDate examDate, Student student) {
        this.id = id;
        this.name = name;
        this.colorCode = colorCode;
        this.creditPoints = creditPoints;
        this.examDate = examDate;
        this.student = student;
    }

    public Module() {

    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
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

    public List<LearningUnit> getLearningUnits() {
        return learningUnit;
    }

    public void setLearningUnits(List<LearningUnit> learningUnit) {
        this.learningUnit = learningUnit;
    }

    public List<LearningSession> getLearningSessions() {
        return learningSessions;
    }

    public void setLearningSessions(List<LearningSession> learningSessions) {
        this.learningSessions = learningSessions;
    }
}
