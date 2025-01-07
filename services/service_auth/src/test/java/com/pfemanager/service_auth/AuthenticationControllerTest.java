package com.pfemanager.service_auth.controller;

import com.pfemanager.service_auth.dto.LoginUserDto;
import com.pfemanager.service_auth.dto.RegisterUserDto;
import com.pfemanager.service_auth.enums.Role;
import com.pfemanager.service_auth.model.User;
import com.pfemanager.service_auth.response.LoginResponse;
import com.pfemanager.service_auth.service.AuthenticationService;
import com.pfemanager.service_auth.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthenticationControllerTest {

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationService authenticationService;

    @InjectMocks
    private AuthenticationController authenticationController;

    private User mockUser;
    private RegisterUserDto registerUserDto;
    private LoginUserDto loginUserDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Setup mock user
        mockUser = new User();
        mockUser.setId(UUID.randomUUID());
        mockUser.setUsername("testUser");
        mockUser.setEmail("test@example.com");
        mockUser.setPassword("encodedPassword");
        mockUser.setRole(Role.STUDENT);
        mockUser.setDob(LocalDate.of(2000, 1, 1));

        // Setup register DTO
        registerUserDto = new RegisterUserDto();
        registerUserDto.setUsername("testUser");
        registerUserDto.setEmail("test@example.com");
        registerUserDto.setPassword("password123");
        registerUserDto.setRole(Role.STUDENT);
        registerUserDto.setDob(LocalDate.of(2000, 1, 1));

        // Setup login DTO
        loginUserDto = new LoginUserDto();
        loginUserDto.setUsername("testUser");
        loginUserDto.setPassword("password123");
    }

    @Test
    void register_SuccessfulRegistration() {
        when(authenticationService.signup(any(RegisterUserDto.class))).thenReturn(mockUser);

        ResponseEntity<User> response = authenticationController.register(registerUserDto);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(mockUser.getUsername(), response.getBody().getUsername());
        assertEquals(mockUser.getEmail(), response.getBody().getEmail());
        assertEquals(mockUser.getRole(), response.getBody().getRole());

        verify(authenticationService).signup(any(RegisterUserDto.class));
    }

    @Test
    void authenticate_SuccessfulLogin() {
        when(authenticationService.authenticate(any(LoginUserDto.class))).thenReturn(mockUser);
        when(jwtService.generateToken(mockUser)).thenReturn("mockToken");
        when(jwtService.getExpirationTime()).thenReturn(3600000L);

        ResponseEntity<LoginResponse> response = authenticationController.authenticate(loginUserDto);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals("mockToken", response.getBody().getToken());
        assertEquals(3600000L, response.getBody().getExpiresIn());

        verify(authenticationService).authenticate(any(LoginUserDto.class));
        verify(jwtService).generateToken(mockUser);
        verify(jwtService).getExpirationTime();
    }

    @Test
    void register_WithNullInput() {
        RegisterUserDto nullDto = null;
        assertThrows(IllegalArgumentException.class, () -> {
            authenticationController.register(nullDto);
        });
    }

    @Test
    void authenticate_WithNullInput() {
        LoginUserDto nullDto = null;
        assertThrows(IllegalArgumentException.class, () -> {
            authenticationController.authenticate(nullDto);
        });
    }
}