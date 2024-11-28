package com.pfemanager.service_auth.dto;

import com.pfemanager.service_auth.model.User;
import lombok.Data;

@Data
public class UserDto {
    private String username;
    private String email;


    public UserDto(User user) {
    }
}
