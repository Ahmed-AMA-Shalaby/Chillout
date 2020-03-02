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

    private int tankVolume;

    private boolean isHidden;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Product product;

    public Tank(){

    }

    public Tank(String id, int tankVolume, boolean isHidden, Product product) {
        this.id = id;
        this.tankVolume = tankVolume;
        this.isHidden = isHidden;
        this.product = product;
    }

    public Tank(Tank tank){
        this.setId(tank.getId());
        this.setTankVolume(tank.getTankVolume());
        this.setHidden(tank.isHidden());
        this.setProduct(tank.getProduct());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getTankVolume() {
        return tankVolume;
    }

    public void setTankVolume(int tankVolume) {
        this.tankVolume = tankVolume;
    }

    public boolean isHidden() {
        return isHidden;
    }

    public void setHidden(boolean hidden) {
        isHidden = hidden;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @Override
    public String toString() {
        return "Tank{" +
                "id='" + id + '\'' +
                ", tankVolume=" + tankVolume +
                ", isHidden=" + isHidden +
                ", product=" + product +
                '}';
    }
}

