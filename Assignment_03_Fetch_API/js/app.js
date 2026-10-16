/**
 * Assignment 03: Public API Fetch with Async/Await & Dynamic DOM Manipulation
 */

class ApiApp {
  constructor() {
    this.apiUrl = 'https://dummyjson.com/products?limit=24';
    this.products = [];
    this.filteredProducts = [];

    // DOM Elements
    this.productsGrid = document.getElementById('productsGrid');
    this.loadingState = document.getElementById('loadingState');
    this.errorState = document.getElementById('errorState');
    this.errorMessage = document.getElementById('errorMessage');
    this.resultsCount = document.getElementById('resultsCount');
    this.timingInfo = document.getElementById('timingInfo');
    
    this.searchInput = document.getElementById('searchInput');
    this.categoryFilter = document.getElementById('categoryFilter');
    this.sortFilter = document.getElementById('sortFilter');
    this.refreshBtn = document.getElementById('refreshBtn');
    this.retryBtn = document.getElementById('retryBtn');

    // Modal
    this.productModal = document.getElementById('productModal');
    this.modalContent = document.getElementById('modalContent');
    this.modalCloseBtn = document.getElementById('modalCloseBtn');

    this.init();
  }

  init() {
    this.fetchData();

    // Event listeners
    this.searchInput.addEventListener('input', () => this.applyFilters());
    this.categoryFilter.addEventListener('change', () => this.applyFilters());
    this.sortFilter.addEventListener('change', () => this.applyFilters());
    this.refreshBtn.addEventListener('click', () => this.fetchData());
    this.retryBtn.addEventListener('click', () => this.fetchData());

    this.modalCloseBtn.addEventListener('click', () => this.closeModal());
    this.productModal.addEventListener('click', (e) => {
      if (e.target === this.productModal) this.closeModal();
    });
  }

  async fetchData() {
    this.showLoading();
    const startTime = performance.now();

    try {
      const response = await fetch(this.apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status} (${response.statusText})`);
      }

      const data = await response.json();
      this.products = data.products || [];
      
      const duration = Math.round(performance.now() - startTime);
      this.timingInfo.textContent = `⚡ Fetched in ${duration}ms`;

      this.populateCategories();
      this.applyFilters();
      this.showSuccess();
    } catch (err) {
      console.error('Fetch error:', err);
      this.showError(err.message || 'Failed to connect to public API endpoint.');
    }
  }

  populateCategories() {
    const categories = ['all', ...new Set(this.products.map(p => p.category))];
    this.categoryFilter.innerHTML = categories.map(cat => `
      <option value="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
    `).join('');
  }

  applyFilters() {
    const query = this.searchInput.value.toLowerCase().trim();
    const selectedCategory = this.categoryFilter.value;
    const sortMode = this.sortFilter.value;

    let result = [...this.products];

    // Filter Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter Search
    if (query) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        (p.brand && p.brand.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Sorting
    if (sortMode === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortMode === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortMode === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    this.filteredProducts = result;
    this.renderProducts();
  }

  renderProducts() {
    this.resultsCount.textContent = `Showing ${this.filteredProducts.length} of ${this.products.length} products`;

    if (this.filteredProducts.length === 0) {
      this.productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #64748b;">
          <i class="fa-solid fa-box-open" style="font-size: 2.5rem; margin-bottom: 10px;"></i>
          <h3>No products found</h3>
          <p>Try modifying your search or filter criteria.</p>
        </div>
      `;
      return;
    }

    this.productsGrid.innerHTML = this.filteredProducts.map(p => `
      <div class="product-card" onclick="apiApp.openModal(${p.id})">
        <div class="product-img-wrapper">
          <img src="${p.thumbnail}" alt="${this.escapeHTML(p.title)}" loading="lazy" onerror="this.src='https://via.placeholder.com/300?text=No+Image'">
          ${p.discountPercentage ? `<span class="discount-badge">-${Math.round(p.discountPercentage)}%</span>` : ''}
        </div>
        <div class="product-info">
          <span class="product-category">${this.escapeHTML(p.category)}</span>
          <h4 class="product-title">${this.escapeHTML(p.title)}</h4>
          <div class="product-rating">
            <i class="fa-solid fa-star"></i>
            <span class="rating-value">${p.rating}</span>
            <span style="color: #94a3b8; font-size: 0.75rem;">(${p.stock} left)</span>
          </div>
          <div class="product-bottom">
            <span class="price">$${p.price.toFixed(2)}</span>
            <button class="btn-view" onclick="event.stopPropagation(); apiApp.openModal(${p.id})">
              Details
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  openModal(id) {
    const p = this.products.find(item => item.id === id);
    if (!p) return;

    this.modalContent.innerHTML = `
      <div class="modal-product-layout">
        <div>
          <img src="${p.thumbnail}" alt="${this.escapeHTML(p.title)}" class="modal-img">
        </div>
        <div style="display: flex; flex-direction: column;">
          <span class="badge-api" style="align-self: flex-start; margin-bottom: 8px;">${p.category.toUpperCase()}</span>
          <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 8px;">${this.escapeHTML(p.title)}</h3>
          <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 12px;">Brand: <strong>${p.brand || 'Generic'}</strong></p>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px;">
            <span style="font-size: 1.4rem; font-weight: 800; color: #2563eb;">$${p.price.toFixed(2)}</span>
            ${p.discountPercentage ? `<span style="text-decoration: line-through; color: #94a3b8; font-size: 0.9rem;">$${(p.price / (1 - p.discountPercentage / 100)).toFixed(2)}</span>` : ''}
          </div>
          <p style="font-size: 0.88rem; color: #334155; line-height: 1.5; margin-bottom: 16px;">${this.escapeHTML(p.description)}</p>
          <div style="background: #f8fafc; padding: 12px; border-radius: 8px; font-size: 0.8rem; margin-top: auto;">
            <div><strong>Rating:</strong> ⭐ ${p.rating} / 5.0</div>
            <div><strong>Availability:</strong> ${p.stock > 0 ? `In Stock (${p.stock} units)` : 'Out of Stock'}</div>
            <div><strong>SKU:</strong> ${p.sku || 'N/A'}</div>
          </div>
        </div>
      </div>
    `;

    this.productModal.classList.remove('d-none');
  }

  closeModal() {
    this.productModal.classList.add('d-none');
  }

  showLoading() {
    this.loadingState.classList.remove('d-none');
    this.errorState.classList.add('d-none');
    this.productsGrid.innerHTML = '';
    this.resultsCount.textContent = 'Contacting server...';
  }

  showSuccess() {
    this.loadingState.classList.add('d-none');
    this.errorState.classList.add('d-none');
  }

  showError(msg) {
    this.loadingState.classList.add('d-none');
    this.productsGrid.innerHTML = '';
    this.errorMessage.textContent = msg;
    this.errorState.classList.remove('d-none');
    this.resultsCount.textContent = 'Error during fetch.';
  }

  escapeHTML(str) {
    if (!str) return '';
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  }
}

let apiApp;
document.addEventListener('DOMContentLoaded', () => {
  apiApp = new ApiApp();
});
