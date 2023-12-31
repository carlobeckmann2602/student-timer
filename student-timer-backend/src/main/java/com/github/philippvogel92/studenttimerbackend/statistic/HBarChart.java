package com.github.philippvogel92.studenttimerbackend.statistic;

import org.springframework.stereotype.Component;

import java.util.List;

public class HBarChart extends Chart {
    private Double xTotal;
    private List<Bar> bars;

    public HBarChart(String title, Double xTotal, List<Bar> bars) {
        super("hBar", title);
        this.xTotal = xTotal;
        this.bars = bars;
    }

    public HBarChart() {
        super("hBar", "Es gibt noch nicht genug Daten für diese Statistik.");
    }

    public Double getXTotal() {
        return xTotal;
    }

    public void setXTotal(Double xTotal) {
        this.xTotal = xTotal;
    }

    public List<Bar> getBars() {
        return bars;
    }

    public void setBars(List<Bar> bars) {
        this.bars = bars;
    }
}
