package com.minimalist.todolist.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
