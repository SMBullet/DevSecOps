package com.pfemanager.service_auth.controller;

import com.pfemanager.service_auth.dto.AuthenticatedUserDto;
import com.pfemanager.service_auth.dto.UserforProjectDto;
import com.pfemanager.service_auth.dto.UserDetailsDto;
import com.pfemanager.service_auth.dto.UserDto;
import com.pfemanager.service_auth.model.User;
import com.pfemanager.service_auth.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDetailsDto> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        UserDetailsDto userDetailsDto = userService.getUser(currentUser.getId());

        return ResponseEntity.ok(userDetailsDto);
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> allUsers() {
        List <User> users = userService.allUsers();

        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable UUID id){
        User user = userService.findById(id)
                .orElseThrow();
        UserDto userDto = new UserDto(user);
        return  ResponseEntity.ok(userDto);
    }

    @GetMapping("/project/{id}")
    public ResponseEntity<UserforProjectDto> findUserbyId(@PathVariable UUID id){
        User user = userService.findById(id)
                .orElseThrow();
        UserforProjectDto userforProjectDto = new UserforProjectDto(user);
        return ResponseEntity.ok(userforProjectDto);
    }

    @PostMapping("/add-project")
    public ResponseEntity<UserDto> addProjectToUser(@RequestBody Map<String, String> payload) {
        UUID userId = UUID.fromString(payload.get("userId"));
        UUID projectId = UUID.fromString(payload.get("projectId"));

        User updatedUser = userService.addProjectToUser(userId, projectId);
        return ResponseEntity.ok(new UserDto(updatedUser));
    }

    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam String query) {
        return ResponseEntity.ok(userService.searchUsers(query));
    }
    @GetMapping("/teacher")
    public String teacher(){
        return "This is the teacher page";

    }
}
