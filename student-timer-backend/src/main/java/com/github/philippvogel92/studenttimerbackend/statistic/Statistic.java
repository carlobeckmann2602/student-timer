package com.github.philippvogel92.studenttimerbackend.statistic;


public class Statistic {
    private HBarChart hBarChart;
    private StarChart starChart;

    public Statistic(HBarChart hBarChart, StarChart starChart) {
        this.hBarChart = hBarChart;
        this.starChart = starChart;
    }

    public HBarChart gethBarChart() {
        return hBarChart;
    }

    public void sethBarChart(HBarChart hBarChart) {
        this.hBarChart = hBarChart;
    }

    public StarChart getStarChart() {
        return starChart;
    }

    public void setStarChart(StarChart starChart) {
        this.starChart = starChart;
    }
}
