package com.github.philippvogel92.studenttimerbackend.learningSession;

import com.github.philippvogel92.studenttimerbackend.learningSession.dto.LearningSessionCreateDTO;
import com.github.philippvogel92.studenttimerbackend.module.Module;
import com.github.philippvogel92.studenttimerbackend.module.ModuleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Component
public class LearningSessionService {
    private final ModuleRepository moduleRepository;
    private final LearningSessionRepository learningSessionRepository;

    @Autowired
    public LearningSessionService(ModuleRepository moduleRepository,
                                  LearningSessionRepository learningSessionRepository) {
        this.moduleRepository = moduleRepository;
        this.learningSessionRepository = learningSessionRepository;
    }

    public List<LearningSession> getAllLearningSessionsForModule(Long moduleId) {
        Module module =
                moduleRepository.findById(moduleId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Module not found"));
        return module.getLearningSessions();
    }

    public LearningSession getLearningSession(Long moduleId, Long learningSessionId) {
        LearningSession learningSession =
                learningSessionRepository.findById(learningSessionId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Learning session doesn't exists"));
        if (!Objects.equals(learningSession.getModule().getId(), moduleId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Learning session does not belong to the module");
        }
        return learningSession;
    }

    public LearningSession addLearningSession(Long moduleId, LearningSessionCreateDTO learningSessionCreateDTO) {
        Module module =
                moduleRepository.findById(moduleId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Module not found"));
        String description = learningSessionCreateDTO.getDescription();
        Integer focusDuration = learningSessionCreateDTO.getFocusDuration();
        Integer totalDuration = learningSessionCreateDTO.getTotalDuration();
        Integer rating = learningSessionCreateDTO.getRating();

        LearningSession learningSession = new LearningSession(totalDuration, focusDuration, rating, LocalDateTime.now(),
                description, module);

        return learningSessionRepository.save(learningSession);
    }

    public void deleteLearningSession(Long moduleId, Long learningSessionId) {
        LearningSession learningSession =
                learningSessionRepository.findById(learningSessionId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Learning Session doesn't exists"));
        if (!Objects.equals(learningSession.getModule().getId(), moduleId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Learning Session does not belong to the module");
        }
        learningSessionRepository.delete(learningSession);
    }

    @Transactional
    public LearningSession updateLearningSession(Long moduleId, Long learningSessionId,
                                                 LearningSessionCreateDTO learningSessionCreateDTO) {
        LearningSession learningSession =
                learningSessionRepository.findById(learningSessionId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Learning Session doesn't exists"));

        if (!Objects.equals(learningSession.getModule().getId(), moduleId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Learning Session does not belong to the module");
        }

        learningSession.setTotalDuration(learningSessionCreateDTO.getTotalDuration());
        learningSession.setFocusDuration(learningSessionCreateDTO.getFocusDuration());
        learningSession.setRating(learningSessionCreateDTO.getRating());
        learningSession.setUpdatedAt(LocalDateTime.now());
        learningSession.setDescription(learningSessionCreateDTO.getDescription());

        return learningSession;
    }
}
