<<<<<<< HEAD
package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class JoinClassByOTPRequestDTO {

    @JsonProperty("class _id")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    Long classId;


    String code;

    @JsonProperty("role_id")
    Long roleId;


}
=======
package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class JoinClassByOTPRequestDTO {

    @JsonProperty("class _id")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    Long classId;


    String code;



}
>>>>>>> c83234da551f932e2f7d54eda9b81bcea5283c60
