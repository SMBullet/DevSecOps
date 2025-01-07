package com.pfemanager.service_auth.response;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LoginResponseTest {

    @Test
    void testSetAndGetToken() {
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken("mockToken");
        assertEquals("mockToken", loginResponse.getToken());
    }

    @Test
    void testSetAndGetExpiresIn() {
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setExpiresIn(3600);
        assertEquals(3600, loginResponse.getExpiresIn());
    }

    @Test
    void testFluentSetters() {
        LoginResponse loginResponse = new LoginResponse()
                .setToken("fluentToken")
                .setExpiresIn(7200);

        assertEquals("fluentToken", loginResponse.getToken());
        assertEquals(7200, loginResponse.getExpiresIn());
    }
}
