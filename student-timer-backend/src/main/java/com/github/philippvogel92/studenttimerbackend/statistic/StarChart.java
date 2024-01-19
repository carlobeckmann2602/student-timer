package com.github.philippvogel92.studenttimerbackend.statistic;

import java.util.List;

public class StarChart extends Chart {
    List<Star> stars;

    public StarChart(String title, List<Star> stars) {
        super("stars", title);
        this.stars = stars;
    }

    public List<Star> getStars() {
        return stars;
    }

}
