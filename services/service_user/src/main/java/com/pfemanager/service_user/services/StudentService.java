package com.pfemanager.service_user.services;

import com.pfemanager.service_user.dto.StudentDTO;
import com.pfemanager.service_user.model.Student;
import com.pfemanager.service_user.model.University;
import com.pfemanager.service_user.repositories.StudentRepository;
import com.pfemanager.service_user.repositories.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UniversityRepository universityRepository;

    public StudentDTO createStudent(StudentDTO studentDTO) {
        Student student = mapToEntity(studentDTO);
        Student savedStudent = studentRepository.save(student);
        return mapToDTO(savedStudent);
    }

    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public StudentDTO getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        return mapToDTO(student);
    }

    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) {
        return studentRepository.findById(id)
                .map(student -> {
                    student.setUsername(studentDTO.getUsername());
                    student.setEmail(studentDTO.getEmail());
                    student.setRole(studentDTO.getRole());
                    student.setStudentId(studentDTO.getStudentId());
                    student.setMajor(studentDTO.getMajor());
                    student.setYear(studentDTO.getYear());
                    student.setUniversity(getUniversityById(studentDTO.getUniversityId()));
                    return studentRepository.save(student);
                })
                .map(this::mapToDTO)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    private University getUniversityById(Long id) {
        return universityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("University not found with id: " + id));
    }

    private Student mapToEntity(StudentDTO dto) {
        Student student = new Student();
        student.setId(dto.getId());
        student.setUsername(dto.getUsername());
        student.setEmail(dto.getEmail());
        student.setRole(dto.getRole());
        student.setStudentId(dto.getStudentId());
        student.setMajor(dto.getMajor());
        student.setYear(dto.getYear());
        student.setUniversity(getUniversityById(dto.getUniversityId()));
        return student;
    }

    private StudentDTO mapToDTO(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setUsername(student.getUsername());
        dto.setEmail(student.getEmail());
        dto.setRole(student.getRole());
        dto.setStudentId(student.getStudentId());
        dto.setMajor(student.getMajor());
        dto.setYear(student.getYear());
        dto.setUniversityId(student.getUniversity().getId());
        return dto;
    }
}






