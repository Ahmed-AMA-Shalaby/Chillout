package com.wataneya.chillout.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Distances", uniqueConstraints = {@UniqueConstraint(columnNames = {"warehouse_id", "station_id"})})
public class Distance {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    private int distance;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "station_id")
    private Station station;

    public Distance() {

    }

    public Distance(String id, int distance, Warehouse warehouse, Station station) {
        this.id = id;
        this.distance = distance;
        this.warehouse = warehouse;
        this.station = station;
    }

    public Distance(Distance distance) {
        this.setId(distance.getId());
        this.setDistance(distance.getDistance());
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
                ", warehouse=" + warehouse +
                ", station=" + station +
                '}';
    }
}