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
    
    @NotBlank
    @Size(min = 1, max = 255)
    private String id;
    
    @NotBlank
    @Size(min = 1, max = 2)
    private String emoji;
    @NotBlank
    @Size(min = 1, max = 255)
    private String title;
    
    private Integer index;
    
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
