/**
 * Course Detail Page JavaScript
 * 
 * This file contains functionality specific to the course detail page.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get course ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    // Sample data - in a real application, this would come from an API
    const courses = [
      {
        id: 1,
        title: "Complete Web Development Bootcamp",
        instructor: "Sarah Johnson",
        instructorTitle: "Senior Web Developer",
        rating: 4.8,
        students: 15432,
        duration: "12 weeks",
        price: "$99.99",
        category: "Development",
        level: "Beginner",
        description: "Master HTML, CSS, JavaScript, React, Node.js and more with this comprehensive web development course.",
        reviews: 1254,
        lastUpdated: "February 2025",
        imageUrl: "/api/placeholder/800/450",
        curriculum: [
          {
            title: "Introduction to Web Development",
            lessons: [
              { title: "Course Overview", duration: "10:15" },
              { title: "Setting Up Your Development Environment", duration: "15:42" },
              { title: "How the Web Works", duration: "12:30" }
            ]
          },
          {
            title: "HTML Foundations",
            lessons: [
              { title: "HTML Document Structure", duration: "14:25" },
              { title: "HTML Tags and Elements", duration: "18:36" },
              { title: "HTML Forms", duration: "20:15" },
              { title: "Semantic HTML", duration: "16:48" }
            ]
          },
          {
            title: "CSS Styling",
            lessons: [
              { title: "CSS Basics", duration: "17:22" },
              { title: "CSS Selectors", duration: "15:10" },
              { title: "Box Model", duration: "13:45" },
              { title: "Flexbox Layout", duration: "22:30" },
              { title: "CSS Grid Layout", duration: "25:15" }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "UI/UX Design Masterclass",
        instructor: "Michael Chen",
        instructorTitle: "Product Designer",
        rating: 4.9,
        students: 8765,
        duration: "8 weeks",
        price: "$89.99",
        category: "Design",
        level: "Intermediate",
        description: "Learn to create stunning user interfaces and seamless user experiences with industry-standard tools and techniques.",
        reviews: 875,
        lastUpdated: "January 2025",
        imageUrl: "/api/placeholder/800/450",
        curriculum: [
          {
            title: "Introduction to UI/UX Design",
            lessons: [
              { title: "What is UI/UX Design?", duration: "12:30" },
              { title: "Design Thinking Process", duration: "18:45" },
              { title: "User-Centered Design", duration: "14:20" }
            ]
          },
          {
            title: "User Research",
            lessons: [
              { title: "Research Methods", duration: "22:15" },
              { title: "User Interviews", duration: "19:40" },
              { title: "Creating User Personas", duration: "24:10" },
              { title: "User Journey Mapping", duration: "26:30" }
            ]
          }
        ]
      }
    ];
    
    // Find the course with the matching ID
    const course = courses.find(c => c.id === parseInt(courseId));
    
    // If course exists, populate the page with course details
    if (course) {
      populateCourseDetails(course);
      initializeTabs(course);
    } else {
      // Display error message if course not found
      document.querySelector('main').innerHTML = `
        <div class="container mx-auto max-w-6xl pt-12 text-center">
          <i data-feather="alert-triangle" class="w-16 h-16 mx-auto text-zinc-700 mb-4"></i>
          <h1 class="text-3xl font-bold mb-4">Course Not Found</h1>
          <p class="text-zinc-400 mb-8">The course you're looking for doesn't exist or has been removed.</p>
          <a href="courses.html" class="btn-primary">Browse All Courses</a>
        </div>
      `;
      
      // Initialize Feather icons
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    }
  });
  
  /**
   * Populate the page with course details
   * @param {Object} course - Course data object
   */
  function populateCourseDetails(course) {
    // Update page title
    document.title = `${course.title} - SkillRise`;
    
    // Set course category
    const categoryElement = document.getElementById('course-category');
    if (categoryElement) {
      categoryElement.textContent = course.category;
    }
    
    // Set course title
    const titleElement = document.getElementById('course-title');
    if (titleElement) {
      titleElement.textContent = course.title;
    }
    
    // Set course description
    const descriptionElement = document.getElementById('course-description');
    if (descriptionElement) {
      descriptionElement.textContent = course.description;
    }
    
    // Set course rating
    const ratingElement = document.getElementById('course-rating');
    if (ratingElement) {
      ratingElement.textContent = course.rating;
    }
    
    // Set reviews count
    const reviewsCountElement = document.getElementById('reviews-count');
    if (reviewsCountElement) {
      reviewsCountElement.textContent = course.reviews.toLocaleString();
    }
    
    // Set students count
    const studentsCountElement = document.getElementById('students-count');
    if (studentsCountElement) {
      studentsCountElement.textContent = course.students.toLocaleString();
    }
    
    // Set course duration
    const durationElement = document.getElementById('course-duration');
    if (durationElement) {
      durationElement.textContent = course.duration;
    }
    
    // Set last updated date
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
      lastUpdatedElement.textContent = `Last updated ${course.lastUpdated}`;
    }
    
    // Set instructor name
    const instructorNameElement = document.getElementById('instructor-name');
    if (instructorNameElement) {
      instructorNameElement.textContent = course.instructor;
    }
    
    // Set instructor title
    const instructorTitleElement = document.getElementById('instructor-title');
    if (instructorTitleElement) {
      instructorTitleElement.textContent = course.instructorTitle;
    }
    
    // Set course price
    const priceElement = document.getElementById('course-price');
    if (priceElement) {
      priceElement.textContent = course.price;
    }
  }
  
  /**
   * Initialize tabs functionality
   * @param {Object} course - Course data object
   */
  function initializeTabs(course) {
    const tabButtons = document.querySelectorAll('main button');
    
    tabButtons.forEach((button, index) => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        tabButtons.forEach(btn => {
          btn.classList.remove('border-teal-400', 'text-teal-400');
          btn.classList.add('text-zinc-400', 'hover:text-white');
        });
        
        // Add active class to clicked button
        this.classList.remove('text-zinc-400', 'hover:text-white');
        this.classList.add('border-teal-400', 'text-teal-400');
        
        // Show corresponding content based on tab index
        switch(index) {
          case 0:
            // Overview tab (already shown by default)
            break;
          case 1:
            // Curriculum tab
            showCurriculumTab(course);
            break;
          case 2:
            // Instructor tab
            showInstructorTab(course);
            break;
          case 3:
            // Reviews tab
            showReviewsTab(course);
            break;
        }
      });
    });
  }
  
  /**
   * Show curriculum tab content
   * @param {Object} course - Course data object
   */
  function showCurriculumTab(course) {
    const contentArea = document.querySelector('.md\\:col-span-2 .space-y-8');
    if (!contentArea) return;
    
    let html = `
      <div>
        <h2 class="text-2xl font-bold mb-6">Course Curriculum</h2>
        <div class="space-y-4">
    `;
    
    let totalLessons = 0;
    let totalDuration = 0;
    
    course.curriculum.forEach((section, sectionIndex) => {
      // Calculate section details
      const sectionLessons = section.lessons.length;
      totalLessons += sectionLessons;
      
      let sectionDuration = 0;
      section.lessons.forEach(lesson => {
        const [minutes, seconds] = lesson.duration.split(':').map(Number);
        sectionDuration += minutes * 60 + seconds;
        totalDuration += minutes * 60 + seconds;
      });
      
      const formattedSectionDuration = formatDuration(sectionDuration);
      
      html += `
        <div class="border border-zinc-800 rounded-lg overflow-hidden">
          <div class="bg-zinc-800/50 px-6 py-4">
            <button class="w-full flex items-center justify-between" data-section="${sectionIndex}">
              <div>
                <h3 class="text-lg font-medium text-left">Section ${sectionIndex + 1}: ${section.title}</h3>
                <p class="text-sm text-zinc-400">${sectionLessons} lessons • ${formattedSectionDuration}</p>
              </div>
              <i data-feather="chevron-down" class="w-5 h-5 transform transition-transform"></i>
            </button>
          </div>
          <div class="curriculum-section hidden" id="section-${sectionIndex}">
            <ul class="divide-y divide-zinc-800">
      `;
      
      section.lessons.forEach((lesson, lessonIndex) => {
        html += `
              <li class="px-6 py-4">
                <div class="flex items-start justify-between">
                  <div class="flex items-start">
                    <div class="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs mr-3 mt-1">${lessonIndex + 1}</div>
                    <div>
                      <h4 class="font-medium">${lesson.title}</h4>
                      <p class="text-sm text-zinc-400 mt-1">${lesson.duration}</p>
                    </div>
                  </div>
                  <span class="text-zinc-400">
                    <i data-feather="lock" class="w-4 h-4"></i>
                  </span>
                </div>
              </li>
        `;
      });
      
      html += `
            </ul>
          </div>
        </div>
      `;
    });
    
    const formattedTotalDuration = formatDuration(totalDuration);
    
    html += `
        </div>
        <div class="mt-6 pt-6 border-t border-zinc-800 flex justify-between text-sm text-zinc-400">
          <span>${totalLessons} lessons</span>
          <span>Total duration: ${formattedTotalDuration}</span>
        </div>
      </div>
    `;
    
    contentArea.innerHTML = html;
    
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
    
    // Add click event listeners to section headers
    const sectionButtons = contentArea.querySelectorAll('button[data-section]');
    sectionButtons.forEach(button => {
      button.addEventListener('click', function() {
        const sectionIndex = this.getAttribute('data-section');
        const sectionContent = document.getElementById(`section-${sectionIndex}`);
        const icon = this.querySelector('i');
        
        if (sectionContent.classList.contains('hidden')) {
          sectionContent.classList.remove('hidden');
          icon.classList.add('rotate-180');
        } else {
          sectionContent.classList.add('hidden');
          icon.classList.remove('rotate-180');
        }
      });
    });
  }
  
  /**
   * Show instructor tab content
   * @param {Object} course - Course data object
   */
  function showInstructorTab(course) {
    const contentArea = document.querySelector('.md\\:col-span-2 .space-y-8');
    if (!contentArea) return;
    
    const html = `
      <div>
        <h2 class="text-2xl font-bold mb-6">About the Instructor</h2>
        <div class="flex items-start gap-6 mb-8">
          <img src="/api/placeholder/150/150" alt="${course.instructor}" class="w-24 h-24 rounded-full">
          <div>
            <h3 class="text-xl font-semibold">${course.instructor}</h3>
            <p class="text-zinc-400 mb-4">${course.instructorTitle}</p>
            <div class="flex items-center gap-6 text-sm mb-4">
              <div class="flex items-center">
                <i data-feather="star" class="w-4 h-4 text-yellow-500 mr-2"></i>
                <span>${course.rating} Instructor Rating</span>
              </div>
              <div class="flex items-center">
                <i data-feather="award" class="w-4 h-4 text-zinc-400 mr-2"></i>
                <span>35 Courses</span>
              </div>
              <div class="flex items-center">
                <i data-feather="users" class="w-4 h-4 text-zinc-400 mr-2"></i>
                <span>50,000+ Students</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="space-y-4 text-zinc-300">
          <p>Sarah Johnson is a Senior Web Developer with over 10 years of experience in building web applications for various industries, including e-commerce, finance, and education.</p>
          <p>She has worked with companies like Google, Amazon, and Facebook, and has helped hundreds of startups build their web presence. Sarah is passionate about teaching and has been creating online courses since 2018.</p>
          <p>Her teaching philosophy is centered around practical, project-based learning that helps students build real-world skills they can apply immediately in their careers or personal projects.</p>
        </div>
      </div>
    `;
    
    contentArea.innerHTML = html;
    
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }
  
  /**
   * Show reviews tab content
   * @param {Object} course - Course data object
   */
  function showReviewsTab(course) {
    const contentArea = document.querySelector('.md\\:col-span-2 .space-y-8');
    if (!contentArea) return;
    
    // Sample reviews data
    const reviews = [
      {
        name: "David Smith",
        rating: 5,
        date: "March 15, 2025",
        comment: "This course exceeded my expectations! The instructor explains complex concepts in an easy-to-understand way, and the projects were challenging but very practical. I've already started applying what I learned to my own work.",
        avatar: "/api/placeholder/40/40"
      },
      {
        name: "Emily Johnson",
        rating: 4,
        date: "March 10, 2025",
        comment: "Great course with comprehensive content. The only reason I'm giving 4 stars instead of 5 is that some sections could use more exercises. Otherwise, the instructor is excellent and the material is well-organized.",
        avatar: "/api/placeholder/40/40"
      },
      {
        name: "Michael Brown",
        rating: 5,
        date: "March 5, 2025",
        comment: "This is the third course I've taken from this instructor, and they never disappoint. Clear explanations, relevant examples, and responsive support when I had questions. Highly recommended!",
        avatar: "/api/placeholder/40/40"
      }
    ];
    
    let html = `
      <div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold">Student Reviews</h2>
          <div class="flex items-center">
            <div class="text-3xl font-bold mr-2">${course.rating}</div>
            <div>
              <div class="flex items-center text-yellow-500 mb-1">
    `;
    
    // Generate rating stars
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(course.rating)) {
        html += `<i data-feather="star" class="w-4 h-4 fill-current"></i>`;
      } else if (i === Math.ceil(course.rating) && !Number.isInteger(course.rating)) {
        html += `<i data-feather="star" class="w-4 h-4 half-star"></i>`;
      } else {
        html += `<i data-feather="star" class="w-4 h-4"></i>`;
      }
    }
    
    html += `
              </div>
              <p class="text-sm text-zinc-400">${course.reviews} reviews</p>
            </div>
          </div>
        </div>
        
        <div class="mb-8">
          <div class="flex items-center mb-6">
            <div class="w-full max-w-xs">
              <div class="flex items-center mb-2">
                <div class="w-20 text-sm">5 stars</div>
                <div class="flex-grow h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div class="h-full bg-yellow-500" style="width: 75%"></div>
                </div>
                <div class="w-12 text-sm text-zinc-400 text-right">75%</div>
              </div>
              <div class="flex items-center mb-2">
                <div class="w-20 text-sm">4 stars</div>
                <div class="flex-grow h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div class="h-full bg-yellow-500" style="width: 20%"></div>
                </div>
                <div class="w-12 text-sm text-zinc-400 text-right">20%</div>
              </div>
              <div class="flex items-center mb-2">
                <div class="w-20 text-sm">3 stars</div>
                <div class="flex-grow h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div class="h-full bg-yellow-500" style="width: 5%"></div>
                </div>
                <div class="w-12 text-sm text-zinc-400 text-right">5%</div>
              </div>
              <div class="flex items-center mb-2">
                <div class="w-20 text-sm">2 stars</div>
                <div class="flex-grow h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div class="h-full bg-yellow-500" style="width: 0%"></div>
                </div>
                <div class="w-12 text-sm text-zinc-400 text-right">0%</div>
              </div>
              <div class="flex items-center">
                <div class="w-20 text-sm">1 star</div>
                <div class="flex-grow h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div class="h-full bg-yellow-500" style="width: 0%"></div>
                </div>
                <div class="w-12 text-sm text-zinc-400 text-right">0%</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="space-y-6">
    `;
    
    // Generate review cards
    reviews.forEach(review => {
      html += `
        <div class="border border-zinc-800 rounded-lg p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center">
              <img src="${review.avatar}" alt="${review.name}" class="w-10 h-10 rounded-full mr-3">
              <div>
                <h4 class="font-medium">${review.name}</h4>
                <div class="flex items-center text-yellow-500">
      `;
      
      // Generate rating stars for the review
      for (let i = 1; i <= 5; i++) {
        if (i <= review.rating) {
          html += `<i data-feather="star" class="w-4 h-4 fill-current"></i>`;
        } else {
          html += `<i data-feather="star" class="w-4 h-4"></i>`;
        }
      }
      
      html += `
                </div>
              </div>
            </div>
            <span class="text-sm text-zinc-400">${review.date}</span>
          </div>
          <p class="text-zinc-300">${review.comment}</p>
        </div>
      `;
    });
    
    html += `
        </div>
        
        <div class="mt-8 text-center">
          <a href="#" class="btn-secondary">See All Reviews</a>
        </div>
      </div>
    `;
    
    contentArea.innerHTML = html;
    
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
      feather.replace();
      
      // Add fill to stars (since Feather icons are outline by default)
      document.querySelectorAll('.fill-current').forEach(icon => {
        icon.classList.add('text-yellow-500');
      });
    }
  }
  
  /**
   * Format seconds into a readable duration string
   * @param {number} seconds - Duration in seconds
   * @returns {string} Formatted duration string (e.g., "2h 30m")
   */
  function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }