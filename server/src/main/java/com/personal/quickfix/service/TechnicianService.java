package com.personal.quickfix.service;

import com.personal.quickfix.dto.technician.TechnicianProfileResponse;
import com.personal.quickfix.dto.technician.UpdateTechnicianStatus;
import com.personal.quickfix.entity.ServiceRequest;
import com.personal.quickfix.entity.Technician;
import com.personal.quickfix.entity.TechnicianStatus;
import com.personal.quickfix.repository.ServiceRequestRepository;
import com.personal.quickfix.repository.TechnicianRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechnicianService {

    private final TechnicianRepository technicianRepository;
    private final ServiceRequestRepository serviceRequestRepository;

    public TechnicianService(
            TechnicianRepository technicianRepository,
            ServiceRequestRepository serviceRequestRepository) {

        this.technicianRepository = technicianRepository;
        this.serviceRequestRepository = serviceRequestRepository;
    }

    public Technician updateStatus(UpdateTechnicianStatus request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Long technicianId = (Long) authentication.getPrincipal();

        Technician technician = technicianRepository.findById(technicianId)
                .orElseThrow(() -> new RuntimeException("Technician not found"));

        if (request.getStatus() == TechnicianStatus.BUSY) {
            throw new RuntimeException(
                    "Technician status cannot be changed to BUSY manually");
        }

        if (technician.getStatus() == TechnicianStatus.BUSY
                && request.getStatus() == TechnicianStatus.OFFLINE) {

            throw new RuntimeException(
                    "Busy technician cannot go offline");
        }

        technician.setStatus(request.getStatus());

        return technicianRepository.save(technician);
    }

    public List<ServiceRequest> getAssignedRequests() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Long technicianId = (Long) authentication.getPrincipal();

        technicianRepository.findById(technicianId)
                .orElseThrow(() -> new RuntimeException("Technician not found"));

        return serviceRequestRepository.findByTechnicianId(technicianId);
    }

    public TechnicianProfileResponse getMyProfile() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Long technicianId = (Long) authentication.getPrincipal();

        Technician technician = technicianRepository.findById(technicianId)
                .orElseThrow(() ->
                        new RuntimeException("Technician not found"));

        TechnicianProfileResponse response = new TechnicianProfileResponse();

        response.setId(technician.getId());
        response.setName(technician.getName());
        response.setEmail(technician.getEmail());
        response.setPhone(technician.getPhone());
        response.setStatus(technician.getStatus().name());

        response.setSkills(
                technician.getSkills()
                        .stream()
                        .map(skill -> skill.getName())
                        .toList()
        );

        return response;
    }

}