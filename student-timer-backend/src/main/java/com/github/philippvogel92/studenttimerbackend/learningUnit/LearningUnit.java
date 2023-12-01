package com.github.philippvogel92.studenttimerbackend.learningUnit;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.philippvogel92.studenttimerbackend.module.Module;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table
public class LearningUnit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer workloadPerWeek;

    @Transient
    private Integer totalLearningTime;

    @ManyToOne
    @JoinColumn(name = "module_id")
    @JsonBackReference
    private Module module;

    public LearningUnit(String name, LocalDate startDate, LocalDate endDate, Integer workloadPerWeek, Module module) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.workloadPerWeek = workloadPerWeek;
        this.module = module;
    }

    public LearningUnit() {

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

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getWorkloadPerWeek() {
        return workloadPerWeek;
    }

    public void setWorkloadPerWeek(Integer workloadPerWeek) {
        this.workloadPerWeek = workloadPerWeek;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public Integer getTotalLearningTime() {
        return totalLearningTime;
    }

    public void setTotalLearningTime(Integer totalLearningTime) {
        this.totalLearningTime = totalLearningTime;
    }
}
