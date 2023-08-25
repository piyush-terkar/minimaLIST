package com.Minimalist.AuthServer.services;

import com.Minimalist.AuthServer.model.UserDTO;
import reactor.core.publisher.Mono;

public interface UserService {
    
    Mono<UserDTO> register(UserDTO userDTO);
    
    Mono<UserDTO> login(UserDTO userDTO);
    
    Mono<UserDTO> getById(String userId);
    
    Mono<UserDTO> update(String userId, UserDTO userDTO);

    Mono<Void> delete(String userId);
    
}
