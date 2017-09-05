package tuto2.web.rest;

import com.codahale.metrics.annotation.Timed;
import tuto2.domain.Temp;

import tuto2.repository.TempRepository;
import tuto2.repository.search.TempSearchRepository;
import tuto2.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Temp.
 */
@RestController
@RequestMapping("/api")
public class TempResource {

    private final Logger log = LoggerFactory.getLogger(TempResource.class);

    private static final String ENTITY_NAME = "temp";

    private final TempRepository tempRepository;

    private final TempSearchRepository tempSearchRepository;
    public TempResource(TempRepository tempRepository, TempSearchRepository tempSearchRepository) {
        this.tempRepository = tempRepository;
        this.tempSearchRepository = tempSearchRepository;
    }

    /**
     * POST  /temps : Create a new temp.
     *
     * @param temp the temp to create
     * @return the ResponseEntity with status 201 (Created) and with body the new temp, or with status 400 (Bad Request) if the temp has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/temps")
    @Timed
    public ResponseEntity<Temp> createTemp(@RequestBody Temp temp) throws URISyntaxException {
        log.debug("REST request to save Temp : {}", temp);
        if (temp.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new temp cannot already have an ID")).body(null);
        }
        Temp result = tempRepository.save(temp);
        tempSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/temps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /temps : Updates an existing temp.
     *
     * @param temp the temp to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated temp,
     * or with status 400 (Bad Request) if the temp is not valid,
     * or with status 500 (Internal Server Error) if the temp couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/temps")
    @Timed
    public ResponseEntity<Temp> updateTemp(@RequestBody Temp temp) throws URISyntaxException {
        log.debug("REST request to update Temp : {}", temp);
        if (temp.getId() == null) {
            return createTemp(temp);
        }
        Temp result = tempRepository.save(temp);
        tempSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, temp.getId().toString()))
            .body(result);
    }

    /**
     * GET  /temps : get all the temps.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of temps in body
     */
    @GetMapping("/temps")
    @Timed
    public List<Temp> getAllTemps() {
        log.debug("REST request to get all Temps");
        return tempRepository.findAll();
        }

    /**
     * GET  /temps/:id : get the "id" temp.
     *
     * @param id the id of the temp to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the temp, or with status 404 (Not Found)
     */
    @GetMapping("/temps/{id}")
    @Timed
    public ResponseEntity<Temp> getTemp(@PathVariable Long id) {
        log.debug("REST request to get Temp : {}", id);
        Temp temp = tempRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(temp));
    }

    /**
     * DELETE  /temps/:id : delete the "id" temp.
     *
     * @param id the id of the temp to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/temps/{id}")
    @Timed
    public ResponseEntity<Void> deleteTemp(@PathVariable Long id) {
        log.debug("REST request to delete Temp : {}", id);
        tempRepository.delete(id);
        tempSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/temps?query=:query : search for the temp corresponding
     * to the query.
     *
     * @param query the query of the temp search
     * @return the result of the search
     */
    @GetMapping("/_search/temps")
    @Timed
    public List<Temp> searchTemps(@RequestParam String query) {
        log.debug("REST request to search Temps for query {}", query);
        return StreamSupport
            .stream(tempSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
