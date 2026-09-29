package vn.iotstar.jwt.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthController {
    
    @GetMapping("/login")
    public String index() {
        return "login";
    }

    @GetMapping("/user/profile")
    public String profile() {
        return "profile";
    }
}
