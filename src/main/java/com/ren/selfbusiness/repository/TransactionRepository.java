package com.ren.selfbusiness.repository;

import com.ren.selfbusiness.dto.request.TransactionFilterRequest;
import com.ren.selfbusiness.model.Transaction;
import com.ren.selfbusiness.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long>, JpaSpecificationExecutor<Transaction> {

    Page<Transaction> findAllByUser(Pageable pageable, User user);

}