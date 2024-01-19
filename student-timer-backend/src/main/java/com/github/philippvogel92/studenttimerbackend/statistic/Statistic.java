package com.github.philippvogel92.studenttimerbackend.statistic;


public class Statistic {
    private final HBarChart hBarChart;
    private final StarChart starChart;

    public Statistic(HBarChart hBarChart, StarChart starChart) {
        this.hBarChart = hBarChart;
        this.starChart = starChart;
    }

    public HBarChart gethBarChart() {
        return hBarChart;
    }

    public StarChart getStarChart() {
        return starChart;
    }

}
