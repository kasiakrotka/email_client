package com.mua.ghostmail.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mua.ghostmail.entity.Mailbox;
import com.mua.ghostmail.model.MessageForm;
import com.mua.ghostmail.model.MessageModel;
import com.mua.ghostmail.service.POPService;
import com.mua.ghostmail.service.SMTPService;
import com.mua.ghostmail.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.ArrayList;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping()
public class MailController {

    @Autowired
    private SMTPService smtpService;
    @Autowired
    private UserService userService;
    @Autowired
    private POPService popService;

    @GetMapping("/inbox")
    public ResponseEntity<String> fetchMail() throws IOException, MessagingException {
        ArrayList<MessageModel> messages = null;
        String user;
        String password;
        SecurityContext securityContext = SecurityContextHolder.getContext();
        user = securityContext.getAuthentication().getPrincipal().toString();
        Mailbox mailbox = userService.findByUsername(user).orElse(null);
        if (mailbox != null) {
            password = mailbox.getPassword();
            if (popService.authAccount("localhost", "pop3", "110", user, password, true)) {
                System.out.println("Messages successfully fetched");
                messages = popService.getMessages();
                ObjectMapper mapper = new ObjectMapper();
                try {
                    String json = mapper.writeValueAsString(messages.toArray());
                    System.out.println("ResultingJSONstring = " + json);
                    return ResponseEntity.ok().body(json);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
            } else
                System.out.println("There was an error while fetching messages");
        }

        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/sendmail")
    public void sendMail(@RequestBody MessageForm messageForm) {
        System.out.println("Wysylanie wiadomosci");
        System.out.println(messageForm.getSender());
        System.out.println("Adresaci");
        for (int i = 0; i < messageForm.getRecipients().length; i++)    //length is the property of the array
            System.out.println(messageForm.getRecipients()[i]);
        System.out.println(messageForm.getBody());
        smtpService.sendMessage(messageForm);
    }
}
