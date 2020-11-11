package com.mua.ghostmail.service;

import com.mua.ghostmail.entity.Mailbox;
import com.mua.ghostmail.repository.MailboxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class AuthServiceImpl implements UserDetailsService {
    private MailboxRepository mailboxRepo;

    @Autowired
    public AuthServiceImpl(MailboxRepository mailboxRepository) {
        this.mailboxRepo = mailboxRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Mailbox mailbox = mailboxRepo.findByAddress(username)
                .orElseThrow(() -> new UsernameNotFoundException("Address: "+username+" not found"));
        return new org.springframework.security.core.userdetails.User(mailbox.getAddress(), mailbox.getPassword(),
                Arrays.asList(new SimpleGrantedAuthority("user")));

    }
}
