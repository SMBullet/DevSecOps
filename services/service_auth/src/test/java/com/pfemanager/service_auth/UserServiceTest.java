package com.pfemanager.service_auth.service;

import com.pfemanager.service_auth.dto.ProjectDto;
import com.pfemanager.service_auth.dto.UserDetailsDto;
import com.pfemanager.service_auth.dto.UserDto;
import com.pfemanager.service_auth.model.User;
import com.pfemanager.service_auth.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User mockUser;
    private UUID mockUserId;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Setup mock user
        mockUserId = UUID.randomUUID();
        mockUser = new User();
        mockUser.setId(mockUserId);
        mockUser.setUsername("testUser");
    }

    @Test
    void getUser_Success() {
        when(userRepository.findById(mockUserId)).thenReturn(Optional.of(mockUser));

        UserDetailsDto result = userService.getUser(mockUserId);

        assertNotNull(result);
        assertEquals(mockUser.getUsername(), result.getUser().getUsername());
        verify(userRepository).findById(mockUserId);
    }

    @Test
    void addProjectToUser_Success() {
        UUID projectId = UUID.randomUUID();
        when(userRepository.findById(mockUserId)).thenReturn(Optional.of(mockUser));

        User result = userService.addProjectToUser(mockUserId, projectId);

        assertNotNull(result);
        assertTrue(result.getProjects().contains(projectId));
    }
}
