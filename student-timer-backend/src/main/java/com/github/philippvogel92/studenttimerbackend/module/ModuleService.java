package com.github.philippvogel92.studenttimerbackend.module;

import com.github.philippvogel92.studenttimerbackend.module.dto.ModuleCreateDTO;
import com.github.philippvogel92.studenttimerbackend.student.Student;
import com.github.philippvogel92.studenttimerbackend.student.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Component
public class ModuleService {
    private final ModuleRepository moduleRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public ModuleService(ModuleRepository moduleRepository, StudentRepository studentRepository) {
        this.moduleRepository = moduleRepository;
        this.studentRepository = studentRepository;
    }


    public List<Module> getAllModulesForStudent(Long studentId) {
        Student student =
                studentRepository.findById(studentId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
        return student.getModules();
    }

    public Module getModule(Long studentId, Long moduleId) {
        Module module =
                moduleRepository.findById(moduleId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Module doesn't exists"));
        if (!Objects.equals(module.getStudent().getId(), studentId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Module does not belong to the student");
        }
        return module;
    }

    public Module addModule(Long studentId, ModuleCreateDTO moduleCreateDTO) {
        Student student =
                studentRepository.findById(studentId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
        String name = moduleCreateDTO.getName();
        String colorCode = moduleCreateDTO.getColorCode();
        Integer creditpoints = moduleCreateDTO.getCreditpoints();
        LocalDate examDate = moduleCreateDTO.getExamDate();

        Module module = new Module(name, colorCode, creditpoints, examDate, student);

        return moduleRepository.save(module);
    }

    public void deleteModule(Long studentId, Long moduleId) {
        Module module =
                moduleRepository.findById(moduleId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Module doesn't exists"));
        if (!Objects.equals(module.getStudent().getId(), studentId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Module does not belong to the student");
        }
        moduleRepository.delete(module);
    }

    @Transactional
    public Module updateModule(Long studentId, Long moduleId, ModuleCreateDTO moduleCreateDTO) {
        Module module =
                moduleRepository.findById(moduleId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Module doesn't exists"));

        if (!Objects.equals(module.getStudent().getId(), studentId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Module does not belong to the student");
        }

        module.setName(moduleCreateDTO.getName());
        module.setExamDate(moduleCreateDTO.getExamDate());
        module.setColorCode(moduleCreateDTO.getColorCode());
        module.setCreditPoints(moduleCreateDTO.getCreditpoints());

        return module;
    }
}
