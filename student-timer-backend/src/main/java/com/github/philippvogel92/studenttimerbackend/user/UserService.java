package com.github.philippvogel92.studenttimerbackend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository= userRepository;
    }

    public User getUser(Long userId){
        return userRepository.getReferenceById(userId);
    }
}
