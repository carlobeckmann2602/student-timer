package com.github.philippvogel92.studenttimerbackend.auth;

import com.github.philippvogel92.studenttimerbackend.auth.dto.SignUpRequestDTO;
import com.github.philippvogel92.studenttimerbackend.auth.dto.SignUpResponseDTO;
import com.github.philippvogel92.studenttimerbackend.auth.jwt.accessToken.AccessTokenService;
import com.github.philippvogel92.studenttimerbackend.auth.dto.LoginRequestDTO;
import com.github.philippvogel92.studenttimerbackend.auth.dto.LoginResponseDTO;
import com.github.philippvogel92.studenttimerbackend.auth.jwt.refreshToken.RefreshTokenService;
import com.github.philippvogel92.studenttimerbackend.auth.oAuth2.GoogleTokenVerifier;
import com.github.philippvogel92.studenttimerbackend.student.Student;
import com.github.philippvogel92.studenttimerbackend.student.StudentRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import javax.swing.text.html.Option;
import java.util.Objects;
import java.util.Optional;

@Component
public class AuthService {

    private final StudentRepository studentRepository;
    private final RefreshTokenService refreshTokenService;
    private final AccessTokenService accessTokenService;
    private final PasswordEncoder passwordEncoder;
    private final GoogleTokenVerifier googleTokenVerifier;

    @Autowired
    public AuthService(StudentRepository studentRepository, RefreshTokenService refreshTokenService,
                       AccessTokenService accessTokenService, PasswordEncoder passwordEncoder,
                       GoogleTokenVerifier googleTokenVerifier) {
        this.studentRepository = studentRepository;
        this.refreshTokenService = refreshTokenService;
        this.accessTokenService = accessTokenService;
        this.passwordEncoder = passwordEncoder;
        this.googleTokenVerifier = googleTokenVerifier;
    }

    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {
        String email = loginRequestDTO.getEmail();
        String password = loginRequestDTO.getPassword();
        String provider = loginRequestDTO.getProvider();

        if (provider.equals("google")) {
            GoogleIdToken.Payload payload = googleTokenVerifier.verify(password);
            Optional<Student> studentOptional =
                    studentRepository.findStudentByEmail(email);

            //login
            if (studentOptional.isPresent()) {
                Student student = studentOptional.get();
                String accessToken = accessTokenService.createAccessToken(student.getId(), email);
                String refreshToken = refreshTokenService.createRefreshToken(student);
                return new LoginResponseDTO(accessToken, refreshToken, student.getId(), student.getEmail());
            } else {
                String name = (String) payload.get("name");
                String profilePicture = (String) payload.get("picture");
                Student student = new Student(name, null, profilePicture, email, password);

                Student studentInDatabase = studentRepository.save(student);

                //create access and refresh tokens
                String accessToken = accessTokenService.createAccessToken(studentInDatabase.getId(), email);
                String refreshToken = refreshTokenService.createRefreshToken(studentInDatabase);

                return new LoginResponseDTO(accessToken, refreshToken,
                        studentInDatabase.getId(), studentInDatabase.getEmail());

            }
        } else {

            Student student =
                    studentRepository.findStudentByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credentials are wrong"));
            
            if (!passwordEncoder.matches(password, student.getPassword())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credentials are wrong");
            }

            String accessToken = accessTokenService.createAccessToken(student.getId(), email);
            String refreshToken = refreshTokenService.createRefreshToken(student);

            return new LoginResponseDTO(accessToken, refreshToken, student.getId(), student.getEmail());
        }
    }


    public SignUpResponseDTO signUp(SignUpRequestDTO signUpRequestDTO) {
        String email = signUpRequestDTO.getEmail();
        String name = signUpRequestDTO.getName();
        String profilePicture = signUpRequestDTO.getProfilePicture();
        String studyCourse = signUpRequestDTO.getStudyCourse();
        String password = signUpRequestDTO.getPassword();
        String password2 = signUpRequestDTO.getPassword2();

        //check if email is already taken
        Optional<Student> studentOptional = studentRepository.findStudentByEmail(email);
        if (studentOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Email address already taken");
        }

        //password check
        if (!Objects.equals(password, password2)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The passwords aren't matching");
        }

        //encrypt pw
        String encryptedPassword = passwordEncoder.encode(password);

        //safe student in db
        Student student = new Student(name, studyCourse, profilePicture, email, encryptedPassword);
        Student studentInDatabase = studentRepository.save(student);

        //create access and refresh tokens
        String accessToken = accessTokenService.createAccessToken(studentInDatabase.getId(), email);
        String refreshToken = refreshTokenService.createRefreshToken(studentInDatabase);

        return new SignUpResponseDTO(studentInDatabase.getId(), studentInDatabase.getName(),
                studentInDatabase.getEmail(), studentInDatabase.getStudyCourse(),
                studentInDatabase.getProfilePicture(), accessToken, refreshToken);

    }


}
