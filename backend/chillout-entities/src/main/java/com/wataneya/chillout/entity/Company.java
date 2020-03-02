package com.wataneya.chillout.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Companies")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Company {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    @Column(unique = true)
    private String companyName;

    private boolean isHidden;

    public Company(){

    }

    public Company(String id, String companyName, boolean isHidden) {
        this.id = id;
        this.companyName = companyName;
        this.isHidden = isHidden;
    }

    public Company(Company company){
        this.setId(company.getId());
        this.setCompanyName(company.getCompanyName());
        this.setHidden(company.isHidden());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public boolean isHidden() {
        return isHidden;
    }

    public void setHidden(boolean hidden) {
        isHidden = hidden;
    }

    @Override
    public String toString() {
        return "Company{" +
                "id='" + id + '\'' +
                ", companyName='" + companyName + '\'' +
                ", isHidden=" + isHidden +
                '}';
    }
}

