package com.github.philippvogel92.studenttimerbackend.statistic;

import java.util.List;

public class HBarChart extends Chart {
    private final Double xTotal;
    private final List<Bar> bars;

    public HBarChart(String title, Double xTotal, List<Bar> bars) {
        super("hBar", title);
        this.xTotal = xTotal;
        this.bars = bars;
    }

    public Double getXTotal() {
        return xTotal;
    }

    public List<Bar> getBars() {
        return bars;
    }

}
