import React, { useState } from 'react';

function AddStudentForm({ onAddStudent }) {
  const [name, setName] = useState('');
  const [grades, setGrades] = useState(['']);

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
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 mb-8"
    >
      <h2 className="text-xl font-bold mb-4">➕ Add Student</h2>

      <input
        type="text"
        placeholder="Student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      {grades.map((grade, index) => (
        <input
          key={index}
          type="number"
          placeholder={`Grade #${index + 1}`}
          value={grade}
          onChange={(e) => handleGradeChange(index, e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
        />
      ))}

      <div className="flex items-center space-x-4 mt-4">
        <button
          type="button"
          onClick={handleAddGradeInput}
          className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold px-4 py-2 rounded transition-all duration-300"
        >
          ➕ Add another grade
        </button>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded transition-all duration-300"
        >
          ✅ Submit
        </button>
      </div>
    </form>
  );
}

export default AddStudentForm;
