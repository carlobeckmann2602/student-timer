package com.github.philippvogel92.studenttimerbackend.statistic;


public abstract class Chart {
    private final String type;
    private final String title;

    public Chart(String type, String title) {
        this.type = type;
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public String getTitle() {
        return title;
    }

}

