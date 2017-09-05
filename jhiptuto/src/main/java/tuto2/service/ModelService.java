package tuto2.service;

import tuto2.domain.Model;
import tuto2.repository.ModelRepository;
import tuto2.repository.search.ModelSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Model.
 */
@Service
@Transactional
public class ModelService {

    private final Logger log = LoggerFactory.getLogger(ModelService.class);

    private final ModelRepository modelRepository;

    private final ModelSearchRepository modelSearchRepository;
    public ModelService(ModelRepository modelRepository, ModelSearchRepository modelSearchRepository) {
        this.modelRepository = modelRepository;
        this.modelSearchRepository = modelSearchRepository;
    }

    /**
     * Save a model.
     *
     * @param model the entity to save
     * @return the persisted entity
     */
    public Model save(Model model) {
        log.debug("Request to save Model : {}", model);
        Model result = modelRepository.save(model);
        modelSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the models.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Model> findAll() {
        log.debug("Request to get all Models");
        return modelRepository.findAll();
    }

    /**
     *  Get one model by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Model findOne(Long id) {
        log.debug("Request to get Model : {}", id);
        return modelRepository.findOne(id);
    }

    /**
     *  Delete the  model by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Model : {}", id);
        modelRepository.delete(id);
        modelSearchRepository.delete(id);
    }

    /**
     * Search for the model corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Model> search(String query) {
        log.debug("Request to search Models for query {}", query);
        return StreamSupport
            .stream(modelSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
