package com.wataneya.chillout.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Quotas")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Quota {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    private int quotaAmount;

    private int month;

    private int year;

    private boolean isHidden;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Company company;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Warehouse warehouse;

    public Quota(){

    }

    public Quota(String id, int quotaAmount, int month, int year, boolean isHidden, Product product, Company company, Warehouse warehouse) {
        this.id = id;
        this.quotaAmount = quotaAmount;
        this.month = month;
        this.year = year;
        this.isHidden = isHidden;
        this.product = product;
        this.company = company;
        this.warehouse = warehouse;
    }

    public Quota(Quota quota){
        this.setId(quota.getId());
        this.setQuotaAmount(quota.getQuotaAmount());
        this.setMonth(quota.getMonth());
        this.setYear(quota.getYear());
        this.setHidden(quota.isHidden());
        this.setProduct(quota.getProduct());
        this.setCompany(quota.getCompany());
        this.setWarehouse(quota.getWarehouse());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getQuotaAmount() {
        return quotaAmount;
    }

    public void setQuotaAmount(int quotaAmount) {
        this.quotaAmount = quotaAmount;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public boolean isHidden() {
        return isHidden;
    }

    public void setHidden(boolean hidden) {
        isHidden = hidden;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    @Override
    public String toString() {
        return "Quota{" +
                "id='" + id + '\'' +
                ", quotaAmount=" + quotaAmount +
                ", month=" + month +
                ", year=" + year +
                ", isHidden=" + isHidden +
                ", product=" + product +
                ", company=" + company +
                ", warehouse=" + warehouse +
                '}';
    }
}