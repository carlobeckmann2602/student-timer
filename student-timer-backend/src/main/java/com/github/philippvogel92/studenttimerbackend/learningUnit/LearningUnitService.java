package com.github.philippvogel92.studenttimerbackend.learningUnit;

import com.github.philippvogel92.studenttimerbackend.learningUnit.dto.LearningUnitCreateDTO;
import com.github.philippvogel92.studenttimerbackend.module.Module;
import com.github.philippvogel92.studenttimerbackend.module.ModuleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
public class LearningUnitService {
    private final ModuleRepository moduleRepository;
    private final LearningUnitRepository learningUnitRepository;

    @Autowired
    public LearningUnitService(ModuleRepository moduleRepository, LearningUnitRepository learningUnitRepository) {
        this.moduleRepository = moduleRepository;
        this.learningUnitRepository = learningUnitRepository;
    }

    public List<LearningUnit> getAllLearningUnitsForModule(Long moduleId) {
        Module module =
                moduleRepository.findById(moduleId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Module not found"));
        return module.getLearningUnits();
    }

    public LearningUnit getLearningUnit(Long moduleId, Long learningUnitId) {
        LearningUnit learningUnit =
                learningUnitRepository.findById(learningUnitId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Learning unit doesn't exists"));
        if (!Objects.equals(learningUnit.getModule().getId(), moduleId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Learning unit does not belong to the module");
        }
        return learningUnit;
    }

    public LearningUnit addLearningUnit(Long moduleId, LearningUnitCreateDTO learningUnitCreateDTO) {
        Module module =
                moduleRepository.findById(moduleId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Module not found"));
        LearningUnitEnum name = learningUnitCreateDTO.getName();
        LocalDate startDate = learningUnitCreateDTO.getStartDate();
        LocalDate endDate = learningUnitCreateDTO.getEndDate();
        Double workloadPerWeek = learningUnitCreateDTO.getWorkloadPerWeek();

        LearningUnit learningUnit = new LearningUnit(name, startDate, endDate, workloadPerWeek, module);

        return learningUnitRepository.save(learningUnit);
    }

    public void deleteLearningUnit(Long moduleId, Long learningUnitId) {
        LearningUnit learningUnit =
                learningUnitRepository.findById(learningUnitId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Learning Unit doesn't exists"));
        Module module =
                moduleRepository.findById(moduleId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Module not found"));

        boolean isLearningUnitRemoved = module.getLearningUnits().remove(learningUnit);
        if (!isLearningUnitRemoved) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Learning Unit not found in module");
        }
        moduleRepository.save(module);
    }

    @Transactional
    public LearningUnit updateLearningUnit(Long moduleId, Long learningUnitId,
                                           LearningUnitCreateDTO learningUnitCreateDTO) {
        LearningUnit learningUnit =
                learningUnitRepository.findById(learningUnitId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Learning Unit doesn't exists"));

        if (!Objects.equals(learningUnit.getModule().getId(), moduleId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Learning Unit does not belong to the module");
        }

        learningUnit.setName(learningUnitCreateDTO.getName());
        learningUnit.setStartDate(learningUnitCreateDTO.getStartDate());
        learningUnit.setEndDate(learningUnitCreateDTO.getEndDate());
        learningUnit.setWorkloadPerWeek(learningUnitCreateDTO.getWorkloadPerWeek());

        return learningUnit;
    }
}
