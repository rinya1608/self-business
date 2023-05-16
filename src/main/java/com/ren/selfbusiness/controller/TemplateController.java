package com.ren.selfbusiness.controller;

import com.ren.selfbusiness.dto.request.TemplateRequest;
import com.ren.selfbusiness.dto.response.MessageBody;
import com.ren.selfbusiness.dto.response.Response;
import com.ren.selfbusiness.dto.response.TemplateBody;
import com.ren.selfbusiness.service.TemplateService;
import com.ren.selfbusiness.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/template")
public class TemplateController {
    private final TemplateService templateService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> addTemplate(@RequestHeader(name = "Authorization") String token,
                                         @RequestBody TemplateRequest req) {
        templateService.addTemplate(req, userService.parseAndFindByJwt(token));
        return ResponseEntity.ok(Response.<MessageBody>builder().body(new MessageBody("Тип добавлен")).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTemplate(@PathVariable Long id) {
        templateService.deleteTemplate(id);
        return ResponseEntity.ok(Response.<MessageBody>builder().body(new MessageBody("Тип удален")).build());
    }

    @GetMapping
    public ResponseEntity<?> getResourceTypes(@RequestHeader(name = "Authorization") String token,
                                              @RequestParam(defaultValue = "5") int size,
                                              @RequestParam(defaultValue = "0") int page) {
        Page<TemplateBody> templateBodies = templateService.getAll(PageRequest.of(page, size),
                userService.parseAndFindByJwt(token));
        return ResponseEntity.ok(Response.<Page<TemplateBody>>builder().body(templateBodies).build());
    }
}
