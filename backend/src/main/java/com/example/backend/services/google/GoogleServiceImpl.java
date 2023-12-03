package com.example.backend.services.google;

import com.example.backend.entities.User;
import com.fasterxml.jackson.core.JsonFactory;
import com.google.api.client.auth.openidconnect.IdToken;
import com.google.api.client.auth.openidconnect.IdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GooglePublicKeysManager;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Map;
import java.util.logging.Logger;

@Service

public class GoogleServiceImpl implements IGoogleService {

    private static final String GOOGLE_TOKEN_INFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo?access_token=";

    @Value("${application.security.oauth2.google.client-id}")
    private String clientId;

//    private GoogleIdTokenVerifier verifier;
//    private String clientId = "228097325596-si80lhvch9q4g7gmqj5e7cvrilca63p5.apps.googleusercontent.com";





    @Override
    public User getUserInfo(String accessToken) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // Construct the URL for Google Token Info API
            String url = GOOGLE_TOKEN_INFO_URL + accessToken;

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            // Make a GET request to Google Token Info API
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    url, HttpMethod.GET, new HttpEntity<>(headers), new ParameterizedTypeReference<Map<String, Object>>() {});

            // Check the response status
            if (response.getStatusCode() == HttpStatus.OK) {
                // Token is valid
                Map<String, Object> userInfo = response.getBody();


                return User.builder()
                        .firstName((String) userInfo.get("given_name"))
                        .lastName((String) userInfo.get("family_name"))
                        .email((String) userInfo.get("email"))
                        .build();
            } else {
                // Token is not valid
                return null;
            }
        } catch (Exception e) {
            // Handle exceptions
            e.printStackTrace();
            return null;
        }
    }




    public GoogleIdToken.Payload verifyIDToken(String idTokenString) throws GeneralSecurityException, IOException {
        try {
            NetHttpTransport transport = new NetHttpTransport();
            JacksonFactory jsonFactory = new JacksonFactory();

            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                    .setAudience(Collections.singletonList(clientId))
                    .build();

            Logger logger = Logger.getLogger(GoogleServiceImpl.class.getName());
            logger.info("client id: " + clientId);
            GoogleIdToken idTokenObj = verifier.verify(idTokenString);
            if (idTokenObj == null) {
                System.out.println("Invalid ID token.");
                return null;
            }
            GoogleIdToken.Payload payload = idTokenObj.getPayload();
            String firstName = (String) payload.get("given_name");
            String lastName = (String) payload.get("family_name");
            String email = payload.getEmail();
            String pictureUrl = (String) payload.get("picture");


                System.out.println("User ID: " + payload.getSubject());
                System.out.println("User Email: " + payload.getEmail());
                System.out.println("User Name: " + firstName + " " + lastName); // Replace "name" with the actual claim you want
            return null;
        } catch (GeneralSecurityException | IOException e) {
            e.printStackTrace();
            return null;
        }
    }


}
