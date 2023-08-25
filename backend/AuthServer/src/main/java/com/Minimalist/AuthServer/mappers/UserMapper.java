package com.Minimalist.AuthServer.mappers;

import com.Minimalist.AuthServer.entities.User;
import com.Minimalist.AuthServer.model.UserDTO;
import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {
    
    User userDtoToUser(UserDTO userDTO);
    UserDTO userToUserDTO(User user);
}
