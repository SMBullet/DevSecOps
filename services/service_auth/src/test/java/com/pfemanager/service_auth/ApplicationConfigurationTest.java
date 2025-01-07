package com.pfemanager.service_auth.config;

import com.pfemanager.service_auth.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;

class ApplicationConfigurationTest {

    @Mock
    private UserRepository userRepository;

    @Test
    void testBeansCreation() {
        ApplicationConfiguration config = new ApplicationConfiguration(mock(UserRepository.class));
        assertNotNull(config.userDetailsService());
        assertNotNull(config.passwordEncoder());
        assertNotNull(config.restTemplate());
    }

    @Test
    void testPasswordEncoder() {
        ApplicationConfiguration config = new ApplicationConfiguration(mock(UserRepository.class));
        BCryptPasswordEncoder encoder = config.passwordEncoder();
        assertNotNull(encoder);
        String encoded = encoder.encode("password123");
        assertNotNull(encoded);
    }
}
