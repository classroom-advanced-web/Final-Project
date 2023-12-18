package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassroomDTO {

    String id;
    String name;
    String description;
    String subject;

    String section;

    String code;
    String room;

    @JsonProperty("image_url")
    String imageUrl;

}
