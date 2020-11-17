package com.mua.ghostmail.service;

import org.springframework.stereotype.Service;


public interface SecurityService{

    String findLoggedInUser();

    void autoLogin(String username, String password);

}
