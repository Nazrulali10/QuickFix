package com.personal.quickfix.controller;



import com.personal.quickfix.dto.admin.AssignTechnicianRequest;
import com.personal.quickfix.dto.technician.CreateTechnicianRequest;
import com.personal.quickfix.entity.ServiceRequest;
import com.personal.quickfix.entity.Technician;
import com.personal.quickfix.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/technicians")
    public ResponseEntity<Technician> createTechnician(
            @Valid @RequestBody CreateTechnicianRequest request) {

        Technician technician = adminService.createTechnician(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(technician);
    }
    @PutMapping("/service-requests/{requestId}/assign")
    public ResponseEntity<ServiceRequest> assignTechnician(
            @PathVariable Long requestId,
            @Valid @RequestBody AssignTechnicianRequest request) {

        ServiceRequest serviceRequest =
                adminService.assignTechnician(requestId, request);

        return ResponseEntity.ok(serviceRequest);
    }
    @GetMapping("/service-requests")
    public ResponseEntity<List<ServiceRequest>> getAllServiceRequests() {

        List<ServiceRequest> requests =
                adminService.getAllServiceRequests();

        return ResponseEntity.ok(requests);
    }
    @GetMapping("/technicians")
    public ResponseEntity<List<Technician>> getAllTechnicians() {

        List<Technician> technicians =
                adminService.getAllTechnicians();

        return ResponseEntity.ok(technicians);
    }
    @PutMapping("/service-requests/{requestId}/cancel")
    public ResponseEntity<ServiceRequest> cancelServiceRequest(
            @PathVariable Long requestId) {

        ServiceRequest serviceRequest =
                adminService.cancelServiceRequest(requestId);

        return ResponseEntity.ok(serviceRequest);
    }
}