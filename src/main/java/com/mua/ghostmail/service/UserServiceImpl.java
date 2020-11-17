package com.mua.ghostmail.service;

import com.mua.ghostmail.entity.Mailbox;
import com.mua.ghostmail.repository.MailboxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private MailboxRepository mailboxRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl() {
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }


    @Override
    public void save(Mailbox mailbox) {
        mailbox.setPassword(bCryptPasswordEncoder.encode(mailbox.getPassword()));
        mailboxRepository.save(mailbox);
        System.out.println(String.format("dodano skrzynkę %s do bazy", mailbox.getAddress()));
    }

    @Override
    public Optional<Mailbox> findByUsername(String username) {
        Optional<Mailbox> mailbox = mailboxRepository.findByAddress(username);
        return mailbox;
    }
}
