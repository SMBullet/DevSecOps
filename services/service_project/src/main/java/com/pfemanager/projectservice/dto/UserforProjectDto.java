package com.pfemanager.service_auth.dto;

import com.pfemanager.service_auth.model.User;
import lombok.Data;

@Data
public class UserforProjectDto {
    private String username;
    private String email;

    public UserforProjectDto(User user){
        this.username=user.getUsername();
        this.email=user.getEmail();
    }
}
