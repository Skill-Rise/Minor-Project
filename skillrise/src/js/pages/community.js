/**
 * Community Page JavaScript
 * 
 * This file contains functionality specific to the community page.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sample data for forums - in a real application, this would come from an API
    const forumTopics = [
      {
        id: 1,
        title: "Tips for learning JavaScript in 2025",
        author: "Sarah Johnson",
        category: "Web Development",
        replies: 24,
        views: 342,
        lastActivity: "2 hours ago"
      },
      {
        id: 2,
        title: "How to structure your UI/UX portfolio",
        author: "Michael Chen",
        category: "Design",
        replies: 18,
        views: 275,
        lastActivity: "5 hours ago"
      },
      {
        id: 3,
        title: "Best practices for data visualization",
        author: "Alex Thompson",
        category: "Data Science",
        replies: 15,
        views: 198,
        lastActivity: "1 day ago"
      },
      {
        id: 4,
        title: "Getting started with machine learning: resources",
        author: "Emma Davis",
        category: "Data Science",
        replies: 32,
        views: 456,
        lastActivity: "2 days ago"
      },
      {
        id: 5,
        title: "React vs Vue in 2025 - which should you learn?",
        author: "David Wilson",
        category: "Web Development",
        replies: 47,
        views: 523,
        lastActivity: "3 days ago"
      }
    ];
    
    // Sample data for upcoming events - in a real application, this would come from an API
    const events = [
      {
        id: 1,
        title: "Modern JavaScript Frameworks in 2025",
        type: "Webinar",
        date: "March 25, 2025",
        time: "2:00 PM - 4:00 PM EST",
        speakers: ["Sarah Johnson", "Alex Thompson"],
        description: "A comprehensive overview of the most popular JavaScript frameworks and their use cases in modern web development."
      },
      {
        id: 2,
        title: "Building Responsive UIs with Tailwind CSS",
        type: "Workshop",
        date: "April 2, 2025",
        time: "1:00 PM - 5:00 PM EST",
        speakers: ["Michael Chen"],
        description: "Learn how to create beautiful, responsive user interfaces using the utility-first CSS framework Tailwind CSS."
      },
      {
        id: 3,
        title: "Data Science Career Paths",
        type: "Panel Discussion",
        date: "April 10, 2025",
        time: "11:00 AM - 12:30 PM EST",
        speakers: ["Emily Harris", "Mark Johnson", "Lisa Zhang"],
        description: "Industry experts discuss various career paths in data science and answer questions about breaking into the field."
      }
    ];
  
    // Sample data for study groups - in a real application, this would come from an API
    const studyGroups = [
      {
        id: 1,
        name: "React.js Masterclass",
        members: 16,
        level: "Beginner Friendly",
        description: "A study group focused on mastering React.js through collaborative learning and project work."
      },
      {
        id: 2,
        name: "Data Science with Python",
        members: 22,
        level: "Intermediate",
        description: "Learn data analysis, visualization, and machine learning with Python libraries."
      },
      {
        id: 3,
        name: "Advanced UI/UX Design",
        members: 14,
        level: "Advanced",
        description: "Deepen your design skills through case studies, critiques, and advanced techniques."
      },
      {
        id: 4,
        name: "DevOps Practices",
        members: 19,
        level: "Intermediate",
        description: "Explore modern DevOps practices, tools, and methodologies for efficient software development."
      },
      {
        id: 5,
        name: "Mobile App Development",
        members: 25,
        level: "Beginner Friendly",
        description: "Learn to build mobile applications for iOS and Android using React Native."
      }
    ];
    
    // Initialize smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Initialize forum activity display
    displayRecentForumActivity();
    
    // Initialize "Join Group" buttons
    initializeJoinButtons();
    
    // Initialize event registration
    initializeEventRegistration();
    
    /**
     * Initialize smooth scrolling for anchor links
     */
    function initializeSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 100, // Offset for fixed header
              behavior: 'smooth'
            });
          }
        });
      });
    }
    
    /**
     * Display recent forum activity in the forum section
     */
    function displayRecentForumActivity() {
      // This would typically fetch recent forum posts from an API
      // For demo purposes, we're using the sample data defined above
      
      // Example implementation for a "Recent Activity" section that could be added to the page
      const recentActivitySection = document.querySelector('#recent-forum-activity');
      
      if (recentActivitySection) {
        let html = '';
        
        forumTopics.slice(0, 3).forEach(topic => {
          html += `
            <div class="p-4 border-b border-zinc-800">
              <h4 class="font-medium mb-1">
                <a href="#" class="hover:text-teal-400 transition-colors">${topic.title}</a>
              </h4>
              <div class="flex justify-between text-sm">
                <span class="text-zinc-400">by ${topic.author} in ${topic.category}</span>
                <span class="text-zinc-500">${topic.lastActivity}</span>
              </div>
            </div>
          `;
        });
        
        recentActivitySection.innerHTML = html;
      }
    }
    
    /**
     * Initialize "Join Group" buttons
     */
    function initializeJoinButtons() {
      const joinButtons = document.querySelectorAll('.join-group-btn');
      
      joinButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          // In a real application, this would make an API call to join the group
          // For demo purposes, we'll just update the button text and style
          
          if (this.classList.contains('joined')) {
            // If already joined, leave the group
            this.textContent = 'Join Group';
            this.classList.remove('joined');
            this.classList.remove('bg-green-500/10', 'text-green-400');
            this.classList.add('bg-teal-500/10', 'text-teal-400');
          } else {
            // If not joined, join the group
            this.textContent = 'Joined ✓';
            this.classList.add('joined');
            this.classList.remove('bg-teal-500/10', 'text-teal-400');
            this.classList.add('bg-green-500/10', 'text-green-400');
            
            // Show success message
            SkillRise.showToast('Successfully joined the group!', 'success');
          }
        });
      });
    }
    
    /**
     * Initialize event registration buttons
     */
    function initializeEventRegistration() {
      const registerButtons = document.querySelectorAll('.register-event-btn');
      
      registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          // In a real application, this would make an API call to register for the event
          // For demo purposes, we'll just update the button text and style
          
          if (this.classList.contains('registered')) {
            // If already registered, cancel registration
            this.textContent = 'Register Now';
            this.classList.remove('registered');
            this.classList.remove('bg-green-500/10', 'text-green-400');
            this.classList.add('bg-teal-500/10', 'text-teal-400');
          } else {
            // If not registered, register for the event
            this.textContent = 'Registered ✓';
            this.classList.add('registered');
            this.classList.remove('bg-teal-500/10', 'text-teal-400');
            this.classList.add('bg-green-500/10', 'text-green-400');
            
            // Show success message
            SkillRise.showToast('Successfully registered for the event!', 'success');
          }
        });
      });
    }
  });