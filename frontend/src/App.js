import React, { useState } from 'react';
import AddStudentForm from './AddStudentForm';

function App() {
  const [students, setStudents] = useState([]);

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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
        🎓 <span>Student Grade Tracker</span>
      </h1>

      <AddStudentForm onAddStudent={handleAddStudent} />

      <h2 className="text-2xl font-semibold mt-8 mb-4">All Students Report</h2>
      {students.length === 0 ? (
        <p className="text-gray-600">No students added yet.</p>
      ) : (
        students.map((s, index) => (
          <div
            key={index}
            className="mb-6 border p-4 rounded-lg shadow-sm bg-gray-50"
          >
            <p><strong>Name:</strong> {s.name}</p>
            <p><strong>Grades:</strong> {s.grades.join(', ')}</p>
            <p><strong>Average:</strong> {calculateAverage(s.grades)}</p>
            <p><strong>Highest:</strong> {findHighest(s.grades)}</p>
            <p><strong>Lowest:</strong> {findLowest(s.grades)}</p>
          </div>
        ))
      )}

      <h2 className="text-2xl font-semibold mt-10 mb-4">Overall Summary</h2>
      {students.length === 0 ? (
        <p className="text-gray-600">No student data available.</p>
      ) : (() => {
        let allGrades = students.flatMap((s) => s.grades);
        let overallAvg =
          allGrades.reduce((sum, g) => sum + g, 0) / allGrades.length;
        let highest = Math.max(...allGrades);
        let lowest = Math.min(...allGrades);

        return (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p><strong>Overall Average Grade:</strong> {overallAvg.toFixed(2)}</p>
            <p><strong>Highest Grade Overall:</strong> {highest}</p>
            <p><strong>Lowest Grade Overall:</strong> {lowest}</p>
          </div>
        );
      })()}
    </div>
  );
}

export default App;
