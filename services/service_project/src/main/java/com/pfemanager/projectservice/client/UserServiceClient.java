package com.pfemanager.projectservice.client;

import com.pfemanager.projectservice.dto.UserDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service
public class UserServiceClient {

    private final RestTemplate restTemplate;

    @Value("${user.service.url}")
    private String userServiceUrl;

    public UserServiceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public UserDto getUserById(UUID id) {
        String url = userServiceUrl + "/users/" + id;
        try {
            return restTemplate.getForObject(url, UserDto.class);
        } catch (HttpClientErrorException.NotFound e) {
            throw new IllegalArgumentException("User not found with ID: " + id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch user with ID: " + id, e);
        }
    }
}
