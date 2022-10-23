package nphc.numan.server.config;

import lombok.extern.slf4j.Slf4j;
import nphc.numan.server.models.Employee;
import nphc.numan.server.repositories.EmployeeRespository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
class LoadDatabase {

    @Bean
    CommandLineRunner initDatabase(EmployeeRespository respository) {
        return args -> log.info("Preloading data: " +
                respository.save(new Employee(
                        "Corrianne Graffham", "cgraffham0", 8214.74, "http://dummyimage.com/156x100.png/cc0000/ffffff")));
    }
}
