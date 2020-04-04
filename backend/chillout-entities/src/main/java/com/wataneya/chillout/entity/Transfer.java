package com.wataneya.chillout.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Transfers")
public class Transfer {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    private int transferredAmount;

    private int day;

    private int month;

    private int year;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Station station;

    public Transfer(){

    }

    public Transfer(String id, int transferredAmount, int day, int month, int year, Product product, Station station) {
        this.id = id;
        this.transferredAmount = transferredAmount;
        this.day = day;
        this.month = month;
        this.year = year;
        this.product = product;
        this.station = station;
    }

    public Transfer(Transfer transfer){
        this.setId(transfer.getId());
        this.setTransferredAmount(transfer.getTransferredAmount());
        this.setDay(transfer.getDay());
        this.setMonth(transfer.getMonth());
        this.setYear(transfer.getYear());
        this.setProduct(transfer.getProduct());
        this.setStation(transfer.getStation());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getTransferredAmount() {
        return transferredAmount;
    }

    public void setTransferredAmount(int transferredAmount) {
        this.transferredAmount = transferredAmount;
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
        return "Transfer{" +
                "id='" + id + '\'' +
                ", transferredAmount=" + transferredAmount +
                ", day=" + day +
                ", month=" + month +
                ", year=" + year +
                ", product=" + product +
                ", station=" + station +
                '}';
    }
}

