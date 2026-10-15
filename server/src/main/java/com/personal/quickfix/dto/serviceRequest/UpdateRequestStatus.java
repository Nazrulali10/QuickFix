package com.personal.quickfix.dto.serviceRequest;
import com.personal.quickfix.entity.RequestStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateRequestStatus {

    @NotNull
    private RequestStatus status;

    public UpdateRequestStatus() {
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }
}