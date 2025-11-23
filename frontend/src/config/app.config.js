/**
 * Application Configuration
 * 
 * This file contains all configuration for the Jarvis Console.
 * Values can be overridden via environment variables or config injection.
 */

const AppConfig = {
  // API Configuration
  api: {
    baseUrl: window.JARVIS_CONFIG?.api?.baseUrl || 'http://n8n.loc',
    webhookPath: window.JARVIS_CONFIG?.api?.webhookPath || '/webhook/jarvis/command',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  },

  // Agent Definitions
  agents: [
    {
      id: 'code-writer',
      name: 'Code Writer',
      description: 'Generate and write code',
      icon: '💻',
      color: 'jarvis-green',
      enabled: true,
    },
    {
      id: 'code-executor',
      name: 'Code Executor',
      description: 'Execute and run code',
      icon: '⚡',
      color: 'jarvis-blue',
      enabled: true,
    },
    {
      id: 'ticket-maker',
      name: 'Ticket Maker',
      description: 'Create tickets automatically',
      icon: '🎫',
      color: 'yellow-500',
      enabled: true,
    },
    {
      id: 'prompt-hub',
      name: 'Prompt Hub',
      description: 'Find appropriate prompts for your needs',
      icon: '🔍',
      color: 'purple-500',
      enabled: true,
    },
  ],

  // UI Configuration
  ui: {
    theme: {
      primary: 'jarvis-green',
      secondary: 'jarvis-blue',
      background: 'slate-950',
      surface: 'slate-900',
      border: 'slate-800',
    },
    animations: {
      enabled: true,
      duration: 200,
    },
    log: {
      maxEntries: 100,
      autoScroll: true,
    },
  },

  // Feature Flags
  features: {
    agentSelection: true,
    commandHistory: false, // Future feature
    notifications: false, // Future feature
    darkMode: true,
  },
};

// Export for ES6 modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppConfig;
}

// Make available globally for inline scripts
window.AppConfig = AppConfig;
