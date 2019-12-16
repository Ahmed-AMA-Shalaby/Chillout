package com.wataneya.chillout.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Vehicles")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Vehicle {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    @Column(unique = true)
    private String vehicleCode;

    @Column(unique = true)
    private String vehiclePlate;

    @Column(unique = true)
    private String vehicleCard;

    @Column(unique = true)
    private String trailerPlate;

    private boolean isHidden;

    public Vehicle(){

    }

    public Vehicle(String id, String vehicleCode, String vehiclePlate, String vehicleCard, String trailerPlate, boolean isHidden) {
        this.id = id;
        this.vehicleCode = vehicleCode;
        this.vehiclePlate = vehiclePlate;
        this.vehicleCard = vehicleCard;
        this.trailerPlate = trailerPlate;
        this.isHidden = isHidden;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getVehicleCode() {
        return vehicleCode;
    }

    public void setVehicleCode(String vehicleCode) {
        this.vehicleCode = vehicleCode;
    }

    public String getVehiclePlate() {
        return vehiclePlate;
    }

    public void setVehiclePlate(String vehiclePlate) {
        this.vehiclePlate = vehiclePlate;
    }

    public String getVehicleCard() {
        return vehicleCard;
    }

    public void setVehicleCard(String vehicleCard) {
        this.vehicleCard = vehicleCard;
    }

    public String getTrailerPlate() {
        return trailerPlate;
    }

    public void setTrailerPlate(String trailerPlate) {
        this.trailerPlate = trailerPlate;
    }

    public boolean isHidden() {
        return isHidden;
    }

    public void setHidden(boolean hidden) {
        isHidden = hidden;
    }
}

