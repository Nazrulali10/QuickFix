package com.personal.quickfix.controller;

import com.personal.quickfix.dto.auth.LoginRequest;
import com.personal.quickfix.dto.auth.LoginResponse;
import com.personal.quickfix.dto.auth.RegisterRequest;
import com.personal.quickfix.dto.common.UserResponse;
import com.personal.quickfix.service.AuthService;
import com.personal.quickfix.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    public AuthController(UserService userService,AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }


    @PostMapping("user/register")
    public ResponseEntity<UserResponse> registerUser(
            @Valid @RequestBody RegisterRequest request) {

        UserResponse response = userService.registerUser(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> checkAuth() {
        return ResponseEntity.ok(authService.checkAuth());
    }
    
@PostMapping("/login")
public LoginResponse login(
        @RequestBody LoginRequest request,
        HttpServletResponse response) {

    LoginResponse loginResponse = authService.login(request);

    ResponseCookie cookie = ResponseCookie.from("token", loginResponse.getToken())
            .httpOnly(true)
            .secure(true)
            .sameSite("None")
            .path("/")
            .maxAge(24 * 60 * 60)
            .build();

    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

    return loginResponse;
}

@PostMapping("/logout")
public ResponseEntity<Void> logout(HttpServletResponse response) {

    ResponseCookie cookie = ResponseCookie.from("token", "")
            .httpOnly(true)
            .secure(true)
            .sameSite("None")
            .path("/")
            .maxAge(0)
            .build();

    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

    return ResponseEntity.noContent().build();
}

}