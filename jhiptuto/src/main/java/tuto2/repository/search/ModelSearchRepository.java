package tuto2.repository.search;

import tuto2.domain.Model;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Model entity.
 */
public interface ModelSearchRepository extends ElasticsearchRepository<Model, Long> {
}
