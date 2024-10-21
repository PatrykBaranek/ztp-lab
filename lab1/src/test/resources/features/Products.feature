Feature: Product Management

  Scenario: Add a new product
    Given the product details are provided
    When the client adds the product
    Then the product is added successfully

  Scenario: Get all products
    Given there are products in the database
    When the client requests all products
    Then the client receives the list of products

  Scenario: Update an existing product
    Given a product exists with id 1
    When the client updates the product details
    Then the product is updated successfully

  Scenario: Delete a product
    Given a product exists with id 1
    When the client deletes the product
    Then the product is deleted successfully

  Scenario: Get a product by id
    Given a product exists with id 1
    When the client requests the product by id
    Then the client receives the product details