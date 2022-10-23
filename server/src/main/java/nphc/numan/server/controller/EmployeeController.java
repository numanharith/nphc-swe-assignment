package nphc.numan.server.controller;

import nphc.numan.server.models.Employee;
import nphc.numan.server.repositories.EmployeeRespository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static java.nio.charset.StandardCharsets.UTF_8;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/")
public class EmployeeController {

    private final EmployeeRespository employeeRespository;

    public EmployeeController(EmployeeRespository employeeRespository) {
        this.employeeRespository = employeeRespository;
    }

    @GetMapping("employees")
    List<Employee> allEmployees() {
        return employeeRespository.findAll();
    }

    @PostMapping("users/upload")
    public ResponseEntity<String> saveCsv(@RequestParam("file") MultipartFile file) throws IOException {
        BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), UTF_8));
        String[] headers = { "id", "login", "name", "salary" };
        Iterable<CSVRecord> csvRecords = CSVFormat.DEFAULT.withHeader(headers).withFirstRecordAsHeader().parse(fileReader);
        for (CSVRecord record : csvRecords) {
            String id = record.get("id");
            String login = record.get("login");
        }
        return file.isEmpty() ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(HttpStatus.OK);
    }
}
