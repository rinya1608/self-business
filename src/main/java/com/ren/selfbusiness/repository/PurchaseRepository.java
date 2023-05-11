package com.ren.selfbusiness.repository;

import com.ren.selfbusiness.model.Purchase;
import com.ren.selfbusiness.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

}
