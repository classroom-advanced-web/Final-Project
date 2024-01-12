package com.example.backend.configurations;

import com.example.backend.components.JWTFilter;
import com.example.backend.constants.AppConstant;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JWTFilter jwtFilter;
    private final AuthenticationProvider authenticationProvider;
    private final JWTAuthenticationEntryPoint unauthorizedHandler;

@Bean
    public List<RequestMatcher> permitAllRequestMatchers() {
    List<RequestMatcher> permitAllMatchers = new ArrayList<>();

    permitAllMatchers.add(new AntPathRequestMatcher(AppConstant.AUTHENTICATION_PATH));
//    permitAllMatchers.add(new AntPathRequestMatcher(AppConstant.USER_PATH));
//    permitAllMatchers.add(new AntPathRequestMatcher(AppConstant.CLASSROOM_PATH));
//    permitAllMatchers.add(new AntPathRequestMatcher(AppConstant.GRADE_COMPOSITION_PATH));
    permitAllMatchers.add(new AntPathRequestMatcher(AppConstant.NOTIFICATION_PATH));
//    permitAllMatchers.add(new AntPathRequestMatcher("/ws/**"));


    return permitAllMatchers;
}

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> {
                    cors.configurationSource(corsConfigurationSource());
                }).csrf(csrf -> csrf.disable())
                .exceptionHandling(exceptions -> exceptions.authenticationEntryPoint(unauthorizedHandler))
                .httpBasic(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(permitAllRequestMatchers().toArray(new RequestMatcher[0])).permitAll()
                        .requestMatchers(AppConstant.USER_PATH).authenticated()
                        .requestMatchers(AppConstant.CLASSROOM_PATH).authenticated()
                        .requestMatchers(AppConstant.GRADE_COMPOSITION_PATH).authenticated()
                        .requestMatchers(AppConstant.GRADE_PATH).authenticated()
                        .anyRequest().authenticated())
//                .exceptionHandling(exceptions -> exceptions.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
//        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
//        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new
                UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
