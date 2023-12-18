<<<<<<< HEAD
package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class JoinClassByEmailRequestDTO {

    @JsonProperty("access_token")
    String accessToken;

    @JsonProperty("role_id")
    Long roleId;

    @JsonProperty("classroom_code")
    String classroomCode;
}
=======
package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Builder
@Getter
public class JoinClassByEmailRequestDTO {

    @JsonProperty("invitation_id")
    private Long invitationId;
}
>>>>>>> c83234da551f932e2f7d54eda9b81bcea5283c60
