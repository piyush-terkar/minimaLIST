package com.Minimalist.AuthServer.repositories;

import com.Minimalist.AuthServer.entities.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface UserRepository extends ReactiveMongoRepository<User, String> {
}
