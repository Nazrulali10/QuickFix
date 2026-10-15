package com.personal.quickfix.service;

import com.personal.quickfix.dto.serviceRequest.CreateServiceRequest;
import com.personal.quickfix.dto.serviceRequest.UpdateRequestStatus;
import com.personal.quickfix.entity.RequestStatus;
import com.personal.quickfix.entity.ServiceRequest;
import com.personal.quickfix.entity.Skill;
import com.personal.quickfix.entity.User;
import com.personal.quickfix.repository.ServiceRequestRepository;
import com.personal.quickfix.repository.SkillRepository;
import com.personal.quickfix.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceRequestService {

    private final ServiceRequestRepository serviceRequestRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    public ServiceRequestService(
            ServiceRequestRepository serviceRequestRepository,
            UserRepository userRepository,
            SkillRepository skillRepository) {

        this.serviceRequestRepository = serviceRequestRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
    }

    public ServiceRequest createServiceRequest(CreateServiceRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Long userId = (Long) authentication.getPrincipal();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        ServiceRequest serviceRequest = new ServiceRequest();

        serviceRequest.setUser(user);
        serviceRequest.setSkill(skill);
        serviceRequest.setDescription(request.getDescription());
        serviceRequest.setLocation(request.getLocation());

        return serviceRequestRepository.save(serviceRequest);
    }

    public List<ServiceRequest> getMyRequests() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Long userId = (Long) authentication.getPrincipal();

        return serviceRequestRepository.findByUserId(userId);
    }

    public ServiceRequest getRequestById(Long id) {

        return serviceRequestRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Service request not found"));
    }

    public ServiceRequest cancelRequest(Long id) {

        ServiceRequest serviceRequest =
                serviceRequestRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Service request not found"));

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Long userId = (Long) authentication.getPrincipal();

        if (!serviceRequest.getUser().getId().equals(userId)) {
            throw new RuntimeException(
                    "You are not authorized to cancel this request");
        }

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

    public ServiceRequest updateRequestStatus(
            Long id,
            UpdateRequestStatus request) {

        ServiceRequest serviceRequest =
                serviceRequestRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Service request not found"));

        RequestStatus currentStatus = serviceRequest.getStatus();
        RequestStatus newStatus = request.getStatus();

        if (!isValidTransition(currentStatus, newStatus)) {
            throw new RuntimeException(
                    "Invalid status transition from "
                            + currentStatus
                            + " to "
                            + newStatus
            );
        }

        serviceRequest.setStatus(newStatus);

        return serviceRequestRepository.save(serviceRequest);
    }

    private boolean isValidTransition(
            RequestStatus currentStatus,
            RequestStatus newStatus) {

        return switch (currentStatus) {

            case ASSIGNED ->
                    newStatus == RequestStatus.ACCEPTED;

            case ACCEPTED ->
                    newStatus == RequestStatus.ON_THE_WAY;

            case ON_THE_WAY ->
                    newStatus == RequestStatus.ARRIVED;

            case ARRIVED ->
                    newStatus == RequestStatus.IN_PROGRESS;

            case IN_PROGRESS ->
                    newStatus == RequestStatus.COMPLETED;

            default -> false;
        };
    }
}