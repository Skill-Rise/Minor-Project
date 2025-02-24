/**
 * Course Card Component
 * 
 * This file contains functions for creating and managing course cards
 * across the application.
 */

const CourseCard = {
    /**
     * Create a course card HTML element
     * @param {Object} course - Course data object
     * @param {string} type - Card type: 'normal', 'compact', or 'dashboard'
     * @returns {string} HTML string for the course card
     */
    create: function(course, type = 'normal') {
      if (type === 'dashboard') {
        return this.createDashboardCard(course);
      } else if (type === 'compact') {
        return this.createCompactCard(course);
      } else {
        return this.createNormalCard(course);
      }
    },
    
    /**
     * Create a normal course card for course listings
     * @param {Object} course - Course data object
     * @returns {string} HTML string for the course card
     */
    createNormalCard: function(course) {
      return `
        <div class="course-card bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors">
          <div class="h-48 md:h-64 bg-zinc-800 relative group cursor-pointer">
            <img src="${course.imageUrl || '/api/placeholder/400/250'}" alt="${course.title}" class="w-full h-full object-cover">
            <div class="course-overlay absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <a href="course-detail.html?id=${course.id}" class="preview-button px-6 py-3 bg-teal-500 text-white rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
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
    },
    
    /**
     * Create a compact course card for home page featured listings
     * @param {Object} course - Course data object
     * @returns {string} HTML string for the compact course card
     */
    createCompactCard: function(course) {
      return `
        <div class="course-card bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors">
          <div class="h-40 bg-zinc-800 relative group cursor-pointer">
            <img src="${course.imageUrl || '/api/placeholder/400/200'}" alt="${course.title}" class="w-full h-full object-cover">
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">${course.title}</h3>
            <p class="text-zinc-400 text-sm mb-3">${course.instructor}</p>
            <div class="flex items-center text-sm text-zinc-400 mb-3">
              <div class="flex items-center mr-3">
                <i data-feather="star" class="w-4 h-4 text-yellow-500 mr-1"></i>
                ${course.rating}
              </div>
              <div class="flex items-center">
                <i data-feather="clock" class="w-4 h-4 mr-1"></i>
                ${course.duration}
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="font-bold">${course.price}</span>
              <a href="course-detail.html?id=${course.id}" class="text-sm text-teal-400 hover:text-teal-300">
                View Details
              </a>
            </div>
          </div>
        </div>
      `;
    },
    
    /**
     * Create a dashboard course card with progress for student dashboard
     * @param {Object} course - Course data object with progress information
     * @returns {string} HTML string for the dashboard course card
     */
    createDashboardCard: function(course) {
      return `
        <div class="bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800/50 hover:border-zinc-700/50 transition-all hover:shadow-lg hover:shadow-teal-500/5">
          <div class="relative aspect-video">
            <img src="${course.imageUrl || '/api/placeholder/400/250'}" alt="${course.title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
            <a href="course-player.html?id=${course.id}" class="absolute bottom-4 right-4 w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center hover:bg-teal-400 transition-colors shadow-lg">
              <i data-feather="play" class="w-5 h-5"></i>
            </a>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">${course.title}</h3>
            <p class="text-zinc-400 text-sm mb-4">${course.instructor}</p>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-2">
                  <span class="text-zinc-400">Course Progress</span>
                  <span class="text-teal-400">${course.progress}%</span>
                </div>
                <div class="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-300 progress-bar-animate"
                    style="width: ${course.progress}%"
                  ></div>
                </div>
              </div>
              <div class="flex justify-between text-sm text-zinc-400">
                <span>${course.completedLessons} of ${course.totalLessons} lessons</span>
                <span>${course.lastAccessed}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    },
    
    /**
     * Render multiple course cards into a container element
     * @param {string} containerId - ID of the container element
     * @param {Array} courses - Array of course data objects
     * @param {string} type - Card type: 'normal', 'compact', or 'dashboard'
     */
    renderCards: function(containerId, courses, type = 'normal') {
      const container = document.getElementById(containerId);
      if (!container) return;
      
      let html = '';
      courses.forEach(course => {
        html += this.create(course, type);
      });
      
      container.innerHTML = html;
      
      // Initialize Feather icons in the new cards
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    }
  };
  
  // Export the CourseCard object for use in other scripts
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CourseCard;
  }