package com.github.philippvogel92.studenttimerbackend.learningUnit.dto;

import com.github.philippvogel92.studenttimerbackend.learningUnit.LearningUnitEnum;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class LearningUnitCreateDTO {
    @NotNull(message = "Name cannot be null")
    private LearningUnitEnum name;
    @NotNull(message = "Start Date cannot be null")
    private LocalDate startDate;
    @NotNull(message = "End Date cannot be null")
    private LocalDate endDate;
    @NotNull(message = "Workload cannot be null")
    private Double workloadPerWeek;

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
}
