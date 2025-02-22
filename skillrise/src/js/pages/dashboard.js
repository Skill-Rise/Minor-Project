/**
 * Dashboard Page JavaScript
 * 
 * This file contains functionality specific to the student dashboard page.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sample data - in a real application, this would come from an API
    const ongoingCourses = [
      {
        id: 1,
        title: "Complete Web Development Bootcamp",
        progress: 65,
        instructor: "Sarah Johnson",
        lastAccessed: "2 days ago",
        totalLessons: 48,
        completedLessons: 31,
        imageUrl: "/api/placeholder/400/250"
      },
      {
        id: 2,
        title: "UI/UX Design Masterclass",
        progress: 32,
        instructor: "Michael Chen",
        lastAccessed: "5 days ago",
        totalLessons: 36,
        completedLessons: 12,
        imageUrl: "/api/placeholder/400/250"
      }
    ];
    
    const upcomingClasses = [
      {
        title: "Advanced CSS Layouts",
        course: "Web Development",
        time: "Today, 2:00 PM",
        icon: "layout"
      },
      {
        title: "User Research Workshop",
        course: "UI/UX Design",
        time: "Tomorrow, 10:00 AM",
        icon: "users"
      }
    ];
    
    const achievements = [
      {
        title: "Web Development Certificate",
        description: "Completed Feb 2025",
        type: "certificate",
        icon: "award",
        iconColor: "yellow"
      },
      {
        title: "Perfect Score Badge",
        description: "Web Dev Quiz",
        type: "badge",
        icon: "award",
        iconColor: "teal"
      }
    ];
    
    const notifications = [
      {
        title: "Assignment Feedback",
        message: "Your CSS Grid assignment has been reviewed. Check your feedback.",
        time: "30 minutes ago",
        read: false,
        course: "Web Development Bootcamp",
        icon: "file-text"
      },
      {
        title: "Live Session Reminder",
        message: "Don't forget about your upcoming live session on User Research Methods.",
        time: "2 hours ago",
        read: true,
        course: "UI/UX Design Masterclass",
        icon: "clock"
      },
      {
        title: "New Course Announcement",
        message: "Check out our new Machine Learning course with 30% early bird discount!",
        time: "Yesterday",
        read: true,
        course: "",
        icon: "bell"
      }
    ];
    
    // Render ongoing courses
    renderOngoingCourses();
    
    // Render upcoming classes
    renderUpcomingClasses();
    
    // Render achievements
    renderAchievements();
    
    // Render notifications (initially hidden)
    renderNotifications();
    
    // Initialize notifications panel
    initializeNotificationsPanel();
    
    /**
     * Render ongoing courses in the dashboard
     */
    function renderOngoingCourses() {
      const ongoingCoursesContainer = document.getElementById('ongoing-courses');
      if (!ongoingCoursesContainer) return;
      
      let html = '';
      
      ongoingCourses.forEach(course => {
        html += `
          <div class="bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800/50 hover:border-zinc-700/50 transition-all hover:shadow-lg hover:shadow-teal-500/5">
            <div class="relative aspect-video">
              <img src="${course.imageUrl}" alt="${course.title}" class="w-full h-full object-cover">
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
      });
      
      ongoingCoursesContainer.innerHTML = html;
      
      // Initialize Feather icons in the new cards
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    }
    
    /**
     * Render upcoming classes in the dashboard
     */
    function renderUpcomingClasses() {
      const upcomingClassesContainer = document.getElementById('upcoming-classes');
      if (!upcomingClassesContainer) return;
      
      let html = '';
      
      upcomingClasses.forEach(upcomingClass => {
        html += `
          <div class="flex items-start gap-4 p-4 rounded-lg bg-zinc-800/50 backdrop-blur-sm">
            <div class="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0">
              <i data-feather="${upcomingClass.icon}" class="w-6 h-6"></i>
            </div>
            <div>
              <p class="font-medium">${upcomingClass.title}</p>
              <p class="text-sm text-zinc-400">${upcomingClass.course}</p>
              <p class="text-sm text-teal-400 mt-1">${upcomingClass.time}</p>
            </div>
          </div>
        `;
      });
      
      upcomingClassesContainer.innerHTML = html;
      
      // Initialize Feather icons
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    }
    
    /**
     * Render achievements in the dashboard
     */
    function renderAchievements() {
      const achievementsContainer = document.getElementById('achievements');
      if (!achievementsContainer) return;
      
      let html = '';
      
      achievements.forEach(achievement => {
        html += `
          <div class="flex items-start gap-4 p-4 rounded-lg bg-zinc-800/50 backdrop-blur-sm">
            <div class="w-12 h-12 rounded-xl bg-${achievement.iconColor}-500/10 flex items-center justify-center text-${achievement.iconColor}-400 shrink-0">
              <i data-feather="${achievement.icon}" class="w-6 h-6"></i>
            </div>
            <div>
              <p class="font-medium">${achievement.title}</p>
              <p class="text-sm text-zinc-400">${achievement.description}</p>
              ${achievement.type === 'certificate' ? `
                <button class="mt-2 px-3 py-1 bg-${achievement.iconColor}-500/10 text-${achievement.iconColor}-500 rounded-md text-sm">
                  View Certificate
                </button>
              ` : ''}
            </div>
          </div>
        `;
      });
      
      achievementsContainer.innerHTML = html;
      
      // Initialize Feather icons
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    }
    
    /**
     * Render notifications in the notifications panel
     */
    function renderNotifications() {
      const notificationsContainer = document.getElementById('notifications-list');
      if (!notificationsContainer) return;
      
      let html = '';
      
      if (notifications.length === 0) {
        html = `
          <div class="text-center py-8">
            <i data-feather="bell-off" class="w-12 h-12 mx-auto text-zinc-700 mb-4"></i>
            <p class="text-zinc-400">No notifications yet</p>
          </div>
        `;
      } else {
        notifications.forEach((notification, index) => {
          html += `
            <div class="flex gap-4 p-4 rounded-lg ${notification.read ? 'bg-zinc-800/30' : 'bg-zinc-800/50 border border-teal-500/30'}">
              <div class="w-10 h-10 rounded-lg ${notification.read ? 'bg-zinc-700/50' : 'bg-teal-500/10'} flex items-center justify-center ${notification.read ? 'text-zinc-400' : 'text-teal-400'} shrink-0">
                <i data-feather="${notification.icon}" class="w-5 h-5"></i>
              </div>
              <div>
                <div class="flex items-center justify-between">
                  <p class="font-medium">${notification.title}</p>
                  <span class="text-xs text-zinc-500">${notification.time}</span>
                </div>
                <p class="text-sm text-zinc-400 mt-1">${notification.message}</p>
                ${notification.course ? `<p class="text-xs text-teal-400 mt-1">${notification.course}</p>` : ''}
                <div class="flex gap-2 mt-3">
                  <button class="text-xs px-2 py-1 bg-zinc-700 rounded hover:bg-zinc-600 transition-colors">
                    View
                  </button>
                  ${!notification.read ? `
                    <button class="text-xs px-2 py-1 bg-zinc-700 rounded hover:bg-zinc-600 transition-colors" data-notification-id="${index}">
                      Mark as Read
                    </button>
                  ` : ''}
                </div>
              </div>
            </div>
          `;
        });
      }
      
      notificationsContainer.innerHTML = html;
      
      // Initialize Feather icons
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
      
      // Add event listeners to "Mark as Read" buttons
      const markAsReadButtons = notificationsContainer.querySelectorAll('button[data-notification-id]');
      markAsReadButtons.forEach(button => {
        button.addEventListener('click', function() {
          const id = parseInt(this.getAttribute('data-notification-id'));
          notifications[id].read = true;
          renderNotifications();
        });
      });
    }
    
    /**
     * Initialize the notifications panel with toggle functionality
     */
    function initializeNotificationsPanel() {
      const notificationsBtn = document.getElementById('notifications-btn');
      const notificationsPanel = document.getElementById('notifications-panel');
      const closeNotificationsBtn = document.getElementById('close-notifications');
      
      if (notificationsBtn && notificationsPanel) {
        notificationsBtn.addEventListener('click', function() {
          notificationsPanel.classList.remove('hidden');
        });
        
        if (closeNotificationsBtn) {
          closeNotificationsBtn.addEventListener('click', function() {
            notificationsPanel.classList.add('hidden');
          });
        }
        
        // Close panel when clicking outside
        notificationsPanel.addEventListener('click', function(e) {
          if (e.target === this) {
            this.classList.add('hidden');
          }
        });
      }
      
      // Update notification badge
      updateNotificationBadge();
    }
    
    /**
     * Update the notification badge count
     */
    function updateNotificationBadge() {
      const notificationBadge = document.querySelector('#notifications-btn .absolute');
      if (!notificationBadge) return;
      
      const unreadCount = notifications.filter(notification => !notification.read).length;
      
      if (unreadCount > 0) {
        notificationBadge.classList.remove('hidden');
      } else {
        notificationBadge.classList.add('hidden');
      }
    }
  });