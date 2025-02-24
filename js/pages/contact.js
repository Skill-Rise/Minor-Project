/**
 * Contact Page JavaScript
 * 
 * This file contains functionality specific to the contact page.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the contact form
    const contactForm = document.getElementById('contact-form');
    
    // Initialize the form
    if (contactForm) {
      // Add form submission handler
      contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Initialize FAQ accordion
    initializeFaqAccordion();
    
    /**
     * Handle contact form submission
     * @param {Event} event - Form submission event
     */
    function handleFormSubmit(event) {
      event.preventDefault();
      
      // Gather form data
      const formData = {
        firstName: document.getElementById('first-name').value.trim(),
        lastName: document.getElementById('last-name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value.trim(),
        consent: document.getElementById('consent').checked
      };
      
      // Validate the form
      const validationResult = validateForm(formData);
      
      if (validationResult.valid) {
        // In a real application, this would send the form data to a server
        submitFormData(formData);
      } else {
        // Display validation errors
        showFormErrors(validationResult.errors);
      }
    }
    
    /**
     * Validate the contact form
     * @param {Object} formData - Form data to validate
     * @returns {Object} Validation result object with valid flag and errors array
     */
    function validateForm(formData) {
      const errors = [];
      
      // Check required fields
      if (!formData.firstName) {
        errors.push('First name is required');
      }
      
      if (!formData.lastName) {
        errors.push('Last name is required');
      }
      
      if (!formData.email) {
        errors.push('Email address is required');
      } else if (!isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
      }
      
      if (!formData.subject) {
        errors.push('Please select a subject');
      }
      
      if (!formData.message) {
        errors.push('Message is required');
      } else if (formData.message.length < 10) {
        errors.push('Message must be at least 10 characters long');
      }
      
      if (!formData.consent) {
        errors.push('You must consent to our data collection policy');
      }
      
      return {
        valid: errors.length === 0,
        errors: errors
      };
    }
    
    /**
     * Check if an email address is valid
     * @param {string} email - Email address to validate
     * @returns {boolean} True if the email is valid
     */
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    /**
     * Display form validation errors
     * @param {Array} errors - Array of error messages
     */
    function showFormErrors(errors) {
      // Remove any existing error messages
      const existingErrors = contactForm.querySelector('.error-container');
      if (existingErrors) {
        existingErrors.remove();
      }
      
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
      contactForm.insertBefore(errorContainer, contactForm.firstChild);
      
      // Scroll to top of form
      errorContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    /**
     * Submit form data to the server
     * @param {Object} formData - Form data to submit
     */
    function submitFormData(formData) {
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';
      
      // In a real application, this would be an API call
      // For demo purposes, we'll simulate a server response with a timeout
      setTimeout(function() {
        // Simulate successful submission
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-container bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg p-4 mb-6';
        successMessage.innerHTML = `
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <p class="font-medium">Thank you for your message! We'll get back to you shortly.</p>
          </div>
        `;
        
        // Insert success message at the top of the form
        contactForm.insertBefore(successMessage, contactForm.firstChild);
        
        // Reset the form
        contactForm.reset();
        
        // Scroll to top of form
        successMessage.scrollIntoView({ behavior: 'smooth' });
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }, 1500);
    }
    
    /**
     * Initialize FAQ accordion functionality
     */
    function initializeFaqAccordion() {
      // FAQ toggle functionality is directly handled in the HTML file
      // with inline JavaScript for simplicity
      
      // This function could be extended to add more complex behavior
      // such as ensuring only one FAQ is open at a time
      
      /* Example of extending the behavior:
      
      const faqToggles = document.querySelectorAll('.faq-toggle');
      
      faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
          // Get the target content
          const targetId = toggle.getAttribute('data-target');
          const content = document.getElementById(targetId);
          
          // Close all other FAQs first (if we want only one open at a time)
          document.querySelectorAll('.faq-content').forEach(item => {
            if (item.id !== targetId) {
              item.classList.add('hidden');
              
              // Reset the icon for other toggles
              const otherToggle = document.querySelector(`[data-target="${item.id}"]`);
              if (otherToggle) {
                const otherIcon = otherToggle.querySelector('i');
                if (otherIcon) {
                  otherIcon.classList.remove('rotate-180');
                }
              }
            }
          });
          
          // Toggle the clicked FAQ
          content.classList.toggle('hidden');
          
          // Rotate the icon
          const icon = toggle.querySelector('i');
          if (content.classList.contains('hidden')) {
            icon.classList.remove('rotate-180');
          } else {
            icon.classList.add('rotate-180');
          }
        });
      });
      */
    }
  });