package com.ren.selfbusiness.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Template {

    @Id
    @SequenceGenerator(name = "purchase_seq", sequenceName = "purchase_sequence", allocationSize = 20)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "purchase_seq")
    @Setter(AccessLevel.NONE)
    private Long id;

    private String name;

    private BigDecimal cost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "template", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ingredient> ingredients = new ArrayList<>();

    public Template(String name, BigDecimal cost, User user) {
        this.name = name;
        this.cost = cost;
        this.user = user;
    }

    public BigDecimal getNetProfit() {
        BigDecimal ingredientCost = ingredients.stream()
                .map(i -> i.getResourceType().getResources().get(0).getUnitPrice().multiply(new BigDecimal(i.getCount())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return cost.subtract(ingredientCost);
    }

    public void addIngredient(Ingredient ingredient) {
        ingredient.setTemplate(this);
        boolean added = ingredients.add(ingredient);
    }

    public void removeIngredient(Ingredient ingredient) {
        boolean removed = ingredients.remove(ingredient);
        if (removed) ingredient.setTemplate(null);
    }
}
