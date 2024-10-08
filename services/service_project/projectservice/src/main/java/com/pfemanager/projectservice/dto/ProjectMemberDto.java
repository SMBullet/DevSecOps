package com.pfemanager.projectservice.dto;

import com.pfemanager.projectservice.models.ProjectMemberRole;
import lombok.Getter;
import lombok.Setter;
import java.util.UUID;

@Getter
@Setter
public class ProjectMemberDto {
    private UUID userId;
    private UUID projectId;
    private ProjectMemberRole role;
}