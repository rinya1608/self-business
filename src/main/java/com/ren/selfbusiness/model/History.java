package com.ren.selfbusiness.model;

import com.ren.selfbusiness.enumarate.ResourceHistoryStatus;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class History {
    @Id
    @SequenceGenerator(name = "resource_history_seq", sequenceName = "resource_history_sequence", allocationSize = 20)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "resource_history_seq")
    @Setter(AccessLevel.NONE)
    private Long id;

    private Integer count;

    @Enumerated(EnumType.STRING)
    private ResourceHistoryStatus status;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "resource_id")
    private Resource resource;

    public History(Integer count, ResourceHistoryStatus status) {
        this.count = count;
        this.status = status;
    }
}
