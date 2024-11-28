package com.pfemanager.service_auth.service;

import org.springframework.stereotype.Service;
import com.pfemanager.service_auth.repository.UserRepository;
import com.pfemanager.service_auth.model.User;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    public Optional<User> findById(UUID id){
        return userRepository.findById(id);
    }
}