package com.github.philippvogel92.studenttimerbackend.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// Types sind student und seine id. Dieser layer ist verantwortlich für den datenzugriff. Durch das extenden von der Jpa Repo kann man auf alle gängigen CRUD Operationen zugreifen
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    //fügt die find by email methode hinzu
    Optional<Student> findStudentByEmail(String email);
    //oder so: @Query("SELECT s FROM Student s WHERE s.email = ?1")
}
