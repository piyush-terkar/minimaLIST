package com.minimalist.todolist.services;

import com.minimalist.todolist.model.ListDTO;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public class ListServiceImpl implements ListService {
    @Override
    public Flux<ListDTO> getAllLists() {
        return null;
    }
    
    @Override
    public Mono<ListDTO> createList(ListDTO listDTO) {
        return null;
    }
    
    @Override
    public Mono<ListDTO> updateList(String listId, ListDTO listDTO) {
        return null;
    }
    
    @Override
    public Mono<Void> deleteList(String listId) {
        return null;
    }
}
