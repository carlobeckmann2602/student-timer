package com.github.philippvogel92.studenttimerbackend.student;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.github.philippvogel92.studenttimerbackend.module.Module;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table
@JsonIgnoreProperties({"modules"})
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String studyCourse;
    private String profilePicture;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "student")
    private List<Module> modules;

    public Student(String name, String studyCourse, String profilePicture) {
        this.name = name;
        this.studyCourse = studyCourse;
        this.profilePicture = profilePicture;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Student() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudyCourse() {
        return studyCourse;
    }

    public void setStudyCourse(String studyCourse) {
        this.studyCourse = studyCourse;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = Student.this.profilePicture;
    }

    public List<Module> getModules() {
        return modules;
    }

    public void setModules(List<Module> modules) {
        this.modules = modules;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", studyCourse='" + studyCourse + '\'' +
                ", profilePicture='" + profilePicture + '\'' +
                '}';
    }
}
