package com.pfemanager.service_user.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherDTO extends UserDTO {
    private String department;
    private String specialization;
    private Long universityId;
}

