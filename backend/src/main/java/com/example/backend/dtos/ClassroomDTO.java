package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
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

    @JsonProperty("role")
    RoleDTO role;

    @JsonProperty("is_revoked")
    Boolean isRevoked;

}
