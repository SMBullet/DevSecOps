package com.pfemanager.projectservice.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProjectDetailsDto {
    private ProjectDto projectDto;
    private List<UserDto> members;

}
