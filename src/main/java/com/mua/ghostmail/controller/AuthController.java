package com.mua.ghostmail.controller;


import com.mua.ghostmail.entity.Mailbox;
import com.mua.ghostmail.exception.UserAlreadyExistsException;
import com.mua.ghostmail.model.RegisterForm;
import com.mua.ghostmail.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping()
public class AuthController {


    @Autowired
    private UserService userService;

    @PostMapping("/addtime")
    public ResponseEntity addTimeToAccount(@RequestBody int time){

        Date result = null;
        SecurityContext securityContext = SecurityContextHolder.getContext();
        String username = securityContext.getAuthentication().getPrincipal().toString();
        Mailbox mailbox = userService.findByUsername(username).orElse(null);
        if(mailbox != null) {
            result = userService.updateEndDate(mailbox, time);
            System.out.println(result);
        }
        if(result != null){
            return ResponseEntity.ok().body(result.getTime());
        }
        else
            return ResponseEntity.badRequest().build();
    }

    @PostMapping("/delete")
    public ResponseEntity deleteAccount(){
        SecurityContext securityContext = SecurityContextHolder.getContext();
        String username = securityContext.getAuthentication().getPrincipal().toString();

        Mailbox mailbox = userService.findByUsername(username).orElse( null );
        if(mailbox != null) {
            int result = userService.deleteUser(mailbox);
            if(result > 0)
                return ResponseEntity.ok().build();
            else
                return ResponseEntity.notFound().build();
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity logout(){
        SecurityContext securityContext = SecurityContextHolder.getContext();
        securityContext.setAuthentication(null);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<Mailbox> register(@RequestBody RegisterForm form) {
        if (!userService.findByUsername(form.getAddress()).isEmpty()) {
            throw new UserAlreadyExistsException();
        } else {
            System.out.println(form.getAddress());
            Mailbox mailbox = new Mailbox();
            mailbox.setAddress(form.getAddress());
            mailbox.setPassword(form.getPassword());
            mailbox.setStartDate(new Date());
            mailbox.setEndDate(countDate(form.getExpireTime()));
            userService.save(mailbox);
            System.out.println(ResponseEntity.ok().body(mailbox));
            return ResponseEntity.ok().body(mailbox);
        }
    }

    private Date countDate(int time){
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.HOUR_OF_DAY, time);

        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String dateStart = ft.format(date);
        String dateEnd = ft.format(calendar.getTime());

        System.out.println(time);
        System.out.println(dateStart);
        System.out.println(dateEnd);


        return calendar.getTime();
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
}
