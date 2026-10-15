package com.personal.quickfix.controller;

import com.personal.quickfix.dto.admin.CreateSkillRequest;
import com.personal.quickfix.dto.common.SkillResponse;
import com.personal.quickfix.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<SkillResponse>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @PostMapping
    public ResponseEntity<SkillResponse> addSkill(
            @Valid @RequestBody CreateSkillRequest request) {

        SkillResponse response = skillService.addSkill(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }
}
