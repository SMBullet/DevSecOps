package com.pfemanager.projectservice.services;

import com.pfemanager.projectservice.client.UserServiceClient;
import com.pfemanager.projectservice.dto.ProjectDetailsDto;
import com.pfemanager.projectservice.dto.ProjectDto;
import com.pfemanager.projectservice.dto.UserDto;
import com.pfemanager.projectservice.models.Project;
import com.pfemanager.projectservice.models.ProjectStatus;
import com.pfemanager.projectservice.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProjectService{

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserServiceClient userServiceClient;


    public Project createProject(ProjectDto dto) {
        Project project = new Project();
        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        project.setLocation(dto.getLocation());
        project.setSubject(dto.getSubject());
        project.setUniversityId(dto.getUniversityId());
        project.setCreatedAt(LocalDateTime.now());
        project.setProjectTime(dto.getProjectTime());
        project.setProjectMembers(dto.getProjectMembers());

        project = projectRepository.save(project);


        return project;
    }

    public ProjectDetailsDto getProject(UUID id) {
        Project project = projectRepository.findById(id)
                .orElseThrow();
        List<UserDto> projectMembers = project.getProjectMembers().stream()
                .map(memberId -> userServiceClient.getUserById(memberId))
                .collect(Collectors.toList());

        ProjectDto projectDto = ProjectDto.builder()

                .title(project.getTitle())
                .description(project.getDescription())
                .location(project.getLocation())
                .projectTime(project.getProjectTime())
                .subject(project.getSubject())
                .universityId(project.getUniversityId())
                .reportUrl(project.getReportUrl())
                .projectMembers(project.getProjectMembers())
                .status(project.getStatus())
                .build();

        return ProjectDetailsDto.builder()
                .projectDto(projectDto)
                .members(projectMembers)
                .build();


    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project updateProjectStatus(UUID id, ProjectStatus status) {
        Project project = projectRepository.findById(id)
                        .orElseThrow();
        project.setStatus(status);
        return projectRepository.save(project);
    }

    public void deleteProject(UUID id){

        projectRepository.deleteById(id);
    }
}
