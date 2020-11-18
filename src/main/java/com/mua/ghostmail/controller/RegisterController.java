package com.mua.ghostmail.controller;

import com.mua.ghostmail.entity.Mailbox;
import com.mua.ghostmail.exception.UserAlreadyExistsException;
import com.mua.ghostmail.security.SecurityService;
import com.mua.ghostmail.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/register")
public class RegisterController {


    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @PostMapping
    public ResponseEntity<Mailbox> registration(@RequestBody Mailbox mailbox) {
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.HOUR_OF_DAY, 12);
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

        String dateStart = ft.format(date);
        String dateEnd = ft.format(calendar.getTime());

        mailbox.setStartDate(date);
        mailbox.setEndDate(calendar.getTime());

        if (!userService.findByUsername(mailbox.getAddress()).isEmpty()) {
            //dziala ale nie wysyal tego co chce
            throw new UserAlreadyExistsException();
        } else {
            userService.save(mailbox);
            return ResponseEntity.ok().body(mailbox);
        }
    }
        /*
    MailboxRepository repository;

    @Autowired
    RegisterController(MailboxRepository repository){
        this.repository = repository;
    }

    @PostMapping
    Map<String, String> newMailbox(@RequestBody Mailbox mailbox, BindingResult bindingResult) throws IllegalAccessException {

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

        if( null != repository.findByAddress(mailbox.getAddress())){
            return error("USER_EXISTS");
        }

        try{repository.save(mailbox);}
        catch(Exception e){
            throw new IllegalAccessException();
        }
        Map<String, String> map = response(mailbox.getAddress(),ft.format(mailbox.getEndDate()));
        return map;
    }
*/

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
