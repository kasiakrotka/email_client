package com.mua.ghostmail;

import com.mua.ghostmail.service.EmailService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@CrossOrigin
@RestController
@SpringBootApplication
public class GhostmailApplication {


    @RequestMapping("/user")
    public Principal user(Principal user) {
        return user;
    }

    public static void main(String[] args) {

        //FileSystemXmlApplicationContext context = new FileSystemXmlApplicationContext("classpath:applicationContext.xml");
        //EmailService mailer = (EmailService) context.getBean("emailService");
        //mailer.sendMail("frygtt@gmail.com", "TEST SUB", "TEST BODY");

        SpringApplication.run(GhostmailApplication.class, args);
    }

}
