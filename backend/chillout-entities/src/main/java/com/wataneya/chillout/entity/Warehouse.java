package com.wataneya.chillout.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Warehouses", uniqueConstraints = {@UniqueConstraint(columnNames = {"warehouseName", "companyName"})})
public class Warehouse {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    private String warehouseName;

    private String companyName;

    private boolean isHidden;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Sector sector;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Set<Product> products = new HashSet<>();

    public Warehouse() {

    }

    public Warehouse(String id, String warehouseName, String companyName, boolean isHidden, Sector sector, Set<Product> products) {
        this.id = id;
        this.warehouseName = warehouseName;
        this.companyName = companyName;
        this.isHidden = isHidden;
        this.sector = sector;
        this.products = products;
    }

    public Warehouse(Warehouse warehouse) {
        this.setId(warehouse.getId());
        this.setWarehouseName(warehouse.getWarehouseName());
        this.setCompanyName(warehouse.getCompanyName());
        this.setHidden(warehouse.isHidden());
        this.setSector(warehouse.getSector());
        this.setProducts(warehouse.getProducts());
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

    @Override
    public String toString() {
        return "Warehouse{" +
                "id='" + id + '\'' +
                ", warehouseName='" + warehouseName + '\'' +
                ", companyName='" + companyName + '\'' +
                ", isHidden=" + isHidden +
                ", sector=" + sector +
                ", products=" + products +
                '}';
    }
}

