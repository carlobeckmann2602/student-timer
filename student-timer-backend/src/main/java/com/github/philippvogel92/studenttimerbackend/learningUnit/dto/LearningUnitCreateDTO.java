package com.github.philippvogel92.studenttimerbackend.learningUnit.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class LearningUnitCreateDTO {
    @NotBlank(message = "Name cannot be null or empty")
    private String name;
    @NotNull(message = "Start Date cannot be null")
    private LocalDate startDate;
    @NotNull(message = "End Date cannot be null")
    private LocalDate endDate;
    @NotNull(message = "Workload cannot be null")
    private Integer workloadPerWeek;

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
}
