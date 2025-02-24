/**
 * Register Page JavaScript
 * 
 * This file contains functionality specific to the registration page.
 */

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
      registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const termsAccepted = document.getElementById('terms').checked;
        
        // Validate form
        let isValid = true;
        let errorMessages = [];
        
        // First name validation
        if (!firstName) {
          isValid = false;
          errorMessages.push('First name is required');
        }
        
        // Last name validation
        if (!lastName) {
          isValid = false;
          errorMessages.push('Last name is required');
        }
        
        // Email validation
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
        } else if (password.length < 8) {
          isValid = false;
          errorMessages.push('Password must be at least 8 characters long');
        }
        
        // Confirm password validation
        if (password !== confirmPassword) {
          isValid = false;
          errorMessages.push('Passwords do not match');
        }
        
        // Terms acceptance validation
        if (!termsAccepted) {
          isValid = false;
          errorMessages.push('You must accept the Terms of Service and Privacy Policy');
        }
        
        // If form is valid, proceed with registration
        if (isValid) {
          // In a real application, this would make an API call to register the user
          simulateRegistration(firstName, lastName, email, password);
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
        registerForm.insertBefore(errorContainer, registerForm.firstChild);
        
        // Scroll to top of form
        registerForm.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    /**
     * Simulate a registration process
     * @param {string} firstName - User's first name
     * @param {string} lastName - User's last name
     * @param {string} email - User's email
     * @param {string} password - User's password
     */
    function simulateRegistration(firstName, lastName, email, password) {
      // Show loading state
      const submitButton = registerForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Creating account...';
      
      // Simulate API call delay
      setTimeout(function() {
        // In a real application, you would send registration data to the server
        
        // Check if email is already registered
        // For demo purposes, we'll consider 'existing@skillrise.com' as an already registered email
        if (email === 'existing@skillrise.com') {
          // Email already exists
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
          
          showErrors(['This email is already registered. Please try logging in instead.']);
        } else {
          // Registration successful - redirect to onboarding or dashboard
          
          // Create a success message before redirecting
          const successMessage = document.createElement('div');
          successMessage.className = 'success-container bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg p-4 mb-6';
          successMessage.innerHTML = `
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p>Account created successfully! Redirecting to dashboard...</p>
            </div>
          `;
          
          // Remove any error messages
          const existingErrors = document.querySelector('.error-container');
          if (existingErrors) {
            existingErrors.remove();
          }
          
          // Insert success message at the top of the form
          registerForm.insertBefore(successMessage, registerForm.firstChild);
          
          // Redirect after a short delay
          setTimeout(function() {
            window.location.href = 'dashboard.html';
          }, 2000);
        }
      }, 2000); // Simulate a 2 second delay
    }
    
    // Add password strength meter functionality
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
      passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        updatePasswordStrengthIndicator(strength);
      });
    }
    
    /**
     * Calculate password strength score (0-100)
     * @param {string} password - Password to evaluate
     * @returns {number} Strength score from 0-100
     */
    function calculatePasswordStrength(password) {
      if (!password) return 0;
      
      let score = 0;
      
      // Length check
      score += Math.min(password.length * 5, 30);
      
      // Complexity checks
      if (/[A-Z]/.test(password)) score += 10; // Uppercase
      if (/[a-z]/.test(password)) score += 10; // Lowercase
      if (/[0-9]/.test(password)) score += 10; // Numbers
      if (/[^A-Za-z0-9]/.test(password)) score += 15; // Special characters
      
      // Variety check
      const uniqueChars = new Set(password.split('')).size;
      score += Math.min(uniqueChars * 2, 25);
      
      return Math.min(score, 100);
    }
    
    /**
     * Update password strength indicator
     * @param {number} strength - Password strength score (0-100)
     */
    function updatePasswordStrengthIndicator(strength) {
      // Check if the indicator element exists, create it if it doesn't
      let strengthIndicator = document.querySelector('.password-strength');
      
      if (!strengthIndicator) {
        // Create strength indicator elements
        const container = document.createElement('div');
        container.className = 'password-strength mt-2';
        
        const barContainer = document.createElement('div');
        barContainer.className = 'h-1 w-full bg-zinc-800 rounded-full overflow-hidden';
        
        const bar = document.createElement('div');
        bar.className = 'h-full transition-all duration-300';
        
        const label = document.createElement('div');
        label.className = 'text-xs mt-1 text-right';
        
        barContainer.appendChild(bar);
        container.appendChild(barContainer);
        container.appendChild(label);
        
        // Insert indicator after the password help text
        const helpText = document.querySelector('#password + p');
        if (helpText) {
          helpText.after(container);
        } else {
          const passwordField = document.querySelector('#password').parentNode;
          passwordField.appendChild(container);
        }
        
        strengthIndicator = container;
      }
      
      // Update the strength indicator
      const bar = strengthIndicator.querySelector('div > div');
      const label = strengthIndicator.querySelector('div + div');
      
      // Set bar color and width based on strength
      if (strength < 30) {
        bar.className = 'h-full bg-red-500 transition-all duration-300';
        bar.style.width = `${strength}%`;
        label.textContent = 'Weak';
        label.className = 'text-xs mt-1 text-right text-red-500';
      } else if (strength < 60) {
        bar.className = 'h-full bg-yellow-500 transition-all duration-300';
        bar.style.width = `${strength}%`;
        label.textContent = 'Moderate';
        label.className = 'text-xs mt-1 text-right text-yellow-500';
      } else {
        bar.className = 'h-full bg-green-500 transition-all duration-300';
        bar.style.width = `${strength}%`;
        label.textContent = 'Strong';
        label.className = 'text-xs mt-1 text-right text-green-500';
      }
    }
  });