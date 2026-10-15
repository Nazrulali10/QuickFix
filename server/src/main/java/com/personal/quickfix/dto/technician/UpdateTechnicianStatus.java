package com.personal.quickfix.dto.technician;

import com.personal.quickfix.entity.TechnicianStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateTechnicianStatus {

    @NotNull
    private TechnicianStatus status;

    public UpdateTechnicianStatus() {
    }

    public TechnicianStatus getStatus() {
        return status;
    }

    public void setStatus(TechnicianStatus status) {
        this.status = status;
    }
}