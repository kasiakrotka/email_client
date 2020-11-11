package com.mua.ghostmail.service;

import com.sun.mail.pop3.POP3Store;

import javax.mail.*;
import java.io.IOException;
import java.util.Properties;

public class InboxService {

    static Message [] messages;

    public static boolean authAccount(String pop3Host, String storeType, String port,
                                   String user, String password, Boolean fetchEmails) {

        Properties properties = new Properties();
        properties.put("mail.smtp.port", port);
        properties.put("mail.pop3.host", pop3Host);
        Session emailSession = Session.getDefaultInstance(properties);

        POP3Store emailStore = null;
        try {
            emailStore = (POP3Store) emailSession.getStore(storeType);
        } catch (NoSuchProviderException e) {
            System.out.println("Can't connect with server");
            return false;
        }
        try {
            emailStore.connect(user, password);
        } catch(AuthenticationFailedException e) {
            System.out.println("Incorrect password or username");
            return false;
        } catch (MessagingException e) {
            return false;
        }

        if(fetchEmails) {
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

    public static void fetchEmails(Folder emailFolder) throws MessagingException, IOException {

        emailFolder.open(Folder.READ_ONLY);
        messages = emailFolder.getMessages();
        for (int i = 0; i < messages.length; i++) {
            Message message = messages[i];
            System.out.println("---------------------------------");
            System.out.println("Email Number " + (i + 1));
            System.out.println("Subject: " + message.getSubject());
            System.out.println("From: " + message.getFrom()[0]);
            System.out.println("Text: " + message.getContent().toString());
        }
        emailFolder.close(false);
    }

    public static void receiveEmail(String pop3Host, String storeType, String port,
                                    String user, String password) {
        try {
            //1) get the session object
            Properties properties = new Properties();
            properties.put("mail.smtp.port", port);
            properties.put("mail.pop3.host", pop3Host);
            Session emailSession = Session.getDefaultInstance(properties);

            //2) create the POP3 store object and connect with the pop server
            POP3Store emailStore = (POP3Store) emailSession.getStore(storeType);
            emailStore.connect(user, password);

            //3) create the folder object and open it
            Folder emailFolder = emailStore.getFolder("INBOX");
            emailFolder.open(Folder.READ_ONLY);

            //4) retrieve the messages from the folder in an array and print it
            messages = emailFolder.getMessages();
            for (int i = 0; i < messages.length; i++) {
                Message message = messages[i];
                System.out.println("---------------------------------");
                System.out.println("Email Number " + (i + 1));
                System.out.println("Subject: " + message.getSubject());
                System.out.println("From: " + message.getFrom()[0]);
                System.out.println("Text: " + message.getContent().toString());
            }

            //5) close the store and folder objects
            emailFolder.close(false);
            emailStore.close();

        } catch (NoSuchProviderException e) {e.printStackTrace();}
        catch (MessagingException e) {e.printStackTrace();}
        catch (IOException e) {e.printStackTrace();}
    }

}
