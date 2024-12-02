package com.pfemanager.service_auth.dto;

import lombok.Builder;

import java.util.List;

@Builder
public class UserDetailsDto {
    private UserDto user;
    private List<ProjectDto> projects;
}
