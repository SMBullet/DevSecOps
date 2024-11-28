package com.pfemanager.projectservice.services;

import com.pfemanager.projectservice.dto.ProjectMemberDto;
import com.pfemanager.projectservice.models.Project;
import com.pfemanager.projectservice.models.ProjectMember;
import com.pfemanager.projectservice.repositories.ProjectMemberRepository;
import com.pfemanager.projectservice.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pfemanager.projectservice.client.UserServiceClient;

import java.util.List;
import java.util.UUID;

@Service
public class ProjectMemberService {

    @Autowired
    private ProjectMemberRepository projectMemberRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserServiceClient userServiceClient;


    public Project addProjectMember(ProjectMemberDto dto) {
        Project project = projectRepository.findById(dto.getProjectId())
                .orElse(null);

        ProjectMember member = new ProjectMember();
        member.setProject(project);
        member.setUserId(dto.getUserId());
        member.setRole(dto.getRole());
        projectMemberRepository.save(member);

        return project;
    }

    public List<ProjectMember> getProjectMembersByProject(UUID projectId) {
        return projectMemberRepository.findAllByProjectId(projectId);
    }

    public List<ProjectMember> getAllProjectMembers() {
        return projectMemberRepository.findAll();
    }

    public void removeProjectMember(UUID memberId) {
        projectMemberRepository.deleteById(memberId);
    }
}
