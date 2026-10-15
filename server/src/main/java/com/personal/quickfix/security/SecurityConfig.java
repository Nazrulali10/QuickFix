package com.personal.quickfix.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth

                        // Public endpoints
                        .requestMatchers("/api/auth/**").permitAll()

                        // Admin
                        .requestMatchers("/api/admin/**")
                        .hasRole("ADMIN")

                        // Technician
                        .requestMatchers("/api/technicians/**")
                        .hasRole("TECHNICIAN")

                        // USER - create request
                        .requestMatchers(HttpMethod.POST, "/api/service-requests")
                        .hasRole("USER")

                        // USER - view own requests
                        .requestMatchers(HttpMethod.GET, "/api/service-requests/my")
                        .hasRole("USER")

                        // USER - cancel own request
                        .requestMatchers(HttpMethod.PUT, "/api/service-requests/*/cancel")
                        .hasRole("USER")

                        // TECHNICIAN - update request status
                        .requestMatchers(HttpMethod.PUT, "/api/service-requests/*/status")
                        .hasRole("TECHNICIAN")

                        // Authenticated users can view request details
                        .requestMatchers(HttpMethod.GET, "/api/service-requests/*")
                        .authenticated()

                        .requestMatchers(HttpMethod.GET, "/api/skills").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/skills").hasRole("ADMIN")

                        // Everything else requires login
                        .anyRequest()
                        .authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}