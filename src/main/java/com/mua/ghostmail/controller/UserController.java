package com.mua.ghostmail.controller;

import com.mua.ghostmail.entity.Mailbox;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/resources")
public class UserController {


    @PostMapping
    public Object registration(@RequestBody Mailbox mailbox) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getPrincipal();
    }
}
