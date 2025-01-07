package com.pfemanager.projectservice;

import com.pfemanager.projectservice.controllers.ProjectController;
import com.pfemanager.projectservice.dto.ProjectDetailsDto;
import com.pfemanager.projectservice.dto.ProjectDto;
import com.pfemanager.projectservice.models.Project;
import com.pfemanager.projectservice.models.ProjectStatus;
import com.pfemanager.projectservice.services.ProjectService;
import com.pfemanager.projectservice.repositories.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class ProjectserviceApplicationTests {

    @Mock
    private ProjectService projectService;

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectController projectController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateProject() {
        ProjectDto projectDto = new ProjectDto();
        Project project = new Project();
        when(projectService.createProject(projectDto)).thenReturn(project);

        ResponseEntity<Project> response = projectController.createProject(projectDto);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(project, response.getBody());
    }

    @Test
    void testGetProject() {
        UUID projectId = UUID.randomUUID();
        ProjectDetailsDto projectDetailsDto = new ProjectDetailsDto();
        when(projectService.getProject(projectId)).thenReturn(projectDetailsDto);

        ResponseEntity<ProjectDetailsDto> response = projectController.getProject(projectId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(projectDetailsDto, response.getBody());
    }

    @Test
    void testGetAllProjects() {
        List<Project> projects = new ArrayList<>();
        when(projectService.getAllProjects()).thenReturn(projects);

        ResponseEntity<List<Project>> response = projectController.getAllProjects();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(projects, response.getBody());
    }

    @Test
    void testUpdateProjectStatus() {
        UUID projectId = UUID.randomUUID();
        Project project = new Project();
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("status", "COMPLETED");
        when(projectService.updateProjectStatus(projectId, ProjectStatus.COMPLETED)).thenReturn(project);

        ResponseEntity<Project> response = projectController.updateProjectStatus(projectId, requestBody);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(project, response.getBody());
    }

    @Test
    void testDeleteProject() {
        UUID projectId = UUID.randomUUID();
        doNothing().when(projectService).deleteProject(projectId);

        ResponseEntity<Void> response = projectController.deleteProject(projectId);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void testRepositoryFindById() {
        UUID projectId = UUID.randomUUID();
        Project project = new Project();
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));

        Optional<Project> foundProject = projectRepository.findById(projectId);

        assertTrue(foundProject.isPresent());
        assertEquals(project, foundProject.get());
    }

    @Test
    void testRepositorySave() {
        Project project = new Project();
        when(projectRepository.save(project)).thenReturn(project);

        Project savedProject = projectRepository.save(project);

        assertEquals(project, savedProject);
    }
}
