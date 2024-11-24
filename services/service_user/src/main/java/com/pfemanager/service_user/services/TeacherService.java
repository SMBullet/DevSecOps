package com.pfemanager.service_user.services;

import com.pfemanager.service_user.dto.TeacherDTO;
import com.pfemanager.service_user.model.Teacher;
import com.pfemanager.service_user.model.University;
import com.pfemanager.service_user.repositories.TeacherRepository;
import com.pfemanager.service_user.repositories.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private UniversityRepository universityRepository;

    public TeacherDTO createTeacher(TeacherDTO teacherDTO) {
        Teacher teacher = mapToEntity(teacherDTO);
        Teacher savedTeacher = teacherRepository.save(teacher);
        return mapToDTO(savedTeacher);
    }

    public List<TeacherDTO> getAllTeachers() {
        return teacherRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public TeacherDTO getTeacherById(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found with id: " + id));
        return mapToDTO(teacher);
    }

    public TeacherDTO updateTeacher(Long id, TeacherDTO teacherDTO) {
        return teacherRepository.findById(id)
                .map(teacher -> {
                    teacher.setUsername(teacherDTO.getUsername());
                    teacher.setEmail(teacherDTO.getEmail());
                    teacher.setRole(teacherDTO.getRole());
                    teacher.setDepartment(teacherDTO.getDepartment());
                    teacher.setSpecialization(teacherDTO.getSpecialization());
                    teacher.setUniversity(getUniversityById(teacherDTO.getUniversityId()));
                    return teacherRepository.save(teacher);
                })
                .map(this::mapToDTO)
                .orElseThrow(() -> new RuntimeException("Teacher not found with id: " + id));
    }

    public void deleteTeacher(Long id) {
        teacherRepository.deleteById(id);
    }

    private University getUniversityById(Long id) {
        return universityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("University not found with id: " + id));
    }

    private Teacher mapToEntity(TeacherDTO dto) {
        Teacher teacher = new Teacher();
        teacher.setId(dto.getId());
        teacher.setUsername(dto.getUsername());
        teacher.setEmail(dto.getEmail());
        teacher.setRole(dto.getRole());
        teacher.setDepartment(dto.getDepartment());
        teacher.setSpecialization(dto.getSpecialization());
        teacher.setUniversity(getUniversityById(dto.getUniversityId()));
        return teacher;
    }

    private TeacherDTO mapToDTO(Teacher teacher) {
        TeacherDTO dto = new TeacherDTO();
        dto.setId(teacher.getId());
        dto.setUsername(teacher.getUsername());
        dto.setEmail(teacher.getEmail());
        dto.setRole(teacher.getRole());
        dto.setDepartment(teacher.getDepartment());
        dto.setSpecialization(teacher.getSpecialization());
        dto.setUniversityId(teacher.getUniversity().getId());
        return dto;
    }
}
