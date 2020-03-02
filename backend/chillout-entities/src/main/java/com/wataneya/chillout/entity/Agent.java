package com.wataneya.chillout.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@GenericGenerator(name = "uuid", strategy = "uuid2")
@Table(name = "Agents")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Agent {

    @Id
    @GeneratedValue(generator = "uuid")
    private String id;

    @Column(unique = true)
    private String agentName;

    private boolean isHidden;

    public Agent(){

    }

    public Agent(String id, String agentName, boolean isHidden) {
        this.id = id;
        this.agentName = agentName;
        this.isHidden = isHidden;
    }

    public Agent(Agent agent){
        this.setId(agent.getId());
        this.setAgentName(agent.getAgentName());
        this.setHidden(agent.isHidden());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAgentName() {
        return agentName;
    }

    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }

    public boolean isHidden() {
        return isHidden;
    }

    public void setHidden(boolean hidden) {
        isHidden = hidden;
    }

    @Override
    public String toString() {
        return "Agent{" +
                "id='" + id + '\'' +
                ", agentName='" + agentName + '\'' +
                ", isHidden=" + isHidden +
                '}';
    }
}

