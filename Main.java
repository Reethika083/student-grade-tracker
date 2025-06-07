import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    static Scanner scanner = new Scanner(System.in);
    static ArrayList<Student> students = new ArrayList<>();

    public static void main(String[] args) {
        int choice;

        do {
            System.out.println("\n=== Student Grade Tracker ===");
            System.out.println("1. Add Student & Grades");
            System.out.println("2. View All Students Report");
            System.out.println("3. Exit");
            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();
            scanner.nextLine(); // consume leftover newline

            switch (choice) {
                case 1:
                    addStudent();
                    break;
                case 2:
                    displayAllStudents(); // New method we added in Step 3
                    break;
                case 3:
                    System.out.println("Exiting... Bye babe!");
                    break;
                default:
                    System.out.println("Invalid choice, try again.");
            }
        } while (choice != 3);
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
}
