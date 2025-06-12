import React, { useState, useEffect } from 'react';
import AddStudentForm from './AddStudentForm';
import DarkModeToggle from './DarkModeToggle';

function App() {
  const [students, setStudents] = useState([]);

  // Persist dark mode state
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const handleAddStudent = (student) => {
    setStudents([...students, student]);
  };

  const calculateAverage = (grades) => {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, g) => sum + g, 0);
    return (total / grades.length).toFixed(2);
  };

  const findHighest = (grades) => Math.max(...grades);
  const findLowest = (grades) => Math.min(...grades);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-100 dark:from-gray-900 dark:to-black p-6 text-gray-800 dark:text-white transition-all">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">🎓 Student Grade Tracker</h1>
          <DarkModeToggle />
        </header>

        <AddStudentForm onAddStudent={handleAddStudent} />

        <section>
          <h2 className="text-2xl font-semibold mb-4">📋 All Students Report</h2>
          {students.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No students added yet.</p>
          ) : (
            students.map((s, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 border dark:border-gray-700 shadow rounded-lg p-4 mb-4"
              >
                <p><strong>Name:</strong> {s.name}</p>
                <p><strong>Grades:</strong> {s.grades.join(', ')}</p>
                <p><strong>Average:</strong> {calculateAverage(s.grades)}</p>
                <p><strong>Highest:</strong> {findHighest(s.grades)}</p>
                <p><strong>Lowest:</strong> {findLowest(s.grades)}</p>
              </div>
            ))
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">📊 Overall Summary</h2>
          {students.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No student data available.</p>
          ) : (
            (() => {
              let allGrades = students.flatMap(s => s.grades);
              let overallAvg = allGrades.reduce((sum, g) => sum + g, 0) / allGrades.length;
              let highest = Math.max(...allGrades);
              let lowest = Math.min(...allGrades);

              return (
                <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 shadow rounded-lg p-4">
                  <p><strong>Overall Average Grade:</strong> {overallAvg.toFixed(2)}</p>
                  <p><strong>Highest Grade Overall:</strong> {highest}</p>
                  <p><strong>Lowest Grade Overall:</strong> {lowest}</p>
                </div>
              );
            })()
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
