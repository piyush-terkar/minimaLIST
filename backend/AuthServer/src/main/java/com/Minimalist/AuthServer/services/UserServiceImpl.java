package com.Minimalist.AuthServer.services;

import com.Minimalist.AuthServer.entities.User;
import com.Minimalist.AuthServer.mappers.UserMapper;
import com.Minimalist.AuthServer.model.UserDTO;
import com.Minimalist.AuthServer.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    
    @Override
    public Mono<UserDTO> register(UserDTO userDTO) {
        return userRepository.save(userMapper.userDtoToUser(userDTO))
                .map(userMapper::userToUserDTO);
    }
    
    @Override
    public Mono<UserDTO> login(UserDTO userDTO) {
        return null;
    }
    
    @Override
    public Mono<UserDTO> getById(String userId) {
        return userRepository.findById(userId)
                .map(userMapper::userToUserDTO);
    }
    
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
    
    
}
