import React from 'react';

const ClassroomView = () => {
  const lessons = ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4'];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Classroom View</h1>
      <p className="text-gray-700 mb-6">Welcome to the Classroom View page!</p>

      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <button
            key={index}
            className="w-3/4 text-left bg-black hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
            onClick={() => console.log(`${lesson} clicked`)}
          >
            {lesson}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClassroomView;
