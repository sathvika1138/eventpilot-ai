/**
 * EventPilot AI 2.0 — Interactive Studio Application Logic
 * Manages active state, dynamic calculations, AI generation simulations,
 * interactive value-engineering toggles, vendor checklists, and copilot dialogue.
 */

// Global Application State
let currentEvent = null;
let activeVendorCategory = 'All';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // Load default preset (Wedding) or first available
  currentEvent = JSON.parse(JSON.stringify(PRESET_EVENTS[0]));

  setupPresetPills();
  setupNavigationTabs();
  setupMetricsBanner();
  setupCopilot();
  setupWizardModal();
  setupVendorModal();
  setupHeaderActions();

  // Render current event dossier
  renderAllViews();
}

/* ==========================================================================
   PRESET SWITCHER
   ========================================================================== */
function setupPresetPills() {
  const container = document.getElementById('presetPillsContainer');
  if (!container) return;

  container.innerHTML = '';
  PRESET_EVENTS.forEach((preset) => {
    const pill = document.createElement('button');
    pill.className = `preset-pill ${preset.id === currentEvent.id ? 'active' : ''}`;
    pill.dataset.presetId = preset.id;
    pill.innerHTML = `
      <span class="badge-tag ${preset.badgeClass}">${preset.typology}</span>
      <span>${preset.title.split('—')[0].substring(0, 24)}...</span>
    `;
    pill.addEventListener('click', () => {
      switchPreset(preset.id);
    });
    container.appendChild(pill);
  });
}

function switchPreset(presetId) {
  const found = PRESET_EVENTS.find((p) => p.id === presetId);
  if (!found) return;

  currentEvent = JSON.parse(JSON.stringify(found));
  
  // Update active pill UI
  document.querySelectorAll('.preset-pill').forEach((p) => {
    p.classList.toggle('active', p.dataset.presetId === presetId);
  });

  renderAllViews();
  showToast(`Switched to: ${currentEvent.title}`);
}

/* ==========================================================================
   NAVIGATION TABS
   ========================================================================== */
function setupNavigationTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = `tab-${tab.dataset.tab}`;
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   METRICS BANNER
   ========================================================================== */
function setupMetricsBanner() {
  renderMetricsBanner();
}

function renderMetricsBanner() {
  const container = document.getElementById('metricsSummary');
  if (!container || !currentEvent) return;

  // Days countdown calculation
  const eventDate = new Date(currentEvent.date);
  const today = new Date();
  const diffTime = eventDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const countdownText = diffDays > 0 ? `${diffDays} Days` : 'Event Day!';

  // Total allocated vs budget
  const totalAllocated = currentEvent.budgetBreakdown.reduce((sum, item) => sum + item.allocated, 0);
  
  // Total value engineering savings active
  const totalSavings = currentEvent.valueEngineering
    .filter((v) => v.active)
    .reduce((sum, v) => sum + v.savings, 0);

  const netEffectiveSpend = totalAllocated - totalSavings;
  const remainingBuffer = currentEvent.budget - netEffectiveSpend;

  // Tasks completed count
  let totalTasks = 0;
  let completedTasks = 0;
  currentEvent.timelineRoadmap.forEach((phase) => {
    phase.tasks.forEach((t) => {
      totalTasks++;
      if (t.completed) completedTasks++;
    });
  });
  const taskPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Guest RSVP count
  const guestConfirmed = currentEvent.guestMatrix ? currentEvent.guestMatrix.confirmed : currentEvent.guestCount;

  container.innerHTML = `
    <div class="metric-card" style="--card-accent: var(--primary-indigo);">
      <div class="metric-title">
        <span>Timeline Horizon</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
      </div>
      <div class="metric-value">${countdownText}</div>
      <div class="metric-sub">
        <span>Target: ${formatDate(currentEvent.date)}</span>
      </div>
    </div>

    <div class="metric-card" style="--card-accent: var(--primary-cyan);">
      <div class="metric-title">
        <span>Capital Budget</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
      </div>
      <div class="metric-value">${currentEvent.currency}${netEffectiveSpend.toLocaleString()}</div>
      <div class="metric-sub">
        <span style="color: ${remainingBuffer >= 0 ? '#34d399' : '#f87171'}">
          ${remainingBuffer >= 0 ? `+${currentEvent.currency}${remainingBuffer.toLocaleString()} buffer reserve` : `-${currentEvent.currency}${Math.abs(remainingBuffer).toLocaleString()} overage`}
        </span>
      </div>
    </div>

    <div class="metric-card" style="--card-accent: var(--accent-gold);">
      <div class="metric-title">
        <span>Guest Attendance</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
      </div>
      <div class="metric-value">${guestConfirmed} / ${currentEvent.guestCount}</div>
      <div class="metric-sub">
        <span>${Math.round((guestConfirmed / currentEvent.guestCount) * 100)}% RSVP Confirmed</span>
      </div>
    </div>

    <div class="metric-card" style="--card-accent: var(--primary-emerald);">
      <div class="metric-title">
        <span>Milestone Readiness</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
      </div>
      <div class="metric-value">${taskPct}%</div>
      <div class="metric-sub">
        <span>${completedTasks} of ${totalTasks} Strategic Tasks Done</span>
      </div>
    </div>
  `;
}

/* ==========================================================================
   RENDER ALL VIEWS
   ========================================================================== */
function renderAllViews() {
  renderMetricsBanner();
  renderOverview();
  renderBudget();
  renderVendors();
  renderTimeline();
  renderRunOfShow();
  renderIdeas();
  renderGuests();
  renderRisks();
}

/* ==========================================================================
   TAB 1: OVERVIEW & HERO VISION
   ========================================================================== */
function renderOverview() {
  const container = document.getElementById('tab-overview');
  if (!container || !currentEvent) return;

  const paletteHtml = (currentEvent.aestheticPalette || [])
    .map(
      (c) => `
      <div class="color-chip" onclick="copyHex('${c.hex}')" title="Click to copy ${c.hex}">
        <span class="color-swatch" style="background-color: ${c.hex};"></span>
        <span>${c.name} (${c.hex})</span>
      </div>
    `
    )
    .join('');

  container.innerHTML = `
    <div class="hero-banner-container">
      <div class="hero-visual-card" style="background-image: url('${currentEvent.heroImage}');">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="hero-badge-row">
            <span class="badge-tag ${currentEvent.badgeClass}">${currentEvent.typology}</span>
            <span class="badge-tag corporate">${currentEvent.setting}</span>
          </div>
          <h2 class="hero-title">${currentEvent.title}</h2>
          <p class="hero-summary">${currentEvent.summary}</p>
        </div>
      </div>

      <div class="panel-card" style="margin-bottom: 0;">
        <div class="panel-header">
          <h3>Architectural Specs</h3>
          <span class="badge-ai">Verified</span>
        </div>
        <div class="spec-cards-grid">
          <div class="spec-tile">
            <div class="spec-label">Calendar Date</div>
            <div class="spec-val">${formatDate(currentEvent.date)}</div>
          </div>
          <div class="spec-tile">
            <div class="spec-label">Target Headcount</div>
            <div class="spec-val">${currentEvent.guestCount} Attendees</div>
          </div>
          <div class="spec-tile">
            <div class="spec-label">Total Capital Spend</div>
            <div class="spec-val">${currentEvent.currency}${currentEvent.budget.toLocaleString()}</div>
          </div>
          <div class="spec-tile">
            <div class="spec-label">Primary Atmosphere</div>
            <div class="spec-val" style="font-size: 0.85rem;">${currentEvent.theme.substring(0, 30)}...</div>
          </div>
        </div>

        <div style="margin-top: 1.25rem;">
          <div class="spec-label">Aesthetic Color Palette</div>
          <div class="palette-row">${paletteHtml}</div>
        </div>

        <div style="margin-top: 1.25rem;">
          <div class="spec-label">Location & Venue Grounds</div>
          <p style="font-size: 0.85rem; color: #cbd5e1; margin-top: 0.25rem;">
            📍 ${currentEvent.location}
          </p>
        </div>
      </div>
    </div>

    <!-- Hero Moment Highlight -->
    <div class="hero-moment-card">
      <span class="hero-moment-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        Signature Hero Moment
      </span>
      <h4>${currentEvent.heroMoment}</h4>
      <p style="font-size: 0.875rem; color: #cbd5e1;">
        Engineered as the central emotional anchor of the event to maximize attendee delight and deliver an unforgettable visual focal point.
      </p>
    </div>

    <!-- Culinary & Dietary Direction -->
    <div class="panel-card">
      <div class="panel-header">
        <h3>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
          Culinary & Beverage Architecture
        </h3>
      </div>
      <p style="font-size: 0.9rem; color: #cbd5e1;">${currentEvent.dietary}</p>
    </div>
  `;
}

/* ==========================================================================
   TAB 2: BUDGET & VALUE ENGINEERING
   ========================================================================== */
function renderBudget() {
  const container = document.getElementById('tab-budget');
  if (!container || !currentEvent) return;

  const totalBudget = currentEvent.budget;
  const totalAllocated = currentEvent.budgetBreakdown.reduce((sum, item) => sum + item.allocated, 0);

  const rowsHtml = currentEvent.budgetBreakdown
    .map((item, idx) => {
      const pct = Math.round((item.allocated / totalBudget) * 100);
      let pClass = 'priority-medium';
      if (item.priority === 'Critical') pClass = 'priority-critical';
      if (item.priority === 'High') pClass = 'priority-high';
      if (item.priority === 'Flexible') pClass = 'priority-flexible';

      return `
      <tr>
        <td><strong>${item.category}</strong></td>
        <td>
          <span style="font-family: var(--font-mono); font-weight: 700; color: #fff;">
            ${currentEvent.currency}${item.allocated.toLocaleString()}
          </span>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 0.35rem;">(${pct}%)</span>
        </td>
        <td><span class="priority-badge ${pClass}">${item.priority}</span></td>
        <td style="color: var(--text-secondary); font-size: 0.8rem;">${item.notes}</td>
      </tr>
    `;
    })
    .join('');

  // Value Engineering Toggles HTML
  const veHtml = (currentEvent.valueEngineering || [])
    .map(
      (v) => `
    <div class="ve-toggle-item">
      <div class="ve-text">
        <h5>${v.title}</h5>
        <p>${v.desc}</p>
        <div class="ve-savings">Instant Savings: -${currentEvent.currency}${v.savings.toLocaleString()}</div>
      </div>
      <label class="switch">
        <input type="checkbox" ${v.active ? 'checked' : ''} onchange="toggleValueLever('${v.id}')">
        <span class="slider"></span>
      </label>
    </div>
  `
    )
    .join('');

  container.innerHTML = `
    <div class="budget-hero-matrix">
      <!-- Main Table -->
      <div class="panel-card" style="margin-bottom: 0;">
        <div class="panel-header">
          <div>
            <h3>Capital Expenditure Allocation</h3>
            <div class="panel-subtitle">Calculated based on industry APEX weighting models</div>
          </div>
          <button class="btn btn-secondary" onclick="openCopilotWithPrompt('Analyze my current budget and recommend 2 optimizations.')">
            ✨ AI Budget Audit
          </button>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Estimated Cost</th>
                <th>Priority</th>
                <th>Scope & Line-Item Notes</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Value Engineering Levers -->
      <div class="panel-card" style="margin-bottom: 0;">
        <div class="panel-header">
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            Value-Engineering Levers
          </h3>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 1rem;">
          Toggle cost-saving alternatives that trim expenses without sacrificing guest perception or quality.
        </p>
        <div class="value-engine-box">
          ${veHtml}
        </div>
      </div>
    </div>
  `;
}

function toggleValueLever(leverId) {
  const lever = currentEvent.valueEngineering.find((l) => l.id === leverId);
  if (lever) {
    lever.active = !lever.active;
    renderMetricsBanner();
    renderBudget();
    showToast(`${lever.active ? 'Applied' : 'Removed'}: ${lever.title}`);
  }
}

/* ==========================================================================
   TAB 3: VENDOR PROCUREMENT LEDGER
   ========================================================================== */
function renderVendors() {
  const container = document.getElementById('tab-vendors');
  if (!container || !currentEvent) return;

  const categories = ['All', 'Venue', 'Catering', 'Decor', 'Photography', 'Entertainment', 'Production', 'Transportation'];

  const categoryFiltersHtml = categories
    .map(
      (cat) => `
    <button class="filter-btn ${activeVendorCategory === cat ? 'active' : ''}" onclick="filterVendors('${cat}')">
      ${cat}
    </button>
  `
    )
    .join('');

  const filteredVendors =
    activeVendorCategory === 'All'
      ? currentEvent.vendorLedger
      : currentEvent.vendorLedger.filter((v) => v.category.toLowerCase() === activeVendorCategory.toLowerCase());

  const vendorRows = filteredVendors
    .map((v, index) => {
      let pClass = 'priority-medium';
      if (v.priority === 'Critical') pClass = 'priority-critical';
      if (v.priority === 'High') pClass = 'priority-high';

      return `
      <tr>
        <td><span class="badge-tag corporate">${v.category}</span></td>
        <td>
          <strong>${v.name}</strong>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${v.contact}</div>
        </td>
        <td style="font-family: var(--font-mono); font-weight: 700;">
          ${currentEvent.currency}${v.cost ? v.cost.toLocaleString() : 'TBD'}
        </td>
        <td>
          <select class="vendor-status-select" onchange="updateVendorStatus(${index}, this.value)">
            <option value="Sourced" ${v.status === 'Sourced' ? 'selected' : ''}>Sourced</option>
            <option value="Contacted" ${v.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
            <option value="Quoted" ${v.status === 'Quoted' ? 'selected' : ''}>Quoted</option>
            <option value="Contract Signed" ${v.status === 'Contract Signed' ? 'selected' : ''}>Contract Signed</option>
            <option value="Deposit Paid" ${v.status === 'Deposit Paid' ? 'selected' : ''}>Deposit Paid</option>
            <option value="Complete" ${v.status === 'Complete' ? 'selected' : ''}>Complete</option>
          </select>
        </td>
        <td style="font-size: 0.8rem; font-family: var(--font-mono);">${v.dueDate ? formatDate(v.dueDate) : '—'}</td>
        <td><span class="priority-badge ${pClass}">${v.priority}</span></td>
        <td style="font-size: 0.8rem; color: var(--text-secondary);">${v.deliverables || '—'}</td>
      </tr>
    `;
    })
    .join('');

  container.innerHTML = `
    <div class="panel-card">
      <div class="vendor-toolbar">
        <div>
          <h3>Vendor Procurement & SLA Ledger</h3>
          <div class="panel-subtitle">Track contract execution milestones, deliverables, and payment release criteria</div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <button class="btn btn-primary" onclick="openVendorModal()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Vendor
          </button>
          <button class="btn btn-secondary" onclick="exportVendorRFP()">
            📄 Copy RFP Template
          </button>
        </div>
      </div>

      <div class="category-filters" style="margin-bottom: 1rem;">
        ${categoryFiltersHtml}
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Domain</th>
              <th>Vendor & Contact</th>
              <th>Estimated Cost</th>
              <th>Booking Status</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Deliverables & Notes</th>
            </tr>
          </thead>
          <tbody>
            ${vendorRows.length > 0 ? vendorRows : '<tr><td colspan="7" style="text-align:center; padding: 2rem;">No vendors in this category.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function filterVendors(cat) {
  activeVendorCategory = cat;
  renderVendors();
}

function updateVendorStatus(index, newStatus) {
  currentEvent.vendorLedger[index].status = newStatus;
  showToast(`Updated status to: ${newStatus}`);
}

function exportVendorRFP() {
  const rfpText = `EVENTPILOT AI — VENDOR REQUEST FOR PROPOSAL (RFP)
Project: ${currentEvent.title}
Target Date: ${currentEvent.date}
Location: ${currentEvent.location}
Guest Count: ${currentEvent.guestCount}
Budget Tier: ${currentEvent.currency}${currentEvent.budget.toLocaleString()}
Scope: Seeking comprehensive proposal including insurance, setup/strike window, and cancellation policy.`;
  navigator.clipboard.writeText(rfpText).then(() => {
    showToast('Vendor RFP brief copied to clipboard!');
  });
}

/* ==========================================================================
   TAB 4: PLANNING TIMELINE ROADMAP
   ========================================================================== */
function renderTimeline() {
  const container = document.getElementById('tab-timeline');
  if (!container || !currentEvent) return;

  const phasesHtml = currentEvent.timelineRoadmap
    .map((phase, pIdx) => {
      const tasksHtml = phase.tasks
        .map((task, tIdx) => {
          let pBadge = 'priority-medium';
          if (task.priority === 'Critical') pBadge = 'priority-critical';
          if (task.priority === 'High') pBadge = 'priority-high';

          return `
          <div class="task-item ${task.completed ? 'completed' : ''}">
            <div class="task-left">
              <div class="custom-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${pIdx}, ${tIdx})">
                ${task.completed ? '✓' : ''}
              </div>
              <div>
                <div class="task-title">${task.title}</div>
                <div style="font-size: 0.725rem; color: var(--text-muted);">Lead: ${task.lead}</div>
              </div>
            </div>
            <span class="priority-badge ${pBadge}">${task.priority}</span>
          </div>
        `;
        })
        .join('');

      return `
      <div class="timeline-phase">
        <div class="phase-node"></div>
        <div class="phase-header">
          <h4>${phase.phaseName}</h4>
          <span class="phase-badge">${phase.timeframe}</span>
        </div>
        <div class="task-list">
          ${tasksHtml}
        </div>
      </div>
    `;
    })
    .join('');

  container.innerHTML = `
    <div class="panel-card">
      <div class="panel-header">
        <div>
          <h3>Phased Strategic Roadmap</h3>
          <div class="panel-subtitle">Master countdown schedule from contract locks to live event execution</div>
        </div>
        <button class="btn btn-secondary" onclick="openCopilotWithPrompt('Draft the top 3 immediate action items for this week.')">
          ⚡ AI Next Best Actions
        </button>
      </div>

      <div class="timeline-track">
        ${phasesHtml}
      </div>
    </div>
  `;
}

function toggleTask(pIdx, tIdx) {
  const task = currentEvent.timelineRoadmap[pIdx].tasks[tIdx];
  task.completed = !task.completed;
  renderMetricsBanner();
  renderTimeline();
  showToast(task.completed ? `Task Completed: ${task.title}` : `Task reopened: ${task.title}`);
}

/* ==========================================================================
   TAB 5: DAY-OF RUN OF SHOW (CUE-TO-CUE)
   ========================================================================== */
function renderRunOfShow() {
  const container = document.getElementById('tab-runofshow');
  if (!container || !currentEvent) return;

  const rows = (currentEvent.runOfShow || [])
    .map(
      (cue) => `
    <tr>
      <td><span class="time-badge">${cue.time}</span></td>
      <td><strong>${cue.cue}</strong></td>
      <td><span class="lead-tag">${cue.lead}</span></td>
      <td class="cue-code">${cue.avLighting}</td>
      <td style="color: var(--text-secondary); font-size: 0.8rem;">${cue.notes}</td>
    </tr>
  `
    )
    .join('');

  container.innerHTML = `
    <div class="panel-card">
      <div class="run-of-show-bar">
        <div>
          <h3>Minute-by-Minute Run of Show</h3>
          <div class="panel-subtitle">Technical cue-to-cue execution schedule for director, stage hands, AV & emcee</div>
        </div>
        <button class="btn btn-stage-mode" onclick="toggleStageMode()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          Stage Presentation Mode
        </button>
      </div>

      <div class="table-responsive">
        <table class="data-table ros-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Activity / Cue</th>
              <th>Lead Operator</th>
              <th>AV, Audio & Lighting State</th>
              <th>Stage Manager Notes</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

let stageModeActive = false;
function toggleStageMode() {
  stageModeActive = !stageModeActive;
  const table = document.querySelector('.ros-table');
  if (table) {
    if (stageModeActive) {
      table.style.fontSize = '1.1rem';
      showToast('Stage mode active: High contrast font boosted for live coordination.');
    } else {
      table.style.fontSize = '0.85rem';
    }
  }
}

/* ==========================================================================
   TAB 6: SENSORY & PERSONALIZED IDEAS
   ========================================================================== */
function renderIdeas() {
  const container = document.getElementById('tab-ideas');
  if (!container || !currentEvent) return;

  const cardsHtml = (currentEvent.sensoryIdeas || [])
    .map((idea) => {
      const tagsHtml = (idea.tags || []).map((t) => `<span class="mini-tag">${t}</span>`).join('');
      return `
      <div class="idea-card">
        <div>
          <div class="idea-card-header">
            <div class="idea-icon">✨</div>
            <div>
              <span style="font-size: 0.7rem; color: var(--primary-cyan); text-transform: uppercase; font-weight: 700;">${idea.category}</span>
              <h4>${idea.title}</h4>
            </div>
          </div>
          <p>${idea.desc}</p>
        </div>
        <div class="tag-list">
          ${tagsHtml}
        </div>
      </div>
    `;
    })
    .join('');

  container.innerHTML = `
    <div class="panel-card">
      <div class="panel-header">
        <div>
          <h3>Curated Experiential & Sensory Blueprint</h3>
          <div class="panel-subtitle">Signature mixology, interactive stations, and tactile memory anchors</div>
        </div>
        <button class="btn btn-secondary" onclick="openCopilotWithPrompt('Generate 3 interactive game ideas tailored specifically to this crowd.')">
          🎲 Brainstorm More Ideas
        </button>
      </div>

      <div class="sensory-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
}

/* ==========================================================================
   TAB 7: GUESTS MATRIX & SEATING
   ========================================================================== */
function renderGuests() {
  const container = document.getElementById('tab-guests');
  if (!container || !currentEvent) return;

  const gm = currentEvent.guestMatrix || {
    confirmed: Math.round(currentEvent.guestCount * 0.85),
    pending: Math.round(currentEvent.guestCount * 0.1),
    declined: Math.round(currentEvent.guestCount * 0.05),
    dietaryStats: { 'Standard': Math.round(currentEvent.guestCount * 0.75), 'Special Dietary': Math.round(currentEvent.guestCount * 0.25) },
    tables: []
  };

  const total = currentEvent.guestCount;
  const confPct = Math.round((gm.confirmed / total) * 100);
  const pendPct = Math.round((gm.pending / total) * 100);
  const declPct = Math.max(0, 100 - confPct - pendPct);

  // Dietary list
  const dietHtml = Object.entries(gm.dietaryStats || {})
    .map(
      ([k, v]) => `
      <div style="display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.85rem;">
        <span>${k}</span>
        <span style="font-family: var(--font-mono); font-weight: 700; color: #fff;">${v} Guests</span>
      </div>
    `
    )
    .join('');

  // Tables list
  const tablesHtml = (gm.tables || [])
    .map(
      (t) => `
    <div class="table-node">
      <h5>
        <span>${t.name}</span>
        <span class="diet-pill">${t.seats} Seats</span>
      </h5>
      <div class="table-node-sub">${t.vip ? '⭐ VIP Tier Service' : 'General Seating'}</div>
      <div style="font-size: 0.75rem; color: #cbd5e1;">Dietary: ${t.dietary}</div>
    </div>
  `
    )
    .join('');

  container.innerHTML = `
    <div class="panel-card">
      <div class="panel-header">
        <div>
          <h3>Guest Management & RSVP Intelligence</h3>
          <div class="panel-subtitle">Headcount tracking, attrition curves, dietary alerts, and seating cluster visualizer</div>
        </div>
      </div>

      <div class="guests-overview-grid">
        <!-- Left Stats -->
        <div>
          <h4>RSVP Status Breakdown</h4>
          <div class="rsvp-status-bar">
            <div class="rsvp-seg-confirmed" style="width: ${confPct}%;" title="Confirmed: ${gm.confirmed}"></div>
            <div class="rsvp-seg-pending" style="width: ${pendPct}%;" title="Pending: ${gm.pending}"></div>
            <div class="rsvp-seg-declined" style="width: ${declPct}%;" title="Declined: ${gm.declined}"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
            <span><strong style="color: #10b981;">● ${gm.confirmed}</strong> Confirmed</span>
            <span><strong style="color: #f59e0b;">● ${gm.pending}</strong> Pending</span>
            <span><strong style="color: #f43f5e;">● ${gm.declined}</strong> Declined</span>
          </div>

          <h4>Dietary & Allergen Matrix</h4>
          <div style="margin-top: 0.5rem;">
            ${dietHtml}
          </div>
        </div>

        <!-- Right Table Layout -->
        <div>
          <h4>Assigned Seating Clusters & Floor Plan</h4>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 1rem;">
            Seating groupings configured for optimal acoustic comfort and sightlines to the stage.
          </p>
          <div class="table-layout-grid">
            ${tablesHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   TAB 8: RISK MATRIX & CONTINGENCY
   ========================================================================== */
function renderRisks() {
  const container = document.getElementById('tab-risks');
  if (!container || !currentEvent) return;

  const risksHtml = (currentEvent.riskMatrix || [])
    .map(
      (r) => `
    <div class="risk-card ${r.levelClass}">
      <div class="risk-header">
        <h4>${r.domain}</h4>
        <span class="priority-badge ${r.severity === 'High' ? 'priority-critical' : 'priority-medium'}">${r.severity} Severity</span>
      </div>
      <div class="risk-trigger">
        ⚠️ Trigger Condition: ${r.trigger}
      </div>
      <div class="risk-action">
        <strong>Contingency Action:</strong> ${r.action}
      </div>
    </div>
  `
    )
    .join('');

  container.innerHTML = `
    <div class="panel-card">
      <div class="panel-header">
        <div>
          <h3>360° Risk Matrix & Trigger Protocols</h3>
          <div class="panel-subtitle">Pre-emptive operational risk assessments with explicit threshold action plans</div>
        </div>
        <button class="btn btn-secondary" onclick="openCopilotWithPrompt('Evaluate our top risks and add a safety protocol.')">
          🛡️ AI Safety Review
        </button>
      </div>

      <div class="risk-grid">
        ${risksHtml}
      </div>
    </div>
  `;
}

/* ==========================================================================
   AI COPILOT CHAT DRAWER & SMART RESPONDER
   ========================================================================== */
function setupCopilot() {
  const btnToggle = document.getElementById('btnToggleCopilot');
  const btnClose = document.getElementById('btnCloseCopilot');
  const drawer = document.getElementById('copilotDrawer');
  const form = document.getElementById('copilotForm');
  const input = document.getElementById('copilotInput');

  if (btnToggle && drawer) {
    btnToggle.addEventListener('click', () => {
      drawer.classList.toggle('open');
      if (drawer.classList.contains('open')) {
        input.focus();
      }
    });
  }

  if (btnClose && drawer) {
    btnClose.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }

  // Quick chip prompts
  document.querySelectorAll('.chip-prompt').forEach((chip) => {
    chip.addEventListener('click', () => {
      const promptText = chip.dataset.prompt;
      if (promptText) {
        handleUserMessage(promptText);
      }
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      handleUserMessage(text);
    });
  }
}

function openCopilotWithPrompt(promptText) {
  const drawer = document.getElementById('copilotDrawer');
  if (drawer) {
    drawer.classList.add('open');
  }
  handleUserMessage(promptText);
}

function handleUserMessage(userText) {
  appendMessage(userText, 'user');

  // Show thinking indicator
  const thinkingId = 'thinking-' + Date.now();
  const messagesContainer = document.getElementById('copilotMessages');
  const thinkingEl = document.createElement('div');
  thinkingEl.className = 'message ai-message';
  thinkingEl.id = thinkingId;
  thinkingEl.innerHTML = `
    <div class="msg-avatar">EP</div>
    <div class="msg-bubble">
      <span class="code-font">Analyzing ${currentEvent.title} context...</span>
    </div>
  `;
  messagesContainer.appendChild(thinkingEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  setTimeout(() => {
    thinkingEl.remove();
    const reply = generateCopilotResponse(userText);
    appendMessage(reply, 'ai');
  }, 750);
}

function appendMessage(text, sender) {
  const messagesContainer = document.getElementById('copilotMessages');
  if (!messagesContainer) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}-message`;
  msgDiv.innerHTML = `
    <div class="msg-avatar">${sender === 'ai' ? 'EP' : 'YOU'}</div>
    <div class="msg-bubble">
      ${formatMarkdownText(text)}
    </div>
  `;
  messagesContainer.appendChild(msgDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function formatMarkdownText(text) {
  // Simple markdown converter for boldness, linebreaks and lists
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

function generateCopilotResponse(query) {
  const q = query.toLowerCase();

  if (q.includes('cut') || q.includes('budget') || q.includes('save')) {
    return `Here is a value-engineering recommendation tailored to your **${currentEvent.typology}** ($${currentEvent.budget.toLocaleString()}):
1. **F&B Optimization**: Shift from an open top-shelf bar to 2 curated Signature Cocktails plus local wine/beer. **Est. Savings: $1,400 - $2,200**.
2. **Floral Repurposing**: Reuse ceremony floral arches and ground installations around the cake table and DJ booth for the evening reception. **Est. Savings: $850**.
3. **Stationery & Signage**: Use interactive digital QR cards and modern video RSVP cards. **Est. Savings: $400 - $650**.
Total potential savings: **~$3,200** without diminishing guest perception!`;
  }

  if (q.includes('rfp') || q.includes('caterer') || q.includes('email') || q.includes('draft')) {
    return `Here is a customized **RFP Outreach Email** for your prospective vendor:

**Subject:** RFP: ${currentEvent.typology} Catering & Bar — ${currentEvent.title} (${currentEvent.date})

"Dear Catering Director,
We are currently sourcing full-service catering partners for **${currentEvent.title}** on **${formatDate(currentEvent.date)}** at **${currentEvent.location}**.
- Expected Headcount: **${currentEvent.guestCount} guests**
- Culinary Style: **${currentEvent.dietary}**
- Allocated Budget: Approximately **${currentEvent.currency}${(currentEvent.budget * 0.35).toLocaleString()}**

Please confirm availability for load-in and send your sample menu tasting package along with standard service gratuity terms. Looking forward to reviewing your proposal!"`;
  }

  if (q.includes('rain') || q.includes('weather') || q.includes('contingency')) {
    return `**Weather & Rain Contingency Protocol for ${currentEvent.location}:**
- **Trigger**: Rain probability > 35% on T-48 hours forecast.
- **Action 1**: Execute pre-reserved tent deposit with clear vinyl sidewalls to preserve lighting sightlines.
- **Action 2**: Move outdoor acoustic musicians into the covered pavilion or interior foyer.
- **Action 3**: Deploy 50 branded black golf umbrellas at valet drop-off for seamless guest ingress.`;
  }

  if (q.includes('hero') || q.includes('entrance') || q.includes('idea')) {
    return `Here are 3 elevated **Hero Moments** designed for **${currentEvent.title}**:
1. **Cold Sparkler Canopy Reveal**: Indoor-safe pyrotechnic spark fountains framing the grand arrival during the crescendo of the opening soundtrack.
2. **Interactive Mixology Tasting Wall**: A custom greenery wall where hands wearing white gloves pass bespoke aperitifs to arriving guests.
3. **Surprise Late-Night Food Drop**: Custom branded carts wheeling out hot smashburgers or churros at 11:15 PM as dance floor energy peaks.`;
  }

  if (q.includes('game') || q.includes('activities')) {
    return `Top 3 crowd-tested activations for **${currentEvent.guestCount} guests**:
1. **Bespoke Trivia / Crowd Pulse**: Mobile QR-code interactive trivia with live leaderboard on the projection screens.
2. **Vinyl Audio Guestbook**: Vintage rotary telephone recording audio memories from guests.
3. **Sensory Blind Tasting**: Mini tasting flights where guests vote on their favorite wine or craft soda blend.`;
  }

  return `I have analyzed your request regarding **${currentEvent.title}**. All modules (Budget of ${currentEvent.currency}${currentEvent.budget.toLocaleString()}, ${currentEvent.guestCount} guests in ${currentEvent.location}) are updated. Would you like me to adjust vendor contracts, refine the minute-by-minute timeline, or generate another tailored draft?`;
}

/* ==========================================================================
   AI EVENT INTAKE GENERATOR WIZARD
   ========================================================================== */
function setupWizardModal() {
  const modal = document.getElementById('wizardModal');
  const btnNew = document.getElementById('btnNewEvent');
  const btnClose = document.getElementById('btnCloseWizard');
  const btnCancel = document.getElementById('btnCancelWizard');
  const form = document.getElementById('wizardForm');
  const guestSlider = document.getElementById('inputGuestCount');
  const guestVal = document.getElementById('guestCountVal');

  if (guestSlider && guestVal) {
    guestSlider.addEventListener('input', (e) => {
      guestVal.textContent = `${e.target.value} Guests`;
    });
  }

  if (btnNew && modal) {
    btnNew.addEventListener('click', () => {
      modal.classList.add('open');
    });
  }

  const closeModal = () => modal.classList.remove('open');
  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCancel) btnCancel.addEventListener('click', closeModal);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      runAIGenerationPipeline();
    });
  }
}

function runAIGenerationPipeline() {
  const overlay = document.getElementById('genProgressOverlay');
  const titleEl = document.getElementById('genStepTitle');
  const detailEl = document.getElementById('genStepDetail');
  const barEl = document.getElementById('genBarFill');
  const btnSubmit = document.getElementById('btnSynthesize');

  overlay.style.display = 'block';
  btnSubmit.disabled = true;

  const steps = [
    { title: 'Neural Analysis of Event Vectors...', detail: 'Harmonizing typology, headcount and demographic flow...', pct: '25%' },
    { title: 'Balancing Capital Allocations...', detail: 'Calculating 7 industry-weighted budget categories...', pct: '50%' },
    { title: 'Synthesizing Minute-by-Minute Run of Show...', detail: 'Assembling audio, lighting and operator cues...', pct: '75%' },
    { title: 'Synthesizing Master Execution Dossier...', detail: 'Finalizing risk assessment matrix and sensory ideas...', pct: '100%' }
  ];

  let currentStep = 0;
  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      const s = steps[currentStep];
      titleEl.textContent = s.title;
      detailEl.textContent = s.detail;
      barEl.style.width = s.pct;
      currentStep++;
    } else {
      clearInterval(interval);
      finalizeNewEvent();
    }
  }, 500);
}

function finalizeNewEvent() {
  const typology = document.getElementById('inputEventType').value;
  const title = document.getElementById('inputEventName').value;
  const date = document.getElementById('inputDate').value;
  const location = document.getElementById('inputLocation').value;
  const guestCount = parseInt(document.getElementById('inputGuestCount').value, 10);
  const budget = parseInt(document.getElementById('inputBudget').value, 10);
  const theme = document.getElementById('inputTheme').value;
  const setting = document.getElementById('inputSetting').value;
  const dietary = document.getElementById('inputDietary').value;
  const special = document.getElementById('inputSpecial').value;

  // Pick suitable image and badge class based on typology
  let heroImage = 'assets/wedding.jpg';
  let badgeClass = 'corporate';
  if (typology.includes('Birthday')) {
    heroImage = 'assets/birthday.jpg';
    badgeClass = 'birthday';
  } else if (typology.includes('Festival') || typology.includes('Community')) {
    heroImage = 'assets/community.jpg';
    badgeClass = 'community';
  } else if (typology.includes('Wedding')) {
    heroImage = 'assets/wedding.jpg';
    badgeClass = 'wedding';
  }

  // Synthesize realistic budget allocations (% splits)
  const venueCost = Math.round(budget * 0.25);
  const cateringCost = Math.round(budget * 0.35);
  const decorCost = Math.round(budget * 0.14);
  const photoCost = Math.round(budget * 0.10);
  const entertainmentCost = Math.round(budget * 0.08);
  const contingencyCost = budget - (venueCost + cateringCost + decorCost + photoCost + entertainmentCost);

  const newEvent = {
    id: 'custom-' + Date.now(),
    typology,
    badgeClass,
    title,
    date,
    location,
    guestCount,
    budget,
    currency: '$',
    heroImage,
    theme,
    aestheticPalette: [
      { name: 'Radiant Accent', hex: '#6366F1' },
      { name: 'Cyan Glow', hex: '#06B6D4' },
      { name: 'Warm Amber', hex: '#F59E0B' },
      { name: 'Deep Slate', hex: '#0F172A' },
      { name: 'Pure Silk', hex: '#F8FAFC' }
    ],
    setting,
    dietary,
    heroMoment: special || 'Grand Entrance & Signature Toast under Dynamic Lighting',
    summary: `A custom-synthesized ${guestCount}-guest ${typology} in ${location} with curated culinary pairings, automated cue-to-cue run of show, and proactive risk contingency protocols.`,

    budgetBreakdown: [
      { category: 'Venue & Grounds Rental', allocated: venueCost, priority: 'Critical', notes: 'Site access, baseline setup & sanitation agreements' },
      { category: 'Food & Beverage Service', allocated: cateringCost, priority: 'Critical', notes: dietary || 'Seasonal curated menu & bar service' },
      { category: 'Decor, Staging & Lighting', allocated: decorCost, priority: 'High', notes: theme || 'Themed atmosphere, floral accents & uplighting' },
      { category: 'Photography & Cinema', allocated: photoCost, priority: 'High', notes: 'Full day coverage, teaser highlight reel & digital archive' },
      { category: 'Entertainment & Audio', allocated: entertainmentCost, priority: 'Medium', notes: 'Live sound amplification, wireless mics & emcee' },
      { category: 'Contingency Reserve', allocated: contingencyCost, priority: 'Critical', notes: 'Mandatory buffer for overage, weather needs & overtime labor' }
    ],

    valueEngineering: [
      { id: 've-c-1', title: 'Streamlined Bar Package Optimization', desc: 'Focus beverage spend on 2 signature craft cocktails plus local wine/beer.', savings: Math.round(budget * 0.05), active: true },
      { id: 've-c-2', title: 'Hybrid Digital Stationery & Motion RSVP', desc: 'Use high-definition video invitations with printed day-of menu cards only.', savings: Math.round(budget * 0.02), active: true }
    ],

    vendorLedger: [
      { category: 'Venue', name: location.split(',')[0] || 'Selected Event Space', contact: 'management@venue.com', cost: venueCost, status: 'Contacted', dueDate: date, priority: 'Critical', deliverables: 'Full day venue reservation & access' },
      { category: 'Catering', name: 'Masterclass Culinary Group', contact: 'catering@artisan.com', cost: cateringCost, status: 'Quoted', dueDate: date, priority: 'Critical', deliverables: 'Full meal service, bartending team & dinnerware' },
      { category: 'Decor', name: 'Luxe Atmosphere Studio', contact: 'design@luxeatm.com', cost: decorCost, status: 'Sourced', dueDate: date, priority: 'High', deliverables: 'Themed tablescapes, signage & focal installation' },
      { category: 'Photography', name: 'Apex Visual Cinema', contact: 'shoot@apexvisual.com', cost: photoCost, status: 'Contacted', dueDate: date, priority: 'High', deliverables: 'Lead photographer, digital gallery & drone reel' }
    ],

    timelineRoadmap: [
      {
        phaseName: 'Phase 1: Initial Booking & Core Retainers',
        timeframe: 'Target Window',
        tasks: [
          { id: 'tc1', title: 'Sign primary venue agreement and deposit', lead: 'Host / Coordinator', priority: 'Critical', completed: false },
          { id: 'tc2', title: 'Confirm catering tasting menu and dietary options', lead: 'Catering Lead', priority: 'Critical', completed: false },
          { id: 'tc3', title: 'Contract lead photographer and AV director', lead: 'Lead Planner', priority: 'High', completed: false }
        ]
      },
      {
        phaseName: 'Phase 2: Final Countdown & Execution',
        timeframe: '2 Weeks Before Event',
        tasks: [
          { id: 'tc4', title: 'Distribute finalized minute-by-minute Run of Show', lead: 'Stage Manager', priority: 'Critical', completed: false },
          { id: 'tc5', title: 'Final RSVP lock and table assignment seating chart', lead: 'Host', priority: 'High', completed: false }
        ]
      }
    ],

    runOfShow: [
      { time: '12:00 PM', cue: 'Vendor Load-In & Audio Verification', lead: 'Stage Manager', avLighting: 'Work lights, sound check active', notes: 'Verify power drops and catering kitchen prep' },
      { time: '04:00 PM', cue: 'Guest Doors Open & Welcome Reception', lead: 'Lead Emcee', avLighting: 'Warm ambient glow, acoustic background audio', notes: 'Welcome cocktails & light appetizers circulated' },
      { time: '05:30 PM', cue: 'Main Program & Hero Moment Reveal', lead: 'Director', avLighting: 'Full spotlight, celebratory musical surge', notes: newEvent ? special || 'Hero moment spotlight' : 'Grand reveal' },
      { time: '06:30 PM', cue: 'Dinner Service & Speeches', lead: 'Catering Lead / Emcee', avLighting: 'Intimate table lighting, spotlight podium', notes: 'Serve courses in synchronized rounds' },
      { time: '08:00 PM', cue: 'Evening Social & Dance Floor Launch', lead: 'DJ / Band', avLighting: 'Dynamic party lighting & haze', notes: 'High energy music set' },
      { time: '11:00 PM', cue: 'Grand Farewell & Controlled Egress', lead: 'Coordinator', avLighting: 'Warm perimeter lights', notes: 'Safe ride-share departures & vendor strike' }
    ],

    sensoryIdeas: [
      {
        title: 'Bespoke Celebration Aperitif',
        icon: 'cocktail',
        category: 'Signature Mixology',
        desc: 'Custom formulated cocktail balancing refreshing botanicals, citrus zest, and sparkling prosecco with an aromatic herb rim.',
        tags: ['Signature Drink', 'Custom Recipe', 'Zero-Proof Version']
      },
      {
        title: 'Interactive Photo & Memory Wall',
        icon: 'camera',
        category: 'Guest Engagement',
        desc: 'Live interactive photo installation where guests snap instant polaroids and pin them onto a backlit personalized art board.',
        tags: ['Tactile Keepsake', 'Social Media Ready']
      }
    ],

    guestMatrix: {
      confirmed: Math.round(guestCount * 0.85),
      pending: Math.round(guestCount * 0.10),
      declined: Math.round(guestCount * 0.05),
      dietaryStats: {
        'Standard': Math.round(guestCount * 0.75),
        'Plant-Based (Vegan)': Math.round(guestCount * 0.15),
        'Gluten-Free': Math.round(guestCount * 0.10)
      },
      tables: [
        { name: 'Head Table / VIP Cluster', seats: 10, vip: true, dietary: 'Special dietary flags on file' },
        { name: 'Reserved Guest Group A', seats: 12, vip: false, dietary: 'Standard Service' },
        { name: 'Reserved Guest Group B', seats: 12, vip: false, dietary: 'Mixed dietary needs' }
      ]
    },

    riskMatrix: [
      {
        domain: 'Inclement Weather & Outdoor Exposure',
        severity: 'High',
        levelClass: 'high-risk',
        trigger: 'Adverse weather forecast within 72 hours of event',
        action: 'Activate backup indoor floor plan transition; deploy rain canopy rentals and climate control units.'
      },
      {
        domain: 'Audio / Visual Technical Interruption',
        severity: 'Medium',
        levelClass: 'med-risk',
        trigger: 'Microphone feedback or circuit overload',
        action: 'Secondary wireless mic channel and dedicated isolated generator line always active on standby.'
      }
    ]
  };

  currentEvent = newEvent;

  // Reset modal
  const overlay = document.getElementById('genProgressOverlay');
  overlay.style.display = 'none';
  document.getElementById('btnSynthesize').disabled = false;
  document.getElementById('wizardModal').classList.remove('open');

  renderAllViews();
  showToast(`Synthesized complete plan for: ${currentEvent.title}`);
}

/* ==========================================================================
   ADD VENDOR MODAL
   ========================================================================== */
function setupVendorModal() {
  const modal = document.getElementById('vendorModal');
  const btnClose = document.getElementById('btnCloseVendorModal');
  const btnCancel = document.getElementById('btnCancelVendorModal');
  const form = document.getElementById('vendorForm');

  const closeModal = () => modal.classList.remove('open');
  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCancel) btnCancel.addEventListener('click', closeModal);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const vCat = document.getElementById('vCategory').value;
      const vName = document.getElementById('vName').value;
      const vContact = document.getElementById('vContact').value;
      const vCost = parseFloat(document.getElementById('vCost').value) || 0;
      const vStatus = document.getElementById('vStatus').value;
      const vDueDate = document.getElementById('vDueDate').value;
      const vNotes = document.getElementById('vNotes').value;

      currentEvent.vendorLedger.push({
        category: vCat,
        name: vName,
        contact: vContact,
        cost: vCost,
        status: vStatus,
        dueDate: vDueDate,
        priority: 'Medium',
        deliverables: vNotes
      });

      closeModal();
      form.reset();
      renderVendors();
      showToast(`Added vendor: ${vName}`);
    });
  }
}

function openVendorModal() {
  const modal = document.getElementById('vendorModal');
  if (modal) modal.classList.add('open');
}

/* ==========================================================================
   HEADER ACTIONS (PRINT / PDF EXPORT)
   ========================================================================== */
function setupHeaderActions() {
  const btnPrint = document.getElementById('btnPrintDossier');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   UTILITY HELPERS
   ========================================================================== */
function formatDate(dateStr) {
  if (!dateStr) return 'TBD';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', options);
  } catch (e) {
    return dateStr;
  }
}

function copyHex(hex) {
  navigator.clipboard.writeText(hex).then(() => {
    showToast(`Copied color hex: ${hex}`);
  });
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${msg}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}
