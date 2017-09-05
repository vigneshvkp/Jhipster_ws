package tuto2.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(tuto2.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(tuto2.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(tuto2.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(tuto2.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(tuto2.domain.Temp.class.getName(), jcacheConfiguration);
            cm.createCache(tuto2.domain.Model.class.getName(), jcacheConfiguration);
            cm.createCache(tuto2.domain.Region.class.getName(), jcacheConfiguration);
            cm.createCache(tuto2.domain.Country.class.getName(), jcacheConfiguration);
            cm.createCache(tuto2.domain.Location.class.getName(), jcacheConfiguration);
            cm.createCache(tuto2.domain.Department.class.getName(), jcacheConfiguration);
            cm.createCache(tuto2.domain.Department.class.getName() + ".employees", jcacheConfiguration);
            cm.createCache(tuto2.domain.Task.class.getName(), jcacheConfiguration);
            cm.createCache(tuto2.domain.Task.class.getName() + ".jobs", jcacheConfiguration);
            cm.createCache(tuto2.domain.Employee.class.getName(), jcacheConfiguration);
            cm.createCache(tuto2.domain.Employee.class.getName() + ".jobs", jcacheConfiguration);
            cm.createCache(tuto2.domain.Job.class.getName(), jcacheConfiguration);
            cm.createCache(tuto2.domain.Job.class.getName() + ".tasks", jcacheConfiguration);
            cm.createCache(tuto2.domain.JobHistory.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
