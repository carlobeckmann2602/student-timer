package com.github.philippvogel92.studenttimerbackend.learningSession.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class LearningSessionCreateDTO {
    @NotNull(message = "TotalDuration cannot be null")
    private Integer totalDuration;
    @NotNull(message = "FocusDuration cannot be null")
    private Integer focusDuration;
    @NotNull(message = "Rating cannot be null")
    @Min(value = 0, message = "Rating must be greater than or equal to 0")
    @Max(value = 5, message = "Rating must be less than or equal to 5")
    private Integer rating;
    @NotNull(message = "Date cannot be null")
    private LocalDateTime createdAt;
    private String description;

    public Integer getTotalDuration() {
        return totalDuration;
    }

    public void setTotalDuration(Integer totalDuration) {
        this.totalDuration = totalDuration;
    }

    public Integer getFocusDuration() {
        return focusDuration;
    }

    public void setFocusDuration(Integer focusDuration) {
        this.focusDuration = focusDuration;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
