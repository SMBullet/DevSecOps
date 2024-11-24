package com.pfemanager.service_user.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Student extends User {
    private String studentId;
    private String major;
    private Integer year;

    @ManyToOne
    @JoinColumn(name = "university_id")
    private University university;

//    @ManyToMany(mappedBy = "students")
//    private List<Project> projects = new ArrayList<>();
}