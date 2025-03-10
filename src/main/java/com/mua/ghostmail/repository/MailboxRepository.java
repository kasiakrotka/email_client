package com.mua.ghostmail.repository;

import com.mua.ghostmail.entity.Mailbox;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Date;
import java.util.Optional;

@Repository
public interface MailboxRepository extends CrudRepository<Mailbox, Long> {

    @Query("SELECT m FROM Mailbox m WHERE m.address = :address and m.password= :password")
    Mailbox authUser (@Param("address") String address, @Param("password") String password);

    @Query("SELECT m FROM Mailbox m WHERE m.address = :address")
    Optional<Mailbox> findByAddress(String address);

    @Modifying
    @Transactional
    @Query("UPDATE Mailbox  m SET m.endDate = :endDate WHERE m.address = :address")
    int updateEndDate(@Param("address") String address,
                      @Param("endDate") Date endDate);
}
