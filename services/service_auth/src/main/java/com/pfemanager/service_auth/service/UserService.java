package com.pfemanager.service_auth.service;

import com.pfemanager.service_auth.client.ProjectServiceClient;
import com.pfemanager.service_auth.dto.ProjectDto;
import com.pfemanager.service_auth.dto.UserDetailsDto;
import com.pfemanager.service_auth.dto.UserDto;
import org.springframework.stereotype.Service;
import com.pfemanager.service_auth.repository.UserRepository;
import com.pfemanager.service_auth.model.User;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ProjectServiceClient projectServiceClient;

    public UserService(UserRepository userRepository, ProjectServiceClient projectServiceClient) {
        this.userRepository = userRepository;
        this.projectServiceClient = projectServiceClient;
    }

    public UserDetailsDto getUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        List<ProjectDto> projects = user.getProjects().stream()
                .map(projectServiceClient::getProjectById)
                .collect(Collectors.toList());

        UserDto userDto = UserDto.builder()

                .username(user.getUsername())
                .email(user.getEmail())
                .projects(projects)
                .build();

        return UserDetailsDto.builder()
                .user(userDto)
                .projects(projects)
                .build();
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