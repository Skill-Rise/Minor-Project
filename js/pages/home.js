/**
 * Home Page JavaScript
 * 
 * This file contains functionality specific to the home page.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sample data - in a real application, this would come from an API
    const popularCourses = [
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
      }
    ];
    
    const categories = [
      {
        name: "Development",
        courseCount: 120,
        icon: "code"
      },
      {
        name: "Business",
        courseCount: 85,
        icon: "briefcase"
      },
      {
        name: "Design",
        courseCount: 65,
        icon: "pen-tool"
      },
      {
        name: "Marketing",
        courseCount: 45,
        icon: "trending-up"
      },
      {
        name: "IT & Software",
        courseCount: 72,
        icon: "server"
      },
      {
        name: "Personal Development",
        courseCount: 38,
        icon: "user"
      },
      {
        name: "Photography",
        courseCount: 25,
        icon: "camera"
      },
      {
        name: "Music",
        courseCount: 30,
        icon: "music"
      }
    ];
    
    // Render popular courses
    renderPopularCourses(popularCourses);
    
    // Render categories
    renderCategories(categories);
    
    // Initialize search functionality
    initializeSearch();
  });
  
  /**
   * Render popular courses in the designated container
   * @param {Array} courses - Array of course objects
   */
  function renderPopularCourses(courses) {
    const container = document.getElementById('popular-courses');
    if (!container) return;
    
    let html = '';
    
    courses.forEach(course => {
      html += `
        <div class="course-card bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors">
          <div class="aspect-video bg-zinc-800 relative group cursor-pointer">
            <img src="${course.imageUrl}" alt="${course.title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <a href="course-detail.html?id=${course.id}" class="px-6 py-3 bg-teal-500 text-white rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                Preview Course
              </a>
            </div>
          </div>
          <div class="p-6">
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
    
    container.innerHTML = html;
    
    // Update Feather icons within the newly added content
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }
  
  /**
   * Render category cards in the designated container
   * @param {Array} categories - Array of category objects
   */
  function renderCategories(categories) {
    const container = document.getElementById('categories');
    if (!container) return;
    
    let html = '';
    
    categories.forEach(category => {
      html += `
        <a href="courses.html?category=${category.name}" 
          class="p-6 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors text-left flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0">
            <i data-feather="${category.icon}" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-1">${category.name}</h3>
            <p class="text-sm text-zinc-400">${category.courseCount}+ Courses</p>
          </div>
        </a>
      `;
    });
    
    container.innerHTML = html;
    
    // Update Feather icons within the newly added content
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }
  
  /**
   * Initialize search functionality
   */
  function initializeSearch() {
    const searchInput = document.querySelector('input[type="text"]');
    const searchButton = searchInput ? searchInput.nextElementSibling : null;
    
    if (searchInput && searchButton) {
      // Handle search button click
      searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query.length > 0) {
          window.location.href = `courses.html?search=${encodeURIComponent(query)}`;
        }
      });
      
      // Handle 'Enter' key press in search input
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          const query = searchInput.value.trim();
          if (query.length > 0) {
            window.location.href = `courses.html?search=${encodeURIComponent(query)}`;
          }
        }
      });
    }
  }