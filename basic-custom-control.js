/**
 * Basic Custom Control Module for IBM Cognos Analytics v11
 * This is a simple example of a CustomControl Module interface
 * 
 * Usage:
 * 1. Upload this file to your Cognos server
 * 2. In Report Studio, add a Custom Control
 * 3. Set Module path to the location of this file
 * 4. Configure using the Configuration property with JSON
 */

define(function() {
    'use strict';

    /**
     * Basic Custom Control Implementation
     * @param {Object} oControlHost - The control host object provided by Cognos
     * @param {HTMLElement} oControlHost.container - The container element for the control
     * @param {Object} oControlHost.configuration - Configuration object from Cognos
     * @param {Function} oControlHost.finish - Callback to signal control is ready
     */
    function BasicCustomControl(oControlHost) {
        // Store references
        this.container = oControlHost.container;
        this.configuration = oControlHost.configuration || {};
        this.finish = oControlHost.finish;
        
        // Default configuration
        this.config = {
            title: 'Custom Control',
            backgroundColor: '#f0f0f0',
            textColor: '#333333',
            orientation: 'horizontal',
            width: '200px',
            height: '50px',
            ...this.configuration
        };
        
        // Initialize the control
        this.init();
    }

    BasicCustomControl.prototype = {
        /**
         * Initialize the custom control
         */
        init: function() {
            try {
                this.createUI();
                this.attachEvents();
                
                // Signal that the control is ready
                if (this.finish) {
                    this.finish();
                }
            } catch (error) {
                console.error('Error initializing custom control:', error);
            }
        },

        /**
         * Create the user interface
         */
        createUI: function() {
            // Clear container
            this.container.innerHTML = '';
            
            // Create main wrapper
            var wrapper = document.createElement('div');
            wrapper.className = 'cognos-custom-control';
            wrapper.style.cssText = `
                background-color: ${this.config.backgroundColor};
                color: ${this.config.textColor};
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
                width: ${this.config.width};
                height: ${this.config.height};
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: ${this.config.orientation === 'vertical' ? 'column' : 'row'};
                font-family: Arial, sans-serif;
                box-sizing: border-box;
            `;

            // Create title
            var title = document.createElement('div');
            title.textContent = this.config.title;
            title.style.cssText = `
                font-weight: bold;
                margin-bottom: ${this.config.orientation === 'vertical' ? '5px' : '0'};
                margin-right: ${this.config.orientation === 'horizontal' ? '10px' : '0'};
            `;

            // Create button
            var button = document.createElement('button');
            button.textContent = 'Click Me';
            button.className = 'custom-control-button';
            button.style.cssText = `
                background-color: #007acc;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 3px;
                cursor: pointer;
                font-size: 12px;
            `;

            // Create status display
            var status = document.createElement('div');
            status.className = 'status-display';
            status.textContent = 'Ready';
            status.style.cssText = `
                font-size: 11px;
                margin-top: ${this.config.orientation === 'vertical' ? '5px' : '0'};
                margin-left: ${this.config.orientation === 'horizontal' ? '10px' : '0'};
                color: #666;
            `;

            // Append elements
            wrapper.appendChild(title);
            wrapper.appendChild(button);
            wrapper.appendChild(status);
            
            this.container.appendChild(wrapper);
            
            // Store references for later use
            this.button = button;
            this.status = status;
        },

        /**
         * Attach event handlers
         */
        attachEvents: function() {
            var self = this;
            
            if (this.button) {
                this.button.addEventListener('click', function() {
                    self.handleButtonClick();
                });
                
                this.button.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = '#005a9e';
                });
                
                this.button.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = '#007acc';
                });
            }
        },

        /**
         * Handle button click event
         */
        handleButtonClick: function() {
            var timestamp = new Date().toLocaleTimeString();
            this.status.textContent = `Clicked at ${timestamp}`;
            
            // You can add parameter setting logic here
            console.log('Custom control button clicked');
            
            // Example: Trigger a report refresh or parameter update
            // This would depend on your specific Cognos integration
        },

        /**
         * Method to update configuration dynamically
         * @param {Object} newConfig - New configuration object
         */
        updateConfig: function(newConfig) {
            this.config = { ...this.config, ...newConfig };
            this.createUI();
            this.attachEvents();
        },

        /**
         * Method to get current state
         * @returns {Object} Current state of the control
         */
        getState: function() {
            return {
                config: this.config,
                lastClicked: this.status ? this.status.textContent : null
            };
        },

        /**
         * Cleanup method
         */
        destroy: function() {
            if (this.container) {
                this.container.innerHTML = '';
            }
        }
    };

    // Return the constructor function
    return BasicCustomControl;
});
