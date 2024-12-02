package com.pfemanager.service_auth.controller;

import com.pfemanager.service_auth.dto.AuthenticatedUserDto;
import com.pfemanager.service_auth.dto.UserDto;
import com.pfemanager.service_auth.model.User;
import com.pfemanager.service_auth.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
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
    public ResponseEntity<AuthenticatedUserDto> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        AuthenticatedUserDto authenticatedUserDto = new AuthenticatedUserDto(currentUser);

        return ResponseEntity.ok(authenticatedUserDto);
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

    @GetMapping("/teacher")
    public String teacher(){
        return "This is the teacher page";

    }
}
