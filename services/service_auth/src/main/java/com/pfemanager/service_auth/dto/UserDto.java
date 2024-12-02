package com.pfemanager.service_auth.dto;

import com.fasterxml.jackson.core.JsonToken;
import com.pfemanager.service_auth.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String username;
    private String email;
    private List<UUID> projects;

    public UserDto (User user){
        this.username=user.getUsername();
        this.email=user.getEmail();
        this.projects=user.getProjects();
    }

}
