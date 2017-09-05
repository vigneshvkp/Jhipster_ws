package tuto2.repository;

import tuto2.domain.Temp;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Temp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TempRepository extends JpaRepository<Temp, Long> {

}
