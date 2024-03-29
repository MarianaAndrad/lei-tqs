Feature: Search for Air Quality and Weather statistics
  As a user
  I want to search for air quality and weather statistics
  So that I can view the current conditions

  Background:
    Given I am on the homepage

  Scenario: Search for Air Quality
    When I click on the Search Air Quality button
    And I enter "Ovar" in the city field
    And I enter "Portugal" in the country field
    And I click the search button
    Then I should see "Ovar" and "Portugal" in the air quality data

  Scenario: Search for Weather
    When I click on the search weather button
    And I select "Portugal" in the country field
    And I select "Aveiro" in the state field
    And I select "Agueda" in the city field
    And I search for the weather
    Then I should see "Agueda", "Aveiro" and "Portugal" in the weather data
