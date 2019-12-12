package com.wataneya.chillout.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Withdrawals")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Withdrawal {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    @Column(unique = true)
    private int withdrawalAmount;

    public Withdrawal(){

    }

    public Withdrawal(String id, int withdrawalAmount) {
        this.id = id;
        this.withdrawalAmount = withdrawalAmount;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getWithdrawalAmount() {
        return withdrawalAmount;
    }

    public void setWithdrawalAmount(int withdrawalAmount) {
        this.withdrawalAmount = withdrawalAmount;
    }

    @Override
    public String toString() {
        return "Withdrawal{" +
                "id='" + id + '\'' +
                ", withdrawalAmount='" + withdrawalAmount + '\'' +
                '}';
    }
}

