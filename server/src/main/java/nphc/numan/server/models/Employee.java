package nphc.numan.server.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    public Employee(){}

    public Employee(String fullName, String loginId, Double salary, String profilePic) {
        this.fullName = fullName;
        this.loginId = loginId;
        this.salary = salary;
        this.profilePic = profilePic;
    }

    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("login_id")
    private String loginId;

    @JsonProperty("salary")
    private Double salary;

    @JsonProperty("profile_pic")
    private String profilePic;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getLoginId() {
        return loginId;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }
}
