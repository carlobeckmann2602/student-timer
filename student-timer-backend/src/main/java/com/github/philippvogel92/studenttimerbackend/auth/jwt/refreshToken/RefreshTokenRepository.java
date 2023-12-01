package com.github.philippvogel92.studenttimerbackend.auth.jwt.refreshToken;

import com.github.philippvogel92.studenttimerbackend.student.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    @Modifying
    int deleteByStudent(Student student);
}
