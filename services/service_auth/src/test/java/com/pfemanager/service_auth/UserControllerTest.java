package com.pfemanager.service_auth.controller;

import com.pfemanager.service_auth.dto.UserDetailsDto;
import com.pfemanager.service_auth.dto.UserDto;
import com.pfemanager.service_auth.dto.UserforProjectDto;
import com.pfemanager.service_auth.enums.Role;
import com.pfemanager.service_auth.model.User;
import com.pfemanager.service_auth.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private Authentication authentication;

    @Mock
    private SecurityContext securityContext;

    @InjectMocks
    private UserController userController;

    private User mockUser;
    private UserDetailsDto mockUserDetailsDto;
    private UUID userId;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        userId = UUID.randomUUID();
        mockUser = new User();
        mockUser.setId(userId);
        mockUser.setUsername("testUser");
        mockUser.setEmail("test@example.com");
        mockUser.setRole(Role.STUDENT);
        mockUser.setDob(LocalDate.of(2000, 1, 1));
        mockUser.setProjects(new ArrayList<>());

        UserDto userDto = new UserDto(mockUser);
        mockUserDetailsDto = UserDetailsDto.builder()
                .user(userDto)
                .projectDetails(new ArrayList<>())
                .build();

        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(authentication.getPrincipal()).thenReturn(mockUser);
    }

    @Test
    void authenticatedUser_ReturnsUserDetails() {
        when(userService.getUser(userId)).thenReturn(mockUserDetailsDto);

        ResponseEntity<UserDetailsDto> response = userController.authenticatedUser();

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(mockUser.getUsername(), response.getBody().getUser().getUsername());
        assertEquals(mockUser.getEmail(), response.getBody().getUser().getEmail());

        verify(userService).getUser(userId);
    }

    @Test
    void allUsers_ReturnsListOfUsers() {
        List<User> userList = Arrays.asList(mockUser);
        when(userService.allUsers()).thenReturn(userList);

        ResponseEntity<List<User>> response = userController.allUsers();

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        assertEquals(mockUser.getUsername(), response.getBody().get(0).getUsername());

        verify(userService).allUsers();
    }

    @Test
    void findById_WithValidId_ReturnsUser() {
        when(userService.findById(userId)).thenReturn(Optional.of(mockUser));

        ResponseEntity<UserDto> response = userController.findById(userId);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(mockUser.getUsername(), response.getBody().getUsername());

        verify(userService).findById(userId);
    }

    @Test
    void findById_WithInvalidId_ThrowsException() {
        when(userService.findById(userId)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> {
            userController.findById(userId);
        });

        verify(userService).findById(userId);
    }

    @Test
    void findUserbyId_WithValidId_ReturnsUserForProject() {
        when(userService.findById(userId)).thenReturn(Optional.of(mockUser));

        ResponseEntity<UserforProjectDto> response = userController.findUserbyId(userId);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(mockUser.getUsername(), response.getBody().getUsername());
        assertEquals(mockUser.getEmail(), response.getBody().getEmail());

        verify(userService).findById(userId);
    }

    @Test
    void addProjectToUser_Success() {
        UUID projectId = UUID.randomUUID();
        Map<String, String> payload = new HashMap<>();
        payload.put("userId", userId.toString());
        payload.put("projectId", projectId.toString());

        when(userService.addProjectToUser(userId, projectId)).thenReturn(mockUser);

        ResponseEntity<UserDto> response = userController.addProjectToUser(payload);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(mockUser.getUsername(), response.getBody().getUsername());

        verify(userService).addProjectToUser(userId, projectId);
    }

    @Test
    void searchUsers_ReturnsMatchingUsers() {
        String query = "test";
        List<User> matchingUsers = Arrays.asList(mockUser);
        when(userService.searchUsers(query)).thenReturn(matchingUsers);

        ResponseEntity<List<User>> response = userController.searchUsers(query);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        assertEquals(mockUser.getUsername(), response.getBody().get(0).getUsername());

        verify(userService).searchUsers(query);
    }

    @Test
    void teacher_ReturnsTeacherPage() {
        String response = userController.teacher();
        assertEquals("This is the teacher page", response);
    }
}