package com.ensa.service_user.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "teachers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Teacher extends User {
    private String department;
    private String specialization;

    @ManyToOne
    @JoinColumn(name = "university_id")
    private University university;

//    @OneToMany(mappedBy = "supervisor")
//    private List<Project> supervisedProjects = new ArrayList<>();

}
