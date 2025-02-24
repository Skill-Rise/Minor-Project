/**
 * Mentors/Instructors Page JavaScript
 * 
 * This file contains functionality specific to the mentors/instructors listing page.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sample data - in a real application, this would come from an API
    const instructors = [
      {
        id: 1,
        name: "Sarah Johnson",
        title: "Senior Web Developer",
        rating: 5.0,
        reviews: 42,
        expertise: ["React", "Node.js", "JavaScript", "Full-Stack"],
        courses: 6,
        image: "/api/placeholder/120/120",
        coverImage: "/api/placeholder/400/250",
        bio: "10+ years of experience in web development. Specialized in React, Node.js, and modern JavaScript frameworks."
      },
      {
        id: 2,
        name: "Michael Chen",
        title: "Product Designer",
        rating: 4.8,
        reviews: 36,
        expertise: ["UI/UX", "Figma", "Design Systems"],
        courses: 4,
        image: "/api/placeholder/120/120",
        coverImage: "/api/placeholder/400/250",
        bio: "UI/UX designer with experience at top tech companies. Expertise in user research, interaction design, and design systems."
      },
      {
        id: 3,
        name: "Alex Thompson",
        title: "Data Scientist",
        rating: 4.9,
        reviews: 28,
        expertise: ["Python", "Machine Learning", "Data Analysis"],
        courses: 5,
        image: "/api/placeholder/120/120",
        coverImage: "/api/placeholder/400/250",
        bio: "Data scientist with background in machine learning and statistical analysis. Formerly at Google and Tesla."
      },
      {
        id: 4,
        name: "Emma Davis",
        title: "Marketing Strategist",
        rating: 5.0,
        reviews: 31,
        expertise: ["SEO", "Content Marketing", "Social Media"],
        courses: 3,
        image: "/api/placeholder/120/120",
        coverImage: "/api/placeholder/400/250",
        bio: "Digital marketing expert with experience across multiple industries. Specialized in SEO, content marketing, and social media strategy."
      },
      {
        id: 5,
        name: "David Wilson",
        title: "Cloud Architect",
        rating: 4.7,
        reviews: 25,
        expertise: ["AWS", "DevOps", "Terraform"],
        courses: 4,
        image: "/api/placeholder/120/120",
        coverImage: "/api/placeholder/400/250",
        bio: "Cloud and DevOps expert with experience in AWS, Azure, and GCP. Specialized in scalable architecture and infrastructure as code."
      },
      {
        id: 6,
        name: "Olivia Martinez",
        title: "Product Manager",
        rating: 4.9,
        reviews: 33,
        expertise: ["Product Strategy", "Agile", "User Research"],
        courses: 3,
        image: "/api/placeholder/120/120",
        coverImage: "/api/placeholder/400/250",
        bio: "Product manager with experience at startups and Fortune 500 companies. Expert in product strategy, user-centered design, and agile methodologies."
      }
    ];
    
    // Get category filter buttons
    const categoryButtons = document.querySelectorAll('button');
    
    // Get search input
    const searchInput = document.getElementById('instructor-search');
    
    // Initialize the page
    initializeInstructorsPage();
    
    /**
     * Initialize the instructors page
     */
    function initializeInstructorsPage() {
      // Attach event listeners to category filter buttons
      categoryButtons.forEach(button => {
        button.addEventListener('click', handleCategoryFilter);
      });
      
      // Attach event listener to search input
      if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
      }
      
      // Initialize "Load More" button
      initializeLoadMoreButton();
    }
    
    /**
     * Handle category filter button click
     * @param {Event} event - Click event
     */
    function handleCategoryFilter(event) {
      // Don't handle clicks on buttons that aren't category filters
      if (!event.target.closest('button')) return;
      
      // Get the selected category (from button text or data attribute)
      const selectedCategory = event.target.textContent.trim();
      
      // Update button styles
      categoryButtons.forEach(button => {
        // Reset all buttons to default style
        button.classList.remove('bg-teal-500');
        button.classList.add('bg-zinc-800', 'hover:bg-zinc-700');
        
        // If this is the selected button, apply active style
        if (button.textContent.trim() === selectedCategory) {
          button.classList.remove('bg-zinc-800', 'hover:bg-zinc-700');
          button.classList.add('bg-teal-500');
        }
      });
      
      // Filter instructors based on selected category
      filterInstructors();
    }
    
    /**
     * Handle search input
     */
    function handleSearch() {
      // Filter instructors based on search query
      filterInstructors();
    }
    
    /**
     * Filter instructors based on selected category and search query
     */
    function filterInstructors() {
      // Get selected category
      const selectedCategoryBtn = document.querySelector('button.bg-teal-500');
      const selectedCategory = selectedCategoryBtn ? selectedCategoryBtn.textContent.trim() : 'All Categories';
      
      // Get search query
      const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
      
      // Apply filters
      const filteredInstructors = instructors.filter(instructor => {
        // Category filter
        const categoryMatch = selectedCategory === 'All Categories' || 
                              instructor.expertise.some(exp => exp.includes(selectedCategory));
        
        // Search filter
        const searchMatch = searchQuery === '' || 
                           instructor.name.toLowerCase().includes(searchQuery) || 
                           instructor.title.toLowerCase().includes(searchQuery) || 
                           instructor.expertise.some(exp => exp.toLowerCase().includes(searchQuery));
        
        return categoryMatch && searchMatch;
      });
      
      // Display filtered instructors
      displayInstructors(filteredInstructors);
    }
    
    /**
     * Display instructors in the grid
     * @param {Array} instructorsToDisplay - Array of instructor objects to display
     */
    function displayInstructors(instructorsToDisplay) {
      // Get the instructors grid container
      const instructorsGrid = document.querySelector('#instructors .grid');
      
      if (!instructorsGrid) return;
      
      // If no instructors match the filters, show a message
      if (instructorsToDisplay.length === 0) {
        instructorsGrid.innerHTML = `
          <div class="col-span-full text-center py-12">
            <i data-feather="search" class="w-16 h-16 mx-auto text-zinc-700 mb-4"></i>
            <h3 class="text-xl font-semibold mb-2">No Instructors Found</h3>
            <p class="text-zinc-400">Try adjusting your search or filter criteria</p>
          </div>
        `;
        
        // Re-initialize Feather icons
        if (typeof feather !== 'undefined') {
          feather.replace();
        }
        
        return;
      }
      
      // Generate HTML for instructors
      const instructorsHTML = instructorsToDisplay.map(instructor => `
        <div class="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors">
          <div class="aspect-video relative">
            <img src="${instructor.coverImage}" alt="${instructor.name} Teaching" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-70"></div>
          </div>
          <div class="p-6 -mt-16 relative">
            <img src="${instructor.image}" alt="${instructor.name}" class="w-24 h-24 rounded-full border-4 border-zinc-900 mx-auto mb-4">
            <div class="text-center mb-4">
              <h3 class="text-xl font-semibold">${instructor.name}</h3>
              <p class="text-teal-400">${instructor.title}</p>
              <div class="flex items-center justify-center mt-2">
                ${generateStarRating(instructor.rating)}
                <span class="text-sm text-zinc-400 ml-2">${instructor.rating.toFixed(1)} (${instructor.reviews} reviews)</span>
              </div>
            </div>
            <p class="text-zinc-400 text-center mb-4">${instructor.bio}</p>
            <div class="flex flex-wrap justify-center gap-2 mb-6">
              ${instructor.expertise.map(skill => `
                <span class="px-3 py-1 bg-zinc-800 rounded-full text-sm">${skill}</span>
              `).join('')}
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-zinc-400">${instructor.courses} Courses</span>
              <a href="#" class="text-teal-400 hover:text-teal-300 flex items-center text-sm">
                View Profile
                <i data-feather="chevron-right" class="w-4 h-4 ml-1"></i>
              </a>
            </div>
          </div>
        </div>
      `).join('');
      
      // Update the grid with the filtered instructors
      instructorsGrid.innerHTML = instructorsHTML;
      
      // Re-initialize Feather icons
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    }
    
    /**
     * Generate HTML for star rating
     * @param {number} rating - Rating value (0-5)
     * @returns {string} HTML string for star rating
     */
    function generateStarRating(rating) {
      let stars = '';
      
      for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
          // Full star
          stars += '<i data-feather="star" class="w-4 h-4 text-yellow-500"></i>';
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
          // Half star (approximated with opacity)
          stars += '<i data-feather="star" class="w-4 h-4 text-yellow-500 opacity-70"></i>';
        } else {
          // Empty star
          stars += '<i data-feather="star" class="w-4 h-4 text-yellow-500 opacity-30"></i>';
        }
      }
      
      return stars;
    }
    
    /**
     * Initialize "Load More" button functionality
     */
    function initializeLoadMoreButton() {
      const loadMoreButton = document.querySelector('#instructors button');
      
      if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
          // In a real application, this would load additional instructors from an API
          // For demo purposes, we'll just show a message
          
          // Show loading state
          const originalText = loadMoreButton.textContent;
          loadMoreButton.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Loading...';
          loadMoreButton.disabled = true;
          
          // Simulate API call delay
          setTimeout(function() {
            // Restore button state
            loadMoreButton.innerHTML = originalText;
            loadMoreButton.disabled = false;
            
            // Show message that all instructors are loaded
            SkillRise.showToast('All instructors have been loaded', 'info');
          }, 1500);
        });
      }
    }
  });