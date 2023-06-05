package com.ren.selfbusiness.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class ResourceBooking {
    @Id
    @SequenceGenerator(name = "resource_booking_seq", sequenceName = "resource_booking_sequence", allocationSize = 20)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "resource_booking_seq")
    @Setter(AccessLevel.NONE)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<History> histories;

    public ResourceBooking(Order order, List<History> histories) {
        this.order = order;
        this.histories = histories;
    }
}
