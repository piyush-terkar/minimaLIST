package com.minimalist.todolist.controllers;

import com.minimalist.todolist.model.UserDTO;
import com.minimalist.todolist.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
public class UserController {
    public static final String USER_PATH = "/api/v1/user";
    public static final String USER_PATH_ID = USER_PATH + "/{userId}";
    
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    
    @PutMapping(USER_PATH_ID)
    public Mono<UserDTO> update(@PathVariable("userId") String userId, @RequestBody UserDTO userDTO){
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return userService.update(userId, userDTO);
    }
    
    @DeleteMapping(USER_PATH_ID)
    public Mono<Void> delete(@PathVariable("userId") String userId){
        return userService.delete(userId);
    }
    @GetMapping(USER_PATH)
    public Mono<UserDTO> getUser(Authentication authentication){
        
        return userService.getDetails(authentication);
        
    }
    
}
