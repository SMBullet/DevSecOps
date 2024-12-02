package com.pfemanager.service_auth.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Data
@Builder
public class ProjectDto {
    private String title;
    private String description;
    private String location;
    private LocalDateTime projectTime;
    private String subject;
    private UUID universityId;
    private String reportUrl;
}
