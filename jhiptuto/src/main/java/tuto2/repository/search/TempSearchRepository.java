package tuto2.repository.search;

import tuto2.domain.Temp;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Temp entity.
 */
public interface TempSearchRepository extends ElasticsearchRepository<Temp, Long> {
}
