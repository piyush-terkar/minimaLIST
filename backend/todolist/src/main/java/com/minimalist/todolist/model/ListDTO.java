package com.minimalist.todolist.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document
public class ListDTO {
    
    private String id;
    private String emoji;
    private String title;
    
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
