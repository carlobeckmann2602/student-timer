package com.github.philippvogel92.studenttimerbackend.module.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class ModuleCreateDTO {
    @NotBlank(message = "Name cannot be null or empty")
    private String name;
    private LocalDate examDate;
    @NotBlank(message = "Color code cannot be null or empty")
    private String colorCode;
    @NotNull(message = "Creditpoints cannot be null")
    private Integer creditpoints;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getExamDate() {
        return examDate;
    }

    public void setExamDate(LocalDate examDate) {
        this.examDate = examDate;
    }

    public String getColorCode() {
        return colorCode;
    }

    public void setColorCode(String colorCode) {
        this.colorCode = colorCode;
    }

    public Integer getCreditpoints() {
        return creditpoints;
    }

    public void setCreditpoints(Integer creditpoints) {
        this.creditpoints = creditpoints;
    }
}
