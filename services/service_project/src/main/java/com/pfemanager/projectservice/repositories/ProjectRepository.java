package com.pfemanager.projectservice.repositories;

import com.pfemanager.projectservice.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {

}
