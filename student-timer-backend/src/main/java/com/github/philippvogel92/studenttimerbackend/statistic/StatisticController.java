package com.github.philippvogel92.studenttimerbackend.statistic;

import com.github.philippvogel92.studenttimerbackend.student.Student;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@ApiResponses(value = {
        @ApiResponse(responseCode = "401", description = "Not authorized for this resource",
                content = @Content)
})
@RestController
@RequestMapping(path = "/students/{studentId}")
public class StatisticController {

    private final StatisticService statisticService;

    @Autowired
    public StatisticController(StatisticService statisticService) {
        this.statisticService = statisticService;
    }

    @Operation(summary = "Get the statistics by studentId", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the students statistics",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Statistic.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid id supplied",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Student not found",
                    content = @Content)
    })
    @GetMapping(path = "/statistics")
    public Statistic getStatistic(@PathVariable("studentId") Long studentId) {
        return statisticService.getStatistic(studentId);
    }

}
