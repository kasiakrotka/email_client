package com.mua.ghostmail.service;

import com.mua.ghostmail.model.MessageForm;
import com.sun.mail.smtp.SMTPTransport;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;

@Service("SMTPService")
public class SMTPService {

    Properties props;

    public SMTPService() {
        props = new Properties();
        props.put("mail.smtp.auth", "false");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "localhost");
        props.put("mail.smtp.port", "8081");

    }

    public void sendMessage(MessageForm messageForm) {
        Session session = Session.getInstance(props);
        try {

            Message message = new MimeMessage(session);
            String[] recipients = messageForm.getRecipients();
            message.setFrom(new InternetAddress(messageForm.getSender()));
            for(int i = 0; i < messageForm.getRecipients().length; i++ ){
                String temp = recipients[i];
                message.addRecipients(Message.RecipientType.TO, InternetAddress.parse(temp, false));
            }
            message.setRecipients(Message.RecipientType.CC, InternetAddress.parse("", false));
            message.setSubject(messageForm.getSubject());
            message.setText(messageForm.getBody());

            SMTPTransport transport = (SMTPTransport) session.getTransport("smtp");
            transport.connect();
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();

            System.out.println("Wysyłanie wiadomości zakończone sukcesem");

        } catch (AddressException e) {
            e.printStackTrace();
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
