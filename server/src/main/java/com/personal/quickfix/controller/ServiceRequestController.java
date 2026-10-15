package com.personal.quickfix.controller;

import com.personal.quickfix.dto.serviceRequest.CreateServiceRequest;
import com.personal.quickfix.dto.serviceRequest.UpdateRequestStatus;
import com.personal.quickfix.service.ServiceRequestService;
import com.personal.quickfix.entity.ServiceRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-requests")
public class ServiceRequestController {

    private final ServiceRequestService serviceRequestService;

    public ServiceRequestController(ServiceRequestService serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
    }

    @PostMapping
    public ResponseEntity<ServiceRequest> createServiceRequest(
            @Valid @RequestBody CreateServiceRequest request) {

        ServiceRequest serviceRequest =
                serviceRequestService.createServiceRequest(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(serviceRequest);
    }

    @GetMapping("/my")
    public ResponseEntity<List<ServiceRequest>> getMyRequests() {

        List<ServiceRequest> requests =
                serviceRequestService.getMyRequests();

        return ResponseEntity.ok(requests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceRequest> getRequestById(
            @PathVariable Long id) {

        ServiceRequest serviceRequest =
                serviceRequestService.getRequestById(id);

        return ResponseEntity.ok(serviceRequest);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<ServiceRequest> cancelRequest(
            @PathVariable Long id) {

        ServiceRequest serviceRequest =
                serviceRequestService.cancelRequest(id);

        return ResponseEntity.ok(serviceRequest);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ServiceRequest> updateRequestStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateRequestStatus request) {

        ServiceRequest serviceRequest =
                serviceRequestService.updateRequestStatus(id, request);

        return ResponseEntity.ok(serviceRequest);
    }
}