package com.wataneya.chillout.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Distances")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Distance {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    private int distance;

    private boolean isHidden;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Warehouse warehouse;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Station station;

    public Distance(){

    }

    public Distance(String id, int distance, boolean isHidden, Warehouse warehouse, Station station) {
        this.id = id;
        this.distance = distance;
        this.isHidden = isHidden;
        this.warehouse = warehouse;
        this.station = station;
    }

    public Distance(Distance distance){
        this.setId(distance.getId());
        this.setDistance(distance.getDistance());
        this.setHidden(distance.isHidden());
        this.setWarehouse(distance.getWarehouse());
        this.setStation(distance.getStation());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getDistance() {
        return distance;
    }

    public void setDistance(int distance) {
        this.distance = distance;
    }

    public boolean isHidden() {
        return isHidden;
    }

    public void setHidden(boolean hidden) {
        isHidden = hidden;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    public Station getStation() {
        return station;
    }

    public void setStation(Station station) {
        this.station = station;
    }

    @Override
    public String toString() {
        return "Distance{" +
                "id='" + id + '\'' +
                ", distance=" + distance +
                ", isHidden=" + isHidden +
                ", warehouse=" + warehouse +
                ", station=" + station +
                '}';
    }
}

