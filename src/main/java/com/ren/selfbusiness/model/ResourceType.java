package com.ren.selfbusiness.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ResourceType {
    @Id
    @SequenceGenerator(name = "resource_type_seq", sequenceName = "resource_type_sequence", allocationSize = 20)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "resource_type_seq")
    @Setter(AccessLevel.NONE)
    private Long id;

    @NotBlank
    private String name;
    @NotBlank
    private String unit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id")
    @NotNull
    private User creator;

    @OneToMany(mappedBy = "type", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Resource> resources;

    public ResourceType(String name, String unit, User creator) {
        this.name = name;
        this.unit = unit;
        this.creator = creator;
    }

    public Integer getCount() {
        return resources.stream().map(Resource::getCount).reduce(0, Integer::sum);
    }
}

