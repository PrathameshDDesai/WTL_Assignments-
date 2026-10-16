import React, { useState } from 'react';
import Header from './components/Header';
import CourseCard from './components/CourseCard';
import EnrolledDrawer from './components/EnrolledDrawer';
import { INITIAL_COURSES } from './data/courses';

/**
 * Root Component demonstrating:
 * 1. Functional components
 * 2. JSX syntax
 * 3. Props passing down to child components
 * 4. State management with useState hook
 */
export default function App() {
  // useState hooks for application state
  const [courses] = useState(INITIAL_COURSES);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [enrolledList, setEnrolledList] = useState([INITIAL_COURSES[0]]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Toggle enrollment in a course
  const handleToggleEnroll = (course) => {
    const exists = enrolledList.some(item => item.id === course.id);
    if (exists) {
      setEnrolledList(enrolledList.filter(item => item.id !== course.id));
    } else {
      setEnrolledList([...enrolledList, course]);
    }
  };

  // Remove by ID from drawer
  const handleRemoveFromCart = (id) => {
    setEnrolledList(enrolledList.filter(item => item.id !== id));
  };

  // Filtered array based on state
  const filteredCourses = courses.filter(c => {
    const matchCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchLevel = selectedLevel === 'All' || c.level === selectedLevel;
    const matchSearch = c.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        c.instructor.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchCategory && matchLevel && matchSearch;
  });

  const categories = ['All', 'Web Development', 'Database', 'Programming', 'DevOps', 'Design', 'Backend'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="app-layout">
      {/* Passing props to Header */}
      <Header 
        enrolledCount={enrolledList.length} 
        onOpenDrawer={() => setIsDrawerOpen(true)} 
      />

      <main className="main-content">
        {/* Banner Section */}
        <section className="hero-banner">
          <div className="banner-badge">Interactive React Demo</div>
          <h1>Explore Premium Technical Specializations</h1>
          <p>Functional components render these interactive cards, receiving props dynamically and updating parent state via hooks.</p>
        </section>

        {/* Filter Controls Row */}
        <div className="controls-container">
          <div className="search-input-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              placeholder="Search by course topic or faculty..." 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Category:</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Level:</label>
            <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
              {levels.map(lvl => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Counter Bar */}
        <div className="results-bar">
          <span>Displaying <strong>{filteredCourses.length}</strong> of {courses.length} courses</span>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={enrolledList.some(item => item.id === course.id)}
              onToggleEnroll={handleToggleEnroll}
            />
          ))}
        </div>
      </main>

      {/* Cart Drawer */}
      <EnrolledDrawer
        isOpen={isDrawerOpen}
        enrolledList={enrolledList}
        onClose={() => setIsDrawerOpen(false)}
        onRemove={handleRemoveFromCart}
      />

      <footer className="footer-bar">
        <p>&copy; 2026 Academic Submissions | Lab Assignment 05 (React JSX, Props & State)</p>
      </footer>
    </div>
  );
}
