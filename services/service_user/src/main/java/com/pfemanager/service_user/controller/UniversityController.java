package com.pfemanager.service_user.controller;

import com.pfemanager.service_user.dto.UniversityDTO;
import com.pfemanager.service_user.services.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/universities")
public class UniversityController {

    @Autowired
    private UniversityService universityService;

    @PostMapping
    public ResponseEntity<UniversityDTO> createUniversity(@RequestBody UniversityDTO universityDTO) {
        UniversityDTO createdUniversity = universityService.createUniversity(universityDTO);
        return new ResponseEntity<>(createdUniversity, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UniversityDTO>> getAllUniversities() {
        List<UniversityDTO> universities = universityService.getAllUniversities();
        return new ResponseEntity<>(universities, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UniversityDTO> getUniversityById(@PathVariable Long id) {
        UniversityDTO university = universityService.getUniversityById(id);
        return new ResponseEntity<>(university, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UniversityDTO> updateUniversity(@PathVariable Long id, @RequestBody UniversityDTO universityDTO) {
        UniversityDTO updatedUniversity = universityService.updateUniversity(id, universityDTO);
        return new ResponseEntity<>(updatedUniversity, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUniversity(@PathVariable Long id) {
        universityService.deleteUniversity(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
