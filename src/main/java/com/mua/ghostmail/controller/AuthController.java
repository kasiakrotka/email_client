package com.mua.ghostmail.controller;

import com.mua.ghostmail.entity.Mailbox;
import com.mua.ghostmail.repository.MailboxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin("http://localhost:4200")
public class AuthController {

    MailboxRepository repository;

    @Autowired
    AuthController(MailboxRepository repository){
        this.repository = repository;
    }

/*
    @PostMapping("/login")
    Map<String, String> authUser(@RequestBody Mailbox mailbox) {
        Mailbox account = repository.authUser(mailbox.getAddress(), mailbox.getPassword());
        return response(account.getAddress(), dateToString(account.getEndDate()));
    }*/

    @PostMapping("/register")
    Map<String, String> newMailbox(@RequestBody Mailbox mailbox) throws IllegalAccessException {

        System.out.println(mailbox.getPassword());
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.HOUR_OF_DAY, 12);
        SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");

        String dateStart = ft.format(date);
        String dateEnd = ft.format(calendar.getTime());

        mailbox.setStartDate(date);
        mailbox.setEndDate(calendar.getTime());

        //to na razie nie działa bo zawsze przechodzi x_x
        try{repository.save(mailbox);}
        catch(Exception e){
            throw new IllegalAccessException();
        }
        Map<String, String> map = response(mailbox.getAddress(),ft.format(mailbox.getEndDate()));
        return map;
    }


    public Map<String, String> response(String email, String end_date) {
        HashMap<String, String> map = new HashMap<>();
        map.put("address", email);
        map.put("end_date", end_date);
        return map;
    }

    public Map<String, String> error(String message) {
        HashMap<String,String> map = new HashMap<>();
        map.put("error", message);
        return map;
    }

    private String dateToString(Date date){
        SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
        return ft.format(date);
    }
}
