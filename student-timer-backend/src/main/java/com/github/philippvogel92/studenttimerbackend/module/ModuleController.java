package com.github.philippvogel92.studenttimerbackend.module;

import com.github.philippvogel92.studenttimerbackend.module.dto.ModuleCreateDTO;
import com.github.philippvogel92.studenttimerbackend.student.Student;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid request",
                content = @Content),
})
@RestController
@RequestMapping(path = "/students/{studentId}")
public class ModuleController {
    private final ModuleService moduleService;

    @Autowired
    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    // *************************** GET-METHODS ***************************

    @Operation(summary = "Get a list of all modules of a student by studentId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the modules for the student id",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = Module.class)))
                    }
            )
    })
    @GetMapping(path = "/modules")
    public List<Module> getAllModulesForStudent(@PathVariable("studentId") Long studentId) {
        return moduleService.getAllModulesForStudent(studentId);
    }

    @Operation(summary = "Get a module of a student by studentId and moduleId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the module",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Module.class))
                    }),
            @ApiResponse(responseCode = "404", description = "Module not found",
                    content = @Content)
    })
    @GetMapping(path = "/modules/{moduleId}")
    public Module getModule(@PathVariable("studentId") Long studentId, @PathVariable("moduleId") Long moduleId) {
        return moduleService.getModule(studentId, moduleId);
    }

    // *************************** POST-METHODS ***************************

    @Operation(summary = "Create a new module")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Module created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Module.class))}),
    })
    @PostMapping(path = "/modules")
    public Module addModule(@PathVariable("studentId") Long studentId, ModuleCreateDTO moduleCreateDTO) {
        return moduleService.addModule(studentId, moduleCreateDTO);
    }
    // *************************** PUT-METHODS ***************************

    @Operation(summary = "Updates a module")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Module updated",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Module.class))}),
            @ApiResponse(responseCode = "404", description = "Student not found",
                    content = @Content)
    })
    @PutMapping(path = "/modules/{moduleId}")
    public Module updateModule(@PathVariable("studentId") Long studentId, @PathVariable("moduleId") Long moduleId,
                               @Valid @RequestBody ModuleCreateDTO moduleCreateDTO) {
        return moduleService.updateModule(studentId, moduleId, moduleCreateDTO);
    }

    // *************************** DELETE-METHODS ***************************

    @Operation(summary = "Delete a module of a student by studentId and moduleId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Module deleted",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Module doesn't exists",
                    content = @Content),
            @ApiResponse(responseCode = "403", description = "Module does not belong to the student",
                    content = @Content)
    })
    @DeleteMapping(path = "/modules/{moduleId}")
    public void deleteModule(@PathVariable("studentId") Long studentId, @PathVariable("moduleId") Long moduleId) {
        moduleService.deleteModule(studentId, moduleId);
    }
}
