package com.pfemanager.service_auth.service;

import com.pfemanager.service_auth.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class JwtServiceTest {

    @InjectMocks
    private JwtService jwtService;

    private User mockUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        ReflectionTestUtils.setField(jwtService, "secretKey", "mockSecretKey");
        ReflectionTestUtils.setField(jwtService, "jwtExpiration", 3600000L);

        mockUser = new User();
        mockUser.setUsername("testUser");
    }

    @Test
    void generateToken_Success() {
        String token = jwtService.generateToken(mockUser);
        assertNotNull(token);
    }
}
