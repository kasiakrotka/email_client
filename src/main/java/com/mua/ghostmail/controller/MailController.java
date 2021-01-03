package com.mua.ghostmail.controller;

import com.mua.ghostmail.entity.Mailbox;
import com.mua.ghostmail.model.MessageForm;
import com.mua.ghostmail.model.MessageModel;
import com.mua.ghostmail.service.InboxService;
import com.mua.ghostmail.service.SMTPService;
import com.mua.ghostmail.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.mail.Message;
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
    private InboxService inboxService;

    @GetMapping("/inbox")
    public ArrayList<MessageModel> fetchMail() throws IOException, MessagingException {
        Message[]messages = null;
        String user;
        String password;
        SecurityContext securityContext = SecurityContextHolder.getContext();
        user = securityContext.getAuthentication().getPrincipal().toString();
        Mailbox mailbox = userService.findByUsername(user).orElse( null );
        if(mailbox != null) {
            password = mailbox.getPassword();
            inboxService.authAccount("localhost", "pop3", "110", user, password, true);
            messages = inboxService.getMessages();
        }

        ArrayList<MessageModel> response = new ArrayList<>();
        for(Message message : messages){
            MessageModel model = new MessageModel();
            model.setBody(message.getContent().toString());
            model.setDate(message.getSentDate());
            model.setFrom(message.getFrom()[0].toString());
            model.setSubject(message.getSubject());
            response.add(model);
        }
        return response;
    }

    @PostMapping("/sendmail")
    public void sendMail(@RequestBody MessageForm messageForm) {
        System.out.println("Wysylanie wiadomosci");
        System.out.println(messageForm.getSender());
        System.out.println("Adresaci");
        for(int i=0;i<messageForm.getRecipients().length;i++)    //length is the property of the array
            System.out.println(messageForm.getRecipients()[i]);
        System.out.println(messageForm.getBody());
        smtpService.sendMessage(messageForm);
    }
}
