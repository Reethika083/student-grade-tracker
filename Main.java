import java.util.ArrayList;
import java.util.Scanner;
import java.io.*;

public class Main {
    static Scanner scanner = new Scanner(System.in);
    static ArrayList<Student> students = new ArrayList<>();

    public static void main(String[] args) {
        int choice;

        do {
            System.out.println("\n=== Student Grade Tracker ===");
            System.out.println("1. Add Student & Grades");
            System.out.println("2. View All Students Report");
            System.out.println("3. View Overall Summary");
            System.out.println("4. Save All Students to File");
            System.out.println("5. Load Students from File");
            System.out.println("6. Exit");
            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();
            scanner.nextLine(); // consume leftover newline

            switch (choice) {
                case 1:
                    addStudent();
                    break;
                case 2:
                    displayAllStudents();
                    break;
                case 3:
                    displayOverallSummary();
                    break;
                case 4:
                    saveToFile();
                    break;
                case 5:
                    loadFromFile();
                    break;
                case 6:
                    System.out.println("Exiting... Bye babe!");
                    break;
                default:
                    System.out.println("Invalid choice, try again.");
            }
        } while (choice != 6);
    }

    static void addStudent() {
        System.out.print("Enter student name: ");
        String name = scanner.nextLine();
        Student student = new Student(name);

        System.out.print("Enter number of grades: ");
        int n = scanner.nextInt();

        for (int i = 0; i < n; i++) {
            System.out.print("Enter grade #" + (i + 1) + ": ");
            int grade = scanner.nextInt();
            student.addGrade(grade);
        }

        students.add(student);
        System.out.println("Student '" + name + "' added successfully!");
    }

    static void displayAllStudents() {
        if (students.isEmpty()) {
            System.out.println("No students added yet.");
            return;
        }

        System.out.println("\n--- All Students Report ---");
        for (Student s : students) {
            System.out.println("Name: " + s.getName());
            System.out.println("Grades: " + s.getGrades());
            System.out.printf("Average: %.2f\n", s.getAverage());
            System.out.println("Highest: " + s.getHighest());
            System.out.println("Lowest: " + s.getLowest());
            System.out.println("---------------------------");
        }
    }

    static void displayOverallSummary() {
        if (students.isEmpty()) {
            System.out.println("No student data available.");
            return;
        }

        int totalGrades = 0;
        int gradeSum = 0;
        int highest = Integer.MIN_VALUE;
        int lowest = Integer.MAX_VALUE;

        for (Student s : students) {
            for (int g : s.getGrades()) {
                gradeSum += g;
                totalGrades++;
                if (g > highest)
                    highest = g;
                if (g < lowest)
                    lowest = g;
            }
        }

        double overallAvg = (totalGrades == 0) ? 0 : (double) gradeSum / totalGrades;

        System.out.println("\n--- Overall Summary ---");
        System.out.printf("Overall Average Grade: %.2f\n", overallAvg);
        System.out.println("Highest Grade Overall: " + highest);
        System.out.println("Lowest Grade Overall: " + lowest);
        System.out.println("------------------------");
    }

    static void saveToFile() {
        if (students.isEmpty()) {
            System.out.println("No student data to save.");
            return;
        }

        try (FileWriter writer = new FileWriter("students.txt")) {
            for (Student s : students) {
                writer.write(s.getName() + "," + s.getGrades().toString().replaceAll("[\\[\\] ]", "") + "\n");
            }
            System.out.println("✅ Student data saved to students.txt");
        } catch (IOException e) {
            System.out.println("❌ Error saving to file: " + e.getMessage());
        }
    }

    static void loadFromFile() {
        File file = new File("students.txt");
        if (!file.exists()) {
            System.out.println("❌ File not found. Save some data first.");
            return;
        }

        students.clear(); // clear old data

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",", 2);
                if (parts.length == 2) {
                    String name = parts[0];
                    String[] gradeStrings = parts[1].split(",");
                    Student student = new Student(name);
                    for (String gs : gradeStrings) {
                        student.addGrade(Integer.parseInt(gs));
                    }
                    students.add(student);
                }
            }
            System.out.println("✅ Student data loaded from students.txt");
        } catch (IOException | NumberFormatException e) {
            System.out.println("❌ Error loading from file: " + e.getMessage());
        }
    }
}
