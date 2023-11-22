package com.github.philippvogel92.studenttimerbackend.module;

import com.github.philippvogel92.studenttimerbackend.student.Student;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid id supplied",
                content = @Content),
})
@RestController
@RequestMapping(path="/students/{studentId}")
public class ModuleController {
    private final ModuleService moduleService;

    @Autowired
    public ModuleController(ModuleService moduleService){
        this.moduleService=moduleService;
    }

    @Operation(summary = "Get a list of all modules of a student by studentId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the modules for the student id",
                    content = { @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = Module.class))) })
    })
    @GetMapping(path = "/modules")
    public List<Module> getAllModulesForStudent(@PathVariable("studentId") Long studentId){
        return moduleService.getAllModulesForStudent(studentId);
    }

    @Operation(summary = "Get a module of a student by studentId and moduleId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the module",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Module.class)) }),
            @ApiResponse(responseCode = "404", description = "Module not found",
                    content = @Content)
    })
    @GetMapping(path = "/modules/{moduleId}")
    public Module getModule(@PathVariable("studentId") Long studentId, @PathVariable("moduleId") Long moduleId){
        return moduleService.getModule(studentId, moduleId);
    }
}
