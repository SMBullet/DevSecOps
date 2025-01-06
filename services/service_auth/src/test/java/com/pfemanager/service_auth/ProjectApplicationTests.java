package com.pfemanager.service_auth;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import com.pfemanager.service_auth.dto.LoginUserDto;
import com.pfemanager.service_auth.dto.RegisterUserDto;
import com.pfemanager.service_auth.enums.Role;
import com.pfemanager.service_auth.model.User;
import com.pfemanager.service_auth.response.LoginResponse;
import com.pfemanager.service_auth.service.JwtService;
import com.pfemanager.service_auth.service.UserService;
import com.pfemanager.service_auth.service.AuthenticationService;
import com.pfemanager.projectservice.services.ProjectService;
import com.pfemanager.projectservice.models.Project;
import com.pfemanager.projectservice.models.ProjectStatus;
import com.pfemanager.projectservice.dto.ProjectDto;
import com.pfemanager.projectservice.repositories.ProjectRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import org.mockito.Mock;

@SpringBootTest
class ProjectApplicationTests {

    @Mock
    private JwtService jwtService;

    @Mock
    private UserService userService;

    @Mock
    private AuthenticationService authenticationService;

    @Mock
    private ProjectService projectService;

    @Mock
    private ProjectRepository projectRepository;

    // Basic context load test
    @Test
    void contextLoads() {
    }

    // Authentication Service Tests
    @Test
    void testLoginResponseSetters() {
        LoginResponse response = new LoginResponse();
        response.setToken("test-token");
        response.setExpiresIn(3600L);

        assertEquals("test-token", response.getToken());
        assertEquals(3600L, response.getExpiresIn());
    }

    @Test
    void testRegisterUserDto() {
        RegisterUserDto dto = new RegisterUserDto();
        dto.setEmail("test@example.com");
        dto.setPassword("password123");
        dto.setUsername("testuser");
        dto.setDob(LocalDate.of(1990, 1, 1));
        dto.setRole(Role.STUDENT);

        assertEquals("test@example.com", dto.getEmail());
        assertEquals("password123", dto.getPassword());
        assertEquals("testuser", dto.getUsername());
        assertEquals(LocalDate.of(1990, 1, 1), dto.getDob());
        assertEquals(Role.STUDENT, dto.getRole());
    }

    @Test
    void testUserModel() {
        User user = new User();
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("password123");
        user.setDob(LocalDate.of(1990, 1, 1));
        user.setRole(Role.STUDENT);

        assertEquals("testuser", user.getUsername());
        assertEquals("test@example.com", user.getEmail());
        assertEquals("password123", user.getPassword());
        assertTrue(user.isEnabled());
        assertTrue(user.isAccountNonExpired());
        assertTrue(user.isAccountNonLocked());
        assertTrue(user.isCredentialsNonExpired());
        assertNotNull(user.getAuthorities());
    }

    @Test
    void testJwtTokenGeneration() {
        User user = new User();
        user.setUsername("testuser");
        user.setRole(Role.STUDENT);

        when(jwtService.generateToken(user)).thenReturn("test-jwt-token");
        when(jwtService.getExpirationTime()).thenReturn(3600L);

        String token = jwtService.generateToken(user);
        long expirationTime = jwtService.getExpirationTime();

        assertEquals("test-jwt-token", token);
        assertEquals(3600L, expirationTime);
    }

    @Test
    void testInvalidLogin() {
        LoginUserDto loginDto = new LoginUserDto();
        loginDto.setUsername("invaliduser");
        loginDto.setPassword("wrongpassword");

        when(authenticationService.authenticate(loginDto)).thenThrow(new IllegalArgumentException("Invalid credentials"));

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            authenticationService.authenticate(loginDto);
        });

        assertEquals("Invalid credentials", exception.getMessage());
    }

    // Project Service Tests
    @Test
    void testCreateProjectWithValidData() {
        ProjectDto dto = new ProjectDto();
        dto.setTitle("Project Title");
        dto.setDescription("Description");
        dto.setLocation("Location");
        dto.setSubject("Subject");
        dto.setProjectTime(LocalDateTime.now());
        dto.setProjectMembers(Arrays.asList(UUID.randomUUID()));

        Project project = new Project();
        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        project.setLocation(dto.getLocation());

        when(projectService.createProject(dto)).thenReturn(project);

        Project createdProject = projectService.createProject(dto);

        assertNotNull(createdProject);
        assertEquals(dto.getTitle(), createdProject.getTitle());
    }

    @Test
    void testFetchNonexistentProject() {
        UUID nonexistentProjectId = UUID.randomUUID();

        when(projectRepository.findById(nonexistentProjectId)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> {
            projectService.getProject(nonexistentProjectId);
        });
    }

    @Test
    void testUpdateProjectStatus() {
        UUID projectId = UUID.randomUUID();
        Project project = new Project();
        project.setId(projectId);
        project.setStatus(ProjectStatus.IN_PROGRESS);

        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
        when(projectRepository.save(project)).thenReturn(project);

        Project updatedProject = projectService.updateProjectStatus(projectId, ProjectStatus.COMPLETED);

        assertEquals(ProjectStatus.COMPLETED, updatedProject.getStatus());
    }

    @Test
    void testDeleteProject() {
        UUID projectId = UUID.randomUUID();

        doNothing().when(projectRepository).deleteById(projectId);

        projectService.deleteProject(projectId);

        verify(projectRepository, times(1)).deleteById(projectId);
    }

    @Test
    void testProjectServiceGetAllProjects() {
        Project project1 = new Project();
        project1.setTitle("Project 1");

        Project project2 = new Project();
        project2.setTitle("Project 2");

        List<Project> projects = Arrays.asList(project1, project2);
        when(projectRepository.findAll()).thenReturn(projects);

        List<Project> fetchedProjects = projectService.getAllProjects();

        assertEquals(2, fetchedProjects.size());
        assertEquals("Project 1", fetchedProjects.get(0).getTitle());
    }
}
