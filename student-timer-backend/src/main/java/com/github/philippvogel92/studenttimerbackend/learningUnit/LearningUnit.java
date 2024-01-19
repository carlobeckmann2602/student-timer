package com.github.philippvogel92.studenttimerbackend.learningUnit;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.github.philippvogel92.studenttimerbackend.module.Module;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.math.MathContext;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Table
public class LearningUnit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private LearningUnitEnum name;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double workloadPerWeek;

    @ManyToOne
    @JoinColumn(name = "module_id")
    @JsonBackReference
    private Module module;

    /**
     * Defines the total amount of minutes done by this learning unit (based on the start date, end date & workload
     * per week)
     */
    @Transient
    private Double totalLearningTime;

    public LearningUnit(LearningUnitEnum name, LocalDate startDate, LocalDate endDate, Double workloadPerWeek,
                        Module module) {
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

    public LearningUnitEnum getName() {
        return name;
    }

    public void setName(LearningUnitEnum name) {
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
        double learningTime = ChronoUnit.WEEKS.between(this.startDate, this.endDate) * this.workloadPerWeek;
        return (Double) new BigDecimal(learningTime).round(new MathContext(2)).doubleValue();
    }
}
