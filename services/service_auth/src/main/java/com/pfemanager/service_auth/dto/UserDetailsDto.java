package com.pfemanager.service_auth.dto;

import com.pfemanager.service_auth.model.User;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder

public class UserDetailsDto {
    private UserDto user;
    private List<ProjectDto> projectDetails;


}
