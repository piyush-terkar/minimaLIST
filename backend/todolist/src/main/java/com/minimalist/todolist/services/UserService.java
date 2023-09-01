package com.minimalist.todolist.services;

import com.minimalist.todolist.model.UserDTO;
import org.springframework.security.core.Authentication;
import reactor.core.publisher.Mono;

public interface UserService {
    
        
        Mono<UserDTO> update(String userId, UserDTO userDTO);
        
        Mono<Void> delete(String userId);
        
        Mono<UserDTO> getDetails(Authentication authentication);
}
