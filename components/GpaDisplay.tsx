
import React from 'react';

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

export default GpaDisplay;
