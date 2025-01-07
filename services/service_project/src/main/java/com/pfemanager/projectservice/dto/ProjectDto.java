package com.pfemanager.projectservice.dto;

import com.pfemanager.projectservice.models.ProjectStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
    private String title;
    private String description;
    private String location;
    private LocalDateTime projectTime;
    private String subject;
    private String reportUrl;
    private ProjectStatus status;

    private List<UUID> projectMembers;


}
