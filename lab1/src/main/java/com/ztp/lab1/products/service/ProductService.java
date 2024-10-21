package com.ztp.lab1.products.service;

import com.ztp.lab1.products.domain.Product;
import com.ztp.lab1.products.dto.ProductDto;
import com.ztp.lab1.products.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product getProduct(String productId) {
        return productRepository.findById(productId).orElse(null);
    }

    public Product addProduct(ProductDto addProductDto) {
        Product product = mapToProduct(addProductDto);
        return productRepository.save(product);
    }

    public Product updateProduct(String productId, ProductDto productDto) {
        Product existingProduct = getProduct(productId);

        saveLogPropertyChange(existingProduct, "name", existingProduct.getName(), productDto.getName());
        saveLogPropertyChange(existingProduct, "description", existingProduct.getDescription(), productDto.getDescription());
        saveLogPropertyChange(existingProduct, "price", String.valueOf(existingProduct.getPrice()), String.valueOf(productDto.getPrice()));
        saveLogPropertyChange(existingProduct, "quantity", String.valueOf(existingProduct.getQuantity()), String.valueOf(productDto.getQuantity()));

        existingProduct.setName(productDto.getName());
        existingProduct.setDescription(productDto.getDescription());
        existingProduct.setPrice(productDto.getPrice());
        existingProduct.setQuantity(productDto.getQuantity());

        return productRepository.save(existingProduct);
    }

    public void deleteProduct(String productId) {
        productRepository.deleteById(productId);
    }

    private void saveLogPropertyChange(Product product, String propertyName, String oldVolue, String newValue) {
        if (!oldVolue.equals(newValue)) {
            Product.ChangeLog changeLog = new Product.ChangeLog();
            changeLog.setPropertyName(propertyName);
            changeLog.setOldValue(oldVolue);
            changeLog.setNewValue(newValue);
            changeLog.setTimestamp(LocalDateTime.now());

            product.getChangelogs().add(changeLog);
        }
    }

    private Product mapToProduct(ProductDto addProductDto) {
        return new Product(
                addProductDto.getName(),
                addProductDto.getDescription(),
                addProductDto.getPrice(),
                addProductDto.getQuantity()
        );
    }
}
