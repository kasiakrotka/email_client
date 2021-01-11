package com.mua.ghostmail.service;

import com.mua.ghostmail.model.MessageModel;
import org.springframework.stereotype.Service;

import javax.mail.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Properties;

@Service("InboxService")
public class POPService {

    Message[] messages;
    ArrayList<MessageModel> messageModels;

    public ArrayList<MessageModel> getMessages() {
        System.out.println("Returning messages");
        return messageModels;
    }

    public boolean authAccount(String pop3Host, String storeType, String port,
                               String user, String password, Boolean fetchEmails) {

        Properties properties = new Properties();
        properties.put("mail.smtp.port", port);
        properties.put("mail.pop3.host", pop3Host);
        Session emailSession = Session.getDefaultInstance(properties);

        Store emailStore = null;
        try {
            emailStore = emailSession.getStore(storeType);
        } catch (NoSuchProviderException e) {
            System.out.println("Can't connect with server");
            return false;
        }
        try {
            emailStore.connect(user, password);
        } catch (AuthenticationFailedException e) {
            System.out.println("Incorrect password or username");
            return false;
        } catch (MessagingException e) {
            return false;
        }

        if (fetchEmails) {
            try {
                fetchEmails(emailStore.getFolder("INBOX"));
            } catch (MessagingException e) {
                e.printStackTrace();
                System.out.println("Error while fetching emails");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        try {
            emailStore.close();
        } catch (MessagingException e) {
            System.out.println("Error while disconnecting with server");
        }

        return true;
    }

    public void fetchEmails(Folder emailFolder) throws MessagingException, IOException {

        messageModels = new ArrayList<>();
        emailFolder.open(Folder.READ_ONLY);
        this.messages = emailFolder.getMessages();

        System.out.println("messages.length = " + messages.length);
        for (int i = 0; i < messages.length; i++) {
            MessageModel model = new MessageModel();
            model.setText(messages[i].getContent().toString());
            Date date = messages[i].getSentDate();
            model.setDate(date);
            model.setTime(date);
            model.setId(messages[i].getMessageNumber());
            model.setSeen(true);
            model.setSender(messages[i].getFrom()[0].toString());
            model.setTopic(messages[i].getSubject());
            messageModels.add(model);
        }
        emailFolder.close(true);
    }
}
