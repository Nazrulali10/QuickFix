package com.personal.quickfix.service;

import com.personal.quickfix.dto.auth.LoginRequest;
import com.personal.quickfix.dto.auth.LoginResponse;
import com.personal.quickfix.entity.Admin;
import com.personal.quickfix.entity.Technician;
import com.personal.quickfix.entity.User;
import com.personal.quickfix.repository.AdminRepository;
import com.personal.quickfix.repository.TechnicianRepository;
import com.personal.quickfix.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final TechnicianRepository technicianRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            TechnicianRepository technicianRepository,
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.technicianRepository = technicianRepository;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {

        // 1. Check Admin first
        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (admin != null &&
                passwordEncoder.matches(
                        request.getPassword(),
                        admin.getPassword())) {

            String token = jwtService.generateToken(
                    admin.getId(),
                    admin.getRole().name()
            );

            return new LoginResponse(
                    token,
                    admin.getRole().name(),
                    admin.getId()
            );
        }

        // 2. Check Technician
        Technician technician = technicianRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (technician != null &&
                passwordEncoder.matches(
                        request.getPassword(),
                        technician.getPassword())) {

            String token = jwtService.generateToken(
                    technician.getId(),
                    technician.getRole().name()
            );

            return new LoginResponse(
                    token,
                    technician.getRole().name(),
                    technician.getId()
            );
        }

        // 3. Check User
        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user != null &&
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword())) {

            String token = jwtService.generateToken(
                    user.getId(),
                    user.getRole().name()
            );

            return new LoginResponse(
                    token,
                    user.getRole().name(),
                    user.getId()
            );
        }

        throw new RuntimeException("Invalid email or password");
    }
    public Map<String, Object> checkAuth() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Long userId = (Long) authentication.getPrincipal();

        String role = authentication.getAuthorities()
                .iterator()
                .next()
                .getAuthority()
                .replace("ROLE_", "");

        return Map.of(
                "userId", userId,
                "role", role
        );
    }
}