/**
 * Assignment 04: TypeScript Client-Side Interactive Application
 * Student Academic Course & SGPA Calculator
 */

export type GradeLetter = 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'P' | 'F';

export interface GradeMapping {
  points: number;
  description: string;
}

export const GRADE_POINT_MAP: Record<GradeLetter, GradeMapping> = {
  'O':  { points: 10, description: 'Outstanding' },
  'A+': { points: 9,  description: 'Excellent' },
  'A':  { points: 8,  description: 'Very Good' },
  'B+': { points: 7,  description: 'Good' },
  'B':  { points: 6,  description: 'Above Average' },
  'C':  { points: 5,  description: 'Average' },
  'P':  { points: 4,  description: 'Pass' },
  'F':  { points: 0,  description: 'Fail' }
};

export type CourseType = 'Theory' | 'Laboratory' | 'Project' | 'Seminar';

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  grade: GradeLetter;
  courseType: CourseType;
}

export interface AcademicSummary {
  totalCourses: number;
  totalCredits: number;
  earnedCredits: number;
  totalGradePoints: number;
  sgpa: number;
  standing: string;
}

class AcademicTracker {
  private courses: Course[] = [];

  // DOM elements with strict type casting
  private courseForm: HTMLFormElement;
  private courseCodeInput: HTMLInputElement;
  private courseTitleInput: HTMLInputElement;
  private creditsInput: HTMLInputElement;
  private gradeSelect: HTMLSelectElement;
  private courseTypeSelect: HTMLSelectElement;

  private coursesTableBody: HTMLTableSectionElement;
  private emptyStateRow: HTMLElement;

  private sgpaDisplay: HTMLElement;
  private standingBadge: HTMLElement;
  private totalCreditsDisplay: HTMLElement;
  private earnedCreditsDisplay: HTMLElement;
  private totalCoursesDisplay: HTMLElement;
  private clearAllBtn: HTMLButtonElement;

  constructor() {
    this.courseForm = document.getElementById('courseForm') as HTMLFormElement;
    this.courseCodeInput = document.getElementById('courseCode') as HTMLInputElement;
    this.courseTitleInput = document.getElementById('courseTitle') as HTMLInputElement;
    this.creditsInput = document.getElementById('credits') as HTMLInputElement;
    this.gradeSelect = document.getElementById('grade') as HTMLSelectElement;
    this.courseTypeSelect = document.getElementById('courseType') as HTMLSelectElement;

    this.coursesTableBody = document.getElementById('coursesTableBody') as HTMLTableSectionElement;
    this.emptyStateRow = document.getElementById('emptyStateRow') as HTMLElement;

    this.sgpaDisplay = document.getElementById('sgpaDisplay') as HTMLElement;
    this.standingBadge = document.getElementById('standingBadge') as HTMLElement;
    this.totalCreditsDisplay = document.getElementById('totalCreditsDisplay') as HTMLElement;
    this.earnedCreditsDisplay = document.getElementById('earnedCreditsDisplay') as HTMLElement;
    this.totalCoursesDisplay = document.getElementById('totalCoursesDisplay') as HTMLElement;
    this.clearAllBtn = document.getElementById('clearAllBtn') as HTMLButtonElement;

    this.loadSampleData();
    this.bindEvents();
    this.render();
  }

  private loadSampleData(): void {
    this.courses = [
      {
        id: 'c1',
        code: 'CS501',
        title: 'Web Application Development',
        credits: 4,
        grade: 'O',
        courseType: 'Theory'
      },
      {
        id: 'c2',
        code: 'CS502',
        title: 'Database Management Systems',
        credits: 4,
        grade: 'A+',
        courseType: 'Theory'
      },
      {
        id: 'c3',
        code: 'CS503L',
        title: 'Web Technology Lab',
        credits: 2,
        grade: 'O',
        courseType: 'Laboratory'
      },
      {
        id: 'c4',
        code: 'CS504',
        title: 'Computer Networks',
        credits: 3,
        grade: 'A',
        courseType: 'Theory'
      }
    ];
  }

  private bindEvents(): void {
    this.courseForm.addEventListener('submit', (e: Event) => this.handleAddCourse(e));
    this.clearAllBtn.addEventListener('click', () => this.handleClearAll());
  }

  private handleAddCourse(e: Event): void {
    e.preventDefault();

    const code = this.courseCodeInput.value.trim().toUpperCase();
    const title = this.courseTitleInput.value.trim();
    const credits = parseInt(this.creditsInput.value, 10);
    const grade = this.gradeSelect.value as GradeLetter;
    const courseType = this.courseTypeSelect.value as CourseType;

    if (!code || !title || isNaN(credits) || credits <= 0) {
      alert('Please fill out all course details with valid values.');
      return;
    }

    const newCourse: Course = {
      id: 'c_' + Date.now().toString(),
      code,
      title,
      credits,
      grade,
      courseType
    };

    this.courses.push(newCourse);
    this.courseForm.reset();
    this.courseCodeInput.focus();
    this.render();
  }

  public deleteCourse(id: string): void {
    this.courses = this.courses.filter(c => c.id !== id);
    this.render();
  }

  private handleClearAll(): void {
    if (this.courses.length === 0) return;
    if (confirm('Clear all enrolled courses?')) {
      this.courses = [];
      this.render();
    }
  }

  private calculateSummary(): AcademicSummary {
    let totalCredits = 0;
    let earnedCredits = 0;
    let weightedPointsSum = 0;

    this.courses.forEach(c => {
      totalCredits += c.credits;
      const points = GRADE_POINT_MAP[c.grade]?.points ?? 0;
      weightedPointsSum += (points * c.credits);

      if (c.grade !== 'F') {
        earnedCredits += c.credits;
      }
    });

    const sgpa = totalCredits > 0 ? parseFloat((weightedPointsSum / totalCredits).toFixed(2)) : 0.00;

    let standing = 'N/A';
    if (totalCredits > 0) {
      if (sgpa >= 9.0) standing = 'First Class with Distinction (Honors)';
      else if (sgpa >= 7.75) standing = 'First Class with Distinction';
      else if (sgpa >= 6.75) standing = 'First Class';
      else if (sgpa >= 5.75) standing = 'Higher Second Class';
      else if (sgpa >= 4.0) standing = 'Pass Class';
      else standing = 'Needs Improvement (Arrear)';
    }

    return {
      totalCourses: this.courses.length,
      totalCredits,
      earnedCredits,
      totalGradePoints: weightedPointsSum,
      sgpa,
      standing
    };
  }

  private render(): void {
    const summary = this.calculateSummary();

    // Update Top Summary Cards
    this.sgpaDisplay.textContent = summary.sgpa.toFixed(2);
    this.standingBadge.textContent = summary.standing;
    this.totalCreditsDisplay.textContent = summary.totalCredits.toString();
    this.earnedCreditsDisplay.textContent = summary.earnedCredits.toString();
    this.totalCoursesDisplay.textContent = summary.totalCourses.toString();

    // Toggle Empty State
    if (this.courses.length === 0) {
      this.coursesTableBody.innerHTML = '';
      this.emptyStateRow.style.display = 'block';
      return;
    }

    this.emptyStateRow.style.display = 'none';

    // Populate Table Rows
    this.coursesTableBody.innerHTML = this.courses.map((course, index) => {
      const gp = GRADE_POINT_MAP[course.grade].points;
      const isFailed = course.grade === 'F';
      const statusBadge = isFailed 
        ? '<span class="status-pill failed">Fail</span>'
        : '<span class="status-pill passed">Pass</span>';

      return `
        <tr>
          <td><strong>${index + 1}</strong></td>
          <td><span class="code-tag">${this.escape(course.code)}</span></td>
          <td>
            <div class="course-name">${this.escape(course.title)}</div>
            <span class="type-tag">${course.courseType}</span>
          </td>
          <td>${course.credits}</td>
          <td><span class="grade-pill grade-${course.grade}">${course.grade} (${gp})</span></td>
          <td><strong>${(gp * course.credits)}</strong></td>
          <td>${statusBadge}</td>
          <td>
            <button class="btn-delete" title="Delete Course" onclick="academicTracker.deleteCourse('${course.id}')">
              &times;
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  private escape(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

// Global instance to connect button inline click handlers
declare global {
  interface Window {
    academicTracker: AcademicTracker;
  }
}

let academicTracker: AcademicTracker;
window.addEventListener('DOMContentLoaded', () => {
  academicTracker = new AcademicTracker();
  window.academicTracker = academicTracker;
});
