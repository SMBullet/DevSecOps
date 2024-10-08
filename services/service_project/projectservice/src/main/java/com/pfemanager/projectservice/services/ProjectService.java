package com.pfemanager.projectservice.services;

import com.pfemanager.projectservice.dto.ProjectCreationDto;
import com.pfemanager.projectservice.dto.ProjectMemberDto;
import com.pfemanager.projectservice.models.Project;
import com.pfemanager.projectservice.models.ProjectStatus;
import com.pfemanager.projectservice.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ProjectService{

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectMemberService projectMemberService;

    public Project createProject(ProjectCreationDto dto) {
        Project project = new Project();
        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        project.setLocation(dto.getLocation());
        project.setSubject(dto.getSubject());
        project.setUniversityId(dto.getUniversityId());
        project.setCreatedAt(LocalDateTime.now());
        project.setProjectTime(dto.getProjectTime());

        project = projectRepository.save(project);

        // Handle project members if provided
        if (dto.getProjectMembers() != null) {
            for (ProjectMemberDto memberDto : dto.getProjectMembers()) {
                ProjectMemberDto projectMemberDto = new ProjectMemberDto();
                projectMemberDto.setProjectId(project.getId());
                projectMemberDto.setUserId(memberDto.getUserId());
                projectMemberDto.setRole(memberDto.getRole());

                projectMemberService.addProjectMember(projectMemberDto);
            }
        }

        return project;
    }

    public Project getProject(UUID id) {
        return projectRepository.findById(id)
                .orElse(null);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project updateProjectStatus(UUID id, ProjectStatus status) {
        Project project = getProject(id);
        project.setStatus(status);
        return projectRepository.save(project);
    }

    public void deleteProject(UUID id){
        Project project = getProject(id);
        projectRepository.delete(project);
    }
}
