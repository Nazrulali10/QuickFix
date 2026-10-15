package com.personal.quickfix.dto.admin;


import com.personal.quickfix.dto.technician.TechnicianResponse;

public class TechnicianRecommendationResponse {

    private TechnicianResponse technician;
    private int currentWorkload;
    private String reason;

    public TechnicianRecommendationResponse() {
    }

    public TechnicianResponse getTechnician() {
        return technician;
    }

    public void setTechnician(TechnicianResponse technician) {
        this.technician = technician;
    }

    public int getCurrentWorkload() {
        return currentWorkload;
    }

    public void setCurrentWorkload(int currentWorkload) {
        this.currentWorkload = currentWorkload;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}