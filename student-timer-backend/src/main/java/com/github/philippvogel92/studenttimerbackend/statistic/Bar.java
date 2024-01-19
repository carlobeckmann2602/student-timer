package com.github.philippvogel92.studenttimerbackend.statistic;

public class Bar {
    private final String name;
    private final Double value;
    private final String unit;

    public Bar(String name, Double value, String unit) {
        this.name = name;
        this.value = value;
        this.unit = unit;
    }

    public String getName() {
        return name;
    }

    public String getUnit() {
        return unit;
    }

    public Double getValue() {
        return value;
    }


}
