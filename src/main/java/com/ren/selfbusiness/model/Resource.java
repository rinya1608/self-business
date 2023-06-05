package com.ren.selfbusiness.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

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
    private BigDecimal price;

    private String typeName;
    private String unit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id")
    private User creator;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "resource")
    private List<History> history;

    public Resource(Integer count, BigDecimal price, BigDecimal unitPrice, ResourceType type, User creator) {
        this.count = count;
        this.price = price;
        this.unitPrice = unitPrice;
        this.typeName = type.getName();
        this.unit = type.getUnit();
        this.creator = creator;
    }

    public Integer getUsedCount() {
        return history.stream().map(History::getCount).reduce(0, Integer::sum);
    }

    public void addResourceHistory(History history) {
        history.setResource(this);
        this.history.add(history);
    }

    public void removeResourceHistory(History history) {
        history.setResource(null);
        this.history.remove(history);
    }
}
