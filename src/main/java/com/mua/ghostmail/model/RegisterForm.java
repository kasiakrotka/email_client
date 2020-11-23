package com.mua.ghostmail.model;

import lombok.Data;

@Data
public class RegisterForm {

    String address;
    String password;
    int expireTime;
}
