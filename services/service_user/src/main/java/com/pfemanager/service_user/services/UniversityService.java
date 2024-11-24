package com.pfemanager.service_user.services;

import com.pfemanager.service_user.dto.UniversityDTO;
import com.pfemanager.service_user.model.University;
import com.pfemanager.service_user.repositories.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UniversityService {

    @Autowired
    private UniversityRepository universityRepository;

    public UniversityDTO createUniversity(UniversityDTO universityDTO) {
        University university = mapToEntity(universityDTO); // Convert DTO to Entity
        University savedUniversity = universityRepository.save(university);
        return mapToDTO(savedUniversity); // Convert Entity back to DTO
    }

    public List<UniversityDTO> getAllUniversities() {
        return universityRepository.findAll()
                .stream()
                .map(this::mapToDTO) // Convert each University to UniversityDTO
                .toList();
    }

    public UniversityDTO getUniversityById(Long id) {
        University university = universityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("University not found with id: " + id));
        return mapToDTO(university);
    }

    public UniversityDTO updateUniversity(Long id, UniversityDTO universityDTO) {
        return universityRepository.findById(id)
                .map(university -> {
                    university.setName(universityDTO.getName());
                    university.setAddress(universityDTO.getAddress());
                    university.setEmail(universityDTO.getEmail());
                    university.setPhone(universityDTO.getPhone());
                    return universityRepository.save(university);
                })
                .map(this::mapToDTO)
                .orElseThrow(() -> new RuntimeException("University not found with id: " + id));
    }

    public void deleteUniversity(Long id) {
        universityRepository.deleteById(id);
    }

    private University mapToEntity(UniversityDTO dto) {
        University university = new University();
        university.setId(dto.getId());
        university.setName(dto.getName());
        university.setAddress(dto.getAddress());
        university.setEmail(dto.getEmail());
        university.setPhone(dto.getPhone());
        return university;
    }

    private UniversityDTO mapToDTO(University university) {
        UniversityDTO dto = new UniversityDTO();
        dto.setId(university.getId());
        dto.setName(university.getName());
        dto.setAddress(university.getAddress());
        dto.setEmail(university.getEmail());
        dto.setPhone(university.getPhone());
        return dto;
    }
}
