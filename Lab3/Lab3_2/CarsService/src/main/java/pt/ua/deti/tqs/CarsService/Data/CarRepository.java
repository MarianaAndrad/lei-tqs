package pt.ua.deti.tqs.CarsService.Data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pt.ua.deti.tqs.CarsService.Model.Car;

import java.util.List;

@Repository
public interface CarRepository  extends JpaRepository<Car, Long> {
    Car findByCarId(Long carId);
    List<Car> findAll();
}
