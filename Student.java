import java.util.ArrayList;
import java.util.Collections;

public class Student {
    private String name;
    private ArrayList<Integer> grades;

    public Student(String name) {
        this.name = name;
        this.grades = new ArrayList<>();
    }

    public void addGrade(int grade) {
        grades.add(grade);
    }

    public double getAverage() {
        if (grades.isEmpty())
            return 0;
        int sum = 0;
        for (int g : grades)
            sum += g;
        return (double) sum / grades.size();
    }

    public int getHighest() {
        return grades.isEmpty() ? 0 : Collections.max(grades);
    }

    public int getLowest() {
        return grades.isEmpty() ? 0 : Collections.min(grades);
    }

    public String getName() {
        return name;
    }

    public ArrayList<Integer> getGrades() {
        return grades;
    }
}
