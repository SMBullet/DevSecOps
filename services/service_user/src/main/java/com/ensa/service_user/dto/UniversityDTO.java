package com.ensa.service_user.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UniversityDTO {
    private Long id;
    private String name;
    private String address;
    private String email;
    private String phone;
}

