/**
 * Assignment 02: Dynamic To-Do List Application
 * Features: Full CRUD with localStorage, search, status filtering, progress calculation, modal editing.
 */

class TodoApp {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('taskmaster_tasks')) || [
      {
        id: '1',
        title: 'Review Computer Networks Lab Experiments',
        priority: 'high',
        category: 'Academic',
        dueDate: '2026-10-20',
        completed: false,
        createdAt: Date.now()
      },
      {
        id: '2',
        title: 'Design responsive homepage for Hospital Web Portal',
        priority: 'medium',
        category: 'Project',
        dueDate: '2026-10-22',
        completed: true,
        createdAt: Date.now() - 100000
      }
    ];

    this.currentFilter = 'all';
    this.searchQuery = '';

    // Cache DOM Elements
    this.taskForm = document.getElementById('taskForm');
    this.taskInput = document.getElementById('taskInput');
    this.prioritySelect = document.getElementById('prioritySelect');
    this.categorySelect = document.getElementById('categorySelect');
    this.dueDateInput = document.getElementById('dueDateInput');
    
    this.taskList = document.getElementById('taskList');
    this.emptyState = document.getElementById('emptyState');
    this.searchInput = document.getElementById('searchInput');
    this.filterTabs = document.querySelectorAll('.filter-tab');
    
    this.progressStatus = document.getElementById('progressStatus');
    this.progressPercentage = document.getElementById('progressPercentage');
    this.progressBarFill = document.getElementById('progressBarFill');
    this.activeCount = document.getElementById('activeCount');
    this.completedCount = document.getElementById('completedCount');
    this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
    
    // Modal Elements
    this.editModalOverlay = document.getElementById('editModalOverlay');
    this.editTaskForm = document.getElementById('editTaskForm');
    this.editTaskId = document.getElementById('editTaskId');
    this.editTaskTitle = document.getElementById('editTaskTitle');
    this.editTaskPriority = document.getElementById('editTaskPriority');
    this.editTaskCategory = document.getElementById('editTaskCategory');
    this.editTaskDueDate = document.getElementById('editTaskDueDate');
    this.closeEditModalBtn = document.getElementById('closeEditModalBtn');
    this.cancelEditBtn = document.getElementById('cancelEditBtn');

    this.init();
  }

  init() {
    // Set today's date formatted
    const dateDisplay = document.getElementById('currentDateDisplay');
    if (dateDisplay) {
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      dateDisplay.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // Event Listeners
    this.taskForm.addEventListener('submit', (e) => this.handleAddTask(e));
    this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
    this.filterTabs.forEach(tab => {
      tab.addEventListener('click', () => this.handleFilterChange(tab));
    });
    this.clearCompletedBtn.addEventListener('click', () => this.handleClearCompleted());

    // Modal listeners
    this.closeEditModalBtn.addEventListener('click', () => this.closeEditModal());
    this.cancelEditBtn.addEventListener('click', () => this.closeEditModal());
    this.editTaskForm.addEventListener('submit', (e) => this.handleSaveEdit(e));

    this.render();
  }

  saveToStorage() {
    localStorage.setItem('taskmaster_tasks', JSON.stringify(this.tasks));
  }

  handleAddTask(e) {
    e.preventDefault();
    const title = this.taskInput.value.trim();
    if (!title) return;

    const newTask = {
      id: Date.now().toString(),
      title,
      priority: this.prioritySelect.value,
      category: this.categorySelect.value,
      dueDate: this.dueDateInput.value || '',
      completed: false,
      createdAt: Date.now()
    };

    this.tasks.unshift(newTask);
    this.saveToStorage();
    this.taskForm.reset();
    this.prioritySelect.value = 'medium';
    this.categorySelect.value = 'Academic';
    this.render();
  }

  handleToggleTask(id) {
    this.tasks = this.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    this.saveToStorage();
    this.render();
  }

  handleDeleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.saveToStorage();
      this.render();
    }
  }

  openEditModal(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    this.editTaskId.value = task.id;
    this.editTaskTitle.value = task.title;
    this.editTaskPriority.value = task.priority;
    this.editTaskCategory.value = task.category;
    this.editTaskDueDate.value = task.dueDate || '';

    this.editModalOverlay.classList.remove('d-none');
  }

  closeEditModal() {
    this.editModalOverlay.classList.add('d-none');
    this.editTaskForm.reset();
  }

  handleSaveEdit(e) {
    e.preventDefault();
    const id = this.editTaskId.value;
    const title = this.editTaskTitle.value.trim();
    if (!title) return;

    this.tasks = this.tasks.map(t => {
      if (t.id === id) {
        return {
          ...t,
          title,
          priority: this.editTaskPriority.value,
          category: this.editTaskCategory.value,
          dueDate: this.editTaskDueDate.value
        };
      }
      return t;
    });

    this.saveToStorage();
    this.closeEditModal();
    this.render();
  }

  handleSearch(e) {
    this.searchQuery = e.target.value.toLowerCase().trim();
    this.render();
  }

  handleFilterChange(selectedTab) {
    this.filterTabs.forEach(tab => tab.classList.remove('active'));
    selectedTab.classList.add('active');
    this.currentFilter = selectedTab.dataset.filter;
    this.render();
  }

  handleClearCompleted() {
    const completedCount = this.tasks.filter(t => t.completed).length;
    if (completedCount === 0) {
      alert('No completed tasks to clear.');
      return;
    }

    if (confirm(`Remove all ${completedCount} completed tasks?`)) {
      this.tasks = this.tasks.filter(t => !t.completed);
      this.saveToStorage();
      this.render();
    }
  }

  updateStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const active = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    this.progressStatus.textContent = `${completed} of ${total} tasks completed`;
    this.progressPercentage.textContent = `${percentage}%`;
    this.progressBarFill.style.width = `${percentage}%`;

    this.activeCount.textContent = `${active} active`;
    this.completedCount.textContent = `${completed} completed`;
  }

  render() {
    this.updateStats();

    // Filter tasks
    let filtered = this.tasks.filter(t => {
      if (this.currentFilter === 'active') return !t.completed;
      if (this.currentFilter === 'completed') return t.completed;
      return true;
    });

    // Apply search
    if (this.searchQuery) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(this.searchQuery) ||
        t.category.toLowerCase().includes(this.searchQuery)
      );
    }

    // Toggle Empty State
    if (filtered.length === 0) {
      this.taskList.innerHTML = '';
      this.emptyState.classList.remove('d-none');
      return;
    }

    this.emptyState.classList.add('d-none');
    this.taskList.innerHTML = filtered.map(t => `
      <li class="task-item ${t.completed ? 'completed' : ''}" data-id="${t.id}">
        <div class="task-main">
          <input type="checkbox" class="task-checkbox" ${t.completed ? 'checked' : ''} onchange="app.handleToggleTask('${t.id}')">
          <div class="task-content-details">
            <span class="task-text">${this.escapeHTML(t.title)}</span>
            <div class="task-meta">
              <span class="badge badge-${t.priority}">${t.priority}</span>
              <span class="badge badge-category">${t.category}</span>
              ${t.dueDate ? `<span class="due-date"><i class="fa-regular fa-clock"></i> ${t.dueDate}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="task-actions">
          <button class="btn-icon" title="Edit Task" onclick="app.openEditModal('${t.id}')">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn-icon delete-btn" title="Delete Task" onclick="app.handleDeleteTask('${t.id}')">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </li>
    `).join('');
  }

  escapeHTML(str) {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  }
}

// Global instance for inline onclick handlers
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new TodoApp();
});
