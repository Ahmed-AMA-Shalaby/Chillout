package com.wataneya.chillout.entity;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Trips")
public class Trip {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    private int day;

    private int month;

    private int year;

    private int order;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Distance outboundDistance;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Distance inboundDistance;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Driver driver;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Vehicle vehicle;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Set<Transfer> transfers;

    public Trip(){

    }

    public Trip(String id, int day, int month, int year, int order, Distance outboundDistance, Distance inboundDistance, Driver driver, Vehicle vehicle, Set<Transfer> transfers) {
        this.id = id;
        this.day = day;
        this.month = month;
        this.year = year;
        this.order = order;
        this.outboundDistance = outboundDistance;
        this.inboundDistance = inboundDistance;
        this.driver = driver;
        this.vehicle = vehicle;
        this.transfers = transfers;
    }

    public Trip(Trip trip){
        this.setId(trip.getId());
        this.setDay(trip.getDay());
        this.setMonth(trip.getMonth());
        this.setYear(trip.getYear());
        this.setOrder(trip.getOrder());
        this.setOutboundDistance(trip.getOutboundDistance());
        this.setInboundDistance(trip.getInboundDistance());
        this.setDriver(trip.getDriver());
        this.setVehicle(trip.getVehicle());
        this.setTransfers(trip.getTransfers());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public Distance getOutboundDistance() {
        return outboundDistance;
    }

    public void setOutboundDistance(Distance outboundDistance) {
        this.outboundDistance = outboundDistance;
    }

    public Distance getInboundDistance() {
        return inboundDistance;
    }

    public void setInboundDistance(Distance inboundDistance) {
        this.inboundDistance = inboundDistance;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public Set<Transfer> getTransfers() {
        return transfers;
    }

    public void setTransfers(Set<Transfer> transfers) {
        this.transfers = transfers;
    }

    @Override
    public String toString() {
        return "Trip{" +
                "id='" + id + '\'' +
                ", day=" + day +
                ", month=" + month +
                ", year=" + year +
                ", order=" + order +
                ", outboundDistance=" + outboundDistance +
                ", inboundDistance=" + inboundDistance +
                ", driver=" + driver +
                ", vehicle=" + vehicle +
                ", transfers=" + transfers +
                '}';
    }
}