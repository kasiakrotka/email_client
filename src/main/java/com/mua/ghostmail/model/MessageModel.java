package com.mua.ghostmail.model;

import lombok.Data;

import java.util.Date;

@Data
public class MessageModel {
    String subject;
    String from;
    Date date;
    String body;
}
