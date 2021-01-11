package com.mua.ghostmail.model;

import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@Data
public class MessageModel {
    int id;
    String date;
    String time;
    String sender;
    String topic;
    String text;
    boolean seen;

    public void setTime(Date date){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        this.time = new SimpleDateFormat("HH:mm").format(calendar.getTime());;
    }

    public void setDate(Date date){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        Calendar now = Calendar.getInstance();
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        String month = new SimpleDateFormat("MMM").format(calendar.getTime());
        if(calendar.get(Calendar.YEAR) == now.get(Calendar.YEAR)){
            this.date = day+" "+month;
        }
        else{
            this.date = day+" "+month+" "+(new SimpleDateFormat("YY").format(calendar.getTime()));
        }
    }
}
