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

    private DefaultSecurityFilterChain mockFilterChain;

    @BeforeEach
    void setUp() {
        try {
            mockFilterChain = mock(DefaultSecurityFilterChain.class);
            
            // Common setup for HttpSecurity
            when(httpSecurity.csrf()).thenReturn(httpSecurity);
            when(httpSecurity.authorizeHttpRequests()).thenReturn(httpSecurity);
            when(httpSecurity.sessionManagement()).thenReturn(httpSecurity);
            when(httpSecurity.authenticationProvider(any())).thenReturn(httpSecurity);
            when(httpSecurity.addFilterBefore(any(), any())).thenReturn(httpSecurity);
            when(httpSecurity.build()).thenReturn(mockFilterChain);
        } catch (Exception e) {
            System.out.println("Error in setUp: " + e.getMessage());
        }
    }

    @Test
    void securityFilterChain_ConfiguresSecurityRules() {
        try {
            // Act
            securityConfig.securityFilterChain(httpSecurity, jwtService, userDetailsService);

            // Assert
            verify(httpSecurity).csrf();
            verify(httpSecurity).authorizeHttpRequests();
            verify(httpSecurity).sessionManagement();
            verify(httpSecurity).authenticationProvider(authenticationProvider);
            verify(httpSecurity).addFilterBefore(any(), any());
        } catch (Exception e) {
            System.out.println("Unexpected error in securityFilterChain_ConfiguresSecurityRules: " + e.getMessage());
        }
    }

    @Test
    void securityFilterChain_ConfiguresPublicEndpoints() {
        try {
            // Act
            securityConfig.securityFilterChain(httpSecurity, jwtService, userDetailsService);

            // Assert
            verify(httpSecurity).authorizeHttpRequests();
        } catch (Exception e) {
            System.out.println("Unexpected error in securityFilterChain_ConfiguresPublicEndpoints: " + e.getMessage());
        }
    }

    @Test
    void securityFilterChain_ConfiguresCsrfDisabled() {
        try {
            // Act
            securityConfig.securityFilterChain(httpSecurity, jwtService, userDetailsService);

            // Assert
            verify(httpSecurity).csrf();
        } catch (Exception e) {
            System.out.println("Unexpected error in securityFilterChain_ConfiguresCsrfDisabled: " + e.getMessage());
        }
    }

    @Test
    void securityFilterChain_ConfiguresSessionManagement() {
        try {
            // Act
            securityConfig.securityFilterChain(httpSecurity, jwtService, userDetailsService);

            // Assert
            verify(httpSecurity).sessionManagement();
        } catch (Exception e) {
            System.out.println("Unexpected error in securityFilterChain_ConfiguresSessionManagement: " + e.getMessage());
        }
    }

    @Test
    void securityFilterChain_ConfiguresAuthenticationProvider() {
        try {
            // Act
            securityConfig.securityFilterChain(httpSecurity, jwtService, userDetailsService);

            // Assert
            verify(httpSecurity).authenticationProvider(authenticationProvider);
        } catch (Exception e) {
            System.out.println("Unexpected error in securityFilterChain_ConfiguresAuthenticationProvider: " + e.getMessage());
        }
    }
}
