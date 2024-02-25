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
    private List<LearningUnit> learningUnits;

    @OneToMany(orphanRemoval = true, cascade = CascadeType.ALL, mappedBy = "module", fetch = FetchType.LAZY)
    @JsonManagedReference
    @OrderBy("createdAt desc")
    private List<LearningSession> learningSessions;

    /**
     * Defines the total amount of minutes expected for this module (based on the given creditpoints)
     */
    @Transient
    private Double totalModuleTime;

    /**
     * Defines the total amount of minutes done by learning sessions
     */
    @Transient
    private Double totalLearningSessionTime;

    /**
     * Defines the total amount of minutes done by the given learning units
     */
    @Transient
    private Double totalLearningUnitTime;

    /**
     * Defines the total amount of minutes done by learning units and learning sessions
     */
    @Transient
    private Double totalLearningTime;

    public Module(String name, String colorCode, Integer creditPoints, LocalDate examDate, Student student) {
        this.name = name;
        this.colorCode = colorCode;
        this.creditPoints = creditPoints;
        this.examDate = examDate;
        this.student = student;
        this.totalModuleTime = this.getTotalModuleTime();
        this.totalLearningSessionTime = this.getTotalLearningSessionTime();
        this.totalLearningUnitTime = this.getTotalLearningUnitTime();
    }

    public Module(Long id, String name, String colorCode, Integer creditPoints, LocalDate examDate, Student student) {
        this.id = id;
        this.name = name;
        this.colorCode = colorCode;
        this.creditPoints = creditPoints;
        this.examDate = examDate;
        this.student = student;
        this.totalModuleTime = this.getTotalModuleTime();
        this.totalLearningSessionTime = this.getTotalLearningSessionTime();
        this.totalLearningUnitTime = this.getTotalLearningUnitTime();
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
        return learningUnits;
    }

    public void setLearningUnits(List<LearningUnit> learningUnit) {
        this.learningUnits = learningUnit;
    }

    public List<LearningSession> getLearningSessions() {
        return learningSessions;
    }

    public void setLearningSessions(List<LearningSession> learningSessions) {
        this.learningSessions = learningSessions;
    }

    public Double getTotalModuleTime() {
        return (this.creditPoints * 30) * 60d;
    }

    public Double getTotalLearningTime() {
        return this.getTotalLearningSessionTime() + this.getTotalLearningUnitTime();
    }

    public Double getTotalLearningSessionTime() {
        Double totalDuration = 0.0;

        if (this.learningSessions != null && !this.learningSessions.isEmpty()) {
            for (LearningSession currentSession : this.learningSessions)
                totalDuration += currentSession.getTotalDuration();
        }

        return totalDuration;
    }

    public Double getTotalLearningUnitTime() {
        Double totalDuration = 0.0;

        if (this.learningUnits != null && !this.learningUnits.isEmpty()) {
            for (LearningUnit currentUnit : this.learningUnits)
                totalDuration += currentUnit.getTotalLearningTime();
        }

        return totalDuration;
    }

    @PostLoad
    private void computeTotalTimes() {
        this.totalModuleTime = this.getTotalModuleTime();
        this.totalLearningSessionTime = this.getTotalLearningSessionTime();
        this.totalLearningUnitTime = this.getTotalLearningUnitTime();
        this.totalLearningTime = this.getTotalLearningTime();
    }
}
