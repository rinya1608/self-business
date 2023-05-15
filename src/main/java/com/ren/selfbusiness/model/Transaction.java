package com.ren.selfbusiness.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Transaction {
    @Id
    @SequenceGenerator(name = "transaction_seq", sequenceName = "transaction_sequence", allocationSize = 20)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "transaction_seq")
    @Setter(AccessLevel.NONE)
    private Long id;

    @Setter(AccessLevel.NONE)
    private LocalDateTime date = LocalDateTime.now();

    private BigDecimal sum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinTable(
            name = "purchase",
            joinColumns = {
                    @JoinColumn(name = "transaction_id"),
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "resource_id")
            }
    )
    private Resource resource;

    public Transaction(BigDecimal sum, User user) {
        this.sum = sum;
        this.user = user;
    }
}
