package com.wataneya.chillout.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Transfers")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Transfer {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    private int transferredAmount;

    private int day;

    private int month;

    private int year;

    private boolean isHidden;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Station station;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Company company;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Warehouse warehouse;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Trip trip;

    public Transfer(){

    }

    public Transfer(String id, int transferredAmount, int day, int month, int year, boolean isHidden, Product product, Station station, Company company, Warehouse warehouse, Trip trip) {
        this.id = id;
        this.transferredAmount = transferredAmount;
        this.day = day;
        this.month = month;
        this.year = year;
        this.isHidden = isHidden;
        this.product = product;
        this.station = station;
        this.company = company;
        this.warehouse = warehouse;
        this.trip = trip;
    }

    public Transfer(Transfer transfer){
        this.setId(transfer.getId());
        this.setTransferredAmount(transfer.getTransferredAmount());
        this.setDay(transfer.getDay());
        this.setMonth(transfer.getMonth());
        this.setYear(transfer.getYear());
        this.setHidden(transfer.isHidden());
        this.setProduct(transfer.getProduct());
        this.setStation(transfer.getStation());
        this.setCompany(transfer.getCompany());
        this.setWarehouse(transfer.getWarehouse());
        this.setTrip(transfer.getTrip());
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

    public Station getStation() {
        return station;
    }

    public void setStation(Station station) {
        this.station = station;
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

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    @Override
    public String toString() {
        return "Transfer{" +
                "id='" + id + '\'' +
                ", transferredAmount=" + transferredAmount +
                ", day=" + day +
                ", month=" + month +
                ", year=" + year +
                ", isHidden=" + isHidden +
                ", product=" + product +
                ", station=" + station +
                ", company=" + company +
                ", warehouse=" + warehouse +
                ", trip=" + trip +
                '}';
    }
}

