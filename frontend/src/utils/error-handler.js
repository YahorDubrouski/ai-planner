/**
 * Error Handler Utility
 * 
 * Centralized error handling and user-friendly error messages.
 */

class ErrorHandler {
  /**
   * Handle API errors and return user-friendly message
   */
  static handleApiError(error) {
    console.error('API Error:', error);

    if (error.name === 'AbortError') {
      return {
        type: 'timeout',
        message: 'Request timed out. Please try again.',
        userMessage: '⏱️ The request took too long. Please try again.',
      };
    }

    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return {
        type: 'network',
        message: 'Network error - unable to reach server',
        userMessage: '🌐 Unable to connect to server. Please check your connection.',
      };
    }

    if (error.message.includes('HTTP error')) {
      const statusMatch = error.message.match(/status: (\d+)/);
      const status = statusMatch ? statusMatch[1] : 'unknown';

      return {
        type: 'http',
        message: `HTTP error: ${status}`,
        userMessage: `❌ Server error (${status}). Please try again later.`,
      };
    }

    return {
      type: 'unknown',
      message: error.message || 'Unknown error',
      userMessage: '⚠️ An unexpected error occurred. Please try again.',
    };
  }

  /**
   * Display error in UI
   */
  static displayError(errorInfo, logElement) {
    if (!logElement) return;

    const errorHtml = `
      <div class="p-3 rounded-md bg-red-900/20 border border-red-700">
        <div class="text-xs text-red-400 uppercase mb-1">Error</div>
        <div class="text-slate-300">${errorInfo.userMessage}</div>
      </div>
    `;

    logElement.insertAdjacentHTML('beforeend', errorHtml);
    this._scrollToBottom(logElement);
  }

  /**
   * Display success message
   */
  static displaySuccess(message, logElement) {
    if (!logElement) return;

    const successHtml = `
      <div class="p-3 rounded-md bg-emerald-900/20 border border-emerald-700">
        <div class="text-xs text-emerald-400 uppercase mb-1">Success</div>
        <div class="text-slate-300">${message}</div>
      </div>
    `;

    logElement.insertAdjacentHTML('beforeend', successHtml);
    this._scrollToBottom(logElement);
  }

  /**
   * Scroll log to bottom
   * @private
   */
  static _scrollToBottom(element) {
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }
}

// Export for ES6 modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ErrorHandler;
}

// Make available globally
window.ErrorHandler = ErrorHandler;

