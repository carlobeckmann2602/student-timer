package com.github.philippvogel92.studenttimerbackend.statistic;

import com.github.philippvogel92.studenttimerbackend.learningSession.LearningSession;
import com.github.philippvogel92.studenttimerbackend.learningSession.LearningSessionRepository;
import com.github.philippvogel92.studenttimerbackend.module.Module;
import com.github.philippvogel92.studenttimerbackend.module.ModuleRepository;
import com.github.philippvogel92.studenttimerbackend.student.Student;
import com.github.philippvogel92.studenttimerbackend.student.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Component
public class StatisticService {

    private final ModuleRepository moduleRepository;
    private final LearningSessionRepository learningSessionRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public StatisticService(ModuleRepository moduleRepository, LearningSessionRepository learningSessionRepository,
                            StudentRepository studentRepository) {
        this.moduleRepository = moduleRepository;
        this.learningSessionRepository = learningSessionRepository;
        this.studentRepository = studentRepository;
    }

    public Statistic getStatistic(Long studentId) {
        Student student =
                studentRepository.findById(studentId).orElseThrow(() -> new ResponseStatusException(HttpStatus
                        .NOT_FOUND, "Student not found"));
        List<Module> modules = moduleRepository.findModulesByStudentOrderByName(student);

        HBarChart hBarChart = createHBarChart(student);
        StarChart starChart = createStarChart(modules);
        return new Statistic(hBarChart, starChart);
    }

    private StarChart createStarChart(List<Module> modules) {
        List<Star> stars = createStars(modules);
        String title = chooseStarChartTitle(stars);
        return new StarChart(title, stars);
    }

    private String chooseStarChartTitle(List<Star> stars) {
        Optional<Star> bestRatedStar = stars.stream().max(Comparator.comparingInt(Star::getValue));
        String message = "Du hast noch nicht genug Bewertungen abgegeben!";
        if (bestRatedStar.isPresent() && bestRatedStar.get().getValue() != 0) {
            message = String.format("Mit der Leistung von %s bist du am zufriedensten!", bestRatedStar.get().getName());
        }
        return message;
    }

    private List<Star> createStars(List<Module> modules) {
        List<Star> stars = new ArrayList<>();
        for (Module module : modules) {
            List<LearningSession> learningSessionsInModule = module.getLearningSessions();
            double totalRatingOfAllLearningSessionsInModule = 0.0;
            for (LearningSession learningSession : learningSessionsInModule) {
                totalRatingOfAllLearningSessionsInModule += (double) learningSession.getRating();
            }
            int totalRatingAverage =
                    (int) Math.round(totalRatingOfAllLearningSessionsInModule / learningSessionsInModule.size());
            stars.add(new Star(module.getName(), totalRatingAverage, module.getColorCode()));
        }
        return stars;
    }

    private HBarChart createHBarChart(Student student) {
        List<LearningSession> learningSessions =
                learningSessionRepository.findLearningSessionsByModule_StudentOrderByCreatedAtDesc(student);

        List<List<LearningSession>> learningSessionsPerWeek =
                extractLearningSessionsPerWeek(learningSessions);

        List<LearningSession> sessionsLastWeek = learningSessionsPerWeek.get(0);
        List<LearningSession> sessionsInWeekAfterLast = learningSessionsPerWeek.get(1);

        //if user has no sessions in the last 14 days
        if (sessionsLastWeek.isEmpty() && sessionsInWeekAfterLast.isEmpty()) {
            return null;
        }

        List<Double> totalLearningTimePerWeek = calculateTotalLearningTimePerWeek(learningSessionsPerWeek);
        double totalLearningTimeLastWeek = totalLearningTimePerWeek.get(0);
        double totalLearningTimeWeekAfterLast = totalLearningTimePerWeek.get(1);

        double xTotal = findTotal(totalLearningTimePerWeek);
        String title = chooseHBarTitle(totalLearningTimePerWeek);
        List<Bar> bars = createBars(totalLearningTimeLastWeek, totalLearningTimeWeekAfterLast);

        return new HBarChart(title, xTotal, bars);
    }

    private String chooseHBarTitle(List<Double> totalLearningTimePerWeek) {
        int performance = totalLearningTimePerWeek.get(0).compareTo(totalLearningTimePerWeek.get(1));
        String message;
        if (performance > 0) {
            message = "Die letzten 7 Tage lief das Lernen besser! Behalte deinen Fokus bei.";
        } else if (performance < 0) {
            message = "Du könntest mal wieder mehr lernen.";
        } else {
            message = "Weiter so!";
        }
        return message;

    }

    private Double findTotal(List<Double> totalLearningTimePerWeek) {
        return totalLearningTimePerWeek.stream().max(Comparator.naturalOrder()).orElseThrow(
                () -> new RuntimeException("totalLearningTimePerWeek list is empty")
        );

    }

    private List<Bar> createBars(double totalLearningTimeLastWeek, double totalLearningTimeWeekAfterLast) {
        List<Bar> bars = new ArrayList<>();
        bars.add(new Bar("Diese Woche (die letzten 7 Tage)", totalLearningTimeLastWeek, "Std."));
        bars.add(new Bar("Letzte Woche", totalLearningTimeWeekAfterLast, "Std."));

        return bars;
    }

    private List<Double> calculateTotalLearningTimePerWeek(List<List<LearningSession>> learningSessionsPerWeek) {
        List<Double> totalLearningTimePerWeek = new ArrayList<>();
        double totalLearningTimeInOneWeek = 0.0;
        double minutes = 60.0;
        for (List<LearningSession> learningSessionsInOneWeek : learningSessionsPerWeek) {
            for (LearningSession session : learningSessionsInOneWeek) {
                totalLearningTimeInOneWeek += session.getFocusDuration();
            }
            totalLearningTimePerWeek.add(totalLearningTimeInOneWeek / minutes);
            totalLearningTimeInOneWeek = 0.0;
        }
        return totalLearningTimePerWeek;
    }


    private List<List<LearningSession>> extractLearningSessionsPerWeek(List<LearningSession> learningSessions) {
        int numberOfWeeks = 2;
        List<LocalDateTime> timePeriods = getTimePeriods(numberOfWeeks);
        List<List<LearningSession>> learningSessionsPerWeek = new ArrayList<>();
        // counter provides that loop will not run from beginning
        int counter = 0;

        for (int week = 0; week < numberOfWeeks; week++) {
            learningSessionsPerWeek.add(new ArrayList<>());
            for (; counter < learningSessions.size(); counter++) {
                LocalDateTime learningSessionCreatedAt = learningSessions.get(counter).getCreatedAt();
                LocalDateTime startDate = timePeriods.get(week + 1);
                LocalDateTime endDate = timePeriods.get(week);
                if (learningSessionCreatedAt.isAfter(startDate) && learningSessionCreatedAt.isBefore(endDate)) {
                    learningSessionsPerWeek.get(week).add(learningSessions.get(counter));
                } else {
                    // learningsSessions are sorted desc so loop can break to optimize performance if learningSession
                    // is created later than the current week
                    break;
                }
            }
        }
        return learningSessionsPerWeek;
    }

    private List<LocalDateTime> getTimePeriods(int numberOfWeeks) {
        LocalDateTime timeRightNow = LocalDateTime.now();
        List<LocalDateTime> periods = new ArrayList<>(List.of(timeRightNow));
        for (long week = 0; week < numberOfWeeks; week++) {
            periods.add(timeRightNow.minusWeeks(week + 1));
        }
        return periods;
    }
}
