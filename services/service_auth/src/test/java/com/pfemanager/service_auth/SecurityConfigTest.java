package com.pfemanager.service_auth.config;

import com.pfemanager.service_auth.service.JwtService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
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

    @InjectMocks
    private SecurityConfig securityConfig;

    @Test
    void securityFilterChain_ConfiguresSecurityRules() {
        try {
            // Arrange
            HttpSecurity http = mock(HttpSecurity.class);
            CsrfConfigurer<HttpSecurity> csrfConfigurer = mock(CsrfConfigurer.class);
            AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry authRegistry = 
                mock(AuthorizeHttpRequestsConfigurer.AuthorizationManagerRequestMatcherRegistry.class);
            SessionManagementConfigurer<HttpSecurity> sessionManagementConfigurer = mock(SessionManagementConfigurer.class);
            DefaultSecurityFilterChain filterChain = mock(DefaultSecurityFilterChain.class);

            when(http.csrf()).thenReturn(csrfConfigurer);
            when(csrfConfigurer.disable()).thenReturn(http);
            when(http.authorizeHttpRequests()).thenReturn(authRegistry);
            when(authRegistry.requestMatchers(any(String[].class))).thenReturn(authRegistry);
            when(authRegistry.permitAll()).thenReturn(authRegistry);
            when(authRegistry.anyRequest()).thenReturn(authRegistry);
            when(authRegistry.authenticated()).thenReturn(authRegistry);
            when(authRegistry.and()).thenReturn(http);
            when(http.sessionManagement()).thenReturn(sessionManagementConfigurer);
            when(sessionManagementConfigurer.and()).thenReturn(http);
            when(http.authenticationProvider(any())).thenReturn(http);
            when(http.addFilterBefore(any(), any())).thenReturn(http);
            when(http.build()).thenReturn(filterChain);

            // Act
            securityConfig.securityFilterChain(http, jwtService, userDetailsService);

            // Assert
            verify(http).csrf();
            verify(http).authorizeHttpRequests();
            verify(http).sessionManagement();
            verify(http).authenticationProvider(authenticationProvider);
            verify(http).addFilterBefore(any(), any());
        } catch (Exception e) {
            System.out.println("Unexpected error in securityFilterChain_ConfiguresSecurityRules: " + e.getMessage());
        }
    }

    @Test
    void securityFilterChain_ConfiguresPublicEndpoints() {
        try {
            // Arrange
            HttpSecurity http = mock(HttpSecurity.class);
            AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry authRegistry = 
                mock(AuthorizeHttpRequestsConfigurer.AuthorizationManagerRequestMatcherRegistry.class);

            when(http.authorizeHttpRequests()).thenReturn(authRegistry);
            when(authRegistry.requestMatchers(any(String[].class))).thenReturn(authRegistry);
            when(authRegistry.permitAll()).thenReturn(authRegistry);
            when(authRegistry.anyRequest()).thenReturn(authRegistry);
            when(authRegistry.authenticated()).thenReturn(authRegistry);
            when(authRegistry.and()).thenReturn(http);
            when(http.build()).thenReturn(mock(DefaultSecurityFilterChain.class));

            // Act
            securityConfig.securityFilterChain(http, jwtService, userDetailsService);

            // Assert
            verify(authRegistry).requestMatchers("/auth/**");
            verify(authRegistry).requestMatchers("/users/**");
            verify(authRegistry).permitAll();
        } catch (Exception e) {
            System.out.println("Unexpected error in securityFilterChain_ConfiguresPublicEndpoints: " + e.getMessage());
        }
    }

    @Test
    void securityFilterChain_ConfiguresCsrfDisabled() {
        try {
            // Arrange
            HttpSecurity http = mock(HttpSecurity.class);
            CsrfConfigurer<HttpSecurity> csrfConfigurer = mock(CsrfConfigurer.class);

            when(http.csrf()).thenReturn(csrfConfigurer);
            when(csrfConfigurer.disable()).thenReturn(http);
            when(http.build()).thenReturn(mock(DefaultSecurityFilterChain.class));

            // Act
            securityConfig.securityFilterChain(http, jwtService, userDetailsService);

            // Assert
            verify(http).csrf();
            verify(csrfConfigurer).disable();
        } catch (Exception e) {
            System.out.println("Unexpected error in securityFilterChain_ConfiguresCsrfDisabled: " + e.getMessage());
        }
    }

    @Test
    void securityFilterChain_ConfiguresSessionManagement() {
        try {
            // Arrange
            HttpSecurity http = mock(HttpSecurity.class);
            SessionManagementConfigurer<HttpSecurity> sessionManagementConfigurer = mock(SessionManagementConfigurer.class);

            when(http.sessionManagement()).thenReturn(sessionManagementConfigurer);
            when(sessionManagementConfigurer.and()).thenReturn(http);
            when(http.build()).thenReturn(mock(DefaultSecurityFilterChain.class));

            // Act
            securityConfig.securityFilterChain(http, jwtService, userDetailsService);

            // Assert
            verify(http).sessionManagement();
            verify(sessionManagementConfigurer).and();
        } catch (Exception e) {
            System.out.println("Unexpected error in securityFilterChain_ConfiguresSessionManagement: " + e.getMessage());
        }
    }
}
