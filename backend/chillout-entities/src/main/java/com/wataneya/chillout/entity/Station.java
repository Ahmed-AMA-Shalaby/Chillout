package com.wataneya.chillout.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Stations")
public class Station {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    @Column(unique = true)
    private int stationCode;

    @Column(unique = true)
    private String stationName;

    private String stationLocation;

    private boolean isHidden;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Agent agent;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Sector sector;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Set<Tank> tanks = new HashSet<>();

    public Station(){

    }

    public Station(String id, int stationCode, String stationName, String stationLocation, boolean isHidden, Agent agent, Sector sector, Set<Tank> tanks) {
        this.id = id;
        this.stationCode = stationCode;
        this.stationName = stationName;
        this.stationLocation = stationLocation;
        this.isHidden = isHidden;
        this.agent = agent;
        this.sector = sector;
        this.tanks = tanks;
    }

    public Station(Station station){
        this.setId(station.getId());
        this.setStationCode(station.getStationCode());
        this.setStationName(station.getStationName());
        this.setStationLocation(station.getStationLocation());
        this.setHidden(station.isHidden());
        this.setAgent(station.getAgent());
        this.setSector(station.getSector());
        this.setTanks(station.getTanks());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getStationCode() {
        return stationCode;
    }

    public void setStationCode(int stationCode) {
        this.stationCode = stationCode;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public String getStationLocation() {
        return stationLocation;
    }

    public void setStationLocation(String stationLocation) {
        this.stationLocation = stationLocation;
    }

    public boolean isHidden() {
        return isHidden;
    }

    public void setHidden(boolean hidden) {
        isHidden = hidden;
    }

    public Agent getAgent() {
        return agent;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
    }

    public Sector getSector() {
        return sector;
    }

    public void setSector(Sector sector) {
        this.sector = sector;
    }

    public Set<Tank> getTanks() {
        return tanks;
    }

    public void setTanks(Set<Tank> tanks) {
        this.tanks = tanks;
    }

    @Override
    public String toString() {
        return "Station{" +
                "id='" + id + '\'' +
                ", stationCode=" + stationCode +
                ", stationName='" + stationName + '\'' +
                ", stationLocation='" + stationLocation + '\'' +
                ", isHidden=" + isHidden +
                ", agent=" + agent +
                ", sector=" + sector +
                ", tanks=" + tanks +
                '}';
    }
}

