package com.github.philippvogel92.studenttimerbackend.student;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid id supplied",
                content = @Content),
        @ApiResponse(responseCode = "404", description = "Student not found",
                content = @Content)
})
@RestController
@RequestMapping(path="/students")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @Operation(summary = "ONLY FOR TESTING - Get a list of all students")
    @GetMapping
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();
    }

    @Operation(summary = "Get a student by their id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the student",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Student.class)) })
            })
    @GetMapping(path = "{studentId}")
    public Student getStudent(@PathVariable("studentId") Long studentId){
    return studentService.getStudent(studentId);
    }

    @Operation(summary = "Deletes a student by their id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Deletes the student",
                    content = @Content)
    })
    @DeleteMapping(path="{studentId}")
    public void deleteStudent(@PathVariable("studentId") Long studentId){
        studentService.deleteStudent(studentId);
    }

}
