package com.ztp.lab1.products.repository;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class MongoClientConnectionExample  extends AbstractMongoClientConfiguration {

    @Autowired
    private MongoProperties mongoProperties;

    @Override
    protected String getDatabaseName() {
        return mongoProperties.getDatabase();
    }

    @Bean
    @Override
    public MongoClient mongoClient() {
        return MongoClients.create(mongoProperties.getUri());
    }

}
