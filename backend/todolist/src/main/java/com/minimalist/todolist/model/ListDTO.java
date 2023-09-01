package com.minimalist.todolist.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ListDTO {
    
    private String id;
    
    @NotBlank
    @Size(min = 0, max = 255)
    private String emoji;
    @NotBlank
    @Size(min = 1, max = 255)
    private String title;
    
    private Integer index;
    
    @NotBlank
    private String userId;
    
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
