package com.minimalist.todolist.services;

import com.minimalist.todolist.model.ListDTO;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ListService {
    Flux<ListDTO> getAllLists();
    
    Mono<ListDTO> createList(Mono<ListDTO> listDTO);
    
    Mono<ListDTO> updateList(String listId, ListDTO listDTO);
    
    Mono<Void> deleteList(String listId);
}
