package com.mua.ghostmail.controller;

import com.mua.ghostmail.entity.Mailbox;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/resources")
public class UserController {


    @GetMapping
    public String resources() {
        String test = "Authorization successful";
        return test;
    }
}
