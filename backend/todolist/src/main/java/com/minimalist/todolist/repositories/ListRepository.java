package com.minimalist.todolist.repositories;

import com.minimalist.todolist.entities.List;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface ListRepository extends ReactiveMongoRepository<List, String> {
}
