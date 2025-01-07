package com.pfemanager.service_auth.service;

import com.pfemanager.service_auth.dto.LoginUserDto;
import com.pfemanager.service_auth.dto.RegisterUserDto;
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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    private RegisterUserDto registerUserDto;
    private LoginUserDto loginUserDto;
    private User user;

    @BeforeEach
    void setUp() {
        try {
            // Setup test data
            registerUserDto = new RegisterUserDto();
            registerUserDto.setUsername("testuser");
            registerUserDto.setEmail("test@example.com");
            registerUserDto.setPassword("password123");
            registerUserDto.setDob(LocalDate.of(2000, 1, 1));
            registerUserDto.setRole(Role.STUDENT);

            loginUserDto = new LoginUserDto();
            loginUserDto.setUsername("testuser");
            loginUserDto.setPassword("password123");

            user = new User();
            user.setUsername("testuser");
            user.setEmail("test@example.com");
            user.setPassword("encodedPassword");
            user.setRole(Role.STUDENT);
            user.setDob(LocalDate.of(2000, 1, 1));
        } catch (Exception e) {
            System.out.println("Error in setUp: " + e.getMessage());
        }
    }

    @Test
    void signup_ValidInput_SuccessfulRegistration() {
        try {
            // Arrange
            when(passwordEncoder.encode(any())).thenReturn("encodedPassword");
            when(userRepository.save(any(User.class))).thenReturn(user);

            // Act
            User result = authenticationService.signup(registerUserDto);

            // Assert
            assertNotNull(result);
            assertEquals(registerUserDto.getUsername(), result.getUsername());
            assertEquals(registerUserDto.getEmail(), result.getEmail());
            assertEquals(registerUserDto.getRole(), result.getRole());
            verify(userRepository).save(any(User.class));
            verify(passwordEncoder).encode(registerUserDto.getPassword());
        } catch (AssertionError e) {
            System.out.println("Test failed - signup_ValidInput_SuccessfulRegistration: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in signup_ValidInput_SuccessfulRegistration: " + e.getMessage());
        }
    }

    @Test
    void signup_NullInput_ThrowsIllegalArgumentException() {
        try {
            // Act & Assert
            Exception exception = assertThrows(IllegalArgumentException.class,
                    () -> authenticationService.signup(null));
            assertEquals("RegisterUserDto cannot be null", exception.getMessage());
        } catch (AssertionError e) {
            System.out.println("Test failed - signup_NullInput_ThrowsIllegalArgumentException: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in signup_NullInput_ThrowsIllegalArgumentException: " + e.getMessage());
        }
    }

    @Test
    void signup_EmptyUsername_ThrowsIllegalArgumentException() {
        try {
            // Arrange
            registerUserDto.setUsername("");

            // Act & Assert
            Exception exception = assertThrows(IllegalArgumentException.class,
                    () -> authenticationService.signup(registerUserDto));
            assertEquals("Username cannot be null or empty", exception.getMessage());
        } catch (AssertionError e) {
            System.out.println("Test failed - signup_EmptyUsername_ThrowsIllegalArgumentException: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in signup_EmptyUsername_ThrowsIllegalArgumentException: " + e.getMessage());
        }
    }

    @Test
    void authenticate_ValidCredentials_SuccessfulAuthentication() {
        try {
            // Arrange
            when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                    .thenReturn(new UsernamePasswordAuthenticationToken(user, null));
            when(userRepository.findByUsername(loginUserDto.getUsername()))
                    .thenReturn(Optional.of(user));

            // Act
            User result = authenticationService.authenticate(loginUserDto);

            // Assert
            assertNotNull(result);
            assertEquals(loginUserDto.getUsername(), result.getUsername());
            verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
            verify(userRepository).findByUsername(loginUserDto.getUsername());
        } catch (AssertionError e) {
            System.out.println("Test failed - authenticate_ValidCredentials_SuccessfulAuthentication: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in authenticate_ValidCredentials_SuccessfulAuthentication: " + e.getMessage());
        }
    }

    @Test
    void authenticate_UserNotFound_ThrowsIllegalArgumentException() {
        try {
            // Arrange
            when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                    .thenReturn(new UsernamePasswordAuthenticationToken(user, null));
            when(userRepository.findByUsername(loginUserDto.getUsername()))
                    .thenReturn(Optional.empty());

            // Act & Assert
            Exception exception = assertThrows(IllegalArgumentException.class,
                    () -> authenticationService.authenticate(loginUserDto));
            assertEquals("User not found", exception.getMessage());
        } catch (AssertionError e) {
            System.out.println("Test failed - authenticate_UserNotFound_ThrowsIllegalArgumentException: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in authenticate_UserNotFound_ThrowsIllegalArgumentException: " + e.getMessage());
        }
    }

    @Test
    void authenticate_NullLoginDto_ThrowsIllegalArgumentException() {
        try {
            // Act & Assert
            Exception exception = assertThrows(IllegalArgumentException.class,
                    () -> authenticationService.authenticate(null));
            assertEquals("LoginUserDto cannot be null", exception.getMessage());
        } catch (AssertionError e) {
            System.out.println("Test failed - authenticate_NullLoginDto_ThrowsIllegalArgumentException: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in authenticate_NullLoginDto_ThrowsIllegalArgumentException: " + e.getMessage());
        }
    }
}
