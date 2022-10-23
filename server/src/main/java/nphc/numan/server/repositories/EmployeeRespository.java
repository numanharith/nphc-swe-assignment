package nphc.numan.server.repositories;

import nphc.numan.server.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRespository extends JpaRepository<Employee, Long> {
}
