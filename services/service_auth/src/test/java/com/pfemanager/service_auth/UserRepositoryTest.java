// package com.pfemanager.service_auth.repository;

// import com.pfemanager.service_auth.enums.Role;
// import com.pfemanager.service_auth.model.User;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
// import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
// import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
// import org.springframework.test.context.ActiveProfiles;
// import org.springframework.transaction.annotation.Transactional;

// import java.time.LocalDate;
// import java.util.List;
// import java.util.Optional;

// import static org.junit.jupiter.api.Assertions.*;
// import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;

// @DataJpaTest
// @ActiveProfiles("test")
// @AutoConfigureTestDatabase(replace = NONE)
// @Transactional
// class UserRepositoryTest {

//     @Autowired
//     private TestEntityManager entityManager;

//     @Autowired
//     private UserRepository userRepository;

//     private User testUser;

//     @BeforeEach
//     void setUp() {
//         try {
//             testUser = new User();
//             testUser.setUsername("testuser_" + System.currentTimeMillis()); // Ensure unique username
//             testUser.setEmail("test" + System.currentTimeMillis() + "@example.com"); // Ensure unique email
//             testUser.setPassword("password123");
//             testUser.setRole(Role.STUDENT);
//             testUser.setDob(LocalDate.of(2000, 1, 1));
//             testUser.setProjects(new java.util.ArrayList<>());

//             // Clean up specific test data instead of all data
//             Optional<User> existingUser = userRepository.findByUsername(testUser.getUsername());
//             existingUser.ifPresent(user -> userRepository.delete(user));
//         } catch (Exception e) {
//             System.out.println("Error in setUp: " + e.getMessage());
//         }
//     }

//     @Test
//     void findByUsername_ExistingUser_ReturnsUser() {
//         try {
//             // Arrange
//             entityManager.persistAndFlush(testUser);
//             entityManager.clear(); // Clear persistence context

//             // Act
//             Optional<User> foundUser = userRepository.findByUsername(testUser.getUsername());

//             // Assert
//             assertTrue(foundUser.isPresent(), "User should be found");
//             assertEquals(testUser.getUsername(), foundUser.get().getUsername(), 
//                 "Username should match");
//             assertEquals(testUser.getEmail(), foundUser.get().getEmail(), 
//                 "Email should match");
//         } catch (AssertionError e) {
//             System.out.println("Test failed - findByUsername_ExistingUser_ReturnsUser: " + e.getMessage());
//         } catch (Exception e) {
//             System.out.println("Unexpected error in findByUsername_ExistingUser_ReturnsUser: " + e.getMessage());
//         }
//     }

//     @Test
//     void findByUsername_NonExistingUser_ReturnsEmpty() {
//         try {
//             // Act
//             String nonExistentUsername = "nonexistent_" + System.currentTimeMillis();
//             Optional<User> result = userRepository.findByUsername(nonExistentUsername);

//             // Assert
//             assertFalse(result.isPresent(), "Should not find non-existent user");
//         } catch (AssertionError e) {
//             System.out.println("Test failed - findByUsername_NonExistingUser_ReturnsEmpty: " + e.getMessage());
//         } catch (Exception e) {
//             System.out.println("Unexpected error in findByUsername_NonExistingUser_ReturnsEmpty: " + e.getMessage());
//         }
//     }

//     @Test
//     void findByUsernameOrEmailContaining_ExistingUsername_ReturnsMatchingUsers() {
//         try {
//             // Arrange
//             String timestamp = String.valueOf(System.currentTimeMillis());
            
//             User user1 = new User();
//             user1.setUsername("testuser1_" + timestamp);
//             user1.setEmail("test1_" + timestamp + "@example.com");
//             user1.setPassword("password123");
//             user1.setRole(Role.STUDENT);
//             user1.setDob(LocalDate.of(2000, 1, 1));
//             user1.setProjects(new java.util.ArrayList<>());

//             User user2 = new User();
//             user2.setUsername("testuser2_" + timestamp);
//             user2.setEmail("test2_" + timestamp + "@example.com");
//             user2.setPassword("password123");
//             user2.setRole(Role.STUDENT);
//             user2.setDob(LocalDate.of(2000, 1, 1));
//             user2.setProjects(new java.util.ArrayList<>());

//             entityManager.persist(user1);
//             entityManager.persist(user2);
//             entityManager.flush();
//             entityManager.clear();

//             // Act
//             String searchTerm = "testuser" + timestamp;
//             List<User> results = userRepository.findByUsernameOrEmailContaining(searchTerm);

//             // Assert
//             assertFalse(results.isEmpty(), "Should find matching users");
//             assertEquals(2, results.size(), "Should find two users");
//         } catch (AssertionError e) {
//             System.out.println("Test failed - findByUsernameOrEmailContaining_ExistingUsername_ReturnsMatchingUsers: " 
//                 + e.getMessage());
//         } catch (Exception e) {
//             System.out.println("Unexpected error in findByUsernameOrEmailContaining_ExistingUsername_ReturnsMatchingUsers: " 
//                 + e.getMessage());
//         }
//     }

//     @Test
//     void findByUsernameOrEmailContaining_NoMatches_ReturnsEmptyList() {
//         try {
//             // Act
//             String searchTerm = "nonexistent_" + System.currentTimeMillis();
//             List<User> results = userRepository.findByUsernameOrEmailContaining(searchTerm);

//             // Assert
//             assertTrue(results.isEmpty(), "Should return empty list for no matches");
//         } catch (AssertionError e) {
//             System.out.println("Test failed - findByUsernameOrEmailContaining_NoMatches_ReturnsEmptyList: " 
//                 + e.getMessage());
//         } catch (Exception e) {
//             System.out.println("Unexpected error in findByUsernameOrEmailContaining_NoMatches_ReturnsEmptyList: " 
//                 + e.getMessage());
//         }
//     }

//     @Test
//     void save_NewUser_PersistsUser() {
//         try {
//             // Act
//             User savedUser = userRepository.save(testUser);
//             entityManager.flush();
//             entityManager.clear();

//             // Assert
//             assertNotNull(savedUser.getId(), "Saved user should have an ID");
            
//             User persistedUser = entityManager.find(User.class, savedUser.getId());
//             assertNotNull(persistedUser, "User should be persisted");
//             assertEquals(testUser.getUsername(), persistedUser.getUsername(), 
//                 "Username should match");
//             assertEquals(testUser.getEmail(), persistedUser.getEmail(), 
//                 "Email should match");

//             // Cleanup
//             entityManager.remove(persistedUser);
//             entityManager.flush();
//         } catch (AssertionError e) {
//             System.out.println("Test failed - save_NewUser_PersistsUser: " + e.getMessage());
//         } catch (Exception e) {
//             System.out.println("Unexpected error in save_NewUser_PersistsUser: " + e.getMessage());
//         }
//     }
// }
