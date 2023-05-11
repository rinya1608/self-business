package com.ren.selfbusiness.controller;

import com.ren.selfbusiness.dto.request.ResourceTypeRequest;
import com.ren.selfbusiness.dto.response.MessageBody;
import com.ren.selfbusiness.dto.response.ResourceTypeBody;
import com.ren.selfbusiness.dto.response.Response;
import com.ren.selfbusiness.service.ResourceTypeService;
import com.ren.selfbusiness.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/type")
public class ResourceTypeController {
    private final ResourceTypeService resourceTypeService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> addResourceType(@RequestHeader(name = "Authorization") String token,
                                             @RequestBody ResourceTypeRequest req) {
        resourceTypeService.addResourceType(req, userService.parseAndFindByJwt(token));
        return ResponseEntity.ok(Response.<MessageBody>builder().body(new MessageBody("Тип добавлен")).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateResourceType(@PathVariable Long id, @RequestBody ResourceTypeRequest req) {
        resourceTypeService.updateResourceType(id, req);
        return ResponseEntity.ok(Response.<MessageBody>builder().body(new MessageBody("Тип обновлен")).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResourceType(@PathVariable Long id) {
        resourceTypeService.deleteResourceType(id);
        return ResponseEntity.ok(Response.<MessageBody>builder().body(new MessageBody("Тип удален")).build());
    }

    @GetMapping
    public ResponseEntity<?> getResourceTypes(@RequestParam(defaultValue = "5") int size, @RequestParam(defaultValue = "0") int page) {
        Page<ResourceTypeBody> resourceTypeBodies = resourceTypeService.getAll(PageRequest.of(page, size));
        return ResponseEntity.ok(Response.<Page<ResourceTypeBody>>builder().body(resourceTypeBodies).build());
    }
}
