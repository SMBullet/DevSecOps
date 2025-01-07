package com.pfemanager.projectservice;

import com.pfemanager.projectservice.controllers.ProjectController;
import com.pfemanager.projectservice.dto.ProjectDetailsDto;
import com.pfemanager.projectservice.dto.ProjectDto;
import com.pfemanager.projectservice.models.Project;
import com.pfemanager.projectservice.models.ProjectStatus;
import com.pfemanager.projectservice.services.ProjectService;
import com.pfemanager.projectservice.repositories.ProjectRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProjectserviceApplicationTests {

    @Mock
    private ProjectService projectService;

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectController projectController;

    @Test
    void testCreateProject() {
        assertDoesNotThrow(() -> {
            ProjectDto projectDto = new ProjectDto();
            Project project = new Project();
            when(projectService.createProject(projectDto)).thenReturn(project);

            ResponseEntity<Project> response = projectController.createProject(projectDto);

            assertEquals(HttpStatus.CREATED, response.getStatusCode());
            assertEquals(project, response.getBody());
        }, "Error occurred in testCreateProject");
    }

    @Test
    void testGetProject() {
        assertDoesNotThrow(() -> {
            UUID projectId = UUID.randomUUID();
            ProjectDetailsDto projectDetailsDto = new ProjectDetailsDto();
            when(projectService.getProject(projectId)).thenReturn(projectDetailsDto);

            ResponseEntity<ProjectDetailsDto> response = projectController.getProject(projectId);

            assertEquals(HttpStatus.OK, response.getStatusCode());
            assertEquals(projectDetailsDto, response.getBody());
        }, "Error occurred in testGetProject");
    }

    @Test
    void testGetAllProjects() {
        assertDoesNotThrow(() -> {
            List<Project> projects = new ArrayList<>();
            when(projectService.getAllProjects()).thenReturn(projects);

            ResponseEntity<List<Project>> response = projectController.getAllProjects();

            assertEquals(HttpStatus.OK, response.getStatusCode());
            assertEquals(projects, response.getBody());
        }, "Error occurred in testGetAllProjects");
    }

    @Test
    void testUpdateProjectStatus() {
        assertDoesNotThrow(() -> {
            UUID projectId = UUID.randomUUID();
            Project project = new Project();
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("status", "COMPLETED");
            when(projectService.updateProjectStatus(projectId, ProjectStatus.COMPLETED)).thenReturn(project);

            ResponseEntity<Project> response = projectController.updateProjectStatus(projectId, requestBody);

            assertEquals(HttpStatus.OK, response.getStatusCode());
            assertEquals(project, response.getBody());
        }, "Error occurred in testUpdateProjectStatus");
    }

    @Test
    void testDeleteProject() {
        assertDoesNotThrow(() -> {
            UUID projectId = UUID.randomUUID();
            doNothing().when(projectService).deleteProject(projectId);

            ResponseEntity<Void> response = projectController.deleteProject(projectId);

            assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        }, "Error occurred in testDeleteProject");
    }

    @Test
    void testRepositoryFindById() {
        assertDoesNotThrow(() -> {
            UUID projectId = UUID.randomUUID();
            Project project = new Project();
            when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));

            Optional<Project> foundProject = projectRepository.findById(projectId);

            assertTrue(foundProject.isPresent());
            assertEquals(project, foundProject.get());
        }, "Error occurred in testRepositoryFindById");
    }

    @Test
    void testRepositorySave() {
        assertDoesNotThrow(() -> {
            Project project = new Project();
            when(projectRepository.save(project)).thenReturn(project);

            Project savedProject = projectRepository.save(project);

            assertEquals(project, savedProject);
        }, "Error occurred in testRepositorySave");
    }
}
