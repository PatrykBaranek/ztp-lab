package com.ztp.lab1.products.bdd;

import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import static org.junit.Assert.assertEquals;

@CucumberContextConfiguration
@SpringBootTest
public class GetProductByIdSteps {

    @Autowired
    private RestTemplate restTemplate;

    private ResponseEntity<String> response;

    @When("the client requests the product by id")
    public void the_client_requests_the_product_by_id() {
        response = restTemplate.getForEntity("/products/1", String.class);
    }

    @Then("the client receives the product details")
    public void the_client_receives_the_product_details() {
        assertEquals(200, response.getStatusCode().value());
    }
}
