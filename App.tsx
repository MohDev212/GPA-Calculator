import React from 'react';
import { useState, useMemo, useCallback } from 'react';
import GpaDisplay from './components/GpaDisplay';
import CourseRow from './components/CourseRow';
import { COURSES, getGradeFromScore } from './constants';

const App: React.FC = () => {
  const [grades, setGrades] = useState<Record<string, string>>(() => {
    const initialState: Record<string, string> = {};
    COURSES.forEach(course => {
      initialState[course.code] = '';
    });
    return initialState;
  });

  const handleGradeChange = useCallback((courseCode: string, score: string) => {
    // Allow any string input; validation happens during calculation.
    setGrades(prevGrades => ({
      ...prevGrades,
      [courseCode]: score,
    }));
  }, []);

  const gpaData = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;

    for (const course of COURSES) {
      const score = grades[course.code];
      const gradeInfo = getGradeFromScore(score);
      
      if (gradeInfo.points >= 0) {
        totalPoints += gradeInfo.points * course.creditHours;
        totalCredits += course.creditHours;
      }
    }

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    
    return { gpa, totalCredits, totalPoints };
  }, [grades]);

  const resetCalculator = () => {
     const initialState: Record<string, string> = {};
    COURSES.forEach(course => {
      initialState[course.code] = '';
    });
    setGrades(initialState);
  }

  return (
    <div className="min-h-screen font-sans text-slate-800">
      <header className="p-4 text-center">
        <div className="inline-flex items-center gap-3">
          <div className="p-2 bg-green-700 text-white font-bold text-2xl rounded-md">GU</div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">GALALA UNIVERSITY</h1>
            <p className="text-xs sm:text-sm text-slate-500">Powered by Arizona State University</p>
          </div>
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-indigo-700">Semester GPA Calculator</h2>
        <p className="text-slate-600 mt-1">Field of Dentistry / Year 1 / Semester 1</p>
      </header>

      <main>
        <GpaDisplay gpa={gpaData.gpa} totalCredits={gpaData.totalCredits} totalPoints={gpaData.totalPoints} />

        <div className="px-4 pb-12">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-500">
                <thead className="text-xs text-slate-700 uppercase bg-slate-200">
                  <tr>
                    <th scope="col" className="p-4">
                      Course Name
                    </th>
                    <th scope="col" className="p-4 text-center">
                      Credit Hours
                    </th>
                    <th scope="col" className="p-4">
                      Score / Grade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COURSES.map((course) => (
                    <CourseRow
                      key={course.code}
                      course={course}
                      selectedScore={grades[course.code]}
                      letterGrade={getGradeFromScore(grades[course.code]).letter}
                      onGradeChange={handleGradeChange}
                    />
                  ))}
                </tbody>
              </table>
            </div>
             <div className="p-4 bg-slate-50 text-right">
              <button
                onClick={resetCalculator}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
