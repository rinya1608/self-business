package com.ren.selfbusiness.model;

import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ResourceType {
    @Id
    @SequenceGenerator(name = "resource_type_seq", sequenceName = "resource_type_sequence", allocationSize = 20)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "resource_type_seq")
    @EqualsAndHashCode.Include()
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

    public ResourceType(String name, String unit, User creator) {
        this.name = name;
        this.unit = unit;
        this.creator = creator;
    }
}
