package com.pfemanager.projectservice.controllers;

import com.pfemanager.projectservice.dto.ProjectDto;
import com.pfemanager.projectservice.models.Project;
import com.pfemanager.projectservice.models.ProjectStatus;
import com.pfemanager.projectservice.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/createproject")
    public ResponseEntity<Project> createProject(@RequestBody ProjectDto projectDto) {
        Project createdProject = projectService.createProject(projectDto);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable UUID id) {
        Project project = projectService.getProject(id);
        if (project == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(project);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        if (projects == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(projects);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Project> updateProjectStatus(@PathVariable UUID id, @RequestBody Map<String, String> requestBody) {
        String statusValue = requestBody.get("status");
        ProjectStatus newStatus = ProjectStatus.valueOf(statusValue);
        Project updatedProject = projectService.updateProjectStatus(id, newStatus);
        if (updatedProject == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedProject);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable UUID id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
