package com.wataneya.chillout.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToMany(mappedBy = "companies",fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Warehouse> warehouses = new HashSet<>();

    public Company(){

    }

    public Company(String id, String companyName, boolean isHidden, Set<Warehouse> warehouses) {
        this.id = id;
        this.companyName = companyName;
        this.isHidden = isHidden;
        this.warehouses = warehouses;
    }

    public Company(Company company){
        this.setId(company.getId());
        this.setCompanyName(company.getCompanyName());
        this.setHidden(company.isHidden());
        this.setWarehouses(company.getWarehouses());
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

    public Set<Warehouse> getWarehouses() {
        return warehouses;
    }

    public void setWarehouses(Set<Warehouse> warehouses) {
        this.warehouses = warehouses;
    }
}

