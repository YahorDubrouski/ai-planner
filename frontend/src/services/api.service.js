/**
 * API Service
 * 
 * Handles all communication with n8n webhooks.
 * Provides error handling, retry logic, and request formatting.
 */

class ApiService {
  constructor(config) {
    this.config = config || window.AppConfig?.api || {};
    this.baseUrl = this.config.baseUrl || 'http://n8n.loc';
    this.webhookPath = this.config.webhookPath || '/webhook/jarvis/command';
    this.timeout = this.config.timeout || 30000;
    this.retryAttempts = this.config.retryAttempts || 3;
    this.retryDelay = this.config.retryDelay || 1000;
  }

  /**
   * Get full webhook URL
   */
  getWebhookUrl() {
    return `${this.baseUrl}${this.webhookPath}`;
  }

  /**
   * Send command to n8n webhook
   * @param {string} agent - Agent ID
   * @param {string} command - User command
   * @param {object} context - Additional context (optional)
   * @returns {Promise<Response>}
   */
  async sendCommand(agent, command, context = {}) {
    const url = this.getWebhookUrl();
    const payload = {
      agent,
      command: command.trim(),
      context,
      timestamp: new Date().toISOString(),
    };

    return this._requestWithRetry(url, payload);
  }

  /**
   * Make HTTP request with retry logic
   * @private
   */
  async _requestWithRetry(url, payload, attempt = 1) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      if (attempt < this.retryAttempts && error.name !== 'AbortError') {
        await this._delay(this.retryDelay * attempt);
        return this._requestWithRetry(url, payload, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * Delay helper for retries
   * @private
   */
  _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Validate command before sending
   */
  validateCommand(command) {
    if (!command || typeof command !== 'string') {
      return { valid: false, error: 'Command must be a non-empty string' };
    }

    const trimmed = command.trim();
    if (trimmed.length === 0) {
      return { valid: false, error: 'Command cannot be empty' };
    }

    if (trimmed.length > 1000) {
      return { valid: false, error: 'Command is too long (max 1000 characters)' };
    }

    return { valid: true };
  }
}

// Export for ES6 modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ApiService;
}

// Make available globally
window.ApiService = ApiService;
