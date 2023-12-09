package com.github.philippvogel92.studenttimerbackend.learningUnit;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.philippvogel92.studenttimerbackend.module.Module;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.Period;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Entity
@Table
public class LearningUnit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double workloadPerWeek;

    @ManyToOne
    @JoinColumn(name = "module_id")
    @JsonBackReference
    private Module module;


    @Transient
    private Double totalLearningTime;

    public LearningUnit(String name, LocalDate startDate, LocalDate endDate, Double workloadPerWeek, Module module) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.workloadPerWeek = workloadPerWeek;
        this.module = module;
        this.totalLearningTime = getTotalLearningTime();
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

    public Double getWorkloadPerWeek() {
        return workloadPerWeek;
    }

    public void setWorkloadPerWeek(Double workloadPerWeek) {
        this.workloadPerWeek = workloadPerWeek;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public Double getTotalLearningTime() {
        return (double) Math.round(Period.between(this.startDate, this.endDate).getDays() / 7d * this.workloadPerWeek);
    }

}
