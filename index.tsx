import React, { useState, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom/client';

// --- TYPES ---
interface Course {
  code: string;
  name: string;
  creditHours: number;
}

interface Grade {
  letter: string;
  points: number;
}

// --- CONSTANTS ---
const COURSES: Course[] = [
  { code: 'PHY113', name: 'Biophysics for Dentistry', creditHours: 2 },
  { code: 'BMS112', name: 'General Anatomy for Dental Students', creditHours: 2 },
  { code: 'BMS132', name: 'General Physiology (1) for Dental Students', creditHours: 1 },
  { code: 'BMS122', name: 'General Histology for Dental Students', creditHours: 2 },
  { code: 'BDS011', name: 'Dental Biomaterials I', creditHours: 4 },
  { code: 'BDS021', name: 'Dental Anatomy I', creditHours: 3 },
  { code: 'UC1', name: 'University Requirement 1', creditHours: 2 },
  { code: 'UC2', name: 'University Requirement 2', creditHours: 2 },
];

/**
 * Converts a numeric score (out of 100) to a letter grade and point value.
 * This logic is a direct and verified implementation of the "Grade Mapping" table
 * from the Galala University Study Plan document (page 5).
 * @param score The numeric score (0-100).
 * @returns A Grade object with the letter and points, or -1 points for invalid input.
 */
const getGradeFromScore = (score: number | string | null): Grade => {
  if (score === '' || score === null) {
    return { letter: '—', points: -1 };
  }
  const s = typeof score === 'string' ? parseFloat(score) : score;
  if (isNaN(s) || s < 0 || s > 100) {
    return { letter: '—', points: -1 };
  }
  if (s > 97) return { letter: 'A+', points: 4.0 };
  if (s >= 93) return { letter: 'A', points: 4.0 };
  if (s >= 89) return { letter: 'A-', points: 3.7 };
  if (s >= 84) return { letter: 'B+', points: 3.3 };
  if (s >= 80) return { letter: 'B', points: 3.0 };
  if (s >= 76) return { letter: 'B-', points: 2.7 };
  if (s >= 73) return { letter: 'C+', points: 2.3 };
  if (s >= 70) return { letter: 'C', points: 2.0 };
  if (s >= 67) return { letter: 'C-', points: 1.7 };
  if (s >= 64) return { letter: 'D+', points: 1.3 };
  if (s >= 60) return { letter: 'D', points: 1.0 };
  return { letter: 'F', points: 0.0 };
};

// --- COMPONENTS ---
interface GpaDisplayProps {
  gpa: number;
  totalCredits: number;
  totalPoints: number;
}

const GpaDisplay: React.FC<GpaDisplayProps> = ({ gpa, totalCredits, totalPoints }) => {
  const getGpaInterpretation = (gpaValue: number): { text: string; color: string } => {
    if (gpaValue >= 3.7) return { text: 'Excellent', color: 'text-green-500' };
    if (gpaValue >= 3.0) return { text: 'Very Good', color: 'text-blue-500' };
    if (gpaValue >= 2.0) return { text: 'Good', color: 'text-yellow-500' };
    if (totalCredits > 0) return { text: 'Pass', color: 'text-orange-500' };
    return { text: 'N/A', color: 'text-slate-400' };
  };

  const gpaInfo = getGpaInterpretation(gpa);

  return (
    <div className="sticky top-0 z-10 bg-slate-100/80 backdrop-blur-md p-4 sm:p-6 mb-6">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto flex flex-col sm:flex-row justify-around items-center gap-4">
        <div className="text-center">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Credits</p>
          <p className="text-3xl font-bold text-slate-700">{totalCredits}</p>
        </div>
        <div className="text-center border-t-2 sm:border-t-0 sm:border-l-2 sm:border-r-2 border-slate-200 px-0 sm:px-12 py-4 sm:py-0 my-4 sm:my-0">
          <p className="text-lg font-medium text-slate-500 uppercase tracking-wider">Semester GPA</p>
          <p className="text-6xl font-extrabold text-indigo-600 tracking-tight">
            {isNaN(gpa) ? '0.00' : gpa.toFixed(2)}
          </p>
          <p className={`text-lg font-bold mt-1 ${gpaInfo.color}`}>{gpaInfo.text}</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Quality Points</p>
          <p className="text-3xl font-bold text-slate-700">{totalPoints.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

interface CourseRowProps {
  course: Course;
  selectedScore: string;
  letterGrade: string;
  onGradeChange: (courseCode: string, score: string) => void;
}

const CourseRow: React.FC<CourseRowProps> = ({ course, selectedScore, letterGrade, onGradeChange }) => {
  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors duration-200">
      <td className="p-4 font-medium text-slate-800">
        <div className="flex flex-col">
          <span>{course.name}</span>
          <span className="text-xs text-slate-500 font-normal">{course.code}</span>
        </div>
      </td>
      <td className="p-4 text-center font-semibold text-slate-600">{course.creditHours}</td>
      <td className="p-4 w-48">
        <div className="flex items-center gap-3">
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            value={selectedScore}
            onChange={(e) => onGradeChange(course.code, e.target.value)}
            className="w-24 p-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            aria-label={`Score for ${course.name}`}
            placeholder="0-100"
          />
          <span 
            className="font-bold text-lg text-slate-700 w-10 text-center"
            aria-live="polite"
          >
            {letterGrade}
          </span>
        </div>
      </td>
    </tr>
  );
};


// --- MAIN APP ---
const App: React.FC = () => {
  const [grades, setGrades] = useState<Record<string, string>>(() => {
    const initialState: Record<string, string> = {};
    COURSES.forEach(course => {
      initialState[course.code] = '';
    });
    return initialState;
  });

  const handleGradeChange = useCallback((courseCode: string, score: string) => {
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

// --- RENDER ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);