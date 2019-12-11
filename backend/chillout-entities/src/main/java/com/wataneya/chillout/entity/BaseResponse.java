package com.wataneya.chillout.entity;


import com.fasterxml.jackson.annotation.JsonRootName;

@JsonRootName(value = "status")
public class BaseResponse {

    private boolean error;
    private String message;

    public BaseResponse(boolean error , String message){
        this.error = error;
        this.message = message;
    }

    public boolean isError() {
        return error;
    }

    public void setError(boolean error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
