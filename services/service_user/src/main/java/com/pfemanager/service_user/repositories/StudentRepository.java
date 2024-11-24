package com.pfemanager.service_user.repositories;

import com.pfemanager.service_user.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByUniversityId(Long universityId);
    List<Student> findByMajor(String major);
    Optional<Student> findByStudentId(String studentId);
}