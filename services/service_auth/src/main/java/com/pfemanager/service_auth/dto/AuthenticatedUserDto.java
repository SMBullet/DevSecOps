package com.pfemanager.service_auth.dto;

import com.pfemanager.service_auth.enums.Role;
import com.pfemanager.service_auth.model.User;
import lombok.Data;

@Data

public class AuthenticatedUserDto {
    private String username;
    private  Role role;

    public AuthenticatedUserDto(User user){
        this.username= user.getUsername();
        this.role=user.getRole();
    }
}
