package com.github.philippvogel92.studenttimerbackend.statistic;

public class Star {
    private final String name;
    private final int value;
    private final String color;

    public Star(String name, int value, String color) {
        this.name = name;
        this.value = value;
        this.color = color;
    }

    public String getName() {
        return name;
    }

    public int getValue() {
        return value;
    }

    public String getColor() {
        return color;
    }

}
