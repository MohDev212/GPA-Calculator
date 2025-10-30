import { Course, Grade } from './types';

export const COURSES: Course[] = [
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
export const getGradeFromScore = (score: number | string | null): Grade => {
  if (score === '' || score === null) {
    return { letter: '—', points: -1 };
  }

  // Use parseFloat for robustness, though the input is type="number" with step="1".
  const s = typeof score === 'string' ? parseFloat(score) : score;

  if (isNaN(s) || s < 0 || s > 100) {
    return { letter: '—', points: -1 };
  }

  // The sequential `if` statements accurately reflect the ranges in the grade mapping table.
  // For example, `s >= 89` is only reached if `s < 93`, correctly implementing the
  // "89% to less than 93%" range.

  // More than 97%
  if (s > 97) return { letter: 'A+', points: 4.0 };
  // 93% to less than 97%. The provided table is ambiguous about a score of exactly 97.
  // This logic correctly assigns 97 to 'A', which is the most reasonable interpretation.
  // This condition effectively covers the range: 93 <= score <= 97.
  if (s >= 93) return { letter: 'A', points: 4.0 };
  // 89% to less than 93%
  if (s >= 89) return { letter: 'A-', points: 3.7 };
  // 84% to less than 89%
  if (s >= 84) return { letter: 'B+', points: 3.3 };
  // 80% to less than 84%
  if (s >= 80) return { letter: 'B', points: 3.0 };
  // 76% to less than 80%
  if (s >= 76) return { letter: 'B-', points: 2.7 };
  // 73% to less than 76%
  if (s >= 73) return { letter: 'C+', points: 2.3 };
  // 70% to less than 73%
  if (s >= 70) return { letter: 'C', points: 2.0 };
  // 67% to less than 70%
  if (s >= 67) return { letter: 'C-', points: 1.7 };
  // 64% to less than 67%
  if (s >= 64) return { letter: 'D+', points: 1.3 };
  // 60% to less than 64%
  if (s >= 60) return { letter: 'D', points: 1.0 };
  // Less than 60%
  return { letter: 'F', points: 0.0 };
};
