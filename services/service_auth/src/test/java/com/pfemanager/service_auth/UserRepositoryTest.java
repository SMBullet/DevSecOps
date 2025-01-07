package com.pfemanager.service_auth.repository;

import com.pfemanager.service_auth.model.User;
import com.pfemanager.service_auth.enums.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.context.annotation.Import;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@Import(UserRepository.class)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setUsername("testUser");
        testUser.setEmail("test@example.com");
        testUser.setPassword("password123");
        testUser.setRole(Role.STUDENT);
        testUser.setDob(LocalDate.of(2000, 1, 1));
        userRepository.save(testUser);
    }

    @Test
    void findByUsername_FindsUser() {
        Optional<User> foundUser = userRepository.findByUsername("testUser");
        assertTrue(foundUser.isPresent());
        assertEquals("testUser", foundUser.get().getUsername());
    }

    @Test
    void findByUsernameOrEmailContaining_FindsUser() {
        var users = userRepository.findByUsernameOrEmailContaining("test");
        assertFalse(users.isEmpty());
        assertEquals(1, users.size());
    }
}
