package com.ren.selfbusiness.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrderTemplate {
    @Id
    @SequenceGenerator(name = "order_template_seq", sequenceName = "order_template_sequence", allocationSize = 20)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_template_seq")
    @Setter(AccessLevel.NONE)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Template template;

    private Integer count;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_order_id")
    private Order order;

    public OrderTemplate(Template template, Integer count, Order order) {
        this.template = template;
        this.count = count;
        this.order = order;
    }

    public Map<String, String> getIngredientErrorMessages() {
        Map<String, String> messageByName = new HashMap<>();
        List<Ingredient> ingredients = template.getIngredients();
        ingredients.forEach(i -> {
            Integer present = i.getResourceType().getCount();
            int sumCount = i.getCount() * count;
            if (present < sumCount) {
                int difference = Math.abs(present - sumCount);
                messageByName.put(i.getResourceType().getName(),
                        "Не хватает " + difference + " " + i.getResourceType().getUnit());
            }
        });

        return messageByName;
    }
}
