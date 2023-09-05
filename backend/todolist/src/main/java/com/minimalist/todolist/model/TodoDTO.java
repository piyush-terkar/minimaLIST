package com.minimalist.todolist.model;

import org.springframework.security.core.userdetails.User;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.Version;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoDTO {
    
    private String id;
    
    
    private Boolean isChecked;
    private String content;
    private Integer index;
    
    @NotBlank
    private String listId;
    
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
    private User createdBy;
    private User modifiedBy;
    private Integer version;
}
