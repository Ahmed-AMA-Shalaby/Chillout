package com.wataneya.chillout.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Importations")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Importation {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    @Column(unique = true)
    private int importedAmount;

    public Importation(){

    }

    public Importation(String id, int importedAmount) {
        this.id = id;
        this.importedAmount = importedAmount;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getImportedAmount() {
        return importedAmount;
    }

    public void setImportedAmount(int importedAmount) {
        this.importedAmount = importedAmount;
    }

    @Override
    public String toString() {
        return "Importation{" +
                "id='" + id + '\'' +
                ", importedAmount='" + importedAmount + '\'' +
                '}';
    }
}

