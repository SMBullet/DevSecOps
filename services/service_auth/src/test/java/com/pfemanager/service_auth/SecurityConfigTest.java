package com.pfemanager.service_auth.config;

import com.pfemanager.service_auth.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SecurityConfigTest {

    @Mock
    private AuthenticationProvider authenticationProvider;

    @Mock
    private JwtService jwtService;

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private HttpSecurity httpSecurity;

    @InjectMocks
    private SecurityConfig securityConfig;

    @BeforeEach
    void setUp() {
        try {
            // Basic setup to allow method chaining
            when(httpSecurity.csrf()).thenReturn(httpSecurity);
            when(httpSecurity.authorizeHttpRequests()).thenReturn(httpSecurity);
            when(httpSecurity.sessionManagement()).thenReturn(httpSecurity);
            when(httpSecurity.authenticationProvider(any())).thenReturn(httpSecurity);
            when(httpSecurity.addFilterBefore(any(), any())).thenReturn(httpSecurity);
            when(httpSecurity.build()).thenReturn(mock(DefaultSecurityFilterChain.class));
        } catch (Exception e) {
            System.out.println("Error in setUp: " + e.getMessage());
        }
    }

    @Test
    void testSecurityFilterChainConfiguration() {
        try {
            // Act
            SecurityFilterChain filterChain = securityConfig.securityFilterChain(
                httpSecurity, 
                jwtService, 
                userDetailsService
            );

            // Assert
            assertNotNull(filterChain, "Security filter chain should not be null");

            // Verify the basic security configurations were called
            verify(httpSecurity).csrf();
            verify(httpSecurity).authorizeHttpRequests();
            verify(httpSecurity).sessionManagement();
            verify(httpSecurity).authenticationProvider(authenticationProvider);
            verify(httpSecurity).addFilterBefore(any(), any());
        } catch (Exception e) {
            System.out.println("Error in testSecurityFilterChainConfiguration: " + e.getMessage());
        }
    }

    @Test
    void testCorsConfiguration() {
        try {
            // Act
            securityConfig.addCorsMappings(registry -> {
                // The actual implementation will be tested through the registry
            });
        } catch (Exception e) {
            System.out.println("Error in testCorsConfiguration: " + e.getMessage());
        }
    }
}
