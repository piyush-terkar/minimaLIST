package com.minimalist.todolist.controllers;

import com.minimalist.todolist.model.TodoDTO;
import com.minimalist.todolist.services.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
public class TodoController {
    
    private final TodoService todoService;
    public static final String TODO_PATH = "/api/v1/todo";
    public static final String TODO_PATH_ID = TODO_PATH + "/{todoId}";
    
    @GetMapping(TODO_PATH + "/{listId}")
    Flux<TodoDTO> listTodos(@PathVariable("listId") String listId){
        return todoService.getAll(listId);
    }
    
    @PostMapping(TODO_PATH)
    Mono<TodoDTO> createTodo(@RequestBody TodoDTO dto){
        
        return todoService.create(dto);
    }
    
    @PutMapping(TODO_PATH_ID)
    Mono<TodoDTO>  updateTodo(@PathVariable("todoId") String todoId, @RequestBody TodoDTO dto){
        return todoService.update(todoId, dto);
    }
    
    @DeleteMapping(TODO_PATH_ID)
    Mono<Void> deleteTodo(@PathVariable("todoId") String todoId){
        return todoService.delete(todoId);
    }
    
}
