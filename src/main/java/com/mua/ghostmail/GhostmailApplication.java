package com.mua.ghostmail;

import com.mua.ghostmail.entity.Mailbox;
import com.mua.ghostmail.repository.MailboxRepository;
import com.mua.ghostmail.service.EmailService;
import com.mua.ghostmail.service.InboxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.security.Principal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@CrossOrigin
@RestController
@SpringBootApplication
public class GhostmailApplication {

    @Autowired
    private MailboxRepository mailboxRepository;
    public static void main(String[] args) {

        /*
        InboxService inbox = new InboxService();
        String host = "localhost";//change accordingly
        String mailStoreType = "pop3";
        String username= "admin";
        String password= "admin";//change accordingly
        inbox.authAccount(host, mailStoreType,"110", username, password, true);
        inbox.receiveEmail(host, mailStoreType,"110", username, password);
        */
      SpringApplication.run(GhostmailApplication.class, args);
    }

    @Bean
    CommandLineRunner runner() {
        return args -> {
//            Save demo data after start
            mailboxRepository.save(new Mailbox("admin@ghost.com", "$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG", new Date(), new Date() ));
        };
    }
}
