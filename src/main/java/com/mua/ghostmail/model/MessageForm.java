package com.mua.ghostmail.model;

import lombok.Data;

import java.util.LinkedList;

@Data
public class MessageForm {
    String sender;
    String[] recipients;
    String subject;
    String body;
}
