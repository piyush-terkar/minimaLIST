package com.minimalist.todolist.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.ReadOnlyProperty;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoDTO {
    
    @NotBlank
    @Size(min = 1, max = 255)
    private String id;
    private Boolean isChecked;
    private String content;
    private Integer index;
    
    @NotBlank
    @ReadOnlyProperty
    private String listId;
    
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
