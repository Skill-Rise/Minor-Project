/**
 * Profile Page JavaScript
 * 
 * This file contains functionality specific to the user profile page.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get UI elements
    const tabButtons = document.querySelectorAll('button[class*="text-zinc-400"]');
    const editProfileButton = document.querySelector('button:has(i[data-feather="edit-2"])');
    const shareProfileButton = document.querySelector('button:has(i[data-feather="share-2"])');
    const addSkillButton = document.querySelector('.text-teal-400:has(i[data-feather="plus"])');
    const notificationsBtn = document.getElementById('notifications-btn');
    const notificationsPanel = document.getElementById('notifications-panel');
    const closeNotificationsBtn = document.getElementById('close-notifications');
    
    // Sample notification data - in a real application, this would come from an API
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
    
    // Initialize the page
    initializeTabs();
    initializeNotifications();
    initializeActionButtons();
    
    /**
     * Initialize tab functionality
     */
    function initializeTabs() {
      if (!tabButtons.length) return;
      
      tabButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Get current active tab
          const activeTab = document.querySelector('button[class*="border-teal-400"]');
          
          // Remove active styling from current tab
          if (activeTab) {
            activeTab.classList.remove('border-b-2', 'border-teal-400', 'text-teal-400');
            activeTab.classList.add('text-zinc-400', 'hover:text-white', 'transition-colors');
          }
          
          // Add active styling to clicked tab
          this.classList.remove('text-zinc-400', 'hover:text-white', 'transition-colors');
          this.classList.add('border-b-2', 'border-teal-400', 'text-teal-400');
          
          // In a real application, this would load different content based on the selected tab
          // For this demo, we'll just show a toast message
          const tabName = this.textContent.trim();
          SkillRise.showToast(`${tabName} tab selected`, 'info');
        });
      });
    }
    
    /**
     * Initialize notifications functionality
     */
    function initializeNotifications() {
      if (!notificationsBtn || !notificationsPanel || !closeNotificationsBtn) return;
      
      // Toggle notifications panel
      notificationsBtn.addEventListener('click', function() {
        notificationsPanel.classList.toggle('hidden');
      });
      
      // Close notifications panel
      closeNotificationsBtn.addEventListener('click', function() {
        notificationsPanel.classList.add('hidden');
      });
      
      // Close panel when clicking outside
      notificationsPanel.addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.add('hidden');
        }
      });
      
      // Render notifications
      renderNotifications();
    }
    
    /**
     * Render notifications in the panel
     */
    function renderNotifications() {
      const notificationsList = document.getElementById('notifications-list');
      if (!notificationsList) return;
      
      // Generate HTML for notifications
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
      
      notificationsList.innerHTML = html;
      
      // Initialize Feather icons in the new content
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
      
      // Add event listeners to "Mark as Read" buttons
      const markAsReadButtons = notificationsList.querySelectorAll('button[data-notification-id]');
      markAsReadButtons.forEach(button => {
        button.addEventListener('click', function() {
          const id = parseInt(this.getAttribute('data-notification-id'));
          notifications[id].read = true;
          renderNotifications();
          
          // Update notification badge
          updateNotificationBadge();
        });
      });
      
      // Initialize notification badge
      updateNotificationBadge();
    }
    
    /**
     * Update the notification badge
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
    
    /**
     * Initialize action buttons
     */
    function initializeActionButtons() {
      // Edit Profile button
      if (editProfileButton) {
        editProfileButton.addEventListener('click', function() {
          // In a real application, this would open an edit profile form
          // For this demo, we'll just show a toast message
          SkillRise.showToast('Edit Profile functionality would open here', 'info');
        });
      }
      
      // Share Profile button
      if (shareProfileButton) {
        shareProfileButton.addEventListener('click', function() {
          // In a real application, this would open a sharing dialog
          // For this demo, we'll just show a toast message
          SkillRise.showToast('Profile sharing options would appear here', 'info');
        });
      }
      
      // Add Skill button
      if (addSkillButton) {
        addSkillButton.addEventListener('click', function() {
          // In a real application, this would open a form to add a new skill
          // For this demo, we'll show a simulated modal with a toast
          SkillRise.showToast('Add Skill functionality would open here', 'info');
        });
      }
      
      // Initialize Continue Learning buttons
      const continueButtons = document.querySelectorAll('button:contains("Continue Learning")');
      continueButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Get the course title from the parent element
          const courseElement = this.closest('.bg-zinc-900');
          const courseTitle = courseElement.querySelector('h4').textContent;
          
          // In a real application, this would navigate to the course player
          // For this demo, we'll just show a toast message
          SkillRise.showToast(`Continuing ${courseTitle}`, 'success');
        });
      });
      
      // Initialize View/Share Achievement buttons
      const achievementButtons = document.querySelectorAll('.bg-yellow-500/10 + button, .bg-teal-500/10 + button, .bg-purple-500/10 + button');
      achievementButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Get the achievement title from the parent element
          const achievementElement = this.closest('.bg-zinc-900');
          const achievementTitle = achievementElement.querySelector('h4').textContent;
          
          // In a real application, this would open a certificate viewer or sharing options
          // For this demo, we'll just show a toast message
          const buttonText = this.textContent.trim();
          if (buttonText.includes('View')) {
            SkillRise.showToast(`Viewing ${achievementTitle}`, 'info');
          } else if (buttonText.includes('Share')) {
            SkillRise.showToast(`Sharing options for ${achievementTitle}`, 'info');
          }
        });
      });
    }
    
    /**
     * Update learning activity chart (example of more complex UI enhancement)
     * This would use a charting library in a real application
     */
    function updateLearningActivityChart() {
      // This is a placeholder for a chart that would show learning activity over time
      // In a real application, you would use a library like Chart.js to render this
      console.log('Learning activity chart would be updated here');
    }
    
    /**
     * Update profile picture
     * @param {File} file - Image file to use as profile picture
     */
    function updateProfilePicture(file) {
      // This is a placeholder for uploading and updating the profile picture
      // In a real application, you would upload the file to a server and update the UI
      console.log('Profile picture would be updated with:', file);
    }
  });