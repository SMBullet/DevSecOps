package com.pfemanager.service_auth.config;

import com.pfemanager.service_auth.service.JwtService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;

class SecurityConfigTest {

    @Mock
    private AuthenticationProvider authenticationProvider;

    @Test
    void securityFilterChain_ConfiguresCorrectly() throws Exception {
        HttpSecurity httpSecurity = mock(HttpSecurity.class);
        JwtService jwtService = mock(JwtService.class);

        SecurityConfig securityConfig = new SecurityConfig(authenticationProvider);
        assertNotNull(securityConfig.securityFilterChain(httpSecurity, jwtService, null));
    }
}
