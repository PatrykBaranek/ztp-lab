package com.ztp.lab1.products.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDto {

    @Null(message = "Id must not be provided")
    private String id;

    @NotBlank(message = "Name is mandatory")
    @Size(min = 3, max = 20, message = "Name must be between 3 and 20 characters")
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "Name must contain only letters and numbers")
    private String name;

    @NotBlank(message = "Description is mandatory")
    private String description;

    @DecimalMin(value = "0.01", message = "Price must be greater than 0.01")
    private double price;

    @Min(value = 1, message = "Quantity must be greater than 0")
    private int quantity;

    public ProductDto(String name, String description, double price, int quantity) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }
}
