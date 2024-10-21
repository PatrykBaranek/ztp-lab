package com.ztp.lab1.products.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@Document(collection = "products")
public class Product {
    @Id
    private String id;

    private String name;
    private String description;
    private double price;
    private int quantity;
    private List<ChangeLog> changelogs = new ArrayList<>();

    @Getter
    @Setter
    public static class ChangeLog {
        private String propertyName;
        private String oldValue;
        private String newValue;
        private LocalDateTime timestamp;
    }

    public Product(String name, String description, double price, int quantity) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }
}
