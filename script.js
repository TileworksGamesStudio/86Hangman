/**
 * THE COUPE — Production Engine
 */

(function () {
  'use strict';

  const CONFIG = {
    puzzleCsvPath: './puzzles.csv',
    releaseTimeZone: 'Europe/London',
    maxStrikes: 6,
    storageKey: 'the_coupe_game_state_v2',
    soundStorageKey: 'the_coupe_sound_enabled'
  };

  const dom = {
    menuScreen: document.getElementById('menu-screen'),
    gameScreen: document.getElementById('game-screen'),
    menuStatusBadge: document.getElementById('menu-status-badge'),
    menuMetaContainer: document.getElementById('menu-meta-container'),
    menuCurriculumLabel: document.getElementById('menu-curriculum-label'),
    menuDifficultyLabel: document.getElementById('menu-difficulty-label'),
    menuClueSnippet: document.getElementById('menu-clue-snippet'),
    menuPlayBtn: document.getElementById('menu-play-btn'),
    menuPlayText: document.getElementById('menu-play-text'),
    menuVaultBtn: document.getElementById('menu-vault-btn'),
    menuSoundBtn: document.getElementById('menu-sound-btn'),
    menuSoundIcon: document.getElementById('menu-sound-icon'),
    menuStatsBtn: document.getElementById('menu-stats-btn'),
    menuHelpBtn: document.getElementById('menu-help-btn'),
    backToMenuBtn: document.getElementById('back-to-menu-btn'),
    gameDayLabel: document.getElementById('game-day-label'),
    gameVaultBtn: document.getElementById('game-vault-btn'),
    gameSoundBtn: document.getElementById('game-sound-btn'),
    gameSoundIcon: document.getElementById('game-sound-icon'),
    curriculumBadge: document.getElementById('curriculum-badge'),
    difficultyBadge: document.getElementById('difficulty-badge'),
    puzzleClue: document.getElementById('puzzle-clue'),
    wordBoard: document.getElementById('word-board'),
    keyboard: document.getElementById('keyboard'),
    strikePips: document.getElementById('strike-pips'),
    strikeCount: document.getElementById('strike-count'),
    srAnnouncer: document.getElementById('sr-announcer'),
    vaultModal: document.getElementById('vault-modal'),
    statsModal: document.getElementById('stats-modal'),
    resultModal: document.getElementById('result-modal'),
    helpModal: document.getElementById('help-modal'),
    closeVaultBtn: document.getElementById('close-vault-btn'),
    closeStatsBtn: document.getElementById('close-stats-btn'),
    closeResultBtn: document.getElementById('close-result-btn'),
    closeHelpBtn: document.getElementById('close-help-btn'),
    shareScoreBtn: document.getElementById('share-score-btn'),
    resultMenuBtn: document.getElementById('result-menu-btn'),
    toastNotify: document.getElementById('toast-notify'),
    vaultList: document.getElementById('vault-list'),
    resultAnswer: document.getElementById('result-answer'),
    resultLore: document.getElementById('result-lore'),
    resultModalTitle: document.getElementById('result-modal-title'),
    statPlayed: document.getElementById('stat-played'),
    statWinRate: document.getElementById('stat-win-rate'),
    statStreak: document.getElementById('stat-streak'),
    statMaxStreak: document.getElementById('stat-max-streak'),
    strikeBars: document.getElementById('strike-bars'),
    garnishLayer: document.getElementById('garnish-layer')
  };

  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem(CONFIG.soundStorageKey) !== 'false';
      this.initCtx = this.initCtx.bind(this);
      window.addEventListener('click', this.initCtx, { once: true });
      window.addEventListener('keydown', this.initCtx, { once: true });
    }
    initCtx() { if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } }
    toggle() { this.enabled = !this.enabled; localStorage.setItem(CONFIG.soundStorageKey, this.enabled); return this.enabled; }
    play(type) {
      if (!this.enabled || !this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime, osc = this.ctx.createOscillator(), gain = this.ctx.createGain();
      osc.connect(gain); gain.connect(this.ctx.destination);
      if (type === 'correct') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(587.33, t); osc.frequency.exponentialRampToValueAtTime(880.0, t + 0.14);
        gain.gain.setValueAtTime(0.2, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
        osc.start(t); osc.stop(t + 0.28);
      } else if (type === 'wrong') {
        osc.type = 'triangle'; osc.frequency.setValueAtTime(175, t); osc.frequency.exponentialRampToValueAtTime(75, t + 0.18);
        gain.gain.setValueAtTime(0.25, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.start(t); osc.stop(t + 0.2);
      } else if (type === 'win') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const o = this.ctx.createOscillator(), g = this.ctx.createGain();
          o.type = 'sine'; o.frequency.value = freq; o.connect(g); g.connect(this.ctx.destination);
          g.gain.setValueAtTime(0.12, t + i * 0.07); g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.07 + 0.38);
          o.start(t + i * 0.07); o.stop(t + i * 0.07 + 0.38);
        });
      } else if (type === 'lose') {
        [440, 415.3, 392, 349.23].forEach((freq, i) => {
          const o = this.ctx.createOscillator(), g = this.ctx.createGain();
          o.type = 'triangle'; o.frequency.value = freq; o.connect(g); g.connect(this.ctx.destination);
          g.gain.setValueAtTime(0.14, t + i * 0.09); g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.09 + 0.32);
          o.start(t + i * 0.09); o.stop(t + i * 0.09 + 0.32);
        });
      } else if (type === 'click') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(420, t);
        gain.gain.setValueAtTime(0.04, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        osc.start(t); osc.stop(t + 0.04);
      }
    }
  }
  const sound = new SoundEngine();

  class GarnishAmbientEngine {
    constructor(container) {
      this.container = container;
      this.icons = ['#garnish-twist', '#garnish-mint', '#garnish-wheel', '#garnish-cherry', '#garnish-rosemary', '#garnish-olive'];
      this.activeElements = new Set();
      this.isGameMode = false;
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!this.reducedMotion) this.startSpawner();
    }
    setGameMode(isGame) {
      this.isGameMode = isGame;
      document.body.classList.toggle('game-mode-active', isGame);
      while (this.activeElements.size > (isGame ? 2 : 5)) {
        const first = this.activeElements.values().next().value;
        if (first) this.removeIcon(first);
      }
    }
    startSpawner() {
      const scheduleNext = () => { setTimeout(() => { this.maybeSpawn(); scheduleNext(); }, 1800 + Math.random() * 2400); };
      scheduleNext(); this.maybeSpawn(); setTimeout(() => this.maybeSpawn(), 900);
    }
    maybeSpawn() {
      if (this.activeElements.size >= (this.isGameMode ? 2 : 5)) return;
      const wrap = document.createElement('div'), svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      const symbol = this.icons[Math.floor(Math.random() * this.icons.length)];
      wrap.className = 'garnish-icon'; svg.setAttribute('viewBox', '0 0 50 50'); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', symbol); use.setAttribute('href', symbol);
      svg.appendChild(use); wrap.appendChild(svg);
      const startX = 8 + Math.random() * 84, driftX = (Math.random() - 0.5) * 35, duration = 14000 + Math.random() * 10000;
      const initialRotation = Math.random() * 360, targetRotation = initialRotation + (Math.random() - 0.5) * 180, scale = 0.75 + Math.random() * 0.45;
      wrap.style.left = `${startX}%`; wrap.style.bottom = '-60px';
      wrap.style.transform = `translate3d(0, 0, 0) scale(${scale}) rotate(${initialRotation}deg)`;
      this.container.appendChild(wrap); this.activeElements.add(wrap);
      const anim = wrap.animate([
        { transform: `translate3d(0, 0, 0) scale(${scale}) rotate(${initialRotation}deg)`, opacity: 0 },
        { opacity: this.isGameMode ? 0.1 : 0.35, offset: 0.15 },
        { opacity: this.isGameMode ? 0.1 : 0.5, offset: 0.35 },
        { transform: `translate3d(${driftX}px, calc(-100dvh - 120px), 0) scale(${scale}) rotate(${targetRotation}deg)`, opacity: 0 }
      ], { duration: duration, easing: 'linear', fill: 'forwards' });
      anim.onfinish = () => this.removeIcon(wrap);
    }
    removeIcon(el) { if (el && el.parentNode) el.parentNode.removeChild(el); this.activeElements.delete(el); }
  }

  class StorageManager {
    static getInitial() { return { version: 3, stats: { played: 0, won: 0, currentStreak: 0, maxStreak: 0, strikeDistribution: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } }, history: {} }; }
    static load() {
      try {
        const raw = localStorage.getItem(CONFIG.storageKey);
        return raw ? Object.assign(this.getInitial(), JSON.parse(raw)) : this.getInitial();
      } catch (e) { return this.getInitial(); }
    }
    static save(data) { try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(data)); } catch (e) {} }
  }

  // Pure CSV standard parser protecting internal quotes, commas, and line breaks
  function parseCSV(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = true, l;
    for (l of text) {
      if ('"' === l) { if (s && l === p) row[i] += l; s = !s; }
      else if (',' === l && s) l = row[++i] = '';
      else if ('\n' === l && s) {
        if ('\r' === p) row[i] = row[i].slice(0, -1);
        row = ret[++r] = [l = '']; i = 0;
      } else row[i] += l;
      p = l;
    }
    if (ret[ret.length - 1].length === 1 && ret[ret.length - 1][0] === '') ret.pop();
    return ret;
  }

  async function getAuthoritativeUKDate() {
    const url = window.location.href.split('#')[0] + (window.location.href.includes('?') ? '&' : '?') + 'cb=' + Date.now();
    const res = await fetch(url, { method: 'GET', cache: 'no-store' });
    const dateHeader = res.headers.get('Date');
    if (!dateHeader) throw new Error('Missing HTTP Date');
    const dateObj = new Date(dateHeader);
    if (isNaN(dateObj.getTime())) throw new Error('Invalid HTTP Date');
    
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: CONFIG.releaseTimeZone,
      year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(dateObj);
    
    return `${parts.find(p => p.type === 'year').value}-${parts.find(p => p.type === 'month').value}-${parts.find(p => p.type === 'day').value}`;
  }

  function formatDisplayDate(ymd) {
    return new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' })
      .format(new Date(ymd + 'T00:00:00Z'));
  }

  class Engine {
    constructor() {
      this.store = StorageManager.load();
      this.garnishEngine = new GarnishAmbientEngine(dom.garnishLayer);
      this.releaseState = { isValid: false, date: null, current: null, vault: [] };
      this.activePuzzle = null;
      this.guessedLetters = new Set();
      this.strikes = 0;
      this.isGameOver = false;
      this.bindEvents();
      this.updateSoundDisplay();
    }

    async bootstrap() {
      this.updateMenuUIState('LOADING', "Verifying release connection...", true);
      try {
        const [csvText, ukDate] = await Promise.all([
          fetch(CONFIG.puzzleCsvPath, { cache: 'no-store' }).then(r => { if (!r.ok) throw new Error('Data load failed'); return r.text(); }),
          getAuthoritativeUKDate()
        ]);
        
        const rows = parseCSV(csvText);
        if (rows.length < 2 || rows[0][0] !== 'release_date') throw new Error('Schema invalid');
        
        const headers = rows[0].map(h => h.trim());
        const puzzles = [];
        for (let i = 1; i < rows.length; i++) {
          if (rows[i].length !== headers.length) continue;
          const p = {}; headers.forEach((h, idx) => p[h] = rows[i][idx].trim());
          if (/^\d{4}-\d{2}-\d{2}$/.test(p.release_date)) puzzles.push(p);
        }

        let current = null, duplicate = false, vault = [];
        for (const p of puzzles) {
          if (p.release_date === ukDate) { if (current) duplicate = true; current = p; }
          else if (p.release_date < ukDate) { vault.push(p); }
        }
        
        this.releaseState = {
          isValid: true,
          date: ukDate,
          current: duplicate ? null : current,
          vault: vault.sort((a, b) => b.release_date.localeCompare(a.release_date))
        };
        
        this.renderMenu();
        this.initMidnightCheck();
      } catch (err) {
        this.releaseState = { isValid: false, date: null, current: null, vault: [] };
        this.updateMenuUIState('ERROR', "Today's puzzle could not be verified.", false, 'TRY AGAIN');
      }
    }

    updateMenuUIState(badgeText, clueText, disabled, btnText = 'PLAY') {
      dom.menuStatusBadge.textContent = badgeText;
      dom.menuStatusBadge.className = `hero-status-tag ${badgeText === 'ERROR' || badgeText === 'UNAVAILABLE' ? 'status-error' : badgeText === 'LOADING' ? '' : badgeText === 'DONE' ? 'status-done' : 'status-ready'}`;
      dom.menuMetaContainer.style.display = 'none';
      dom.menuClueSnippet.textContent = clueText;
      dom.menuPlayBtn.disabled = disabled;
      dom.menuPlayText.textContent = btnText;
    }

    renderMenu() {
      dom.gameScreen.classList.remove('screen-active');
      dom.menuScreen.classList.add('screen-active');
      this.garnishEngine.setGameMode(false);

      if (!this.releaseState.current) {
        this.updateMenuUIState('UNAVAILABLE', "Today's puzzle is not available.", false, 'TRY AGAIN');
        return;
      }

      const p = this.releaseState.current;
      const rec = this.store.history[p.puzzle_id];
      
      dom.menuMetaContainer.style.display = 'flex';
      dom.menuCurriculumLabel.textContent = p.curriculum.toUpperCase();
      dom.menuDifficultyLabel.textContent = p.difficulty.toUpperCase();
      dom.menuClueSnippet.textContent = p.clue;

      if (rec && rec.completed) {
        this.updateMenuUIState('DONE', p.clue, false, 'REVIEW');
      } else if (rec && rec.guessedLetters && rec.guessedLetters.length > 0) {
        this.updateMenuUIState('IN PROGRESS', p.clue, false, 'RESUME');
      } else {
        this.updateMenuUIState('READY', p.clue, false, 'PLAY');
      }
    }

    loadPuzzle(puzzleObj) {
      if (!puzzleObj) return;
      this.activePuzzle = puzzleObj;
      this.guessedLetters.clear();
      this.strikes = 0;
      this.isGameOver = false;

      dom.gameDayLabel.textContent = formatDisplayDate(puzzleObj.release_date).toUpperCase();
      dom.curriculumBadge.textContent = puzzleObj.curriculum.toUpperCase();
      dom.difficultyBadge.textContent = puzzleObj.difficulty.toUpperCase();
      dom.puzzleClue.textContent = puzzleObj.clue;

      const saved = this.store.history[puzzleObj.puzzle_id];
      if (saved) {
        (saved.guessedLetters || []).forEach(l => this.guessedLetters.add(l));
        this.strikes = saved.strikes || 0;
        this.isGameOver = saved.completed || false;
      }

      this.renderApparatus();
      this.renderBoard();
      this.renderKeyboard();

      dom.menuScreen.classList.remove('screen-active');
      dom.gameScreen.classList.add('screen-active');
      this.garnishEngine.setGameMode(true);

      if (this.isGameOver && saved) setTimeout(() => this.showResultModal(saved.won), 450);
    }

    renderBoard() {
      dom.wordBoard.innerHTML = '';
      const phrase = this.activePuzzle.answer.toUpperCase();
      phrase.split(' ').forEach(word => {
        const group = document.createElement('div'); group.className = 'word-group';
        for (const char of word) {
          const slot = document.createElement('div'); slot.className = 'letter-slot';
          if (/[A-Z]/.test(char)) {
            if (this.guessedLetters.has(char) || (this.isGameOver && this.strikes >= CONFIG.maxStrikes)) {
              slot.textContent = char; slot.classList.add('revealed');
              if (this.isGameOver && !this.guessedLetters.has(char)) slot.classList.add('missed');
            } else { slot.textContent = ''; }
          } else {
            slot.textContent = char; slot.classList.add('punctuation');
          }
          group.appendChild(slot);
        }
        dom.wordBoard.appendChild(group);
      });
    }

    renderKeyboard() {
      dom.keyboard.innerHTML = '';
      const rows = [['Q','W','E','R','T','Y','U','I','O','P'], ['A','S','D','F','G','H','J','K','L'], ['Z','X','C','V','B','N','M']];
      const answer = this.activePuzzle.answer.toUpperCase();
      rows.forEach(row => {
        const div = document.createElement('div'); div.className = 'keyboard-row';
        row.forEach(l => {
          const btn = document.createElement('button'); btn.className = 'key-btn'; btn.textContent = l; btn.dataset.key = l;
          if (this.guessedLetters.has(l)) {
            btn.disabled = true; btn.classList.add(answer.includes(l) ? 'correct' : 'wrong');
          }
          btn.onclick = () => { if (!this.isGameOver) this.handleGuess(l); };
          div.appendChild(btn);
        });
        dom.keyboard.appendChild(div);
      });
    }

    handleGuess(letter) {
      if (this.isGameOver || this.guessedLetters.has(letter)) return;
      this.guessedLetters.add(letter);
      const ans = this.activePuzzle.answer.toUpperCase();
      if (ans.includes(letter)) { sound.play('correct'); this.announce(`Correct: ${letter}`); } 
      else { this.strikes++; sound.play('wrong'); this.announce(`Strike ${this.strikes}`); }
      
      this.renderApparatus();
      this.renderBoard();
      const btn = dom.keyboard.querySelector(`button[data-key="${letter}"]`);
      if (btn) { btn.disabled = true; btn.classList.add(ans.includes(letter) ? 'correct' : 'wrong'); }
      this.checkCondition();
      this.saveProgress();
    }

    renderApparatus() {
      for (let i = 1; i <= CONFIG.maxStrikes; i++) {
        const part = document.getElementById(`strike-${i}`);
        if (part) part.classList.toggle('active', i <= this.strikes);
      }
      dom.strikePips.querySelectorAll('.pip').forEach((p, idx) => p.classList.toggle('filled', idx < this.strikes));
      dom.strikeCount.textContent = `${this.strikes} / ${CONFIG.maxStrikes}`;
    }

    checkCondition() {
      const clean = this.activePuzzle.answer.toUpperCase().replace(/[^A-Z]/g, '');
      const won = clean.split('').every(l => this.guessedLetters.has(l));
      if (won) this.conclude(true);
      else if (this.strikes >= CONFIG.maxStrikes) this.conclude(false);
    }

    conclude(won) {
      this.isGameOver = true;
      this.saveProgress(true, won);
      const s = this.store.stats; s.played++;
      if (won) {
        s.won++; s.currentStreak++; s.maxStreak = Math.max(s.maxStreak, s.currentStreak);
        if (s.strikeDistribution[this.strikes] !== undefined) s.strikeDistribution[this.strikes]++;
      } else { s.currentStreak = 0; }
      StorageManager.save(this.store);
      setTimeout(() => {
        sound.play(won ? 'win' : 'lose');
        this.renderBoard(); this.showResultModal(won);
      }, 500);
    }

    saveProgress(comp = false, won = false) {
      const p = this.activePuzzle.puzzle_id;
      const prev = this.store.history[p] || {};
      this.store.history[p] = {
        completed: comp || prev.completed || false,
        won: comp ? won : (prev.won || false),
        strikes: this.strikes,
        guessedLetters: Array.from(this.guessedLetters),
        release_date: this.activePuzzle.release_date
      };
      StorageManager.save(this.store);
    }

    showResultModal(won) {
      dom.resultAnswer.textContent = this.activePuzzle.answer.toUpperCase();
      dom.resultLore.textContent = this.activePuzzle.notes || '';
      dom.resultModalTitle.textContent = won ? 'PERFECT POUR' : 'POUR FAILED';
      this.openModal(dom.resultModal);
    }

    bindEvents() {
      dom.menuPlayBtn.onclick = () => {
        sound.play('click');
        if (!this.releaseState.isValid || !this.releaseState.current) this.bootstrap();
        else this.loadPuzzle(this.releaseState.current);
      };
      
      const toggles = [dom.menuSoundBtn, dom.gameSoundBtn];
      toggles.forEach(b => b.onclick = () => { sound.toggle(); this.updateSoundDisplay(); sound.play('click'); });
      
      dom.backToMenuBtn.onclick = () => { sound.play('click'); this.renderMenu(); };
      dom.menuVaultBtn.onclick = () => this.openVault();
      dom.gameVaultBtn.onclick = () => this.openVault();
      dom.menuStatsBtn.onclick = () => this.openStats();
      dom.menuHelpBtn.onclick = () => { sound.play('click'); this.openModal(dom.helpModal); };
      
      [dom.closeVaultBtn, dom.closeStatsBtn, dom.closeResultBtn, dom.closeHelpBtn].forEach(b => b.onclick = (e) => this.closeModal(e.target.closest('.modal-backdrop')));
      dom.resultMenuBtn.onclick = () => { this.closeModal(dom.resultModal); this.renderMenu(); };
      dom.shareScoreBtn.onclick = () => this.shareResult();

      document.querySelectorAll('.modal-backdrop').forEach(m => m.onclick = e => { if (e.target === m) this.closeModal(m); });

      window.addEventListener('keydown', e => {
        if (document.querySelector('.modal-backdrop.open') || !dom.gameScreen.classList.contains('screen-active')) return;
        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key) && !e.ctrlKey && !e.metaKey && !e.altKey) this.handleGuess(key);
      });
    }

    updateSoundDisplay() {
      const icon = sound.enabled ? '🔊' : '🔇';
      dom.menuSoundIcon.textContent = icon;
      dom.gameSoundIcon.textContent = icon;
    }

    openVault() {
      sound.play('click');
      dom.vaultList.innerHTML = '';
      if (this.releaseState.vault.length === 0) {
        dom.vaultList.innerHTML = `<div class="vault-empty-notice">Vault is currently empty.</div>`;
      } else {
        this.releaseState.vault.forEach(p => {
          const rec = this.store.history[p.puzzle_id];
          const div = document.createElement('div'); div.className = 'vault-card';
          const statBadge = rec?.completed ? `<span class="vault-badge played">${rec.won ? 'SOLVED' : 'FAILED'}</span>` : '';
          div.innerHTML = `
            <div class="vault-info">
              <span class="vault-day">${formatDisplayDate(p.release_date).toUpperCase()}</span>
              <span class="vault-cat">${p.curriculum}</span>
            </div>
            <div class="vault-status-btn-wrap">
              ${statBadge}
              <button class="action-btn secondary-glass" style="padding:8px 12px;font-size:0.75rem;">${rec?.completed ? 'REVIEW' : 'PLAY'}</button>
            </div>
          `;
          div.querySelector('button').onclick = () => { this.closeModal(dom.vaultModal); this.loadPuzzle(p); sound.play('click'); };
          dom.vaultList.appendChild(div);
        });
      }
      this.openModal(dom.vaultModal);
    }

    openStats() {
      sound.play('click');
      const s = this.store.stats;
      dom.statPlayed.textContent = s.played;
      dom.statWinRate.textContent = `${s.played ? Math.round((s.won / s.played) * 100) : 0}%`;
      dom.statStreak.textContent = s.currentStreak;
      dom.statMaxStreak.textContent = s.maxStreak;
      dom.strikeBars.innerHTML = '';
      const maxWins = Math.max(...Object.values(s.strikeDistribution), 1);
      for (let i = 0; i < CONFIG.maxStrikes; i++) {
        const row = document.createElement('div'); row.className = 'strike-bar-row';
        row.innerHTML = `<span class="bar-num">${i}</span><div class="bar-track"><div class="bar-fill" style="width:${s.strikeDistribution[i] ? Math.round((s.strikeDistribution[i]/maxWins)*100) : 0}%"></div></div><span class="bar-count">${s.strikeDistribution[i]}</span>`;
        dom.strikeBars.appendChild(row);
      }
      this.openModal(dom.statsModal);
    }

    shareResult() {
      const rec = this.store.history[this.activePuzzle.puzzle_id];
      const text = `THE COUPE — ${this.activePuzzle.release_date}\n${rec.won ? 'Served' : 'Spilled'} (${this.strikes}/${CONFIG.maxStrikes})\n` + 
                   Array.from({length: CONFIG.maxStrikes}).map((_, i) => i < this.strikes ? '🟥' : '🟩').join('') + '\n' + window.location.href;
      if (navigator.clipboard?.writeText) { navigator.clipboard.writeText(text).then(() => { dom.toastNotify.classList.add('show'); setTimeout(() => dom.toastNotify.classList.remove('show'), 2000); }).catch(() => prompt('Copy:', text)); }
      else { prompt('Copy:', text); }
    }

    openModal(m) { m.classList.add('open'); m.setAttribute('aria-hidden', 'false'); }
    closeModal(m) { m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); }
    announce(msg) { dom.srAnnouncer.textContent = msg; }

    initMidnightCheck() {
      setInterval(async () => {
        try {
          const freshDate = await getAuthoritativeUKDate();
          if (this.releaseState.date && freshDate !== this.releaseState.date) window.location.reload();
        } catch (e) {}
      }, 60000);
    }
  }

  document.addEventListener('DOMContentLoaded', () => { new Engine().bootstrap(); });
})();