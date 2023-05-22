package com.ren.selfbusiness.specification;

import com.ren.selfbusiness.dto.request.TransactionFilterRequest;
import com.ren.selfbusiness.model.Transaction;
import com.ren.selfbusiness.model.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class TransactionSpecification {

    public static Specification<Transaction> userEqual(User user) {
        return (root, query, builder) -> builder.equal(root.get("user"), user);
    }
    public static Specification<Transaction> templateIsNotNull() {
        return (root, query, builder) -> builder.isNotNull(root.get("template"));
    }

    public static Specification<Transaction> resourceIsNotNull() {
        return (root, query, builder) -> builder.isNotNull(root.get("resource"));
    }

    public static Specification<Transaction> dateGreaterThanOrEqualTo(LocalDate date) {
        return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get("date"), date);
    }

    public static Specification<Transaction> dateLessThanOrEqualTo(LocalDate date) {
        return (root, query, builder) -> builder.lessThanOrEqualTo(root.get("date"), date);
    }

    public static Specification<Transaction> filter(TransactionFilterRequest filter) {
        Specification<Transaction> sp = Specification
                .where(StringUtils.isNotBlank(filter.getDateFrom())
                        ? TransactionSpecification.dateGreaterThanOrEqualTo(LocalDate.parse(filter.getDateFrom()))
                        : null)
                .and(StringUtils.isNotBlank(filter.getDateTo())
                        ? TransactionSpecification.dateLessThanOrEqualTo(LocalDate.parse(filter.getDateTo()))
                        : null);

        if (!filter.isGetIncome() || !filter.isGetSales()) {
            sp = sp.and(!filter.isGetIncome() ? TransactionSpecification.templateIsNotNull() : null)
                    .and(!filter.isGetSales() ? TransactionSpecification.resourceIsNotNull() : null);
        }
        return sp;
    }
}
