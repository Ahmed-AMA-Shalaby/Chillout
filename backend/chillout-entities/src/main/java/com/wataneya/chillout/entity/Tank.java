package com.wataneya.chillout.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Tanks")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Tank {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    @Column(unique = true)
    private int tankVolume;

    public Tank(){

    }

    public Tank(String id, int tankVolume) {
        this.id = id;
        this.tankVolume = tankVolume;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getTank() {
        return tankVolume;
    }

    public void setTank(int tankVolume) {
        this.tankVolume = tankVolume;
    }

    @Override
    public String toString() {
        return "Tank{" +
                "id='" + id + '\'' +
                ", tank='" + tankVolume + '\'' +
                '}';
    }
}

