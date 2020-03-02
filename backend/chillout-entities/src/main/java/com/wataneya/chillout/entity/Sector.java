package com.wataneya.chillout.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Sectors")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Sector {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    @Column(unique = true)
    private String sectorName;

    private boolean isHidden;

    public Sector(){

    }

    public Sector(String id, String sectorName, boolean isHidden) {
        this.id = id;
        this.sectorName = sectorName;
        this.isHidden = isHidden;
    }

    public Sector(Sector sector){
        this.setId(sector.getId());
        this.setSectorName(sector.getSectorName());
        this.setHidden(sector.isHidden());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSectorName() {
        return sectorName;
    }

    public void setSectorName(String sectorName) {
        this.sectorName = sectorName;
    }

    public boolean isHidden() {
        return isHidden;
    }

    public void setHidden(boolean hidden) {
        isHidden = hidden;
    }

    @Override
    public String toString() {
        return "Sector{" +
                "id='" + id + '\'' +
                ", sectorName='" + sectorName + '\'' +
                ", isHidden=" + isHidden +
                '}';
    }
}

