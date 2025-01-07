package com.pfemanager.service_auth.controller;

import com.pfemanager.service_auth.dto.LoginUserDto;
import com.pfemanager.service_auth.dto.RegisterUserDto;
import com.pfemanager.service_auth.model.User;
import com.pfemanager.service_auth.response.LoginResponse;
import com.pfemanager.service_auth.service.AuthenticationService;
import com.pfemanager.service_auth.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    private final JwtService jwtService;


    private final AuthenticationService authenticationService;


    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        if (registerUserDto == null) {
            throw new IllegalArgumentException("RegisterUserDto cannot be null");
        }
    
        if (registerUserDto.getUsername() == null || registerUserDto.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty");
        }
    
        if (registerUserDto.getPassword() == null || registerUserDto.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
    
        if (registerUserDto.getEmail() == null || registerUserDto.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
    
        User registeredUser = authenticationService.signup(registerUserDto);
    
        return ResponseEntity.ok(registeredUser);
    }


    

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
}
