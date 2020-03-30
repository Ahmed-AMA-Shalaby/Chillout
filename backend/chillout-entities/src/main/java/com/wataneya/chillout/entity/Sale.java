package com.wataneya.chillout.entity;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Sales")
public class Sale {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    private int saleAmount;

    private int day;

    private int month;

    private int year;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Station station;

    public Sale(){

    }

    public Sale(String id, int saleAmount, int day, int month, int year, Product product, Station station) {
        this.id = id;
        this.saleAmount = saleAmount;
        this.day = day;
        this.month = month;
        this.year = year;
        this.product = product;
        this.station = station;
    }

    public Sale(Sale sale){
        this.setId(sale.getId());
        this.setSaleAmount(sale.getSaleAmount());
        this.setDay(sale.getDay());
        this.setMonth(sale.getMonth());
        this.setYear(sale.getYear());
        this.setProduct(sale.getProduct());
        this.setStation(sale.getStation());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getSaleAmount() {
        return saleAmount;
    }

    public void setSaleAmount(int saleAmount) {
        this.saleAmount = saleAmount;
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
        return "Sale{" +
                "id='" + id + '\'' +
                ", saleAmount=" + saleAmount +
                ", day=" + day +
                ", month=" + month +
                ", year=" + year +
                ", product=" + product +
                ", station=" + station +
                '}';
    }
}

