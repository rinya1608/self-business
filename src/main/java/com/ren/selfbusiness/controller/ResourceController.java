package com.ren.selfbusiness.controller;

import com.ren.selfbusiness.dto.request.ResourceRequest;
import com.ren.selfbusiness.dto.response.MessageBody;
import com.ren.selfbusiness.dto.response.ResourceBody;
import com.ren.selfbusiness.dto.response.Response;
import com.ren.selfbusiness.service.ResourceService;
import com.ren.selfbusiness.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@AllArgsConstructor
@RequestMapping("/api/resource")
public class ResourceController {

    private final ResourceService resourceService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> addResource(@RequestHeader(name = "Authorization") String token,
                                         @RequestBody ResourceRequest req) {
        resourceService.addResource(req, userService.parseAndFindByJwt(token));
        return ResponseEntity.ok(Response.<MessageBody>builder().body(new MessageBody("Ресурс добавлен")).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateResource(@PathVariable Long id, @RequestBody ResourceRequest req) {
        resourceService.updateResource(id, req);
        return ResponseEntity.ok(Response.<MessageBody>builder().body(new MessageBody("Ресурс обновлен")).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.ok(Response.<MessageBody>builder().body(new MessageBody("Ресурс удален")).build());
    }

    @GetMapping
    public ResponseEntity<?> getResources(@RequestHeader(name = "Authorization") String token,
                                          @RequestParam(defaultValue = "5") int size,
                                          @RequestParam(defaultValue = "0") int page) {
        Page<ResourceBody> resourceBodies = resourceService.getAll(PageRequest.of(page, size), userService.parseAndFindByJwt(token));
        return ResponseEntity.ok(Response.<Page<ResourceBody>>builder().body(resourceBodies).build());
    }
}
