package com.ren.selfbusiness.model;

import com.ren.selfbusiness.enumarate.OrderStatus;
import com.ren.selfbusiness.enumarate.OrderStatusCommand;
import com.ren.selfbusiness.vo.ClientInfo;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user_order")
public class Order {
    @Id
    @SequenceGenerator(name = "order_seq", sequenceName = "order_sequence", allocationSize = 20)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_seq")
    @Setter(AccessLevel.NONE)
    private Long id;

    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.ADDED;

    private LocalDateTime date;

    @Embedded
    private ClientInfo clientInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private List<OrderTemplate> templates = new ArrayList<>();

    public Order(LocalDateTime date, ClientInfo clientInfo, User user) {
        this.date = date;
        this.clientInfo = clientInfo;
        this.user = user;
    }

    public void addOrderTemplate(OrderTemplate orderTemplate) {
        orderTemplate.setOrder(this);
        templates.add(orderTemplate);
    }

    public void removeOrderTemplate(OrderTemplate orderTemplate) {
        orderTemplate.setOrder(null);
        templates.remove(orderTemplate);
    }
}
