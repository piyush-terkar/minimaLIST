package com.minimalist.todolist.services;

import com.minimalist.todolist.mappers.UserMapper;
import com.minimalist.todolist.model.UserDTO;
import com.minimalist.todolist.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    @Override
    public Mono<UserDTO> update(String userId, UserDTO userDTO) {
        return userRepository.findById(userId)
                .map(foundUser-> {
                    foundUser.setEmail(userDTO.getEmail());
                    foundUser.setPassword(userDTO.getPassword());
                    return foundUser;
                })
                .flatMap(userRepository::save)
                .map(userMapper::userToUserDTO);
    }
    
    @Override
    public Mono<Void> delete(String userId) {
        return userRepository.deleteById(userId);
    }
    
    @Override
    public Mono<UserDTO> getDetails(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .map(user -> {
                    user.setPassword("");
                    return userMapper.userToUserDTO(user);
                });
    }
}
