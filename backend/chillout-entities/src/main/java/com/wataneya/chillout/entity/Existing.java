package com.wataneya.chillout.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Existings")
public class Existing {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    private int existingAmount;

    private int day;

    private int month;

    private int year;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Station station;

    public Existing(){

    }

    public Existing(String id, int existingAmount, int day, int month, int year, Product product, Station station) {
        this.id = id;
        this.existingAmount = existingAmount;
        this.day = day;
        this.month = month;
        this.year = year;
        this.product = product;
        this.station = station;
    }

    public Existing(Existing existing){
        this.setId(existing.getId());
        this.setExistingAmount(existing.getExistingAmount());
        this.setDay(existing.getDay());
        this.setMonth(existing.getMonth());
        this.setYear(existing.getYear());
        this.setProduct(existing.getProduct());
        this.setStation(existing.getStation());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getExistingAmount() {
        return existingAmount;
    }

    public void setExistingAmount(int existingAmount) {
        this.existingAmount = existingAmount;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
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

    public Station getStation() {
        return station;
    }

    public void setStation(Station station) {
        this.station = station;
    }

    @Override
    public String toString() {
        return "Existing{" +
                "id='" + id + '\'' +
                ", existingAmount=" + existingAmount +
                ", day=" + day +
                ", month=" + month +
                ", year=" + year +
                ", product=" + product +
                ", station=" + station +
                '}';
    }
}

