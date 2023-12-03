package com.github.philippvogel92.studenttimerbackend.student;


import com.github.philippvogel92.studenttimerbackend.auth.AuthService;
import com.github.philippvogel92.studenttimerbackend.student.dto.StudentUpdateDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@ApiResponses(value = {
        @ApiResponse(responseCode = "403", description = "Not authorized",
                content = @Content)
})
@RestController
@RequestMapping(path = "/students")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // *************************** GET-METHODS ***************************

    
    @Operation(summary = "Get a student by their id", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the student",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Student.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid id supplied",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Student not found",
                    content = @Content)
    })
    @GetMapping(path = "{studentId}")
    public Student getStudent(@PathVariable("studentId") Long studentId) {
        return studentService.getStudent(studentId);
    }


    // *************************** PUT-METHODS ***************************

    @Operation(summary = "Updates a student", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Student updated",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Student.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid student id or request body supplied",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Student not found",
                    content = @Content)
    })
    @PutMapping(path = "{studentId}")
    public Student updateStudent(@PathVariable("studentId") Long studentId,
                                 @Valid @RequestBody StudentUpdateDTO studentUpdateDTO) {
        return studentService.updateStudent(studentId, studentUpdateDTO);
    }

    // *************************** DELETE-METHODS ***************************

    @Operation(summary = "Deletes a student by their id", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Deletes the student",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Student not found",
                    content = @Content)
    })
    @DeleteMapping(path = "{studentId}")
    public void deleteStudent(@PathVariable("studentId") Long studentId) {
        studentService.deleteStudent(studentId);
    }

}
