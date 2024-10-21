package com.ztp.lab1.products.bdd;

import com.ztp.lab1.products.domain.Product;
import io.cucumber.java.en.Given;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@CucumberContextConfiguration
@SpringBootTest
public class UpdateProductSteps {

    @Autowired
    private RestTemplate restTemplate;

    private ResponseEntity<String> response;

    @Given("a product exists with id")
    public void a_product_exists_with_id() {
        restTemplate.postForEntity("/products", new Product("Existing Product", "Existing Description", 20.0, 10), String.class);
    }
}
