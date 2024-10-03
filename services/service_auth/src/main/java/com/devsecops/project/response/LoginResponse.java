package com.devsecops.project.response;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;

    private long expiresIn;

    public LoginResponse setToken(String token) {
        this.token = token;
        return this;
    }

    public LoginResponse setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
        return this; // Return the current instance
    }
}
