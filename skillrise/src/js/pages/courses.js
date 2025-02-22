/**
 * Courses Page JavaScript
 * 
 * This file contains functionality specific to the courses listing page.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters for pre-filtering
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search') || '';
    const categoryParam = urlParams.get('category') || 'All';
    const levelParam = urlParams.get('level') || 'All Levels';
    
    // Sample data - in a real application, this would come from an API
    const courses = [
      {
        id: 1,
        title: "Complete Web Development Bootcamp",
        instructor: "Sarah Johnson",
        rating: 4.8,
        students: 15432,
        duration: "12 weeks",
        price: "$99.99",
        category: "Development",
        level: "Beginner",
        imageUrl: "/api/placeholder/400/250"
      },
      {
        id: 2,
        title: "UI/UX Design Masterclass",
        instructor: "Michael Chen",
        rating: 4.9,
        students: 8765,
        duration: "8 weeks",
        price: "$89.99",
        category: "Design",
        level: "Intermediate",
        imageUrl: "/api/placeholder/400/250"
      },
      {
        id: 3,
        title: "Data Science Fundamentals",
        instructor: "Alex Thompson",
        rating: 4.7,
        students: 12543,
        duration: "10 weeks",
        price: "$94.99",
        category: "Data Science",
        level: "Beginner",
        imageUrl: "/api/placeholder/400/250"
      },
      {
        id: 4,
        title: "Advanced JavaScript Patterns",
        instructor: "Emma Davis",
        rating: 4.9,
        students: 7654,
        duration: "6 weeks",
        price: "$79.99",
        category: "Development",
        level: "Advanced",
        imageUrl: "/api/placeholder/400/250"
      },
      {
        id: 5,
        title: "Digital Marketing Strategy",
        instructor: "Ryan Miller",
        rating: 4.6,
        students: 9876,
        duration: "8 weeks",
        price: "$69.99",
        category: "Marketing",
        level: "Intermediate",
        imageUrl: "/api/placeholder/400/250"
      },
      {
        id: 6,
        title: "Machine Learning Essentials",
        instructor: "David Wilson",
        rating: 4.8,
        students: 6543,
        duration: "12 weeks",
        price: "$109.99",
        category: "Data Science",
        level: "Advanced",
        imageUrl: "/api/placeholder/400/250"
      }
    ];
    
    // Extract unique categories and levels for filters
    const categories = ['All', ...new Set(courses.map(course => course.category))];
    const levels = ['All Levels', ...new Set(courses.map(course => course.level))];
    
    // Set initial filter states
    let currentFilters = {
      search: searchQuery,
      category: categoryParam,
      level: levelParam
    };
    
    // Initialize search input with URL parameter if present
    const searchInput = document.getElementById('search-input');
    if (searchInput && searchQuery) {
      searchInput.value = searchQuery;
    }
    
    // Initialize category dropdown
    initializeCategoryDropdown();
    
    // Initialize level dropdown
    initializeLevelDropdown();
    
    // Apply initial filtering and render courses
    filterAndRenderCourses();
    
    // Add event listener for search input
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        currentFilters.search = this.value.toLowerCase();
        filterAndRenderCourses();
      });
    }
    
    /**
     * Initialize the category dropdown
     */
    function initializeCategoryDropdown() {
      const categoryDropdown = document.getElementById('category-dropdown');
      if (!categoryDropdown) return;
      
      const dropdownMenu = categoryDropdown.querySelector('.dropdown-menu');
      const selectedCategory = categoryDropdown.querySelector('.selected-category');
      
      // Set initial selected category
      if (selectedCategory) {
        selectedCategory.textContent = currentFilters.category;
      }
      
      // Populate categories in dropdown
      if (dropdownMenu) {
        let categoriesHtml = '';
        categories.forEach(category => {
          categoriesHtml += `
            <button 
              class="w-full px-4 py-2 text-left hover:bg-zinc-800 transition-colors ${category === currentFilters.category ? 'text-teal-400' : ''}" 
              data-category="${category}"
            >
              ${category}
            </button>
          `;
        });
        
        dropdownMenu.innerHTML = categoriesHtml;
        
        // Add event listeners to category options
        const categoryOptions = dropdownMenu.querySelectorAll('button');
        categoryOptions.forEach(option => {
          option.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            currentFilters.category = category;
            
            if (selectedCategory) {
              selectedCategory.textContent = category;
            }
            
            // Hide dropdown menu
            dropdownMenu.classList.add('hidden');
            
            // Apply filtering
            filterAndRenderCourses();
          });
        });
      }
      
      // Toggle dropdown menu on button click
      const categoryButton = categoryDropdown.querySelector('.category-btn');
      if (categoryButton) {
        categoryButton.addEventListener('click', function(e) {
          e.stopPropagation();
          dropdownMenu.classList.toggle('hidden');
        });
      }
    }
    
    /**
     * Initialize the level dropdown
     */
    function initializeLevelDropdown() {
      const levelDropdown = document.getElementById('level-dropdown');
      if (!levelDropdown) return;
      
      const dropdownMenu = levelDropdown.querySelector('.dropdown-menu');
      const selectedLevel = levelDropdown.querySelector('.selected-level');
      
      // Set initial selected level
      if (selectedLevel) {
        selectedLevel.textContent = currentFilters.level;
      }
      
      // Populate levels in dropdown
      if (dropdownMenu) {
        let levelsHtml = '';
        levels.forEach(level => {
          levelsHtml += `
            <button 
              class="w-full px-4 py-2 text-left hover:bg-zinc-800 transition-colors ${level === currentFilters.level ? 'text-teal-400' : ''}" 
              data-level="${level}"
            >
              ${level}
            </button>
          `;
        });
        
        dropdownMenu.innerHTML = levelsHtml;
        
        // Add event listeners to level options
        const levelOptions = dropdownMenu.querySelectorAll('button');
        levelOptions.forEach(option => {
          option.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            currentFilters.level = level;
            
            if (selectedLevel) {
              selectedLevel.textContent = level;
            }
            
            // Hide dropdown menu
            dropdownMenu.classList.add('hidden');
            
            // Apply filtering
            filterAndRenderCourses();
          });
        });
      }
      
      // Toggle dropdown menu on button click
      const levelButton = levelDropdown.querySelector('.level-btn');
      if (levelButton) {
        levelButton.addEventListener('click', function(e) {
          e.stopPropagation();
          dropdownMenu.classList.toggle('hidden');
        });
      }
    }
    
    /**
     * Filter courses based on current filters and render them
     */
    function filterAndRenderCourses() {
      const filteredCourses = courses.filter(course => {
        // Filter by search query
        const matchesSearch = currentFilters.search === '' || 
          course.title.toLowerCase().includes(currentFilters.search) || 
          course.instructor.toLowerCase().includes(currentFilters.search);
        
        // Filter by category
        const matchesCategory = currentFilters.category === 'All' || 
          course.category === currentFilters.category;
        
        // Filter by level
        const matchesLevel = currentFilters.level === 'All Levels' || 
          course.level === currentFilters.level;
        
        return matchesSearch && matchesCategory && matchesLevel;
      });
      
      renderCourses(filteredCourses);
    }
    
    /**
     * Render courses in the grid
     * @param {Array} coursesToRender - Filtered courses to render
     */
    function renderCourses(coursesToRender) {
      const coursesGrid = document.getElementById('courses-grid');
      if (!coursesGrid) return;
      
      if (coursesToRender.length === 0) {
        coursesGrid.innerHTML = `
          <div class="col-span-full text-center py-12">
            <i data-feather="search" class="w-16 h-16 mx-auto text-zinc-700 mb-4"></i>
            <h3 class="text-xl font-semibold mb-2">No Courses Found</h3>
            <p class="text-zinc-400">Try adjusting your search or filter criteria</p>
          </div>
        `;
      } else {
        let coursesHtml = '';
        
        coursesToRender.forEach(course => {
          coursesHtml += `
            <div class="course-card bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div class="h-48 bg-zinc-800 relative group cursor-pointer">
                <img src="${course.imageUrl}" alt="${course.title}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a href="course-detail.html?id=${course.id}" class="px-6 py-3 bg-teal-500 text-white rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    Preview Course
                  </a>
                </div>
              </div>
              <div class="p-6">
                <div class="flex items-center gap-2 mb-3">
                  <span class="px-2 py-1 bg-zinc-800 rounded text-sm">${course.category}</span>
                  <span class="px-2 py-1 bg-zinc-800 rounded text-sm">${course.level}</span>
                </div>
                <h3 class="text-xl font-semibold mb-2">${course.title}</h3>
                <p class="text-zinc-400 mb-4">${course.instructor}</p>
                <div class="flex items-center text-sm text-zinc-400 mb-4">
                  <div class="flex items-center mr-4">
                    <i data-feather="star" class="w-4 h-4 text-yellow-500 mr-1"></i>
                    ${course.rating}
                  </div>
                  <div class="flex items-center mr-4">
                    <i data-feather="users" class="w-4 h-4 mr-1"></i>
                    ${course.students.toLocaleString()}
                  </div>
                  <div class="flex items-center">
                    <i data-feather="clock" class="w-4 h-4 mr-1"></i>
                    ${course.duration}
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-xl font-bold">${course.price}</span>
                  <a href="course-detail.html?id=${course.id}" class="px-4 py-2 bg-teal-500/10 text-teal-400 rounded-lg hover:bg-teal-500/20 transition-colors">
                    Enroll Now
                  </a>
                </div>
              </div>
            </div>
          `;
        });
        
        coursesGrid.innerHTML = coursesHtml;
      }
      
      // Initialize Feather icons in the new cards
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
      const dropdownMenus = document.querySelectorAll('.dropdown-menu');
      dropdownMenus.forEach(menu => {
        menu.classList.add('hidden');
      });
    });
  });