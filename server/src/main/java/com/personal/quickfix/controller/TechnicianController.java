package com.personal.quickfix.controller;

import com.personal.quickfix.dto.technician.TechnicianProfileResponse;
import com.personal.quickfix.entity.ServiceRequest;
import com.personal.quickfix.service.TechnicianService;
import com.personal.quickfix.dto.technician.UpdateTechnicianStatus;
import com.personal.quickfix.entity.Technician;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/technicians")
public class TechnicianController {

    private final TechnicianService technicianService;

    public TechnicianController(TechnicianService technicianService) {
        this.technicianService = technicianService;
    }

    @PutMapping("/status")
    public ResponseEntity<Technician> updateStatus(
            @Valid @RequestBody UpdateTechnicianStatus request) {

        Technician technician = technicianService.updateStatus(request);

        return ResponseEntity.ok(technician);
    }

    @GetMapping("/requests")
    public ResponseEntity<List<ServiceRequest>> getAssignedRequests() {

        List<ServiceRequest> requests =
                technicianService.getAssignedRequests();

        return ResponseEntity.ok(requests);
    }

    @GetMapping("/me")
    public ResponseEntity<TechnicianProfileResponse> getMyProfile() {

        TechnicianProfileResponse response =
                technicianService.getMyProfile();

        return ResponseEntity.ok(response);
    }

}