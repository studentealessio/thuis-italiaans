/* ==========================================
   THUIS ITALIAANS — GAME MODE (condiviso)
   Timer opzionale + "Mostra soluzioni" con doppia conferma
========================================== */
const GameMode = {
  init(options = {}) {
    this.revealFn = options.revealSolutions || function () {};
    this.timerSeconds = options.timerSeconds || 180;
    this.remaining = this.timerSeconds;
    this.interval = null;
    this.injectBar();
  },

  injectBar() {
    const panel = document.querySelector('.ex-panel');
    if (!panel || document.getElementById('gmBar')) return;

    const bar = document.createElement('div');
    bar.className = 'game-mode-bar';
    bar.id = 'gmBar';
    const minutes = Math.round(this.timerSeconds / 60);
    bar.innerHTML = `
      <label class="game-mode-toggle">
        <input type="checkbox" id="gmTimerToggle">
        ⏱️ Modalità a tempo (${minutes} min)
      </label>
      <span class="game-timer-display" id="gmTimerDisplay"></span>
      <button class="solution-btn" id="gmSolutionBtn" type="button">👁️ Mostra soluzioni</button>
    `;
    panel.insertBefore(bar, panel.firstChild);

    document.getElementById('gmTimerToggle').addEventListener('change', (e) => {
      if (e.target.checked) this.startTimer();
      else this.stopTimer();
    });
    document.getElementById('gmSolutionBtn').addEventListener('click', () => this.confirmReveal());

    if (!document.getElementById('gmConfirmOverlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'confirm-overlay';
      overlay.id = 'gmConfirmOverlay';
      overlay.innerHTML = `
        <div class="confirm-box">
          <p>Sei sicuro? Prova ancora!</p>
          <div class="confirm-box-actions">
            <button class="ex-btn ex-btn-ghost" type="button" id="gmConfirmCancel">Riprovo ancora</button>
            <button class="ex-btn ex-btn-primary" type="button" id="gmConfirmOk">Mostra comunque</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      document.getElementById('gmConfirmCancel').addEventListener('click', () => {
        overlay.classList.remove('show');
      });
      document.getElementById('gmConfirmOk').addEventListener('click', () => {
        overlay.classList.remove('show');
        GameMode.revealFn();
      });
    }
  },

  confirmReveal() {
    document.getElementById('gmConfirmOverlay').classList.add('show');
  },

  startTimer() {
    const display = document.getElementById('gmTimerDisplay');
    display.classList.add('active');
    this.remaining = this.timerSeconds;
    this.updateDisplay();
    this.interval = setInterval(() => {
      this.remaining--;
      this.updateDisplay();
      if (this.remaining <= 0) {
        this.stopTimer();
        this.timeUp();
      }
    }, 1000);
  },

  stopTimer() {
    clearInterval(this.interval);
    const display = document.getElementById('gmTimerDisplay');
    if (display) display.classList.remove('active', 'urgent');
    const toggle = document.getElementById('gmTimerToggle');
    if (toggle) toggle.checked = false;
  },

  updateDisplay() {
    const display = document.getElementById('gmTimerDisplay');
    const m = Math.floor(this.remaining / 60);
    const s = this.remaining % 60;
    display.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    display.classList.toggle('urgent', this.remaining <= 20);
  },

  timeUp() {
    const panel = document.querySelector('.ex-panel');
    const note = document.createElement('p');
    note.style.textAlign = 'center';
    note.style.color = 'var(--bad)';
    note.style.fontWeight = '700';
    note.style.marginBottom = '16px';
    note.textContent = '⏱️ Tempo scaduto!';
    panel.insertBefore(note, panel.children[1] || null);
  }
};
