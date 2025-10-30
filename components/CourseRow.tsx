import React from 'react';
import { Course } from '../types';

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

export default CourseRow;
