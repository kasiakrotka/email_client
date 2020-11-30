package com.mua.ghostmail.service;

import com.mua.ghostmail.entity.Mailbox;

import java.util.Date;
import java.util.Optional;

public interface UserService {
    void save(Mailbox mailbox);

    Optional<Mailbox> findByUsername(String username);

    void deleteUser(Mailbox mailbox);

    Date updateEndDate(Mailbox mailbox, int hours);
}
