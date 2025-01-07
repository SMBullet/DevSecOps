// package com.pfemanager.service_auth;

// import org.junit.jupiter.api.Test;
// import org.springframework.boot.test.context.SpringBootTest;
// import com.pfemanager.service_auth.dto.LoginUserDto;
// import com.pfemanager.service_auth.dto.RegisterUserDto;
// import com.pfemanager.service_auth.enums.Role;
// import com.pfemanager.service_auth.model.User;
// import com.pfemanager.service_auth.response.LoginResponse;
// import com.pfemanager.service_auth.service.JwtService;
// import com.pfemanager.service_auth.service.UserService;
// import com.pfemanager.service_auth.service.AuthenticationService;
// import java.time.LocalDate;
// import static org.junit.jupiter.api.Assertions.*;
// import static org.mockito.Mockito.*;
// import org.mockito.Mock;

// @SpringBootTest
// class ProjectApplicationTests {

//     @Mock
//     private JwtService jwtService;

//     @Mock
//     private UserService userService;

//     @Mock
//     private AuthenticationService authenticationService;

//     // Basic context load test
//     @Test
//     void contextLoads() {
//     }

//     // Authentication Service Tests
//     @Test
//     void testLoginResponseSetters() {
//         LoginResponse response = new LoginResponse();
//         response.setToken("test-token");
//         response.setExpiresIn(3600L);

//         assertEquals("test-token", response.getToken());
//         assertEquals(3600L, response.getExpiresIn());
//     }

//     @Test
//     void testRegisterUserDto() {
//         RegisterUserDto dto = new RegisterUserDto();
//         dto.setEmail("test@example.com");
//         dto.setPassword("password123");
//         dto.setUsername("testuser");
//         dto.setDob(LocalDate.of(1990, 1, 1));
//         dto.setRole(Role.STUDENT);

//         assertEquals("test@example.com", dto.getEmail());
//         assertEquals("password123", dto.getPassword());
//         assertEquals("testuser", dto.getUsername());
//         assertEquals(LocalDate.of(1990, 1, 1), dto.getDob());
//         assertEquals(Role.STUDENT, dto.getRole());
//     }

//     @Test
//     void testUserModel() {
//         User user = new User();
//         user.setUsername("testuser");
//         user.setEmail("test@example.com");
//         user.setPassword("password123");
//         user.setDob(LocalDate.of(1990, 1, 1));
//         user.setRole(Role.STUDENT);

//         assertEquals("testuser", user.getUsername());
//         assertEquals("test@example.com", user.getEmail());
//         assertEquals("password123", user.getPassword());
//         assertTrue(user.isEnabled());
//         assertTrue(user.isAccountNonExpired());
//         assertTrue(user.isAccountNonLocked());
//         assertTrue(user.isCredentialsNonExpired());
//         assertNotNull(user.getAuthorities());
//     }

//     @Test
//     void testJwtTokenGeneration() {
//         User user = new User();
//         user.setUsername("testuser");
//         user.setRole(Role.STUDENT);

//         when(jwtService.generateToken(user)).thenReturn("test-jwt-token");
//         when(jwtService.getExpirationTime()).thenReturn(3600L);

//         String token = jwtService.generateToken(user);
//         long expirationTime = jwtService.getExpirationTime();

//         assertEquals("test-jwt-token", token);
//         assertEquals(3600L, expirationTime);
//     }

//     @Test
//     void testInvalidLogin() {
//         LoginUserDto loginDto = new LoginUserDto();
//         loginDto.setUsername("invaliduser");
//         loginDto.setPassword("wrongpassword");

//         when(authenticationService.authenticate(loginDto)).thenThrow(new IllegalArgumentException("Invalid credentials"));

//         Exception exception = assertThrows(IllegalArgumentException.class, () -> {
//             authenticationService.authenticate(loginDto);
//         });

//         assertEquals("Invalid credentials", exception.getMessage());
//     }
// }
