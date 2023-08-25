package com.Minimalist.AuthServer.controllers;

import com.Minimalist.AuthServer.model.UserDTO;
import com.Minimalist.AuthServer.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    public static final String USER_PATH = "/api/v1/user";
    public static final String USER_PATH_ID = USER_PATH + "/{userId}";
    
    private final UserService userService;
    
    @GetMapping(USER_PATH_ID)
    public Mono<UserDTO> getUserById(@PathVariable("userId") String userId){
        return userService.getById(userId);
    }
    
    @PostMapping(USER_PATH)
    public Mono<UserDTO> register(@RequestBody UserDTO userDTO){
        return userService.register(userDTO);
    }
    
    @PutMapping(USER_PATH_ID)
    public Mono<UserDTO> update(@PathVariable("userId") String userId, @RequestBody UserDTO userDTO){
        return userService.update(userId, userDTO);
    }
    
    @DeleteMapping(USER_PATH_ID)
    public Mono<Void> delete(@PathVariable("userId") String userId){
        return userService.delete(userId);
    }
    
}
