package com.pfemanager.service_auth.dto;

import com.pfemanager.service_auth.enums.Role;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterUserDto {
    private String email;

    private String password;

    private String username;

    private LocalDate dob;
    private Role role;
}
