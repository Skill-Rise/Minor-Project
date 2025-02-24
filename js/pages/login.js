/**
 * Login Page JavaScript
 * 
 * This file contains functionality specific to the login page.
 */

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Validate form
        let isValid = true;
        let errorMessages = [];
        
        // Simple email validation
        if (!email) {
          isValid = false;
          errorMessages.push('Email is required');
        } else if (!isValidEmail(email)) {
          isValid = false;
          errorMessages.push('Please enter a valid email address');
        }
        
        // Password validation
        if (!password) {
          isValid = false;
          errorMessages.push('Password is required');
        }
        
        // If form is valid, proceed with login
        if (isValid) {
          // In a real application, this would make an API call to authenticate
          simulateLogin(email, password, remember);
        } else {
          // Display error messages
          showErrors(errorMessages);
        }
      });
    }
    
    /**
     * Validate email format
     * @param {string} email - Email address to validate
     * @returns {boolean} True if email is valid
     */
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    /**
     * Show error messages in UI
     * @param {Array} errors - Array of error message strings
     */
    function showErrors(errors) {
      // Remove any existing error messages
      const existingErrors = document.querySelector('.error-container');
      if (existingErrors) {
        existingErrors.remove();
      }
      
      if (errors.length > 0) {
        // Create error container
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-container bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-4 mb-6';
        
        // Add error messages
        let errorHTML = '<ul class="list-disc list-inside">';
        errors.forEach(error => {
          errorHTML += `<li>${error}</li>`;
        });
        errorHTML += '</ul>';
        
        errorContainer.innerHTML = errorHTML;
        
        // Insert error container at the top of the form
        loginForm.insertBefore(errorContainer, loginForm.firstChild);
        
        // Scroll to top of form
        loginForm.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    /**
     * Simulate a login process
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @param {boolean} remember - Whether to remember the user
     */
    function simulateLogin(email, password, remember) {
      // Show loading state
      const submitButton = loginForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Signing in...';
      
      // Simulate API call delay
      setTimeout(function() {
        // In a real application, you would validate credentials against the server
        // For demo purposes, we'll consider these credentials valid
        const validCredentials = {
          email: 'demo@skillrise.com',
          password: 'password123'
        };
        
        if (email === validCredentials.email && password === validCredentials.password) {
          // Success - redirect to dashboard
          window.location.href = 'dashboard.html';
        } else {
          // Failed login
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
          
          showErrors(['Invalid email or password. Please try again.']);
        }
      }, 1500); // Simulate a 1.5 second delay
    }
  });