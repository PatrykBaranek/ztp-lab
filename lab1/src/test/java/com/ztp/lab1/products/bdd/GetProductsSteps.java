package com.ztp.lab1.products.bdd;

import io.cucumber.java.en.Given;
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
public class GetProductsSteps {

    @Autowired
    private RestTemplate restTemplate;

    private ResponseEntity<String> response;

    @Given("there are products in the database")
    public void there_are_products_in_the_database() {
    }

    @When("the client requests all products")
    public void the_client_requests_all_products() {
        response = restTemplate.getForEntity("/products", String.class);
    }

    @Then("the client receives the list of products")
    public void the_client_receives_the_list_of_products() {
        assertEquals(200, response.getStatusCode().value());
    }
}
