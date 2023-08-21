package com.minimalist.todolist.controllers;

import com.minimalist.todolist.model.ListDTO;
import com.minimalist.todolist.services.ListService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
public class ListController {
    
    private static final String LIST_PATH = "/api/v1/list";
    private static final String LIST_PATH_ID = LIST_PATH + "/{listId}";
    
    private final ListService listService;
    
    @GetMapping(LIST_PATH)
    Flux<ListDTO> getAll(){
        return listService.getAllLists();
    }
    
    @PostMapping(LIST_PATH)
    Mono<ListDTO> newList(ListDTO listDTO){
        return listService.createList(listDTO);
    }
    
}
