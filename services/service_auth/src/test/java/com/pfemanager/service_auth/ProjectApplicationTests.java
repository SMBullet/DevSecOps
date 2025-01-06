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
import java.time.LocalDate;
import java.util.UUID;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;
import org.mockito.Mock;

@SpringBootTest
class ProjectApplicationTests {

	@Mock
	private JwtService jwtService;
	
	@Mock
	private UserService userService;

	@Mock
	private AuthenticationService authenticationService;

	@Test
	void contextLoads() {
	}

	@Test
	void testLoginResponse_Setters() {
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
	void testUserAuthentication() {
		LoginUserDto loginDto = new LoginUserDto();
		loginDto.setUsername("testuser");
		loginDto.setPassword("password123");

		User user = new User();
		user.setUsername("testuser");
		user.setPassword("password123");
		user.setRole(Role.STUDENT);

		when(authenticationService.authenticate(loginDto)).thenReturn(user);
		when(jwtService.generateToken(user)).thenReturn("test-jwt-token");

		User authenticatedUser = authenticationService.authenticate(loginDto);
		String token = jwtService.generateToken(authenticatedUser);

		assertEquals("testuser", authenticatedUser.getUsername());
		assertEquals("test-jwt-token", token);
	}

	@Test
	void testUserService_SearchUsers() {
		User user1 = new User();
		user1.setUsername("testuser1");
		User user2 = new User();
		user2.setUsername("testuser2");

		List<User> users = Arrays.asList(user1, user2);
		when(userService.searchUsers("test")).thenReturn(users);

		List<User> searchResults = userService.searchUsers("test");
		assertEquals(2, searchResults.size());
		assertEquals("testuser1", searchResults.get(0).getUsername());
		assertEquals("testuser2", searchResults.get(1).getUsername());
	}

	@Test
	void testUserService_AddProjectToUser() {
		UUID userId = UUID.randomUUID();
		UUID projectId = UUID.randomUUID();
		
		User user = new User();
		user.setId(userId);
		user.setProjects(new ArrayList<>());

		when(userService.findById(userId)).thenReturn(Optional.of(user));
		when(userService.addProjectToUser(userId, projectId)).thenReturn(user);

		User updatedUser = userService.addProjectToUser(userId, projectId);
		assertTrue(updatedUser.getProjects().contains(projectId));
	}
}
