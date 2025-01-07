package com.pfemanager.service_auth.dto;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class ProjectDtoTest {

    @Test
    void testBuilder() {
        UUID universityId = UUID.randomUUID();
        ProjectDto projectDto = ProjectDto.builder()
                .title("Project Title")
                .description("Description")
                .location("Location")
                .projectTime(LocalDateTime.now())
                .subject("Subject")
                .universityId(universityId)
                .reportUrl("http://example.com/report")
                .build();

        assertNotNull(projectDto);
        assertEquals("Project Title", projectDto.getTitle());
        assertEquals(universityId, projectDto.getUniversityId());
    }
}
