package com.mua.ghostmail.model;

import lombok.Getter;
import lombok.Setter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@Setter
public class UserCredentials {

    private String address;
    private String password;
    private Date endDate;

    UserCredentials() {}

    UserCredentials(String address, String password) {
        this.address = address;
        this.password = password;
    }

    /*
    User (String address, String date) {
        this.address = address;
        setEndDate(date);
    }*/

    public void setEndDate(String timestamp){
        SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
        try {
            this.endDate = ft.parse(timestamp);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

}
