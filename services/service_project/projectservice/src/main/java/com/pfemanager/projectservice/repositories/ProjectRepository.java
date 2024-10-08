package com.pfemanager.projectservice.repositories;

import com.pfemanager.projectservice.models.Project;
import com.pfemanager.projectservice.models.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {

}
