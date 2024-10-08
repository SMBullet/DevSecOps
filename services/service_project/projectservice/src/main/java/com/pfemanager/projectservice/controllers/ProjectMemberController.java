package com.pfemanager.projectservice.controllers;


import com.pfemanager.projectservice.dto.ProjectMemberDto;
import com.pfemanager.projectservice.models.Project;
import com.pfemanager.projectservice.models.ProjectMember;
import com.pfemanager.projectservice.services.ProjectMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projectmember")
public class ProjectMemberController {

    @Autowired
    private ProjectMemberService projectMemberService;

    @PostMapping("/addmember")
    public ResponseEntity<Project> addMember(@RequestBody ProjectMemberDto projectMemberDto) {
        Project project = projectMemberService.addProjectMember(projectMemberDto);
        return ResponseEntity.ok(project);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProjectMember>> getAllMembers() {
        List<ProjectMember> projectMembers = projectMemberService.getAllProjectMembers();
        if (projectMembers.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(projectMembers);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<List<ProjectMember>> getProjectMemberByProject(@PathVariable UUID projectId ) {
        List<ProjectMember> members = projectMemberService.getProjectMembersByProject(projectId);
        if (members == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(members);
    }

    @DeleteMapping("/delete/{memberId}")
    public ResponseEntity<Void> deleteMember(@PathVariable UUID memberId) {
        projectMemberService.removeProjectMember(memberId);
        return ResponseEntity.noContent().build();
    }

}

