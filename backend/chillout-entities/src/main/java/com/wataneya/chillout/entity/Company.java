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
    private String company;

    @ManyToMany(mappedBy = "companies",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Warehouse> warehouses = new HashSet<>();

    public Company(){

    }

    public Company(String id, String company, Set<Warehouse> warehouses) {
        this.id = id;
        this.company = company;
        this.warehouses = warehouses;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public Set<Warehouse> getWarehouses() {
        return warehouses;
    }

    public void setWarehouses(Set<Warehouse> warehouses) {
        this.warehouses = warehouses;
    }

    @Override
    public String toString() {
        return "Company{" +
                "id='" + id + '\'' +
                ", company='" + company + '\'' +
                ", warehouses=" + warehouses +
                '}';
    }
}

