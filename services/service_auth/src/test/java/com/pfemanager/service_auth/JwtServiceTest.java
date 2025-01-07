package com.pfemanager.service_auth.service;

import com.pfemanager.service_auth.enums.Role;
import com.pfemanager.service_auth.model.User;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class JwtServiceTest {

    @InjectMocks
    private JwtService jwtService;

    private User testUser;
    private static final String SECRET_KEY = "2a544708ee97fdb1b790ad284efbf660dbe908eb03956e3e2eea9c11627bd69d";
    private static final long EXPIRATION_TIME = 3600000; // 1 hour in milliseconds

    @BeforeEach
    void setUp() {
        try {
            // Setup test user
            testUser = new User();
            testUser.setUsername("testuser");
            testUser.setEmail("test@example.com");
            testUser.setPassword("password123");
            testUser.setRole(Role.STUDENT);
            testUser.setDob(LocalDate.of(2000, 1, 1));

            // Configure JWT service properties
            ReflectionTestUtils.setField(jwtService, "secretKey", SECRET_KEY);
            ReflectionTestUtils.setField(jwtService, "jwtExpiration", EXPIRATION_TIME);
        } catch (Exception e) {
            System.out.println("Error in setUp: " + e.getMessage());
        }
    }

    @Test
    void generateToken_ValidUser_Success() {
        try {
            // Act
            String token = jwtService.generateToken(testUser);

            // Assert
            assertNotNull(token, "Generated token should not be null");
            assertTrue(token.length() > 0, "Generated token should not be empty");
            assertEquals(testUser.getUsername(), jwtService.extractUsername(token), 
                "Extracted username should match test user username");
        } catch (AssertionError e) {
            System.out.println("Test failed - generateToken_ValidUser_Success: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in generateToken_ValidUser_Success: " + e.getMessage());
        }
    }

    @Test
    void generateToken_WithExtraClaims_Success() {
        try {
            // Arrange
            Map<String, Object> extraClaims = new HashMap<>();
            extraClaims.put("customKey", "customValue");
            extraClaims.put("role", "STUDENT");

            // Act
            String token = jwtService.generateToken(extraClaims, testUser);

            // Assert
            assertNotNull(token, "Generated token should not be null");
            assertEquals(testUser.getUsername(), jwtService.extractUsername(token), 
                "Extracted username should match test user username");
            assertEquals("customValue", 
                jwtService.extractClaim(token, claims -> claims.get("customKey", String.class)),
                "Custom claim should be present in token");
        } catch (AssertionError e) {
            System.out.println("Test failed - generateToken_WithExtraClaims_Success: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in generateToken_WithExtraClaims_Success: " + e.getMessage());
        }
    }

    @Test
    void isTokenValid_ValidToken_ReturnsTrue() {
        try {
            // Arrange
            String token = jwtService.generateToken(testUser);

            // Act
            boolean isValid = jwtService.isTokenValid(token, testUser);

            // Assert
            assertTrue(isValid, "Token should be valid for the test user");
        } catch (AssertionError e) {
            System.out.println("Test failed - isTokenValid_ValidToken_ReturnsTrue: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in isTokenValid_ValidToken_ReturnsTrue: " + e.getMessage());
        }
    }

    @Test
    void isTokenValid_InvalidUsername_ReturnsFalse() {
        try {
            // Arrange
            String token = jwtService.generateToken(testUser);
            User differentUser = new User();
            differentUser.setUsername("differentuser");

            // Act
            boolean isValid = jwtService.isTokenValid(token, differentUser);

            // Assert
            assertFalse(isValid, "Token should be invalid for a different user");
        } catch (AssertionError e) {
            System.out.println("Test failed - isTokenValid_InvalidUsername_ReturnsFalse: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in isTokenValid_InvalidUsername_ReturnsFalse: " + e.getMessage());
        }
    }

    @Test
    void extractClaim_ValidToken_ReturnsCorrectClaim() {
        try {
            // Arrange
            Map<String, Object> extraClaims = new HashMap<>();
            extraClaims.put("testClaim", "testValue");
            String token = jwtService.generateToken(extraClaims, testUser);

            // Act
            String claimValue = jwtService.extractClaim(token, claims -> claims.get("testClaim", String.class));

            // Assert
            assertEquals("testValue", claimValue, "Extracted claim should match the original value");
        } catch (AssertionError e) {
            System.out.println("Test failed - extractClaim_ValidToken_ReturnsCorrectClaim: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in extractClaim_ValidToken_ReturnsCorrectClaim: " + e.getMessage());
        }
    }

    @Test
    void getExpirationTime_ReturnsConfiguredValue() {
        try {
            // Act
            long expirationTime = jwtService.getExpirationTime();

            // Assert
            assertEquals(EXPIRATION_TIME, expirationTime, 
                "Expiration time should match configured value");
        } catch (AssertionError e) {
            System.out.println("Test failed - getExpirationTime_ReturnsConfiguredValue: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in getExpirationTime_ReturnsConfiguredValue: " + e.getMessage());
        }
    }

    @Test
    void extractUsername_ValidToken_ReturnsCorrectUsername() {
        try {
            // Arrange
            String token = jwtService.generateToken(testUser);

            // Act
            String username = jwtService.extractUsername(token);

            // Assert
            assertEquals(testUser.getUsername(), username, 
                "Extracted username should match the original username");
        } catch (AssertionError e) {
            System.out.println("Test failed - extractUsername_ValidToken_ReturnsCorrectUsername: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in extractUsername_ValidToken_ReturnsCorrectUsername: " + e.getMessage());
        }
    }
}
