package com.wataneya.chillout.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Existings")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Existing {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    @Column(unique = true)
    private int existingAmount;

    public Existing(){

    }

    public Existing(String id, int existingAmount) {
        this.id = id;
        this.existingAmount = existingAmount;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getExistingAmount() {
        return existingAmount;
    }

    public void setExistingAmount(int existingAmount) {
        this.existingAmount = existingAmount;
    }

    @Override
    public String toString() {
        return "Existing{" +
                "id='" + id + '\'' +
                ", existingAmount='" + existingAmount + '\'' +
                '}';
    }
}

