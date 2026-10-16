// Pre-compiled ES6 JavaScript generated from src/app.ts
export const GRADE_POINT_MAP = {
    'O': { points: 10, description: 'Outstanding' },
    'A+': { points: 9, description: 'Excellent' },
    'A': { points: 8, description: 'Very Good' },
    'B+': { points: 7, description: 'Good' },
    'B': { points: 6, description: 'Above Average' },
    'C': { points: 5, description: 'Average' },
    'P': { points: 4, description: 'Pass' },
    'F': { points: 0, description: 'Fail' }
};

class AcademicTracker {
    constructor() {
        this.courses = [];
        this.courseForm = document.getElementById('courseForm');
        this.courseCodeInput = document.getElementById('courseCode');
        this.courseTitleInput = document.getElementById('courseTitle');
        this.creditsInput = document.getElementById('credits');
        this.gradeSelect = document.getElementById('grade');
        this.courseTypeSelect = document.getElementById('courseType');

        this.coursesTableBody = document.getElementById('coursesTableBody');
        this.emptyStateRow = document.getElementById('emptyStateRow');

        this.sgpaDisplay = document.getElementById('sgpaDisplay');
        this.standingBadge = document.getElementById('standingBadge');
        this.totalCreditsDisplay = document.getElementById('totalCreditsDisplay');
        this.earnedCreditsDisplay = document.getElementById('earnedCreditsDisplay');
        this.totalCoursesDisplay = document.getElementById('totalCoursesDisplay');
        this.clearAllBtn = document.getElementById('clearAllBtn');

        this.loadSampleData();
        this.bindEvents();
        this.render();
    }

    loadSampleData() {
        this.courses = [
            { id: 'c1', code: 'CS501', title: 'Web Application Development', credits: 4, grade: 'O', courseType: 'Theory' },
            { id: 'c2', code: 'CS502', title: 'Database Management Systems', credits: 4, grade: 'A+', courseType: 'Theory' },
            { id: 'c3', code: 'CS503L', title: 'Web Technology Lab', credits: 2, grade: 'O', courseType: 'Laboratory' },
            { id: 'c4', code: 'CS504', title: 'Computer Networks', credits: 3, grade: 'A', courseType: 'Theory' }
        ];
    }

    bindEvents() {
        this.courseForm.addEventListener('submit', (e) => this.handleAddCourse(e));
        this.clearAllBtn.addEventListener('click', () => this.handleClearAll());
    }

    handleAddCourse(e) {
        e.preventDefault();
        const code = this.courseCodeInput.value.trim().toUpperCase();
        const title = this.courseTitleInput.value.trim();
        const credits = parseInt(this.creditsInput.value, 10);
        const grade = this.gradeSelect.value;
        const courseType = this.courseTypeSelect.value;

        if (!code || !title || isNaN(credits) || credits <= 0) {
            alert('Please fill out all course details with valid values.');
            return;
        }

        const newCourse = {
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

    deleteCourse(id) {
        this.courses = this.courses.filter(c => c.id !== id);
        this.render();
    }

    handleClearAll() {
        if (this.courses.length === 0) return;
        if (confirm('Clear all enrolled courses?')) {
            this.courses = [];
            this.render();
        }
    }

    calculateSummary() {
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

    render() {
        const summary = this.calculateSummary();

        this.sgpaDisplay.textContent = summary.sgpa.toFixed(2);
        this.standingBadge.textContent = summary.standing;
        this.totalCreditsDisplay.textContent = summary.totalCredits.toString();
        this.earnedCreditsDisplay.textContent = summary.earnedCredits.toString();
        this.totalCoursesDisplay.textContent = summary.totalCourses.toString();

        if (this.courses.length === 0) {
            this.coursesTableBody.innerHTML = '';
            this.emptyStateRow.style.display = 'block';
            return;
        }

        this.emptyStateRow.style.display = 'none';

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
                        <button class="btn-delete" title="Delete Course" onclick="window.academicTracker.deleteCourse('${course.id}')">
                            &times;
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    escape(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

let academicTracker;
window.addEventListener('DOMContentLoaded', () => {
    academicTracker = new AcademicTracker();
    window.academicTracker = academicTracker;
});
