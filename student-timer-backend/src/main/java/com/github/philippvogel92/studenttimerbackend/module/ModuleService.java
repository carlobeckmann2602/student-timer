package com.github.philippvogel92.studenttimerbackend.module;

import com.github.philippvogel92.studenttimerbackend.student.Student;
import com.github.philippvogel92.studenttimerbackend.student.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@Component
public class ModuleService {
    private final ModuleRepository moduleRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public ModuleService(ModuleRepository moduleRepository, StudentRepository studentRepository) {
        this.moduleRepository = moduleRepository;
        this.studentRepository =studentRepository;
    }

    public List<Module> getAllModulesForStudent(Long studentId){
        Student student =  studentRepository.findById(studentId).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Student not found"));
        return student.getModules();
    }

    public Module getModule(Long studentId, Long moduleId){
        Module module = moduleRepository.findById(moduleId).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Module doesn't exists"));
        if(!Objects.equals(module.getStudent().getId(), studentId)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Module does not belong to the student");
        }
        return module;
    }
}
