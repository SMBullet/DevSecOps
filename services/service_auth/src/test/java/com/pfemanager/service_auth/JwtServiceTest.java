package com.pfemanager.service_auth.service;

import com.pfemanager.service_auth.model.User;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JwtServiceTest {

    @InjectMocks
    private JwtService jwtService;

    @Mock
    private User mockUser;

    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setUsername("testUser");
    }

    @Test
    void generateToken_Success() {
        String token = jwtService.generateToken(mockUser);
        assertNotNull(token);
    }

    @Test
    void validateToken_Success() {
        String token = jwtService.generateToken(mockUser);
        boolean isValid = jwtService.isTokenValid(token, mockUser);
        assertTrue(isValid);
    }
}
