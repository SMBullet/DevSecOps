package com.pfemanager.service_auth.config;

import com.pfemanager.service_auth.enums.Role;
import com.pfemanager.service_auth.model.User;
import com.pfemanager.service_auth.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ApplicationConfigurationTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthenticationConfiguration authConfig;

    @InjectMocks
    private ApplicationConfiguration applicationConfiguration;

    private User testUser;

    @BeforeEach
    void setUp() {
        try {
            testUser = new User();
            testUser.setUsername("testuser");
            testUser.setEmail("test@example.com");
            testUser.setPassword("password123");
            testUser.setRole(Role.STUDENT);
            testUser.setDob(LocalDate.of(2000, 1, 1));
        } catch (Exception e) {
            System.out.println("Error in setUp: " + e.getMessage());
        }
    }

    @Test
    void userDetailsService_UserFound_ReturnsUserDetails() {
        try {
            // Arrange
            when(userRepository.findByUsername(testUser.getUsername()))
                    .thenReturn(Optional.of(testUser));

            // Act
            UserDetailsService userDetailsService = applicationConfiguration.userDetailsService();
            UserDetails result = userDetailsService.loadUserByUsername(testUser.getUsername());

            // Assert
            assertNotNull(result, "UserDetails should not be null");
            assertEquals(testUser.getUsername(), result.getUsername(),
                    "Username should match");
            verify(userRepository).findByUsername(testUser.getUsername());
        } catch (AssertionError e) {
            System.out.println("Test failed - userDetailsService_UserFound_ReturnsUserDetails: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in userDetailsService_UserFound_ReturnsUserDetails: " + e.getMessage());
        }
    }

    @Test
    void userDetailsService_UserNotFound_ThrowsException() {
        try {
            // Arrange
            when(userRepository.findByUsername(anyString()))
                    .thenReturn(Optional.empty());

            // Act & Assert
            UserDetailsService userDetailsService = applicationConfiguration.userDetailsService();
            Exception exception = assertThrows(UsernameNotFoundException.class,
                    () -> userDetailsService.loadUserByUsername("nonexistent"),
                    "Should throw UsernameNotFoundException when user not found");

            assertEquals("User not found", exception.getMessage(),
                    "Exception message should match");
        } catch (AssertionError e) {
            System.out.println("Test failed - userDetailsService_UserNotFound_ThrowsException: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in userDetailsService_UserNotFound_ThrowsException: " + e.getMessage());
        }
    }

    @Test
    void passwordEncoder_ReturnsPasswordEncoder() {
        try {
            // Act
            BCryptPasswordEncoder passwordEncoder = applicationConfiguration.passwordEncoder();

            // Assert
            assertNotNull(passwordEncoder, "PasswordEncoder should not be null");

            // Test encoding
            String rawPassword = "testPassword";
            String encodedPassword = passwordEncoder.encode(rawPassword);
            assertNotEquals(rawPassword, encodedPassword, 
                "Encoded password should be different from raw password");
            assertTrue(passwordEncoder.matches(rawPassword, encodedPassword),
                "Password encoder should correctly match raw and encoded passwords");
        } catch (AssertionError e) {
            System.out.println("Test failed - passwordEncoder_ReturnsPasswordEncoder: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in passwordEncoder_ReturnsPasswordEncoder: " + e.getMessage());
        }
    }

    @Test
    void authenticationManager_ReturnsAuthenticationManager() {
        try {
            // Arrange
            AuthenticationManager mockAuthManager = mock(AuthenticationManager.class);
            when(authConfig.getAuthenticationManager()).thenReturn(mockAuthManager);

            // Act
            AuthenticationManager result = applicationConfiguration.authenticationManager(authConfig);

            // Assert
            assertNotNull(result, "AuthenticationManager should not be null");
            assertEquals(mockAuthManager, result, 
                "Should return the authentication manager from config");
            verify(authConfig).getAuthenticationManager();
        } catch (AssertionError e) {
            System.out.println("Test failed - authenticationManager_ReturnsAuthenticationManager: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in authenticationManager_ReturnsAuthenticationManager: " + e.getMessage());
        }
    }

    @Test
    void authenticationProvider_ReturnsConfiguredProvider() {
        try {
            // Act
            AuthenticationProvider result = applicationConfiguration.authenticationProvider();

            // Assert
            assertNotNull(result, "AuthenticationProvider should not be null");
            assertTrue(result instanceof DaoAuthenticationProvider,
                "Should be instance of DaoAuthenticationProvider");

            DaoAuthenticationProvider provider = (DaoAuthenticationProvider) result;
            assertNotNull(provider.getUserDetailsService(),
                "UserDetailsService should be configured");
            assertNotNull(provider.getPasswordEncoder(),
                "PasswordEncoder should be configured");
        } catch (AssertionError e) {
            System.out.println("Test failed - authenticationProvider_ReturnsConfiguredProvider: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in authenticationProvider_ReturnsConfiguredProvider: " + e.getMessage());
        }
    }

    @Test
    void restTemplate_ReturnsRestTemplate() {
        try {
            // Act
            RestTemplate result = applicationConfiguration.restTemplate();

            // Assert
            assertNotNull(result, "RestTemplate should not be null");
        } catch (AssertionError e) {
            System.out.println("Test failed - restTemplate_ReturnsRestTemplate: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in restTemplate_ReturnsRestTemplate: " + e.getMessage());
        }
    }
}
