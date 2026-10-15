package com.personal.quickfix.dto.admin;



import jakarta.validation.constraints.NotNull;

public class AssignTechnicianRequest {

    @NotNull
    private Long technicianId;

    public AssignTechnicianRequest() {
    }

    public Long getTechnicianId() {
        return technicianId;
    }

    public void setTechnicianId(Long technicianId) {
        this.technicianId = technicianId;
    }
}