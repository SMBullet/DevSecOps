package com.pfemanager.service_auth.client;

import com.pfemanager.service_auth.dto.ProjectDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service
public class ProjectServiceClient {

    private final RestTemplate restTemplate;

    @Value("http://localhost:8081")
    private String projectServiceUrl;

    public ProjectServiceClient(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }

    public ProjectDto getProjectById(UUID projectId) {
        String url = projectServiceUrl + "/projects/" + projectId;
        try {
            return restTemplate.getForObject(url, ProjectDto.class);
        } catch (HttpClientErrorException.NotFound e) {
            throw new IllegalArgumentException("Project not found with ID: " + projectId);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch project with ID: " + projectId, e);
        }
    }
}