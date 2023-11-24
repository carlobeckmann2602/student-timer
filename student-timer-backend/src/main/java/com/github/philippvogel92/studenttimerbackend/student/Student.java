package com.github.philippvogel92.studenttimerbackend.student;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.github.philippvogel92.studenttimerbackend.module.Module;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String studyCourse;
    private String profilePicture;
    private String email;
    private String password;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "student", orphanRemoval = true)
    @JsonIgnore
    private List<Module> modules;

    public Student(String name, String studyCourse, String profilePicture, String email, String password) {
        this.name = name;
        this.studyCourse = studyCourse;
        this.profilePicture = profilePicture;
        this.email = email;
        this.password = password;
    }

    public Student() {

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
        this.profilePicture = profilePicture;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Module> getModules() {
        return modules;
    }

    public void setModules(List<Module> modules) {
        this.modules = modules;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", studyCourse='" + studyCourse + '\'' +
                ", profilePicture='" + profilePicture + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", modules=" + modules +
                '}';
    }

    String encrypt(String password) {
        //encryption logic
        return "encrypt";
    }

}
