package com.ztp.lab1.products.bdd;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(features = "classpath:features/", glue = "com.ztp.lab1.products.bdd")
public class SpringbootCucumberApplicationTests {
}
