package com.github.philippvogel92.studenttimerbackend.statistic;

public class Bar {
    private String name;
    private Double value;
    private String unit;
    private Boolean average;

    public Bar(String name, Double value, String color, String unit, Boolean average) {
        this.name = name;
        this.value = value;
        this.unit = unit;
        this.average = average;
    }

    public Bar(String name, Double value, String unit) {
        this.name = name;
        this.value = value;
        this.unit = unit;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Boolean getAverage() {
        return average;
    }

    public void setAverage(Boolean average) {
        this.average = average;
    }
}
