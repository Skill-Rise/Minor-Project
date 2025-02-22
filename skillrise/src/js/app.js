/**
 * SkillRise - Main Application JavaScript
 * 
 * This file contains global utility functions and initialization
 * code that is used across the entire application.
 */

// Global application namespace
const SkillRise = {
    // Application configuration
    config: {
      apiUrl: 'https://api.skillrise.com/v1', // This would be the API URL in a real application
      debug: true,
      currency: 'USD'
    },
    
    // Initialize the application
    init: function() {
      // Initialize mobile menu
      this.initMobileMenu();
      
      // Initialize dropdowns
      this.initDropdowns();
      
      // Initialize tooltips
      this.initTooltips();
      
      // Initialize notifications
      this.initNotifications();
      
      // Log initialization
      if (this.config.debug) {
        console.log('SkillRise application initialized');
      }
    },
    
    // Mobile menu toggle
    initMobileMenu: function() {
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      const mobileMenu = document.querySelector('.mobile-menu');
      
      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
          mobileMenu.classList.toggle('hidden');
        });
      }
    },
    
    // Initialize dropdown menus
    initDropdowns: function() {
      const dropdownBtns = document.querySelectorAll('.dropdown-btn');
      
      dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const dropdown = this.nextElementSibling;
          dropdown.classList.toggle('hidden');
        });
      });
      
      // Close dropdowns when clicking outside
      document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown-container')) {
          dropdownBtns.forEach(btn => {
            const dropdown = btn.nextElementSibling;
            if (dropdown && !dropdown.classList.contains('hidden')) {
              dropdown.classList.add('hidden');
            }
          });
        }
      });
    },
    
    // Initialize tooltips
    initTooltips: function() {
      const tooltips = document.querySelectorAll('[data-tooltip]');
      
      tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
          const tooltipText = this.getAttribute('data-tooltip');
          
          if (tooltipText) {
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip absolute bg-zinc-800 text-white text-xs py-1 px-2 rounded z-50';
            tooltipEl.innerText = tooltipText;
            
            document.body.appendChild(tooltipEl);
            
            const rect = this.getBoundingClientRect();
            tooltipEl.style.top = rect.bottom + 5 + 'px';
            tooltipEl.style.left = rect.left + (rect.width / 2) - (tooltipEl.offsetWidth / 2) + 'px';
          }
        });
        
        tooltip.addEventListener('mouseleave', function() {
          const tooltipEl = document.querySelector('.tooltip');
          if (tooltipEl) {
            tooltipEl.remove();
          }
        });
      });
    },
    
    // Initialize notifications
    initNotifications: function() {
      const notificationBtns = document.querySelectorAll('#notifications-btn');
      const notificationsPanel = document.querySelector('#notifications-panel');
      const closeNotificationsBtn = document.querySelector('#close-notifications');
      
      if (notificationBtns.length && notificationsPanel) {
        notificationBtns.forEach(btn => {
          btn.addEventListener('click', function() {
            notificationsPanel.classList.toggle('hidden');
          });
        });
        
        if (closeNotificationsBtn) {
          closeNotificationsBtn.addEventListener('click', function() {
            notificationsPanel.classList.add('hidden');
          });
        }
      }
    },
    
    // Utility function to format currency
    formatCurrency: function(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: this.config.currency
      }).format(amount);
    },
    
    // Utility function to format date
    formatDate: function(date) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(date));
    },
    
    // Utility function to format time
    formatTime: function(date) {
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }).format(new Date(date));
    },
    
    // Utility function to show a toast notification
    showToast: function(message, type = 'info', duration = 3000) {
      const toast = document.createElement('div');
      toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg z-50 ${
        type === 'success' ? 'bg-teal-500' : 
        type === 'error' ? 'bg-red-500' : 
        type === 'warning' ? 'bg-yellow-500' : 
        'bg-zinc-800'
      }`;
      toast.innerText = message;
      
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => {
          toast.remove();
        }, 300);
      }, duration);
    }
  };
  
  // Initialize the application when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    SkillRise.init();
  });