package com.example.backend.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
public class NotificationConfig {

    @Bean
    public Map<String, SseEmitter> userEmitters() {
        return new ConcurrentHashMap<>();
    }
}
