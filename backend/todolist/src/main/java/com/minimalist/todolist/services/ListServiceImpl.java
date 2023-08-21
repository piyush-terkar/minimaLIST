package com.minimalist.todolist.services;

import com.minimalist.todolist.mappers.ListMapper;
import com.minimalist.todolist.model.ListDTO;
import com.minimalist.todolist.repositories.ListRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ListServiceImpl implements ListService {
    
    private final ListRepository listRepository;
    private final ListMapper listMapper;
    
    @Override
    public Flux<ListDTO> getAllLists() {
        return listRepository.findAll()
                .map(listMapper::listToListDTO);
    }
    
    @Override
    public Mono<ListDTO> createList(ListDTO listDTO) {
        return listRepository.save(listMapper.listDtoToList(listDTO))
                .map(listMapper::listToListDTO);
    }
    
    @Override
    public Mono<ListDTO> updateList(String listId, ListDTO listDTO) {
        return listRepository.findById(listId)
                .map(foundList -> {
                    foundList.setEmoji(listDTO.getEmoji());
                    foundList.setTitle(listDTO.getTitle());
                    return foundList;
                })
                .flatMap(listRepository::save)
                .map(listMapper::listToListDTO);
    }
    
    @Override
    public Mono<Void> deleteList(String listId) {
        return listRepository.deleteById(listId);
    }
}
