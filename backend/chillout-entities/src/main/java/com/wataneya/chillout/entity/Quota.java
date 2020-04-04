package com.wataneya.chillout.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Quotas", uniqueConstraints = {@UniqueConstraint(columnNames = {"month", "year", "product_id", "warehouse_id"})})
public class Quota {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    private int quotaAmount;

    private int month;

    private int year;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    public Quota(){

    }

    public Quota(String id, int quotaAmount, int month, int year, Product product, Warehouse warehouse) {
        this.id = id;
        this.quotaAmount = quotaAmount;
        this.month = month;
        this.year = year;
        this.product = product;
        this.warehouse = warehouse;
    }

    public Quota(Quota quota){
        this.setId(quota.getId());
        this.setQuotaAmount(quota.getQuotaAmount());
        this.setMonth(quota.getMonth());
        this.setYear(quota.getYear());
        this.setProduct(quota.getProduct());
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

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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
                ", product=" + product +
                ", warehouse=" + warehouse +
                '}';
    }
}