
package com.personal.quickfix.service;

import com.personal.quickfix.dto.common.SkillResponse;
import com.personal.quickfix.dto.admin.CreateSkillRequest;
import com.personal.quickfix.entity.Skill;
import com.personal.quickfix.repository.SkillRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<SkillResponse> getAllSkills() {
        return skillRepository.findAll()
                .stream()
                .map(skill -> {
                    SkillResponse response = new SkillResponse();
                    response.setId(skill.getId());
                    response.setName(skill.getName());
                    return response;
                })
                .toList();
    }

    public SkillResponse addSkill(CreateSkillRequest request) {

        String name = request.getName().trim();

        if (skillRepository.existsByName(name)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "This skill already exists"
            );
        }

        Skill skill = new Skill();
        skill.setName(name);

        Skill savedSkill = skillRepository.save(skill);

        SkillResponse response = new SkillResponse();
        response.setId(savedSkill.getId());
        response.setName(savedSkill.getName());

        return response;
    }
}
