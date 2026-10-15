package com.personal.quickfix.service;

import com.personal.quickfix.dto.admin.AssignTechnicianRequest;
import com.personal.quickfix.dto.technician.CreateTechnicianRequest;
import com.personal.quickfix.entity.*;
import com.personal.quickfix.repository.ServiceRequestRepository;
import com.personal.quickfix.repository.SkillRepository;
import com.personal.quickfix.repository.TechnicianRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AdminService {

    private final TechnicianRepository technicianRepository;
    private final SkillRepository skillRepository;
    private final ServiceRequestRepository serviceRequestRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(
            TechnicianRepository technicianRepository,
            SkillRepository skillRepository,
            ServiceRequestRepository serviceRequestRepository,
            PasswordEncoder passwordEncoder) {

        this.technicianRepository = technicianRepository;
        this.skillRepository = skillRepository;
        this.serviceRequestRepository = serviceRequestRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Technician createTechnician(CreateTechnicianRequest request) {

        if (technicianRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Technician email already registered");
        }

        Set<Skill> skills = new HashSet<>();

        for (Long skillId : request.getSkillIds()) {
            Skill skill = skillRepository.findById(skillId)
                    .orElseThrow(() -> new RuntimeException(
                            "Skill not found: " + skillId
                    ));

            skills.add(skill);
        }

        Technician technician = new Technician();

        technician.setName(request.getName());
        technician.setEmail(request.getEmail());
        technician.setPassword(passwordEncoder.encode(request.getPassword()));
        technician.setPhone(request.getPhone());
        technician.setRole(Role.TECHNICIAN);
        technician.setSkills(skills);

        return technicianRepository.save(technician);
    }
    public ServiceRequest assignTechnician(Long requestId, AssignTechnicianRequest request) {

        ServiceRequest serviceRequest = serviceRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Service request not found"));

        Technician technician = technicianRepository.findById(request.getTechnicianId())
                .orElseThrow(() -> new RuntimeException("Technician not found"));

        if (technician.getStatus() != TechnicianStatus.ACTIVE) {
            throw new RuntimeException("Technician is not active");
        }

        if (!technician.getSkills().contains(serviceRequest.getSkill())) {
            throw new RuntimeException("Technician does not have the required skill");
        }

        serviceRequest.setTechnician(technician);
        serviceRequest.setStatus(RequestStatus.ASSIGNED);

        technician.setStatus(TechnicianStatus.BUSY);

        technicianRepository.save(technician);

        return serviceRequestRepository.save(serviceRequest);
    }
    public List<ServiceRequest> getAllServiceRequests() {
        return serviceRequestRepository.findAll();
    }
    public List<Technician> getAllTechnicians() {
        return technicianRepository.findAll();
    }
    public ServiceRequest cancelServiceRequest(Long requestId) {

        ServiceRequest serviceRequest =
                serviceRequestRepository.findById(requestId)
                        .orElseThrow(() ->
                                new RuntimeException("Service request not found"));

        if (serviceRequest.getStatus() == RequestStatus.COMPLETED) {
            throw new RuntimeException(
                    "Completed request cannot be cancelled");
        }

        if (serviceRequest.getStatus() == RequestStatus.CANCELLED) {
            throw new RuntimeException(
                    "Request is already cancelled");
        }

        serviceRequest.setStatus(RequestStatus.CANCELLED);

        return serviceRequestRepository.save(serviceRequest);
    }
}