package com.pfemanager.projectservice.dto;

import com.pfemanager.projectservice.models.ProjectMemberRole;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Data
public class ProjectCreationDto {
    private String title;
    private String description;
    private String location;
    private LocalDateTime projectTime;
    private String subject;
    private UUID universityId;
    private String reportUrl;

    private List<ProjectMemberDto> projectMembers;


}
