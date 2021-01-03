package com.mua.ghostmail;

import com.mua.ghostmail.repository.MailboxRepository;
import com.mua.ghostmail.service.InboxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

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
        //SMTPService sendService = new SMTPService();
        //sendService.sendMessage();
        InboxService inbox = new InboxService();
        inbox.authAccount("localhost", "pop3", "110", "admin@ghost.com", "$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG", true);
        //inbox.receiveEmail("localhost", "pop3", "110", "admin@ghost.com", "$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG");

        SpringApplication.run(GhostmailApplication.class, args);
    }

    @Bean
    CommandLineRunner runner() {
        return args -> {
//            Save demo data after start
            long mili = (new Date()).getTime() +31556952;
            long start_old_mili = (new Date()).getTime() - (3600000*2);
            long end_old_mili = (new Date()).getTime() - (3600000);
           // mailboxRepository.save(new Mailbox("admin@ghost.com", "$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG", new Date(), new Date(mili)));
           // mailboxRepository.save(new Mailbox("old@ghost.com", "$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG", new Date(start_old_mili), new Date(end_old_mili)));
        };
    }
}
