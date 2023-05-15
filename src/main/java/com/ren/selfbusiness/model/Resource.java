package com.ren.selfbusiness.model;

import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Resource {
    @Id
    @SequenceGenerator(name = "resource_seq", sequenceName = "resource_sequence", allocationSize = 20)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "resource_seq")
    @Setter(AccessLevel.NONE)
    private Long id;

    private Integer count;
    private BigDecimal unitPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type_id")
    private ResourceType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id")
    @NotNull
    private User creator;

    public Resource(Integer count, BigDecimal unitPrice, ResourceType type, User creator) {
        this.count = count;
        this.unitPrice = unitPrice;
        this.type = type;
        this.creator = creator;
    }

    public BigDecimal getFullPrice() {
        return unitPrice.multiply(BigDecimal.valueOf(count));
    }
}
