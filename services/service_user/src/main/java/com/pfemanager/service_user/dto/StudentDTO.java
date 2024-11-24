package com.pfemanager.service_user.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO extends UserDTO {
    private String studentId;
    private String major;
    private Integer year;
    private Long universityId;
}
