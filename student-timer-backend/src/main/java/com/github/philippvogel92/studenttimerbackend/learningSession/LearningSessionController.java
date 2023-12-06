package com.github.philippvogel92.studenttimerbackend.learningSession;

import com.github.philippvogel92.studenttimerbackend.learningSession.dto.LearningSessionCreateDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
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
        @ApiResponse(responseCode = "401", description = "Not authorized for this resource",
                content = @Content),
})
@RestController
@RequestMapping(path = "/students/{studentId}/modules/{moduleId}")
public class LearningSessionController {
    private final LearningSessionService learningSessionService;

    @Autowired
    public LearningSessionController(LearningSessionService learningSessionService) {
        this.learningSessionService = learningSessionService;
    }

    // *************************** GET-METHODS ***************************

    @Operation(summary = "Get a list of all learning sessions of a module", security = @SecurityRequirement(name =
            "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the learning sessions for the module id",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = LearningSession.class)))
                    }
            )
    })
    @GetMapping(path = "/learningSessions")
    public List<LearningSession> getAllLearningSessionsForModule(@PathVariable("studentId") Long studentId,
                                                                 @PathVariable("moduleId") Long moduleId) {
        return learningSessionService.getAllLearningSessionsForModule(moduleId);
    }

    @Operation(summary = "Get a learning session of a module", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the learning session",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = LearningSession.class))
                    }),
            @ApiResponse(responseCode = "404", description = "Learning session not found",
                    content = @Content)
    })
    @GetMapping(path = "/learningSessions/{learningSessionId}")
    public LearningSession getLearningSession(@PathVariable("studentId") Long studentId,
                                              @PathVariable("moduleId") Long moduleId,
                                              @PathVariable("learningSessionId") Long learningSessionId) {
        return learningSessionService.getLearningSession(moduleId, learningSessionId);
    }

    // *************************** POST-METHODS ***************************

    @Operation(summary = "Create a new learning session", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Learning session created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = LearningSession.class))}),
    })
    @PostMapping(path = "/learningSessions")
    public LearningSession addLearningSession(@PathVariable("studentId") Long studentId,
                                              @PathVariable("moduleId") Long moduleId,
                                              LearningSessionCreateDTO learningSessionCreateDTO) {
        return learningSessionService.addLearningSession(moduleId, learningSessionCreateDTO);
    }
    // *************************** PUT-METHODS ***************************

    @Operation(summary = "Updates a learning session", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Learning session updated",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = LearningSession.class))}),
            @ApiResponse(responseCode = "404", description = "Learning session not found",
                    content = @Content)
    })
    @PutMapping(path = "/learningSessions/{learningSessionId}")
    public LearningSession updateLearningSession(@PathVariable("studentId") Long studentId,
                                                 @PathVariable("moduleId") Long moduleId,
                                                 @PathVariable("learningSessionId") Long learningSessionId,
                                                 @Valid @RequestBody LearningSessionCreateDTO learningSessionCreateDTO) {
        return learningSessionService.updateLearningSession(moduleId, learningSessionId, learningSessionCreateDTO);
    }

    // *************************** DELETE-METHODS ***************************

    @Operation(summary = "Delete a learning session of a module", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Learning session deleted",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Learning session doesn't exists",
                    content = @Content),
            @ApiResponse(responseCode = "403", description = "Learning session does not belong to the module",
                    content = @Content)
    })
    @DeleteMapping(path = "/learningSessions/{learningSessionId}")
    public void deleteLearningSession(@PathVariable("studentId") Long studentId,
                                      @PathVariable("moduleId") Long moduleId,
                                      @PathVariable("learningSessionId") Long learningSessionId) {
        learningSessionService.deleteLearningSession(moduleId, learningSessionId);
    }
}
