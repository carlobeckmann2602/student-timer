package com.github.philippvogel92.studenttimerbackend.learningSession.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class LearningSessionCreateDTO {
    @NotNull(message = "TotalDuration cannot be null")
    private Integer totalDuration;
    @NotNull(message = "FocusDuration cannot be null")
    private Integer focusDuration;
    @NotNull(message = "Rating cannot be null")
    @Min(value = 0, message = "Rating must be greater than or equal to 0")
    @Max(value = 5, message = "Rating must be less than or equal to 5")
    private Integer rating;
    @Size(max = 255, message = "Description must be less than or equal to 255")
    private String description;

    public Integer getTotalDuration() {
        return totalDuration;
    }

    public Integer getFocusDuration() {
        return focusDuration;
    }

    public Integer getRating() {
        return rating;
    }

    public String getDescription() {
        return description;
    }

}
