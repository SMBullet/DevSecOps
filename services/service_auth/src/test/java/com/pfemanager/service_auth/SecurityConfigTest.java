package com.pfemanager.service_auth.config;

import com.pfemanager.service_auth.service.JwtService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityConfigTest {

    @Mock
    private AuthenticationProvider authenticationProvider;

    @Mock
    private JwtService jwtService;

    @Test
    void securityFilterChain_ConfiguresCorrectly() throws Exception {
        HttpSecurity httpSecurity = mock(HttpSecurity.class);

        SecurityConfig securityConfig = new SecurityConfig(authenticationProvider);
        assertNotNull(securityConfig.securityFilterChain(httpSecurity, jwtService, null));
    }
}
