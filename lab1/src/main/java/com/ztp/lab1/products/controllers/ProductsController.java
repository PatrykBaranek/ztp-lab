package com.ztp.lab1.products.controllers;

import com.ztp.lab1.products.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/products")
public class ProductsController {

    @GetMapping
    public ResponseEntity<Product> getProducts() {
        Product product = new Product("name", "desc");
        return ResponseEntity.ok(product);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProduct(@RequestParam String productId) {
        Product product = new Product("name", productId);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<Void> addProduct(@RequestBody Object body) {
        System.out.println(body);

        return ResponseEntity
                .noContent()
                .build();
    }

    @PatchMapping
    public ResponseEntity<Void> updateProduct(@RequestBody Object body) {
        System.out.println(body);

        return ResponseEntity
                .noContent()
                .build();
    }

    @DeleteMapping
    public ResponseEntity<String> deleteProduct() {
        return ResponseEntity.ok("Deleted");
    }

}
