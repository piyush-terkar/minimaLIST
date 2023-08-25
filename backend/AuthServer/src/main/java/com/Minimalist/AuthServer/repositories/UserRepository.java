package com.Minimalist.AuthServer.repositories;

import com.Minimalist.AuthServer.entities.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveMongoRepository<User, String> {
    Mono<User> findByUserName(String userName);
}
