package com.wataneya.chillout.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Products")
public class Product {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    @Column(unique = true)
    private String productName;

    private boolean isHidden;

    public Product(){

    }

    public Product(String id, String productName, boolean isHidden) {
        this.id = id;
        this.productName = productName;
        this.isHidden = isHidden;
    }

    public Product(Product product){
        this.setId(product.getId());
        this.setProductName(product.getProductName());
        this.setHidden(product.isHidden());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public boolean isHidden() {
        return isHidden;
    }

    public void setHidden(boolean hidden) {
        isHidden = hidden;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id='" + id + '\'' +
                ", productName='" + productName + '\'' +
                ", isHidden=" + isHidden +
                '}';
    }
}