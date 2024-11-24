package com.pfemanager.service_user.repositories;

import com.pfemanager.service_user.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    List<Teacher> findByUniversityId(Long universityId);
    List<Teacher> findByDepartment(String department);
}
