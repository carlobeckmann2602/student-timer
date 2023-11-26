package com.github.philippvogel92.studenttimerbackend.learningUnit;

import com.github.philippvogel92.studenttimerbackend.learningUnit.dto.LearningUnitCreateDTO;
import com.github.philippvogel92.studenttimerbackend.module.Module;
import com.github.philippvogel92.studenttimerbackend.module.ModuleService;
import com.github.philippvogel92.studenttimerbackend.module.dto.ModuleCreateDTO;
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
@RequestMapping(path = "/modules/{moduleId}")
public class LearningUnitController {
    private final LearningUnitService learningUnitService;

    @Autowired
    public LearningUnitController(LearningUnitService learningUnitService) {
        this.learningUnitService = learningUnitService;
    }

    // *************************** GET-METHODS ***************************

    @Operation(summary = "Get a list of all learning units of a module by moduleId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the learning units for the module id",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = LearningUnit.class)))
                    }
            )
    })
    @GetMapping(path = "/learningUnits")
    public List<LearningUnit> getAllLearningUnitsForModule(@PathVariable("moduleId") Long moduleId) {
        return learningUnitService.getAllLearningUnitsForModule(moduleId);
    }

    @Operation(summary = "Get a learning unit of a module by learningUnitId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the learning unit",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = LearningUnit.class))
                    }),
            @ApiResponse(responseCode = "404", description = "Learning unit not found",
                    content = @Content)
    })
    @GetMapping(path = "/learningUnits/{learningUnitId}")
    public LearningUnit getLearningUnit(@PathVariable("moduleId") Long moduleId,
                                        @PathVariable("learningUnitId") Long learningUnitId) {
        return learningUnitService.getLearningUnit(moduleId, learningUnitId);
    }

    // *************************** POST-METHODS ***************************

    @Operation(summary = "Create a new learning unit")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Learning unit created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = LearningUnit.class))}),
    })
    @PostMapping(path = "/learningUnit")
    public LearningUnit addLearningUnit(@PathVariable("moduleId") Long moduleId,
                                        LearningUnitCreateDTO learningUnitCreateDTO) {
        return learningUnitService.addLearningUnit(moduleId, learningUnitCreateDTO);
    }
    // *************************** PUT-METHODS ***************************

    @Operation(summary = "Updates a learning unit")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Learning unit updated",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = LearningUnit.class))}),
            @ApiResponse(responseCode = "404", description = "Learning unit not found",
                    content = @Content)
    })
    @PutMapping(path = "/learningUnits/{learningUnitId}")
    public LearningUnit updateLearningUnit(@PathVariable("moduleId") Long moduleId,
                                           @PathVariable("learningUnitId") Long learningUnitId,
                                           @Valid @RequestBody LearningUnitCreateDTO learningUnitCreateDTO) {
        return learningUnitService.updateLearningUnit(moduleId, learningUnitId, learningUnitCreateDTO);
    }

    // *************************** DELETE-METHODS ***************************

    @Operation(summary = "Delete a learning unit of a module by moduleId and learningUnitId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Learning unit deleted",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Learning unit doesn't exists",
                    content = @Content),
            @ApiResponse(responseCode = "403", description = "Learning unit does not belong to the module",
                    content = @Content)
    })
    @DeleteMapping(path = "/learningUnits/{learningUnitId}")
    public void deleteLearningUnit(@PathVariable("moduleId") Long moduleId,
                                   @PathVariable("learningUnitId") Long learningUnitId) {
        learningUnitService.deleteLearningUnit(moduleId, learningUnitId);
    }
}
