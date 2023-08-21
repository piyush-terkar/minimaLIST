package com.minimalist.todolist.repositories;

import com.minimalist.todolist.entities.Todo;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface TodoRepository extends ReactiveMongoRepository<Todo, String> {
}
