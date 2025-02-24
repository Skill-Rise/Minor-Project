/**
 * Dropdown Component
 * 
 * This file contains functions for creating and managing dropdown menus
 * across the application.
 */

const Dropdown = {
    /**
     * Initialize a dropdown with options
     * @param {string} dropdownId - ID of the dropdown container element
     * @param {Array} options - Array of option strings
     * @param {string} selectedValue - Initially selected value
     * @param {Function} onSelect - Callback function when an option is selected
     */
    init: function(dropdownId, options, selectedValue, onSelect) {
      const dropdownContainer = document.getElementById(dropdownId);
      if (!dropdownContainer) return;
      
      const button = dropdownContainer.querySelector('button');
      const menu = dropdownContainer.querySelector('.dropdown-menu');
      const selectedElement = button.querySelector('.selected-category, .selected-level');
      
      if (!button || !menu || !selectedElement) return;
      
      // Set initial selected value
      if (selectedElement) {
        selectedElement.textContent = selectedValue;
      }
      
      // Populate options
      this.populateOptions(menu, options, selectedValue, (value) => {
        if (selectedElement) {
          selectedElement.textContent = value;
        }
        
        // Close dropdown
        menu.classList.add('hidden');
        
        // Call the onSelect callback
        if (typeof onSelect === 'function') {
          onSelect(value);
        }
      });
      
      // Toggle dropdown on button click
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
      
      // Prevent dropdown from closing when clicking inside the menu
      menu.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    },
    
    /**
     * Populate dropdown options
     * @param {HTMLElement} menu - Dropdown menu element
     * @param {Array} options - Array of option strings
     * @param {string} selectedValue - Currently selected value
     * @param {Function} onClick - Callback function when an option is clicked
     */
    populateOptions: function(menu, options, selectedValue, onClick) {
      let html = '';
      
      options.forEach(option => {
        const isSelected = option === selectedValue;
        html += `
          <button
            class="w-full px-4 py-2 text-left hover:bg-zinc-800 transition-colors ${isSelected ? 'text-teal-400' : ''}"
            data-value="${option}"
          >
            ${option}
          </button>
        `;
      });
      
      menu.innerHTML = html;
      
      // Add click event listeners to options
      const optionButtons = menu.querySelectorAll('button');
      optionButtons.forEach(button => {
        button.addEventListener('click', () => {
          const value = button.getAttribute('data-value');
          if (typeof onClick === 'function') {
            onClick(value);
          }
        });
      });
    },
    
    /**
     * Create a custom dropdown
     * @param {string} id - ID for the dropdown container
     * @param {string} label - Label text for the dropdown button
     * @param {string} icon - Feather icon name
     * @param {Array} options - Array of option strings
     * @param {string} selectedValue - Initially selected value
     * @returns {string} HTML string for the dropdown
     */
    create: function(id, label, icon, options, selectedValue) {
      const optionsHtml = options.map(option => {
        const isSelected = option === selectedValue;
        return `
          <button
            class="w-full px-4 py-2 text-left hover:bg-zinc-800 transition-colors ${isSelected ? 'text-teal-400' : ''}"
            data-value="${option}"
          >
            ${option}
          </button>
        `;
      }).join('');
      
      return `
        <div class="relative" id="${id}">
          <button 
            class="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center gap-2"
          >
            <i data-feather="${icon}" class="w-5 h-5"></i>
            <span class="selected-value">${selectedValue}</span>
            <i data-feather="chevron-down" class="w-4 h-4"></i>
          </button>
          <div class="dropdown-menu hidden absolute mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-10">
            ${optionsHtml}
          </div>
        </div>
      `;
    },
    
    /**
     * Create a simplified dropdown for filtering
     * @param {string} id - ID for the dropdown container
     * @param {string} label - Label for the dropdown
     * @param {Array} options - Array of option strings
     * @returns {string} HTML string for the filter dropdown
     */
    createFilterDropdown: function(id, label, options) {
      const optionsHtml = options.map(option => {
        return `<option value="${option}">${option}</option>`;
      }).join('');
      
      return `
        <div class="relative" id="${id}">
          <label for="${id}-select" class="block text-sm font-medium text-zinc-400 mb-1">${label}</label>
          <select 
            id="${id}-select"
            class="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-teal-500 appearance-none"
            style="background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%2365656b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>'); background-position: right 1rem center; background-repeat: no-repeat; background-size: 1em;"
          >
            ${optionsHtml}
          </select>
        </div>
      `;
    },
    
    /**
     * Handle the dropdown selection
     * @param {Event} event - Click event
     * @param {string} dropdownId - ID of the dropdown container
     * @param {Function} callback - Callback function with selected value
     */
    handleSelect: function(event, dropdownId, callback) {
      event.preventDefault();
      const value = event.target.getAttribute('data-value');
      const dropdown = document.getElementById(dropdownId);
      
      if (dropdown && value) {
        const selectedElement = dropdown.querySelector('.selected-value');
        if (selectedElement) {
          selectedElement.textContent = value;
        }
        
        if (typeof callback === 'function') {
          callback(value);
        }
      }
    }
  };
  
  // Export the Dropdown object for use in other scripts
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Dropdown;
  }