/**
 * Main Application Entry Point
 * 
 * Initializes the Jarvis Console application.
 */

class JarvisApp {
  constructor() {
    this.apiService = null;
    this.agentList = null;
    this.selectedAgent = null;
    this.logElement = null;
    this.commandForm = null;
    this.commandInput = null;
    this.isSubmitting = false;
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      // Wait for config to load
      if (!window.AppConfig) {
        console.warn('AppConfig not loaded, using defaults');
      }

      // Initialize services
      this.apiService = new window.ApiService(window.AppConfig?.api);
      
      // Get DOM elements
      this.logElement = document.getElementById('log');
      this.commandForm = document.getElementById('command-form');
      this.commandInput = document.getElementById('command-input');
      const agentListContainer = document.getElementById('agent-list-container');

      // Initialize agent list
      if (agentListContainer) {
        this.agentList = new window.AgentList(
          'agent-list-container',
          window.AppConfig?.agents,
          (agent) => this.onAgentSelect(agent)
        );
        this.agentList.render();
        
        // Select first agent by default
        const firstAgent = window.AppConfig?.agents?.find(a => a.enabled);
        if (firstAgent) {
          this.agentList.selectAgent(firstAgent.id);
        }
      }

      // Setup form handler
      if (this.commandForm) {
        this.commandForm.addEventListener('submit', (e) => this.handleSubmit(e));
      }

      // Setup htmx event listeners
      this.setupHtmxListeners();

      // Display initialization message
      this.displaySystemMessage('Jarvis Console initialized. Ready for commands.');

      console.log('Jarvis Console initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Jarvis Console:', error);
      window.ErrorHandler?.displayError(
        window.ErrorHandler.handleApiError(error),
        this.logElement
      );
    }
  }

  /**
   * Handle agent selection
   */
  onAgentSelect(agent) {
    this.selectedAgent = agent;
    const agentInput = document.getElementById('agent-input');
    const selectedAgentDisplay = document.getElementById('selected-agent');
    
    if (agentInput) {
      agentInput.value = agent.id;
    }
    
    if (selectedAgentDisplay) {
      selectedAgentDisplay.textContent = agent.name;
    }
  }

  /**
   * Handle form submission
   */
  async handleSubmit(event) {
    event.preventDefault();

    // Prevent double submission
    if (this.isSubmitting) {
      return;
    }

    const command = this.commandInput?.value?.trim();
    const validation = this.apiService.validateCommand(command);

    if (!validation.valid) {
      window.ErrorHandler?.displayError(
        { userMessage: `⚠️ ${validation.error}` },
        this.logElement
      );
      return;
    }

    if (!this.selectedAgent) {
      window.ErrorHandler?.displayError(
        { userMessage: '⚠️ Please select an agent first.' },
        this.logElement
      );
      return;
    }

    // Disable form during request
    this.isSubmitting = true;
    this.setFormEnabled(false);

    try {
      // Display user command in log
      this.displayUserCommand(command);

      // Send command via API
      const response = await this.apiService.sendCommand(
        this.selectedAgent.id,
        command
      );

      // Handle response (htmx will handle HTML responses)
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          this.displayResponse(data);
        }
        // If HTML, htmx will handle it automatically
      }

      // Clear input
      this.commandInput.value = '';
    } catch (error) {
      const errorInfo = window.ErrorHandler?.handleApiError(error);
      window.ErrorHandler?.displayError(errorInfo, this.logElement);
    } finally {
      this.isSubmitting = false;
      this.setFormEnabled(true);
      this.commandInput?.focus();
    }
  }

  /**
   * Display user command in log
   */
  displayUserCommand(command) {
    if (!this.logElement) return;

    this._enforceLogLimit();

    const html = `
      <div class="p-3 rounded-md bg-slate-800 border border-slate-700">
        <div class="text-xs text-jarvis-blue uppercase mb-1">You</div>
        <div class="text-slate-300">${this.escapeHtml(command)}</div>
      </div>
    `;

    this.logElement.insertAdjacentHTML('beforeend', html);
    this.scrollLogToBottom();
  }

  /**
   * Display API response
   */
  displayResponse(data) {
    if (!this.logElement) return;

    this._enforceLogLimit();

    const html = `
      <div class="p-3 rounded-md bg-slate-800 border border-slate-700">
        <div class="text-xs text-jarvis-green uppercase mb-1">${this.escapeHtml(this.selectedAgent?.name || 'Agent')}</div>
        <div class="text-slate-300">${this.escapeHtml(JSON.stringify(data, null, 2))}</div>
      </div>
    `;

    this.logElement.insertAdjacentHTML('beforeend', html);
    this.scrollLogToBottom();
  }

  /**
   * Display system message
   */
  displaySystemMessage(message) {
    if (!this.logElement) return;

    this._enforceLogLimit();

    const html = `
      <div class="p-3 rounded-md bg-slate-800 border border-slate-700">
        <div class="text-xs text-jarvis-green uppercase mb-1">System</div>
        <div class="text-slate-300">${this.escapeHtml(message)}</div>
      </div>
    `;

    this.logElement.insertAdjacentHTML('beforeend', html);
    this.scrollLogToBottom();
  }

  /**
   * Enforce log entry limit to prevent memory issues
   * @private
   */
  _enforceLogLimit() {
    if (!this.logElement) return;

    const maxEntries = window.AppConfig?.ui?.log?.maxEntries || 100;
    const entries = this.logElement.children;

    if (entries.length >= maxEntries) {
      // Remove oldest entries (keep last maxEntries - 10 for buffer)
      const removeCount = entries.length - (maxEntries - 10);
      Array.from(entries)
        .slice(0, removeCount)
        .forEach(entry => entry.remove());
    }
  }

  /**
   * Setup htmx event listeners
   */
  setupHtmxListeners() {
    // Auto-scroll on htmx updates
    document.body.addEventListener('htmx:afterSwap', () => {
      this.scrollLogToBottom();
    });

    // Handle htmx errors
    document.body.addEventListener('htmx:responseError', (event) => {
      const errorInfo = window.ErrorHandler?.handleApiError({
        message: `HTTP error: ${event.detail.xhr.status}`,
      });
      window.ErrorHandler?.displayError(errorInfo, this.logElement);
    });
  }

  /**
   * Enable/disable form
   */
  setFormEnabled(enabled) {
    if (this.commandInput) {
      this.commandInput.disabled = !enabled;
    }
    const submitButton = this.commandForm?.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = !enabled;
    }
  }

  /**
   * Scroll log to bottom
   */
  scrollLogToBottom() {
    if (this.logElement) {
      this.logElement.scrollTop = this.logElement.scrollHeight;
    }
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Global error handlers
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  if (window.jarvisApp?.logElement) {
    window.ErrorHandler?.displayError({
      userMessage: '⚠️ An unexpected error occurred. Please refresh the page.'
    }, window.jarvisApp.logElement);
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  if (window.jarvisApp?.logElement) {
    window.ErrorHandler?.displayError({
      userMessage: '⚠️ An unexpected error occurred. Please try again.'
    }, window.jarvisApp.logElement);
  }
});

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new JarvisApp();
    app.init();
    window.jarvisApp = app; // Make available globally for debugging
  });
} else {
  const app = new JarvisApp();
  app.init();
  window.jarvisApp = app;
}

