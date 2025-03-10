package com.mua.ghostmail.security;

import com.mua.ghostmail.entity.Mailbox;
import com.mua.ghostmail.repository.MailboxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;
import java.time.Period;
import java.util.Arrays;
import java.util.Date;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private MailboxRepository mailboxRepo;

    @Autowired
    public CustomUserDetailsService(MailboxRepository mailboxRepository) {
        this.mailboxRepo = mailboxRepository;
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Mailbox mailbox = mailboxRepo.findByAddress(username)
                .orElseThrow(() -> new UsernameNotFoundException("Address: "+username+" not found"));

        if(mailbox.getEndDate().getTime() < (new Date()).getTime())
            throw new UsernameNotFoundException("Address: "+username+" not found");
        else
        return new CustomUserDetails(mailbox.getAddress(), mailbox.getPassword(), mailbox.getStartDate(), mailbox.getEndDate(),
                Arrays.asList(new SimpleGrantedAuthority("user")));

    }
}
