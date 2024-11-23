package com.ensa.service_user.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "universities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class University {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private String email;
    private String phone;

    @OneToMany(mappedBy = "university", cascade = CascadeType.ALL)
    private List<Teacher> teachers = new ArrayList<>();

    @OneToMany(mappedBy = "university", cascade = CascadeType.ALL)
    private List<Student> students = new ArrayList<>();
}