import React, { useState } from 'react';

function AddStudentForm({ onAddStudent }) {
  const [name, setName] = useState('');
  const [grades, setGrades] = useState(['']); // start with one grade input

  const handleGradeChange = (index, value) => {
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);
  };

  const handleAddGradeInput = () => {
    setGrades([...grades, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericGrades = grades.map(g => parseInt(g)).filter(g => !isNaN(g));
    if (name.trim() && numericGrades.length > 0) {
      onAddStudent({ name, grades: numericGrades });
      setName('');
      setGrades(['']);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Student</h2>

      <input
        type="text"
        placeholder="Student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {grades.map((grade, index) => (
        <input
          key={index}
          type="number"
          placeholder={`Grade #${index + 1}`}
          value={grade}
          onChange={(e) => handleGradeChange(index, e.target.value)}
          className="border p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      ))}

      <div className="flex flex-wrap gap-4 mt-4">
        <button
          type="button"
          onClick={handleAddGradeInput}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          ➕ Add another grade
        </button>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          ✅ Submit
        </button>
      </div>
    </form>
  );
}

export default AddStudentForm;
