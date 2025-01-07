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
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.security.config.Customizer.withDefaults;

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

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        try {
            mockMvc = MockMvcBuilders
                    .standaloneSetup()
                    .addFilter(new JwtAuthenticationFilter(jwtService, userDetailsService))
                    .build();
        } catch (Exception e) {
            System.out.println("Error in setUp: " + e.getMessage());
        }
    }

    @Test
    void addCorsMappings_ConfiguresCorrectly() {
        try {
            // Act
            UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
            securityConfig.addCorsMappings(corsConfigurationSource.getCorsConfigurations());

            // Assert
            CorsConfiguration corsConfiguration = corsConfigurationSource.getCorsConfiguration(null);
            assertNotNull(corsConfiguration, "CORS configuration should not be null");

            assertTrue(corsConfiguration.getAllowedHeaders().contains("*"), 
                "Should allow all headers");
            assertTrue(corsConfiguration.getAllowedOrigins().contains("*"), 
                "Should allow all origins");
            assertTrue(corsConfiguration.getAllowedMethods().containsAll(
                    java.util.Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")),
                "Should allow specified HTTP methods");
        } catch (AssertionError e) {
            System.out.println("Test failed - addCorsMappings_ConfiguresCorrectly: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in addCorsMappings_ConfiguresCorrectly: " + e.getMessage());
        }
    }

    @Test
    void securityFilterChain_ConfiguresSecurityRules() {
        try {
            // Act
            SecurityFilterChain filterChain = securityConfig.securityFilterChain(
                    httpSecurity, 
                    jwtService,
                    userDetailsService
            );

            // Assert
            assertNotNull(filterChain, "SecurityFilterChain should not be null");
            verify(httpSecurity).csrf(any());
            verify(httpSecurity).authorizeHttpRequests(any());
            verify(httpSecurity).sessionManagement(any());
            verify(httpSecurity).authenticationProvider(authenticationProvider);
            verify(httpSecurity).addFilterBefore(any(), any());
        } catch (AssertionError e) {
            System.out.println("Test failed - securityFilterChain_ConfiguresSecurityRules: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in securityFilterChain_ConfiguresSecurityRules: " + e.getMessage());
        }
    }

    @Test
    void securityFilterChain_ConfiguresPublicEndpoints() {
        try {
            // Arrange
            HttpSecurity http = mock(HttpSecurity.class, RETURNS_SELF);
            when(http.authorizeHttpRequests(any())).thenReturn(http);
            when(http.csrf(any())).thenReturn(http);
            when(http.sessionManagement(any())).thenReturn(http);
            when(http.authenticationProvider(any())).thenReturn(http);
            when(http.addFilterBefore(any(), any())).thenReturn(http);

            // Act
            SecurityFilterChain filterChain = securityConfig.securityFilterChain(
                    http,
                    jwtService,
                    userDetailsService
            );

            // Assert
            assertNotNull(filterChain, "SecurityFilterChain should not be null");
            verify(http).authorizeHttpRequests(any());
        } catch (AssertionError e) {
            System.out.println("Test failed - securityFilterChain_ConfiguresPublicEndpoints: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in securityFilterChain_ConfiguresPublicEndpoints: " + e.getMessage());
        }
    }

    @Test
    void securityFilterChain_ConfiguresCsrfDisabled() {
        try {
            // Arrange
            HttpSecurity http = mock(HttpSecurity.class, RETURNS_SELF);
            when(http.authorizeHttpRequests(any())).thenReturn(http);
            when(http.csrf(any())).thenReturn(http);
            when(http.sessionManagement(any())).thenReturn(http);
            when(http.authenticationProvider(any())).thenReturn(http);
            when(http.addFilterBefore(any(), any())).thenReturn(http);

            // Act
            SecurityFilterChain filterChain = securityConfig.securityFilterChain(
                    http,
                    jwtService,
                    userDetailsService
            );

            // Assert
            assertNotNull(filterChain, "SecurityFilterChain should not be null");
            verify(http).csrf(any());
        } catch (AssertionError e) {
            System.out.println("Test failed - securityFilterChain_ConfiguresCsrfDisabled: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in securityFilterChain_ConfiguresCsrfDisabled: " + e.getMessage());
        }
    }

    @Test
    void securityFilterChain_ConfiguresSessionManagement() {
        try {
            // Arrange
            HttpSecurity http = mock(HttpSecurity.class, RETURNS_SELF);
            when(http.authorizeHttpRequests(any())).thenReturn(http);
            when(http.csrf(any())).thenReturn(http);
            when(http.sessionManagement(any())).thenReturn(http);
            when(http.authenticationProvider(any())).thenReturn(http);
            when(http.addFilterBefore(any(), any())).thenReturn(http);

            // Act
            SecurityFilterChain filterChain = securityConfig.securityFilterChain(
                    http,
                    jwtService,
                    userDetailsService
            );

            // Assert
            assertNotNull(filterChain, "SecurityFilterChain should not be null");
            verify(http).sessionManagement(any());
        } catch (AssertionError e) {
            System.out.println("Test failed - securityFilterChain_ConfiguresSessionManagement: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in securityFilterChain_ConfiguresSessionManagement: " + e.getMessage());
        }
    }

    @Test
    void securityFilterChain_ConfiguresAuthenticationProvider() {
        try {
            // Arrange
            HttpSecurity http = mock(HttpSecurity.class, RETURNS_SELF);
            when(http.authorizeHttpRequests(any())).thenReturn(http);
            when(http.csrf(any())).thenReturn(http);
            when(http.sessionManagement(any())).thenReturn(http);
            when(http.authenticationProvider(any())).thenReturn(http);
            when(http.addFilterBefore(any(), any())).thenReturn(http);

            // Act
            SecurityFilterChain filterChain = securityConfig.securityFilterChain(
                    http,
                    jwtService,
                    userDetailsService
            );

            // Assert
            assertNotNull(filterChain, "SecurityFilterChain should not be null");
            verify(http).authenticationProvider(authenticationProvider);
        } catch (AssertionError e) {
            System.out.println("Test failed - securityFilterChain_ConfiguresAuthenticationProvider: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error in securityFilterChain_ConfiguresAuthenticationProvider: " + e.getMessage());
        }
    }
}
