package pt.ua.deti.tqs.CarsService;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pt.ua.deti.tqs.CarsService.Data.CarRepository;
import pt.ua.deti.tqs.CarsService.Model.Car;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase
public class CarRestControllerTemplateIT {
    // will need to use the server port for the invocation url
    @LocalServerPort
    int randomServerPort;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private CarRepository carRepository;


    @AfterEach
    public void resetDb() {
        carRepository.deleteAll();
    }

    @Test
    void whenValidInput_thenCreateCar() {
        Car audi = new Car("Audi", "A4");
        ResponseEntity<Car> response = restTemplate.postForEntity("/api/cars", audi, Car.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        List<Car> found = carRepository.findAll();
        assertThat(found).extracting(Car::getModel).containsOnly(audi.getModel());
        assertThat(found).extracting(Car::getMaker).containsOnly(audi.getMaker());
    }

    @Test
    void whenValidInput_thenGetCar_thenStatus200() {
        createTestCar("Audi", "A4");
        createTestCar("Nissan", "Qashqai");
        createTestCar("BMW", "X5");

        ResponseEntity<List<Car>> response = restTemplate
                .exchange("/api/cars", HttpMethod.GET, null, new ParameterizedTypeReference<List<Car>>() {
                });

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).extracting(Car::getModel).containsExactly("Audi", "Nissan", "BMW");

    }

    @Test
    void whenValidInput_thenGetDetailsCar_thenStatus200(){
        Car car = new Car("Audi", "A3");
        carRepository.saveAndFlush(car);

        ResponseEntity<Car> response = restTemplate.exchange("/api/cars/" + car.getCarId(), HttpMethod.GET, null, new ParameterizedTypeReference<Car>() {});

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        assertThat(response.getBody().getModel()).isEqualTo("Audi");
        assertThat(response.getBody().getMaker()).isEqualTo("A3");
    }


    private void createTestCar(String model, String market) {
        Car newcar = new Car(model, market);
        carRepository.saveAndFlush(newcar);
    }

}