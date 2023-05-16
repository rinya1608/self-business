package com.ren.selfbusiness.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Ingredient {
    @Id
    @SequenceGenerator(name = "ingredient_seq", sequenceName = "ingredient_sequence", allocationSize = 20)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ingredient_seq")
    @Setter(AccessLevel.NONE)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resource_type_id")
    private ResourceType resourceType;

    private Integer count;

    public Ingredient(ResourceType resourceType, Integer count) {
        this.resourceType = resourceType;
        this.count = count;
    }
}
