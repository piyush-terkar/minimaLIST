package com.minimalist.todolist.config;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.ReactiveAuditorAware;
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration;
import org.springframework.security.core.userdetails.User;

@Configuration
public class MongoConfig extends AbstractReactiveMongoConfiguration {
    
    @Bean
    public MongoClient mongoClient(){
        return MongoClients.create();
    }
    @Override
    protected String getDatabaseName() {
        return "minimalist";
    }
    @Bean
    public ReactiveAuditorAware<String> myAuditorProvider() {
        return new SpringSecurityAuditorAware();
    }
}
