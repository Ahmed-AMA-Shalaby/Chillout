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
    private String sector;

    public Sector(){

    }

    public Sector(String id, String sector) {
        this.id = id;
        this.sector = sector;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    @Override
    public String toString() {
        return "sector{" +
                "id='" + id + '\'' +
                ", sector='" + sector + '\'' +
                '}';
    }
}

