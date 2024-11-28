package com.pfemanager.projectservice.models;

import com.pfemanager.projectservice.dto.UserDto;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "description", length = 500)
    private String description;

    @ElementCollection
    @Column(name ="projectMembers", nullable = true)
    private List<UUID> projectMembers = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private ProjectStatus status = ProjectStatus.IN_PROGRESS;

    @Column(name = "location", length = 200)
    private String location;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "subject", length = 200)
    private String subject;

    @Column(name = "project_time")
    private LocalDateTime projectTime;

    @Column(name = "report_url", nullable = true)
    private String reportUrl;

    @Column(name = "university_id", nullable = false)
    private UUID universityId;

}
