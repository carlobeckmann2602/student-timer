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

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Double getWorkloadPerWeek() {
        return workloadPerWeek;
    }

}
