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
public class AddProductSteps {

    @Autowired
    private RestTemplate restTemplate;

    private ResponseEntity<String> response;

    @Given("the product details are provided")
    public void the_product_details_are_provided() {
    }

    @When("the client adds the product")
    public void the_client_adds_the_product() {
        response = restTemplate.postForEntity("/products", "Test", String.class);
    }

    @Then("the product is added successfully")
    public void the_product_is_added_successfully() {
        assertEquals(204, response.getStatusCode().value());
    }
}
