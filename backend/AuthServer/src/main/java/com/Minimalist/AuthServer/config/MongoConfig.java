package com.Minimalist.AuthServer.config;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration;

public class MongoConfig extends AbstractReactiveMongoConfiguration {
    
    @Bean
    MongoClient mongoClient(){
        return MongoClients.create();
    }
    
    @Override
    protected String getDatabaseName() {
        return "minimalist";
    }
}
