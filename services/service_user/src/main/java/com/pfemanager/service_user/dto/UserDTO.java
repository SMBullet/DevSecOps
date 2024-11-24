package com.pfemanager.service_user.dto;

import com.pfemanager.service_user.model.UserRole;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private UserRole role;
}
