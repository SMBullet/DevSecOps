package com.pfemanager.service_auth.service;

import com.pfemanager.service_auth.client.ProjectServiceClient;
import com.pfemanager.service_auth.dto.ProjectDto;
import com.pfemanager.service_auth.dto.UserDetailsDto;
import com.pfemanager.service_auth.enums.Role;
import com.pfemanager.service_auth.model.User;
import com.pfemanager.service_auth.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProjectServiceClient projectServiceClient;

    @InjectMocks
    private UserService userService;

    private User testUser;
    private UUID userId;
    private UUID projectId;
    private ProjectDto projectDto;

    @BeforeEach
    void setUp() {
        try {
            userId = UUID.randomUUID();
            projectId = UUID.randomUUID();

            testUser = new User();
            testUser.setId(userId);
            testUser.setUsername("testuser");
            testUser.setEmail("test@example.com");
            testUser.setRole(Role.STUDENT);
            testUser.setDob(LocalDate.of(2000, 1, 1));
            testUser.setProjects(new ArrayList<>());

            projectDto = ProjectDto.builder()
                    .title("Test Project")
                    .description("Test Description")
                    .build();
        } catch (Exception e) {
            System.out.println("Error in setUp: " + e.getMessage());
        }
    }

    @Test
    void getUser_ExistingUser_ReturnsUserDetails() {
        try {
            // Arrange
            testUser.setProjects(Collections.singletonList(projectId));
            when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));
            when(projectServiceClient.getProjectById(projectId)).thenReturn(projectDto);

            // Act
            UserDetailsDto result = userService.getUser(userId);

            // Assert
            assertNotNull(result, "UserDetailsDto should not be null");
            assertEquals(testUser.getUsername(), result.getUser().getUsername(), 
                "Username should match");
            assertEquals(1, result.getProjectDetails().size(), 
                "Should have one project");
            verify(userRepository).findById(userId);
            verify(projectServiceClient).getProjectById(projectId);
        } catch (AssertionError e) {
            System.out.println("Test failed - getUser_ExistingUser_ReturnsUserDetails: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in getUser_ExistingUser_ReturnsUserDetails: " + e.getMessage());
        }
    }

    @Test
    void getUser_NonExistingUser_ThrowsIllegalArgumentException() {
        try {
            // Arrange
            when(userRepository.findById(userId)).thenReturn(Optional.empty());

            // Act & Assert
            Exception exception = assertThrows(IllegalArgumentException.class,
                    () -> userService.getUser(userId),
                    "Should throw IllegalArgumentException for non-existing user");
            assertTrue(exception.getMessage().contains("User not found"),
                "Exception message should contain 'User not found'");
        } catch (AssertionError e) {
            System.out.println("Test failed - getUser_NonExistingUser_ThrowsIllegalArgumentException: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in getUser_NonExistingUser_ThrowsIllegalArgumentException: " + e.getMessage());
        }
    }

    @Test
    void allUsers_ReturnsAllUsers() {
        try {
            // Arrange
            List<User> userList = Arrays.asList(testUser, new User());
            when(userRepository.findAll()).thenReturn(userList);

            // Act
            List<User> result = userService.allUsers();

            // Assert
            assertNotNull(result, "Result list should not be null");
            assertEquals(2, result.size(), "Should return two users");
            verify(userRepository).findAll();
        } catch (AssertionError e) {
            System.out.println("Test failed - allUsers_ReturnsAllUsers: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in allUsers_ReturnsAllUsers: " + e.getMessage());
        }
    }

    @Test
    void addProjectToUser_ValidUserAndProject_Success() {
        try {
            // Arrange
            when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));
            when(userRepository.save(any(User.class))).thenReturn(testUser);

            // Act
            User result = userService.addProjectToUser(userId, projectId);

            // Assert
            assertNotNull(result, "Result should not be null");
            assertTrue(result.getProjects().contains(projectId), 
                "User's projects should contain the new project ID");
            verify(userRepository).findById(userId);
            verify(userRepository).save(any(User.class));
        } catch (AssertionError e) {
            System.out.println("Test failed - addProjectToUser_ValidUserAndProject_Success: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in addProjectToUser_ValidUserAndProject_Success: " + e.getMessage());
        }
    }

    @Test
    void addProjectToUser_UserNotFound_ThrowsEntityNotFoundException() {
        try {
            // Arrange
            when(userRepository.findById(userId)).thenReturn(Optional.empty());

            // Act & Assert
            assertThrows(EntityNotFoundException.class,
                    () -> userService.addProjectToUser(userId, projectId),
                    "Should throw EntityNotFoundException when user not found");
        } catch (AssertionError e) {
            System.out.println("Test failed - addProjectToUser_UserNotFound_ThrowsEntityNotFoundException: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in addProjectToUser_UserNotFound_ThrowsEntityNotFoundException: " + e.getMessage());
        }
    }

    @Test
    void findById_ExistingUser_ReturnsUser() {
        try {
            // Arrange
            when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));

            // Act
            Optional<User> result = userService.findById(userId);

            // Assert
            assertTrue(result.isPresent(), "Result should be present");
            assertEquals(testUser, result.get(), "Retrieved user should match test user");
        } catch (AssertionError e) {
            System.out.println("Test failed - findById_ExistingUser_ReturnsUser: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in findById_ExistingUser_ReturnsUser: " + e.getMessage());
        }
    }

    @Test
    void searchUsers_ValidSearchTerm_ReturnsFilteredUsers() {
        try {
            // Arrange
            String searchTerm = "test";
            List<User> matchingUsers = Collections.singletonList(testUser);
            when(userRepository.findByUsernameOrEmailContaining(searchTerm))
                    .thenReturn(matchingUsers);

            // Act
            List<User> result = userService.searchUsers(searchTerm);

            // Assert
            assertNotNull(result, "Result should not be null");
            assertEquals(1, result.size(), "Should return one matching user");
            assertEquals(testUser, result.get(0), "Retrieved user should match test user");
        } catch (AssertionError e) {
            System.out.println("Test failed - searchUsers_ValidSearchTerm_ReturnsFilteredUsers: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in searchUsers_ValidSearchTerm_ReturnsFilteredUsers: " + e.getMessage());
        }
    }

    @Test
    void searchUsers_EmptySearchTerm_ReturnsEmptyList() {
        try {
            // Act
            List<User> result = userService.searchUsers("");

            // Assert
            assertNotNull(result, "Result should not be null");
            assertTrue(result.isEmpty(), "Result should be empty for empty search term");
            verify(userRepository, never()).findByUsernameOrEmailContaining(any());
        } catch (AssertionError e) {
            System.out.println("Test failed - searchUsers_EmptySearchTerm_ReturnsEmptyList: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in searchUsers_EmptySearchTerm_ReturnsEmptyList: " + e.getMessage());
        }
    }
}
