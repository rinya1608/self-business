package com.ren.selfbusiness.repository;

import com.ren.selfbusiness.model.Purchase;
import com.ren.selfbusiness.model.Transaction;
import com.ren.selfbusiness.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    Page<Purchase> findAllByUser(Pageable pageable, User user);
}
