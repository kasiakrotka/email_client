package com.mua.ghostmail.service;

import com.mua.ghostmail.entity.Mailbox;
import com.mua.ghostmail.repository.MailboxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

@Service
@CacheEvict
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

    @Override
    public void deleteUser(Mailbox mailbox)
    {
            mailboxRepository.delete(mailbox);
    }

    @Override
    public Date updateEndDate(Mailbox mailbox, int hours) {

        Date newDate = null;
        Mailbox updatedMailbox = countDate(mailbox, hours);
        int result = mailboxRepository.updateEndDate(updatedMailbox.getAddress(), updatedMailbox.getEndDate());

        if(result > 0){
            newDate = updatedMailbox.getEndDate();
           return newDate;
        }
        return newDate;
    }

    private Mailbox countDate(Mailbox mailbox, int hours){

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(mailbox.getEndDate());
        calendar.add(Calendar.HOUR_OF_DAY, hours);
        mailbox.setEndDate(calendar.getTime());

        return mailbox;
    }
}
