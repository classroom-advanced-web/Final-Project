package com.example.backend.services.google;

import com.example.backend.entities.User;

public interface IGoogleService {

    User getUserInfo(String accessToken);

}
