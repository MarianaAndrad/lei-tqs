package pt.ua.deti.tqs.TestContainers.Data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface BookRepository extends JpaRepository<Book, String> {

    Optional<Book> findById(long l);

    Optional<Book> findByTitle(String title);
}
