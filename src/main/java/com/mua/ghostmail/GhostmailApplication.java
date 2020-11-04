package com.mua.ghostmail;

import com.mua.ghostmail.service.EmailService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.support.FileSystemXmlApplicationContext;

@SpringBootApplication
public class GhostmailApplication {

    public static void main(String[] args) {

        //FileSystemXmlApplicationContext context = new FileSystemXmlApplicationContext("classpath:applicationContext.xml");
        //EmailService mailer = (EmailService) context.getBean("emailService");
        //mailer.sendMail("frygtt@gmail.com", "TEST SUB", "TEST BODY");

        SpringApplication.run(GhostmailApplication.class, args);
    }

}
