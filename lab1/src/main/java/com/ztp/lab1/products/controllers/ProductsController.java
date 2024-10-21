package com.ztp.lab1.products.controllers;

import com.ztp.lab1.products.domain.Product;
import com.ztp.lab1.products.dto.ProductDto;
import com.ztp.lab1.products.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/products")
public class ProductsController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<Page<Product>> getProducts(@PageableDefault(size = 10) Pageable pageable) {
        Page<Product> products = productService.getProducts(pageable);

        if (products.isEmpty()) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(products);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProduct(@PathVariable String productId) {
        Product product = productService.getProduct(productId);

        if (product == null) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<Void> addProduct(@Valid @RequestBody ProductDto productDto) {
        productService.addProduct(productDto);

        return ResponseEntity
                .noContent()
                .build();
    }

    @PatchMapping("/{productId}")
    public ResponseEntity<Void> updateProduct(@PathVariable String productId,
                                              @Valid @RequestBody ProductDto productDto) {
        Product updatedProduct = productService.updateProduct(productId, productDto);

        if (updatedProduct == null) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity
                .noContent()
                .build();
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String productId) {
        productService.deleteProduct(productId);
        return ResponseEntity
                .noContent()
                .build();
    }

}
