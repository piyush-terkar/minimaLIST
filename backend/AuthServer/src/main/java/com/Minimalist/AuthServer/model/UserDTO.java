package com.Minimalist.AuthServer.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    
    private String id;
    private String userName;
    private String email;
    private String password;
    
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
