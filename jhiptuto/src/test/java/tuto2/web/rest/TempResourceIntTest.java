package tuto2.web.rest;

import tuto2.Tuto2App;

import tuto2.domain.Temp;
import tuto2.repository.TempRepository;
import tuto2.repository.search.TempSearchRepository;
import tuto2.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TempResource REST controller.
 *
 * @see TempResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Tuto2App.class)
public class TempResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    @Autowired
    private TempRepository tempRepository;

    @Autowired
    private TempSearchRepository tempSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTempMockMvc;

    private Temp temp;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TempResource tempResource = new TempResource(tempRepository, tempSearchRepository);
        this.restTempMockMvc = MockMvcBuilders.standaloneSetup(tempResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Temp createEntity(EntityManager em) {
        Temp temp = new Temp()
            .name(DEFAULT_NAME)
            .age(DEFAULT_AGE);
        return temp;
    }

    @Before
    public void initTest() {
        tempSearchRepository.deleteAll();
        temp = createEntity(em);
    }

    @Test
    @Transactional
    public void createTemp() throws Exception {
        int databaseSizeBeforeCreate = tempRepository.findAll().size();

        // Create the Temp
        restTempMockMvc.perform(post("/api/temps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(temp)))
            .andExpect(status().isCreated());

        // Validate the Temp in the database
        List<Temp> tempList = tempRepository.findAll();
        assertThat(tempList).hasSize(databaseSizeBeforeCreate + 1);
        Temp testTemp = tempList.get(tempList.size() - 1);
        assertThat(testTemp.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTemp.getAge()).isEqualTo(DEFAULT_AGE);

        // Validate the Temp in Elasticsearch
        Temp tempEs = tempSearchRepository.findOne(testTemp.getId());
        assertThat(tempEs).isEqualToComparingFieldByField(testTemp);
    }

    @Test
    @Transactional
    public void createTempWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tempRepository.findAll().size();

        // Create the Temp with an existing ID
        temp.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTempMockMvc.perform(post("/api/temps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(temp)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Temp> tempList = tempRepository.findAll();
        assertThat(tempList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTemps() throws Exception {
        // Initialize the database
        tempRepository.saveAndFlush(temp);

        // Get all the tempList
        restTempMockMvc.perform(get("/api/temps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(temp.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)));
    }

    @Test
    @Transactional
    public void getTemp() throws Exception {
        // Initialize the database
        tempRepository.saveAndFlush(temp);

        // Get the temp
        restTempMockMvc.perform(get("/api/temps/{id}", temp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(temp.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE));
    }

    @Test
    @Transactional
    public void getNonExistingTemp() throws Exception {
        // Get the temp
        restTempMockMvc.perform(get("/api/temps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTemp() throws Exception {
        // Initialize the database
        tempRepository.saveAndFlush(temp);
        tempSearchRepository.save(temp);
        int databaseSizeBeforeUpdate = tempRepository.findAll().size();

        // Update the temp
        Temp updatedTemp = tempRepository.findOne(temp.getId());
        updatedTemp
            .name(UPDATED_NAME)
            .age(UPDATED_AGE);

        restTempMockMvc.perform(put("/api/temps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTemp)))
            .andExpect(status().isOk());

        // Validate the Temp in the database
        List<Temp> tempList = tempRepository.findAll();
        assertThat(tempList).hasSize(databaseSizeBeforeUpdate);
        Temp testTemp = tempList.get(tempList.size() - 1);
        assertThat(testTemp.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTemp.getAge()).isEqualTo(UPDATED_AGE);

        // Validate the Temp in Elasticsearch
        Temp tempEs = tempSearchRepository.findOne(testTemp.getId());
        assertThat(tempEs).isEqualToComparingFieldByField(testTemp);
    }

    @Test
    @Transactional
    public void updateNonExistingTemp() throws Exception {
        int databaseSizeBeforeUpdate = tempRepository.findAll().size();

        // Create the Temp

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTempMockMvc.perform(put("/api/temps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(temp)))
            .andExpect(status().isCreated());

        // Validate the Temp in the database
        List<Temp> tempList = tempRepository.findAll();
        assertThat(tempList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTemp() throws Exception {
        // Initialize the database
        tempRepository.saveAndFlush(temp);
        tempSearchRepository.save(temp);
        int databaseSizeBeforeDelete = tempRepository.findAll().size();

        // Get the temp
        restTempMockMvc.perform(delete("/api/temps/{id}", temp.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean tempExistsInEs = tempSearchRepository.exists(temp.getId());
        assertThat(tempExistsInEs).isFalse();

        // Validate the database is empty
        List<Temp> tempList = tempRepository.findAll();
        assertThat(tempList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTemp() throws Exception {
        // Initialize the database
        tempRepository.saveAndFlush(temp);
        tempSearchRepository.save(temp);

        // Search the temp
        restTempMockMvc.perform(get("/api/_search/temps?query=id:" + temp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(temp.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Temp.class);
        Temp temp1 = new Temp();
        temp1.setId(1L);
        Temp temp2 = new Temp();
        temp2.setId(temp1.getId());
        assertThat(temp1).isEqualTo(temp2);
        temp2.setId(2L);
        assertThat(temp1).isNotEqualTo(temp2);
        temp1.setId(null);
        assertThat(temp1).isNotEqualTo(temp2);
    }
}
