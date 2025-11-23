/**
 * Agent List Component
 * 
 * Renders the list of available agents and handles selection.
 */

class AgentList {
  constructor(containerId, agents, onSelect) {
    this.container = document.getElementById(containerId);
    this.agents = agents || window.AppConfig?.agents || [];
    this.onSelect = onSelect || (() => {});
    this.selectedAgent = null;
  }

  /**
   * Render the agent list
   */
  render() {
    if (!this.container) {
      console.error('AgentList: Container not found');
      return;
    }

    const agentsHtml = this.agents
      .filter(agent => agent.enabled)
      .map(agent => this._renderAgentCard(agent))
      .join('');

    this.container.innerHTML = `
      <h2 class="text-sm font-semibold text-slate-400 uppercase mb-3">Agents</h2>
      <div class="space-y-2" id="agents-container">
        ${agentsHtml}
      </div>
    `;

    // Attach event listeners
    this._attachEventListeners();
  }

  /**
   * Render individual agent card
   * @private
   */
  _renderAgentCard(agent) {
    const isSelected = this.selectedAgent === agent.id;
    const borderClass = isSelected ? 'border-jarvis-green' : 'border-slate-700';
    
    return `
      <div 
        class="agent-card p-3 rounded-md bg-slate-800 ${borderClass} border hover:border-jarvis-green transition-colors cursor-pointer"
        data-agent-id="${agent.id}"
      >
        <div class="flex items-center gap-2">
          <span class="text-lg">${agent.icon || '🤖'}</span>
          <span class="text-sm font-medium">${agent.name}</span>
        </div>
        <p class="text-xs text-slate-500 mt-1">${agent.description}</p>
      </div>
    `;
  }

  /**
   * Attach click event listeners to agent cards
   * @private
   */
  _attachEventListeners() {
    const cards = this.container.querySelectorAll('.agent-card');
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        const agentId = e.currentTarget.dataset.agentId;
        this.selectAgent(agentId);
      });
    });
  }

  /**
   * Select an agent
   */
  selectAgent(agentId) {
    const agent = this.agents.find(a => a.id === agentId);
    if (!agent) {
      console.warn(`AgentList: Agent ${agentId} not found`);
      return;
    }

    this.selectedAgent = agentId;
    this._updateVisualSelection();
    this.onSelect(agent);
  }

  /**
   * Update visual selection state
   * @private
   */
  _updateVisualSelection() {
    const cards = this.container.querySelectorAll('.agent-card');
    cards.forEach(card => {
      const agentId = card.dataset.agentId;
      if (agentId === this.selectedAgent) {
        card.classList.add('border-jarvis-green');
        card.classList.remove('border-slate-700');
      } else {
        card.classList.remove('border-jarvis-green');
        card.classList.add('border-slate-700');
      }
    });
  }

  /**
   * Get currently selected agent
   */
  getSelectedAgent() {
    return this.agents.find(a => a.id === this.selectedAgent);
  }
}

// Export for ES6 modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AgentList;
}

// Make available globally
window.AgentList = AgentList;

