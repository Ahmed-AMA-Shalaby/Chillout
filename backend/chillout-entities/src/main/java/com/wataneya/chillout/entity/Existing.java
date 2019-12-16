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

    private int existingAmount;

    private int day;

    private int month;

    private int year;

    private boolean isHidden;

    public Existing(){

    }

    public Existing(String id, int existingAmount, int day, int month, int year, boolean isHidden) {
        this.id = id;
        this.existingAmount = existingAmount;
        this.day = day;
        this.month = month;
        this.year = year;
        this.isHidden = isHidden;
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
}

