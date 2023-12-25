package com.github.philippvogel92.studenttimerbackend.learningSession;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.github.philippvogel92.studenttimerbackend.module.Module;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table
public class LearningSession {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Integer totalDuration;
    private Integer focusDuration;
    private Integer rating;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String description;

    @ManyToOne
    @JoinColumn(name = "module_id")
    @JsonBackReference
    private Module module;

    public LearningSession(Integer totalDuration, Integer focusDuration, Integer rating, LocalDateTime createdAt,
                           String description, Module module) {
        this.totalDuration = totalDuration;
        this.focusDuration = focusDuration;
        this.rating = rating;
        this.createdAt = createdAt;
        this.description = description;
        this.module = module;
    }

    public LearningSession() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
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

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    @Override
    public String toString() {
        return "LearningSession{" +
                "id=" + id +
                ", totalDuration=" + totalDuration +
                ", focusDuration=" + focusDuration +
                ", rating=" + rating +
                ", createdAt=" + createdAt +
                ", description='" + description + '\'' +
                ", module=" + module +
                '}';
    }
}
