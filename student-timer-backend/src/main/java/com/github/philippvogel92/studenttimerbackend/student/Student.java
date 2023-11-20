package com.github.philippvogel92.studenttimerbackend.student;
//DAS IST DAS PROBLEM I THINK
import jakarta.persistence.*;

@Entity
@Table
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long studentId;
    private String firstName;
    private String lastName;
    private String studyCourse;
    private String profilPicture;

    public Student(Long studentId, String firstName, String lastName, String studyCourse, String profilPicture) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.studyCourse = studyCourse;
        this.profilPicture = profilPicture;
    }
    public Student(String firstName, String lastName, String studyCourse, String profilPicture) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.studyCourse = studyCourse;
        this.profilPicture = profilPicture;
    }

    public Student() {

    }

    public Long getUserId() {
        return studentId;
    }

    public void setUserId(Long studentId) {
        this.studentId = studentId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getStudyCourse() {
        return studyCourse;
    }

    public void setStudyCourse(String studyCourse) {
        this.studyCourse = studyCourse;
    }

    public String getProfilPicture() {
        return profilPicture;
    }

    public void setProfilPicture(String profilPicture) {
        this.profilPicture = profilPicture;
    }

    @Override
    public String toString() {
        return "User{" +
                "studentId=" + studentId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", studyCourse='" + studyCourse + '\'' +
                ", profilPicture='" + profilPicture + '\'' +
                '}';
    }
}
