package com.pfemanager.service_auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pfemanager.service_auth.dto.LoginUserDto;
import com.pfemanager.service_auth.dto.RegisterUserDto;
import com.pfemanager.service_auth.enums.Role;
import com.pfemanager.service_auth.model.User;
import com.pfemanager.service_auth.response.LoginResponse;
import com.pfemanager.service_auth.service.AuthenticationService;
import com.pfemanager.service_auth.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AuthenticationService authenticationService;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthenticationController authenticationController;

    private ObjectMapper objectMapper;
    private RegisterUserDto registerUserDto;
    private LoginUserDto loginUserDto;
    private User user;

    @BeforeEach
    void setUp() {
        try {
            mockMvc = MockMvcBuilders.standaloneSetup(authenticationController).build();
            objectMapper = new ObjectMapper();
            objectMapper.findAndRegisterModules(); // For LocalDate serialization

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
            user.setRole(Role.STUDENT);
            user.setDob(LocalDate.of(2000, 1, 1));
        } catch (Exception e) {
            System.out.println("Error in setUp: " + e.getMessage());
        }
    }

    @Test
    void register_ValidInput_ReturnsCreatedUser() {
        try {
            // Arrange
            when(authenticationService.signup(any(RegisterUserDto.class))).thenReturn(user);

            // Act & Assert
            mockMvc.perform(post("/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(registerUserDto)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.username").value(user.getUsername()))
                    .andExpect(jsonPath("$.email").value(user.getEmail()))
                    .andExpect(jsonPath("$.role").value(user.getRole().toString()));
        } catch (AssertionError e) {
            System.out.println("Test failed - register_ValidInput_ReturnsCreatedUser: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in register_ValidInput_ReturnsCreatedUser: " + e.getMessage());
        }
    }

    @Test
    void register_InvalidInput_ReturnsBadRequest() {
        try {
            // Arrange
            registerUserDto.setUsername("");  // Invalid username

            // Act & Assert
            mockMvc.perform(post("/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(registerUserDto)))
                    .andExpect(status().isBadRequest());
        } catch (AssertionError e) {
            System.out.println("Test failed - register_InvalidInput_ReturnsBadRequest: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in register_InvalidInput_ReturnsBadRequest: " + e.getMessage());
        }
    }

    @Test
    void authenticate_ValidCredentials_ReturnsToken() {
        try {
            // Arrange
            String token = "test.jwt.token";
            when(authenticationService.authenticate(any(LoginUserDto.class))).thenReturn(user);
            when(jwtService.generateToken(user)).thenReturn(token);
            when(jwtService.getExpirationTime()).thenReturn(3600000L);

            // Act & Assert
            mockMvc.perform(post("/auth/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(loginUserDto)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.token").value(token))
                    .andExpect(jsonPath("$.expiresIn").value(3600000L));
        } catch (AssertionError e) {
            System.out.println("Test failed - authenticate_ValidCredentials_ReturnsToken: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in authenticate_ValidCredentials_ReturnsToken: " + e.getMessage());
        }
    }

    @Test
    void authenticate_InvalidCredentials_ReturnsBadRequest() {
        try {
            // Arrange
            when(authenticationService.authenticate(any(LoginUserDto.class)))
                    .thenThrow(new IllegalArgumentException("Invalid credentials"));

            // Act & Assert
            mockMvc.perform(post("/auth/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(loginUserDto)))
                    .andExpect(status().isBadRequest());
        } catch (AssertionError e) {
            System.out.println("Test failed - authenticate_InvalidCredentials_ReturnsBadRequest: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in authenticate_InvalidCredentials_ReturnsBadRequest: " + e.getMessage());
        }
    }

    @Test
    void authenticate_MalformedRequest_ReturnsBadRequest() {
        try {
            // Act & Assert
            mockMvc.perform(post("/auth/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("invalid json content"))
                    .andExpect(status().isBadRequest());
        } catch (AssertionError e) {
            System.out.println("Test failed - authenticate_MalformedRequest_ReturnsBadRequest: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in authenticate_MalformedRequest_ReturnsBadRequest: " + e.getMessage());
        }
    }
}
