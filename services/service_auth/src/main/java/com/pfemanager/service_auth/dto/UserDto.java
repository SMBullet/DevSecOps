package com.pfemanager.service_auth.dto;

import com.fasterxml.jackson.core.JsonToken;
import com.pfemanager.service_auth.model.User;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserDto {
    private String username;
    private String email;
    private List<ProjectDto> projects;

    public UserDto(User user) {
    }

}
