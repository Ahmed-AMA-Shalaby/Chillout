package com.wataneya.chillout.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Warehouses")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Warehouse {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    @Column(unique = true)
    private String warehouseName;

    private boolean isHidden;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Sector sector;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Set<Product> products = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Set<Company> companies = new HashSet<>();

    public Warehouse(){

    }

    public Warehouse(String id, String warehouseName, boolean isHidden, Sector sector, Set<Product> products, Set<Company> companies) {
        this.id = id;
        this.warehouseName = warehouseName;
        this.isHidden = isHidden;
        this.sector = sector;
        this.products = products;
        this.companies = companies;
    }

    public Warehouse(Warehouse warehouse){
        this.setId(warehouse.getId());
        this.setWarehouseName(warehouse.getWarehouseName());
        this.setHidden(warehouse.isHidden());
        this.setSector(warehouse.getSector());
        this.setProducts(warehouse.getProducts());
        this.setCompanies(warehouse.getCompanies());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWarehouseName() {
        return warehouseName;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }

    public boolean isHidden() {
        return isHidden;
    }

    public void setHidden(boolean hidden) {
        isHidden = hidden;
    }

    public Sector getSector() {
        return sector;
    }

    public void setSector(Sector sector) {
        this.sector = sector;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Set<Company> getCompanies() {
        return companies;
    }

    public void setCompanies(Set<Company> companies) {
        this.companies = companies;
    }

    @Override
    public String toString() {
        return "Warehouse{" +
                "id='" + id + '\'' +
                ", warehouseName='" + warehouseName + '\'' +
                ", isHidden=" + isHidden +
                ", sector=" + sector +
                ", products=" + products +
                ", companies=" + companies +
                '}';
    }
}

