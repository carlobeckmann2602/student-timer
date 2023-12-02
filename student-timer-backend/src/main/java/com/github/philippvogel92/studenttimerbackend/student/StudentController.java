package com.github.philippvogel92.studenttimerbackend.student;

import com.github.philippvogel92.studenttimerbackend.student.dto.StudentCreateDTO;
import com.github.philippvogel92.studenttimerbackend.student.dto.StudentUpdateDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/students")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // *************************** GET-METHODS ***************************

    @Operation(summary = "ONLY FOR TESTING - Get a list of all students")
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @Operation(summary = "Get a student by their id")
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

    // *************************** POST-METHODS ***************************

    @Operation(summary = "Create a new student")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Student created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Student.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid request body supplied",
                    content = @Content),
    })
    @PostMapping
    public Student addStudent(@Valid @RequestBody StudentCreateDTO studentCreateDTO) {
        return studentService.addStudent(studentCreateDTO);
    }

    // *************************** PUT-METHODS ***************************

    @Operation(summary = "Updates a student")
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

    @Operation(summary = "Deletes a student by their id")
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
