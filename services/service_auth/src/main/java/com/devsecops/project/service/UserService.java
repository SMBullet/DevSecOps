package com.devsecops.project.service;

import org.springframework.stereotype.Service;
import com.devsecops.project.repository.UserRepository;
import com.devsecops.project.model.User;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }
}