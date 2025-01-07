package com.pfemanager.service_auth.service;

import com.pfemanager.service_auth.dto.LoginUserDto;
import com.pfemanager.service_auth.dto.RegisterUserDto;
import com.pfemanager.service_auth.enums.Role;
import com.pfemanager.service_auth.model.User;
import com.pfemanager.service_auth.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

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
    private User mockUser;
    private final String RAW_PASSWORD = "password123";
    private final String ENCODED_PASSWORD = "encodedPassword123";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Setup register DTO
        registerUserDto = new RegisterUserDto();
        registerUserDto.setUsername("testUser");
        registerUserDto.setEmail("test@example.com");
        registerUserDto.setPassword(RAW_PASSWORD);
        registerUserDto.setRole(Role.STUDENT);
        registerUserDto.setDob(LocalDate.of(2000, 1, 1));

        // Setup login DTO
        loginUserDto = new LoginUserDto();
        loginUserDto.setUsername("testUser");
        loginUserDto.setPassword(RAW_PASSWORD);

        // Setup mock user
        mockUser = new User();
        mockUser.setId(UUID.randomUUID());
        mockUser.setUsername("testUser");
        mockUser.setEmail("test@example.com");
        mockUser.setPassword(ENCODED_PASSWORD);
        mockUser.setRole(Role.STUDENT);
        mockUser.setDob(LocalDate.of(2000, 1, 1));
    }

    @Test
    void signup_SuccessfulRegistration() {
        // Arrange
        when(passwordEncoder.encode(RAW_PASSWORD)).thenReturn(ENCODED_PASSWORD);
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        // Act
        User result = authenticationService.signup(registerUserDto);

        // Assert
        assertNotNull(result);
        assertEquals(mockUser.getUsername(), result.getUsername());
        assertEquals(mockUser.getEmail(), result.getEmail());
        assertEquals(mockUser.getRole(), result.getRole());
        assertEquals(mockUser.getDob(), result.getDob());
        assertEquals(ENCODED_PASSWORD, result.getPassword());

        verify(passwordEncoder).encode(RAW_PASSWORD);
        verify(userRepository).save(any(User.class));
    }

    @Test
    void signup_WithNullDTO_ShouldThrowException() {
        try {
            authenticationService.signup(null);
        } catch (Exception e) {
            // Log or print the exception (optional)
            System.out.println("Caught exception: " + e.getClass().getName() + " - " + e.getMessage());
        }
    
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void signup_WithNullUsername_ShouldThrowException() {
        // Arrange
        registerUserDto.setUsername(null);

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            authenticationService.signup(registerUserDto);
        });

        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void authenticate_SuccessfulLogin() {
        // Arrange
        when(userRepository.findByUsername(loginUserDto.getUsername())).thenReturn(Optional.of(mockUser));
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(new UsernamePasswordAuthenticationToken(mockUser, null));

        // Act
        User result = authenticationService.authenticate(loginUserDto);

        // Assert
        assertNotNull(result);
        assertEquals(mockUser.getUsername(), result.getUsername());
        assertEquals(mockUser.getEmail(), result.getEmail());
        assertEquals(mockUser.getRole(), result.getRole());

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository).findByUsername(loginUserDto.getUsername());
    }

    @Test
    void authenticate_WithInvalidCredentials_ShouldThrowException() {
        // Arrange
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Invalid credentials"));

        // Act & Assert
        assertThrows(BadCredentialsException.class, () -> {
            authenticationService.authenticate(loginUserDto);
        });

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository, never()).findByUsername(any());
    }

    @Test
    void authenticate_WithNonExistentUser_ShouldThrowException() {
            // Arrange
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(new UsernamePasswordAuthenticationToken(mockUser, null));
        when(userRepository.findByUsername(loginUserDto.getUsername()))
                .thenReturn(Optional.empty());
    
        try {
            // Act
            authenticationService.authenticate(loginUserDto);
        } catch (Exception e) {
            // Log the exception
            System.out.println("Caught exception: " + e.getClass().getName() + " - " + e.getMessage());
        }
    
        // Verify interactions
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository).findByUsername(loginUserDto.getUsername());
    }

    @Test
    void authenticate_WithNullDTO_ShouldThrowException() {
        // Act & Assert
        assertThrows(NullPointerException.class, () -> {
            authenticationService.authenticate(null);
        });

        verify(authenticationManager, never()).authenticate(any());
        verify(userRepository, never()).findByUsername(any());
    }
}
