/**
 * THE COUPE — Daily Cocktail Hangman Engine
 * Architecture:
 *  1. Dedicated Main Menu Screen & Screen State Controller
 *  2. Deterministic Release Scheduler (8 Sep 2026 = Day 0 Baseline)
 *  3. Dynamic Garnish Ambient Floating Engine
 *  4. Resilient Versioned Local Storage & Mid-Game Persistence
 *  5. Web Audio API Latency-Free Sound Synthesizer
 *  6. Midnight Date Monitor & Safe History Preservation
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. SYSTEM CONFIGURATION & ANCHOR CALIBRATION
  // ==========================================================================
  const STORAGE_KEY = 'the_coupe_game_state_v2';
  const SOUND_STORAGE_KEY = 'the_coupe_sound_enabled';
  const MAX_STRIKES = 6;
  
  // Official Platform Anchor: Day 0 commences on 8 September 2026
  const ANCHOR_YEAR = 2026;
  const ANCHOR_MONTH = 8; // September (0-indexed)
  const ANCHOR_DATE = 8;

  // Cached DOM Elements
  const dom = {
    // Screens
    menuScreen: document.getElementById('menu-screen'),
    gameScreen: document.getElementById('game-screen'),

    // Main Menu Elements
    menuDayBadge: document.getElementById('menu-day-badge'),
    menuStatusBadge: document.getElementById('menu-status-badge'),
    menuPuzzleTitle: document.getElementById('menu-puzzle-title'),
    menuCurriculumLabel: document.getElementById('menu-curriculum-label'),
    menuDifficultyLabel: document.getElementById('menu-difficulty-label'),
    menuClueSnippet: document.getElementById('menu-clue-snippet'),
    menuPlayBtn: document.getElementById('menu-play-btn'),
    menuPlayText: document.getElementById('menu-play-text'),
    menuVaultBtn: document.getElementById('menu-vault-btn'),
    menuVaultDesc: document.getElementById('menu-vault-desc'),
    menuSoundBtn: document.getElementById('menu-sound-btn'),
    menuSoundIcon: document.getElementById('menu-sound-icon'),
    menuSoundText: document.getElementById('menu-sound-text'),
    menuStatsBtn: document.getElementById('menu-stats-btn'),
    menuHelpBtn: document.getElementById('menu-help-btn'),

    // Active Game Screen Elements
    backToMenuBtn: document.getElementById('back-to-menu-btn'),
    gameDayLabel: document.getElementById('game-day-label'),
    gameVaultBtn: document.getElementById('game-vault-btn'),
    gameStatsBtn: document.getElementById('game-stats-btn'),
    gameSoundBtn: document.getElementById('game-sound-btn'),
    gameSoundIcon: document.getElementById('game-sound-icon'),
    gameHelpBtn: document.getElementById('game-help-btn'),

    curriculumBadge: document.getElementById('curriculum-badge'),
    difficultyBadge: document.getElementById('difficulty-badge'),
    puzzleClue: document.getElementById('puzzle-clue'),
    wordBoard: document.getElementById('word-board'),
    keyboard: document.getElementById('keyboard'),
    strikePips: document.getElementById('strike-pips'),
    strikeCount: document.getElementById('strike-count'),
    srAnnouncer: document.getElementById('sr-announcer'),

    // Modals & Controls
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

    // Result Elements
    resultAnswer: document.getElementById('result-answer'),
    resultLore: document.getElementById('result-lore'),
    resultBadge: document.getElementById('result-badge'),
    resultModalTitle: document.getElementById('result-modal-title'),

    // Stats Elements
    statPlayed: document.getElementById('stat-played'),
    statWinRate: document.getElementById('stat-win-rate'),
    statStreak: document.getElementById('stat-streak'),
    statMaxStreak: document.getElementById('stat-max-streak'),
    strikeBars: document.getElementById('strike-bars'),

    // Garnish Layer
    garnishLayer: document.getElementById('garnish-layer')
  };

  // ==========================================================================
  // 2. SOUND SYNTHESIZER ENGINE (Crisp, Latency-Free Web Audio)
  // ==========================================================================
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem(SOUND_STORAGE_KEY) !== 'false';
      this.initCtx = this.initCtx.bind(this);
      window.addEventListener('click', this.initCtx, { once: true });
      window.addEventListener('keydown', this.initCtx, { once: true });
    }

    initCtx() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem(SOUND_STORAGE_KEY, this.enabled);
      return this.enabled;
    }

    play(type) {
      if (!this.enabled) return;
      this.initCtx();
      if (!this.ctx || this.ctx.state === 'suspended') {
        this.ctx && this.ctx.resume();
      }
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'correct') {
        // High, sparkling bar bell chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, t); // D5
        osc.frequency.exponentialRampToValueAtTime(880.0, t + 0.14); // A5
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
        osc.start(t);
        osc.stop(t + 0.28);
      } else if (type === 'wrong') {
        // Muted ice drop thud
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(175, t);
        osc.frequency.exponentialRampToValueAtTime(75, t + 0.18);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.start(t);
        osc.stop(t + 0.2);
      } else if (type === 'win') {
        // Celebratory major triad flourish
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.type = 'sine';
          o.frequency.value = freq;
          o.connect(g);
          g.connect(this.ctx.destination);
          g.gain.setValueAtTime(0.12, t + i * 0.07);
          g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.07 + 0.38);
          o.start(t + i * 0.07);
          o.stop(t + i * 0.07 + 0.38);
        });
      } else if (type === 'lose') {
        // Somber minor descending tone
        [440, 415.3, 392, 349.23].forEach((freq, i) => {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.type = 'triangle';
          o.frequency.value = freq;
          o.connect(g);
          g.connect(this.ctx.destination);
          g.gain.setValueAtTime(0.14, t + i * 0.09);
          g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.09 + 0.32);
          o.start(t + i * 0.09);
          o.stop(t + i * 0.09 + 0.32);
        });
      } else if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, t);
        gain.gain.setValueAtTime(0.04, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        osc.start(t);
        osc.stop(t + 0.04);
      }
    }
  }

  const sound = new SoundEngine();

  // ==========================================================================
  // 3. FLOATING GARNISH AMBIENT ENGINE
  // ==========================================================================
  class GarnishAmbientEngine {
    constructor(container) {
      this.container = container;
      this.icons = [
        '#garnish-twist',
        '#garnish-mint',
        '#garnish-wheel',
        '#garnish-cherry',
        '#garnish-rosemary',
        '#garnish-olive'
      ];
      this.activeElements = new Set();
      this.maxMenuIcons = 5;
      this.maxGameIcons = 2;
      this.isGameMode = false;
      this.spawnTimer = null;
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!this.reducedMotion) {
        this.startSpawner();
      }
    }

    setGameMode(isGame) {
      this.isGameMode = isGame;
      if (isGame) {
        document.body.classList.add('game-mode-active');
        // If too many icons exist, prune down smoothly
        while (this.activeElements.size > this.maxGameIcons) {
          const first = this.activeElements.values().next().value;
          if (first) this.removeIcon(first);
        }
      } else {
        document.body.classList.remove('game-mode-active');
      }
    }

    startSpawner() {
      const scheduleNext = () => {
        const delay = 1800 + Math.random() * 2400;
        this.spawnTimer = setTimeout(() => {
          this.maybeSpawn();
          scheduleNext();
        }, delay);
      };
      scheduleNext();
      // Immediate initial seed
      this.maybeSpawn();
      setTimeout(() => this.maybeSpawn(), 900);
    }

    maybeSpawn() {
      const maxAllowed = this.isGameMode ? this.maxGameIcons : this.maxMenuIcons;
      if (this.activeElements.size >= maxAllowed) return;

      const svgSymbol = this.icons[Math.floor(Math.random() * this.icons.length)];
      const wrap = document.createElement('div');
      wrap.className = 'garnish-icon';

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 50 50');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');

      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', svgSymbol);
      use.setAttribute('href', svgSymbol);
      svg.appendChild(use);
      wrap.appendChild(svg);

      // Randomize initial trajectory
      const startX = 8 + Math.random() * 84; // vw percentage
      const driftX = (Math.random() - 0.5) * 35; // px drift
      const duration = 14000 + Math.random() * 10000; // ms
      const initialRotation = Math.random() * 360;
      const targetRotation = initialRotation + (Math.random() - 0.5) * 180;
      const scale = 0.75 + Math.random() * 0.45;
      const baseOpacity = this.isGameMode ? 0.14 : (0.28 + Math.random() * 0.22);

      wrap.style.left = `${startX}%`;
      wrap.style.bottom = '-60px';
      wrap.style.transform = `translate3d(0, 0, 0) scale(${scale}) rotate(${initialRotation}deg)`;

      this.container.appendChild(wrap);
      this.activeElements.add(wrap);

      // Animate using Web Animations API for smooth 60fps GPU transforms
      const anim = wrap.animate([
        {
          transform: `translate3d(0, 0, 0) scale(${scale}) rotate(${initialRotation}deg)`,
          opacity: 0
        },
        {
          opacity: baseOpacity,
          offset: 0.15
        },
        {
          // Pass through lower light source: brighten subtly
          opacity: Math.min(baseOpacity + 0.16, 0.65),
          offset: 0.35
        },
        {
          transform: `translate3d(${driftX}px, calc(-100dvh - 120px), 0) scale(${scale}) rotate(${targetRotation}deg)`,
          opacity: 0
        }
      ], {
        duration: duration,
        easing: 'linear',
        fill: 'forwards'
      });

      anim.onfinish = () => this.removeIcon(wrap);
    }

    removeIcon(el) {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
      this.activeElements.delete(el);
    }
  }

  // ==========================================================================
  // 4. STORAGE MANAGER & DATA PERSISTENCE
  // ==========================================================================
  class StorageManager {
    static getInitialState() {
      return {
        version: 2,
        stats: {
          played: 0,
          won: 0,
          currentStreak: 0,
          maxStreak: 0,
          strikeDistribution: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        },
        history: {} // Map [puzzleId] => { completed: bool, won: bool, strikes: int, guessedLetters: [], dayNumber: int }
      };
    }

    static load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          // Check for migration from v1
          const v1Raw = localStorage.getItem('the_coupe_game_state_v1');
          if (v1Raw) {
            const v1 = JSON.parse(v1Raw);
            const migrated = this.getInitialState();
            migrated.stats = Object.assign(migrated.stats, v1.stats || {});
            migrated.history = Object.assign(migrated.history, v1.history || {});
            return migrated;
          }
          return this.getInitialState();
        }
        const data = JSON.parse(raw);
        if (!data.version || data.version !== 2) {
          data.version = 2;
        }
        return data;
      } catch (e) {
        console.warn('Storage unavailable or corrupted. Using fresh state.', e);
        return this.getInitialState();
      }
    }

    static save(data) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn('Unable to persist game state:', e);
      }
    }
  }

  // ==========================================================================
  // 5. DETERMINISTIC RELEASE SCHEDULER (8 SEP 2026 = DAY 0)
  // ==========================================================================
  class ReleaseScheduler {
    /**
     * Calculates the deterministic day number.
     * DAY 0 = 8 September 2026.
     * If user visits prior to Day 0, returns 0 for stable preview/testing.
     */
    static getCurrentDayNumber() {
      const anchor = new Date(ANCHOR_YEAR, ANCHOR_MONTH, ANCHOR_DATE, 0, 0, 0, 0);
      const now = new Date();
      const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
      const diffMs = todayMidnight.getTime() - anchor.getTime();
      const diffDays = Math.round(diffMs / 86400000);
      return Math.max(0, diffDays);
    }

    /**
     * Resolves puzzle for a day number without shifting history when new items are appended.
     */
    static getPuzzleForDay(dayNumber, puzzleList) {
      if (!puzzleList || puzzleList.length === 0) return null;

      // Stable 0-indexed chronological mapping
      const index = Math.abs(dayNumber) % puzzleList.length;
      return puzzleList[index];
    }

    /**
     * Returns ONLY historical, released puzzles (Day 0 to dayNumber - 1).
     * FUTURE PUZZLES NEVER LEAK OR RENDER IN THE VAULT.
     * On Day 0, returns an empty array.
     */
    static getVaultPuzzles(todayDayNumber, puzzleList) {
      const vault = [];
      for (let day = todayDayNumber - 1; day >= 0; day--) {
        const p = this.getPuzzleForDay(day, puzzleList);
        if (p) {
          vault.push({
            dayNumber: day,
            puzzle: p
          });
        }
      }
      return vault;
    }
  }

  // ==========================================================================
  // 6. MAIN GAME ENGINE CONTROLLER
  // ==========================================================================
  class HangmanGame {
    constructor() {
      this.store = StorageManager.load();
      this.puzzles = (window.COCKTAIL_PUZZLES && Array.isArray(window.COCKTAIL_PUZZLES))
        ? window.COCKTAIL_PUZZLES
        : [];

      this.todayDayNumber = ReleaseScheduler.getCurrentDayNumber();
      this.activeDayNumber = this.todayDayNumber;
      this.activePuzzle = null;
      this.guessedLetters = new Set();
      this.strikes = 0;
      this.isGameOver = false;

      this.garnishEngine = new GarnishAmbientEngine(dom.garnishLayer);

      this.init();
    }

    init() {
      this.bindEvents();
      this.updateSoundDisplay();
      this.updateMenuScreenInfo();
      this.initMidnightCheck();

      // Start on Main Menu
      this.showMenuScreen();
    }

    // Navigation Screen Management
    showMenuScreen() {
      dom.gameScreen.classList.remove('screen-active');
      dom.menuScreen.classList.add('screen-active');
      this.garnishEngine.setGameMode(false);
      this.updateMenuScreenInfo();
    }

    showGameScreen(dayNumber) {
      this.loadPuzzleForDay(dayNumber);
      dom.menuScreen.classList.remove('screen-active');
      dom.gameScreen.classList.add('screen-active');
      this.garnishEngine.setGameMode(true);
    }

    bindEvents() {
      // Main Menu navigation actions
      dom.menuPlayBtn.addEventListener('click', () => {
        sound.play('click');
        this.showGameScreen(this.todayDayNumber);
      });

      dom.menuVaultBtn.addEventListener('click', () => {
        sound.play('click');
        this.openVault();
      });

      dom.menuSoundBtn.addEventListener('click', () => {
        const on = sound.toggle();
        this.updateSoundDisplay();
        sound.play('click');
        this.announce(on ? 'Sound effects enabled' : 'Sound effects muted');
      });

      dom.menuStatsBtn.addEventListener('click', () => this.openStats());
      dom.menuHelpBtn.addEventListener('click', () => this.openHelp());

      // Game Stage navigation actions
      dom.backToMenuBtn.addEventListener('click', () => {
        sound.play('click');
        this.showMenuScreen();
      });

      dom.gameVaultBtn.addEventListener('click', () => this.openVault());
      dom.gameStatsBtn.addEventListener('click', () => this.openStats());
      dom.gameSoundBtn.addEventListener('click', () => {
        const on = sound.toggle();
        this.updateSoundDisplay();
        sound.play('click');
        this.announce(on ? 'Sound effects enabled' : 'Sound effects muted');
      });
      dom.gameHelpBtn.addEventListener('click', () => this.openHelp());

      // Modal closers
      dom.closeVaultBtn.addEventListener('click', () => this.closeModal(dom.vaultModal));
      dom.closeStatsBtn.addEventListener('click', () => this.closeModal(dom.statsModal));
      dom.closeResultBtn.addEventListener('click', () => this.closeModal(dom.resultModal));
      dom.closeHelpBtn.addEventListener('click', () => this.closeModal(dom.helpModal));

      dom.resultMenuBtn.addEventListener('click', () => {
        this.closeModal(dom.resultModal);
        this.showMenuScreen();
      });

      [dom.vaultModal, dom.statsModal, dom.resultModal, dom.helpModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) this.closeModal(modal);
        });
      });

      // Share result
      dom.shareScoreBtn.addEventListener('click', () => this.shareResult());

      // Keyboard input
      window.addEventListener('keydown', (e) => {
        if (this.isModalOpen()) return;
        if (!dom.gameScreen.classList.contains('screen-active')) return;

        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
          this.handleLetterGuess(key);
        }
      });
    }

    updateSoundDisplay() {
      const on = sound.enabled;
      const icon = on ? '🔊' : '🔇';
      const label = on ? 'SOUND: ON' : 'SOUND: OFF';

      dom.menuSoundIcon.textContent = icon;
      dom.menuSoundText.textContent = label;
      dom.menuSoundBtn.setAttribute('aria-pressed', on ? 'true' : 'false');

      dom.gameSoundIcon.textContent = icon;
      dom.gameSoundBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    }

    updateMenuScreenInfo() {
      const todayPuzzle = ReleaseScheduler.getPuzzleForDay(this.todayDayNumber, this.puzzles);
      if (!todayPuzzle) return;

      dom.menuDayBadge.textContent = `DAY #${this.todayDayNumber} — TODAY’S SPECIAL`;
      dom.menuCurriculumLabel.textContent = todayPuzzle.curriculum.toUpperCase();
      dom.menuDifficultyLabel.textContent = todayPuzzle.difficulty.toUpperCase();
      dom.menuClueSnippet.textContent = todayPuzzle.clue;

      const record = this.store.history[todayPuzzle.id];
      if (record && record.completed) {
        if (record.won) {
          dom.menuStatusBadge.textContent = `SOLVED (${record.strikes}/6)`;
          dom.menuStatusBadge.className = 'hero-status-tag status-completed';
        } else {
          dom.menuStatusBadge.textContent = "86'D (OUT OF STOCK)";
          dom.menuStatusBadge.className = 'hero-status-tag status-failed';
        }
        dom.menuPlayText.textContent = 'REVIEW TODAY’S POUR';
      } else if (record && record.guessedLetters && record.guessedLetters.length > 0) {
        dom.menuStatusBadge.textContent = `IN PROGRESS (${record.strikes}/6 STRIKES)`;
        dom.menuStatusBadge.className = 'hero-status-tag status-inprogress';
        dom.menuPlayText.textContent = 'RESUME ORDER';
      } else {
        dom.menuStatusBadge.textContent = 'READY TO PLAY';
        dom.menuStatusBadge.className = 'hero-status-tag status-unplayed';
        dom.menuPlayText.textContent = 'PLAY TODAY’S PUZZLE';
      }

      // Vault Teaser Count
      const vaultCount = Math.max(0, this.todayDayNumber);
      if (vaultCount === 0) {
        dom.menuVaultDesc.textContent = 'The Cellar Vault opens tomorrow once today’s inaugural pour is archived.';
      } else {
        dom.menuVaultDesc.textContent = `${vaultCount} vintage cocktail challenge${vaultCount === 1 ? '' : 's'} available in the archive.`;
      }
    }

    loadPuzzleForDay(dayNumber) {
      const puzzle = ReleaseScheduler.getPuzzleForDay(dayNumber, this.puzzles);
      if (!puzzle) {
        dom.puzzleClue.textContent = 'No cocktail recipe on file for this date.';
        return;
      }

      this.activeDayNumber = dayNumber;
      this.activePuzzle = puzzle;
      this.guessedLetters.clear();
      this.strikes = 0;
      this.isGameOver = false;

      // Update Labels
      dom.gameDayLabel.textContent = `DAY #${dayNumber}${dayNumber === this.todayDayNumber ? ' (TODAY)' : ''}`;
      dom.curriculumBadge.textContent = puzzle.curriculum.toUpperCase();
      dom.difficultyBadge.textContent = puzzle.difficulty.toUpperCase();
      dom.puzzleClue.textContent = puzzle.clue;

      // Restore saved state if exists
      const saved = this.store.history[puzzle.id];
      if (saved) {
        if (Array.isArray(saved.guessedLetters)) {
          saved.guessedLetters.forEach(l => this.guessedLetters.add(l));
        }
        this.strikes = saved.strikes || 0;
        this.isGameOver = saved.completed || false;
      }

      this.renderApparatus();
      this.renderBoard();
      this.renderKeyboard();

      if (this.isGameOver && saved) {
        setTimeout(() => this.showResultModal(saved.won), 450);
      }
    }

    renderBoard() {
      dom.wordBoard.innerHTML = '';
      const phrase = this.activePuzzle.answer.toUpperCase();
      const words = phrase.split(' ');

      words.forEach(word => {
        const wordGroup = document.createElement('div');
        wordGroup.className = 'word-group';

        for (let i = 0; i < word.length; i++) {
          const char = word[i];
          const slot = document.createElement('div');
          slot.className = 'letter-slot';

          if (/[A-Z]/.test(char)) {
            if (this.guessedLetters.has(char) || (this.isGameOver && this.strikes >= MAX_STRIKES)) {
              slot.textContent = char;
              slot.classList.add('revealed');
              if (this.isGameOver && !this.guessedLetters.has(char)) {
                slot.style.color = '#FF7A29'; // Highlight unrevealed letters on loss
              }
            } else {
              slot.textContent = '';
            }
          } else {
            slot.textContent = char;
            slot.classList.add('punctuation');
          }
          wordGroup.appendChild(slot);
        }

        dom.wordBoard.appendChild(wordGroup);
      });
    }

    renderKeyboard() {
      dom.keyboard.innerHTML = '';
      const rows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
      ];

      const cleanAnswer = this.activePuzzle.answer.toUpperCase();

      rows.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';

        row.forEach(letter => {
          const btn = document.createElement('button');
          btn.className = 'key-btn';
          btn.textContent = letter;
          btn.setAttribute('data-key', letter);
          btn.setAttribute('aria-label', `Letter ${letter}`);

          if (this.guessedLetters.has(letter)) {
            btn.disabled = true;
            if (cleanAnswer.includes(letter)) {
              btn.classList.add('correct');
            } else {
              btn.classList.add('wrong');
            }
          }

          btn.addEventListener('click', () => {
            if (!this.isGameOver) {
              this.handleLetterGuess(letter);
            }
          });

          rowDiv.appendChild(btn);
        });

        dom.keyboard.appendChild(rowDiv);
      });
    }

    handleLetterGuess(letter) {
      if (this.isGameOver || this.guessedLetters.has(letter)) return;

      this.guessedLetters.add(letter);
      const answer = this.activePuzzle.answer.toUpperCase();

      if (answer.includes(letter)) {
        sound.play('correct');
        this.announce(`Correct. Letter ${letter} is in the cocktail spec.`);
      } else {
        this.strikes++;
        sound.play('wrong');
        this.announce(`Strike ${this.strikes}. Letter ${letter} is not in the spec.`);
      }

      this.renderApparatus();
      this.renderBoard();
      this.updateKeyboardKey(letter);
      this.checkGameCondition();
      this.saveProgress();
    }

    updateKeyboardKey(letter) {
      const btn = dom.keyboard.querySelector(`button[data-key="${letter}"]`);
      if (!btn) return;
      btn.disabled = true;
      const answer = this.activePuzzle.answer.toUpperCase();
      if (answer.includes(letter)) {
        btn.classList.add('correct');
      } else {
        btn.classList.add('wrong');
      }
    }

    renderApparatus() {
      for (let i = 1; i <= MAX_STRIKES; i++) {
        const part = document.getElementById(`strike-${i}`);
        if (part) {
          if (i <= this.strikes) {
            part.classList.add('active');
          } else {
            part.classList.remove('active');
          }
        }
      }

      const pips = dom.strikePips.querySelectorAll('.pip');
      pips.forEach((pip, idx) => {
        if (idx < this.strikes) {
          pip.classList.add('filled');
        } else {
          pip.classList.remove('filled');
        }
      });

      dom.strikeCount.textContent = `${this.strikes} / ${MAX_STRIKES}`;
      dom.strikePips.setAttribute('aria-label', `Strikes: ${this.strikes} of ${MAX_STRIKES} used`);
    }

    checkGameCondition() {
      const cleanAnswer = this.activePuzzle.answer.toUpperCase().replace(/[^A-Z]/g, '');
      const hasWon = cleanAnswer.split('').every(l => this.guessedLetters.has(l));

      if (hasWon) {
        this.concludeGame(true);
      } else if (this.strikes >= MAX_STRIKES) {
        this.concludeGame(false);
      }
    }

    concludeGame(won) {
      this.isGameOver = true;
      this.saveProgress(true, won);
      this.updateGlobalStats(won, this.strikes);

      setTimeout(() => {
        if (won) {
          sound.play('win');
        } else {
          sound.play('lose');
        }
        this.renderBoard();
        this.showResultModal(won);
      }, 500);
    }

    saveProgress(completed = false, won = false) {
      const pid = this.activePuzzle.id;
      const prev = this.store.history[pid] || {};

      this.store.history[pid] = {
        completed: completed || prev.completed || false,
        won: completed ? won : (prev.won || false),
        strikes: this.strikes,
        guessedLetters: Array.from(this.guessedLetters),
        dayNumber: this.activeDayNumber,
        lastPlayed: Date.now()
      };

      StorageManager.save(this.store);
    }

    updateGlobalStats(won, strikesUsed) {
      const stats = this.store.stats;
      stats.played += 1;

      if (won) {
        stats.won += 1;
        stats.currentStreak += 1;
        if (stats.currentStreak > stats.maxStreak) {
          stats.maxStreak = stats.currentStreak;
        }
        if (stats.strikeDistribution[strikesUsed] !== undefined) {
          stats.strikeDistribution[strikesUsed] += 1;
        }
      } else {
        stats.currentStreak = 0;
      }

      StorageManager.save(this.store);
    }

    showResultModal(won) {
      dom.resultAnswer.textContent = this.activePuzzle.answer.toUpperCase();
      dom.resultLore.textContent = this.activePuzzle.notes || 'No historical field notes recorded for this cocktail spec.';

      if (won) {
        dom.resultBadge.textContent = 'ORDER COMPLETE';
        dom.resultBadge.className = 'result-outcome-badge outcome-won';
        dom.resultModalTitle.textContent = 'PERFECT POUR!';
      } else {
        dom.resultBadge.textContent = "86'D (OUT OF STOCK)";
        dom.resultBadge.className = 'result-outcome-badge outcome-lost';
        dom.resultModalTitle.textContent = 'LAST CALL!';
      }

      this.openModal(dom.resultModal);
    }

    shareResult() {
      const p = this.activePuzzle;
      const historyRecord = this.store.history[p.id];
      const won = historyRecord ? historyRecord.won : false;
      const strikeCount = this.strikes;
      const dayNum = this.activeDayNumber;

      let pipEmoji = '';
      for (let i = 0; i < MAX_STRIKES; i++) {
        pipEmoji += (i < strikeCount) ? '🟥' : '🟩';
      }

      const outcomeText = won ? `${strikeCount}/${MAX_STRIKES} Strikes` : '86’d';
      const text = `🍸 THE COUPE #${dayNum}\n` +
                   `Pour: ${won ? 'Served' : 'Spilled'} (${outcomeText})\n` +
                   `${pipEmoji}\n` +
                   `Topic: ${p.curriculum}\n` +
                   `https://tileworksgamesstudio.github.io/86/`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          this.showToast('Copied result to clipboard!');
        }).catch(() => {
          this.fallbackShare(text);
        });
      } else {
        this.fallbackShare(text);
      }
    }

    fallbackShare(text) {
      window.prompt('Copy your cocktail score:', text);
    }

    showToast(msg) {
      dom.toastNotify.textContent = msg;
      dom.toastNotify.classList.add('show');
      setTimeout(() => dom.toastNotify.classList.remove('show'), 2400);
    }

    // ========================================================================
    // 7. CELLAR VAULT (Archive of Strictly Released Days)
    // ========================================================================
    openVault() {
      dom.vaultList.innerHTML = '';
      const vaultPuzzles = ReleaseScheduler.getVaultPuzzles(this.todayDayNumber, this.puzzles);

      if (vaultPuzzles.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'vault-empty-notice';
        emptyMsg.innerHTML = `
          <strong>THE CELLAR IS CURRENTLY EMPTY</strong><br>
          Today is Day #0 (Inaugural Release). The Cellar Vault archives past editions starting tomorrow at midnight.
        `;
        dom.vaultList.appendChild(emptyMsg);
      } else {
        vaultPuzzles.forEach(({ dayNumber, puzzle }) => {
          const card = document.createElement('div');
          card.className = 'vault-card';

          const historyRecord = this.store.history[puzzle.id];
          let statusBadge = '<span class="vault-badge-status" style="background:#281810;color:#D1BAA7">UNPLAYED</span>';

          if (historyRecord && historyRecord.completed) {
            if (historyRecord.won) {
              statusBadge = `<span class="vault-badge-status status-solved">SOLVED (${historyRecord.strikes}/6)</span>`;
            } else {
              statusBadge = `<span class="vault-badge-status status-failed">86'D</span>`;
            }
          }

          card.innerHTML = `
            <div class="vault-info">
              <span class="vault-day">DAY #${dayNumber}</span>
              <span class="vault-cat">${puzzle.curriculum} • ${puzzle.difficulty}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              ${statusBadge}
              <button class="action-btn secondary-glass" style="padding:6px 10px;font-size:0.75rem;" data-day="${dayNumber}">
                ${historyRecord && historyRecord.completed ? 'REVIEW' : 'POUR'}
              </button>
            </div>
          `;

          card.querySelector('button').addEventListener('click', () => {
            this.closeModal(dom.vaultModal);
            this.showGameScreen(dayNumber);
            sound.play('click');
          });

          dom.vaultList.appendChild(card);
        });
      }

      this.openModal(dom.vaultModal);
      sound.play('click');
    }

    openStats() {
      const s = this.store.stats;
      dom.statPlayed.textContent = s.played;
      const rate = s.played > 0 ? Math.round((s.won / s.played) * 100) : 0;
      dom.statWinRate.textContent = `${rate}%`;
      dom.statStreak.textContent = s.currentStreak;
      dom.statMaxStreak.textContent = s.maxStreak;

      dom.strikeBars.innerHTML = '';
      const maxWins = Math.max(...Object.values(s.strikeDistribution), 1);

      for (let i = 0; i < MAX_STRIKES; i++) {
        const count = s.strikeDistribution[i] || 0;
        const pct = Math.round((count / maxWins) * 100);

        const row = document.createElement('div');
        row.className = 'strike-bar-row';
        row.innerHTML = `
          <span class="bar-num">${i}</span>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${count > 0 ? pct : 0}%"></div>
          </div>
          <span class="bar-count">${count}</span>
        `;
        dom.strikeBars.appendChild(row);
      }

      this.openModal(dom.statsModal);
      sound.play('click');
    }

    openHelp() {
      this.openModal(dom.helpModal);
      sound.play('click');
    }

    openModal(modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    }

    closeModal(modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }

    isModalOpen() {
      return dom.vaultModal.classList.contains('open') ||
             dom.statsModal.classList.contains('open') ||
             dom.resultModal.classList.contains('open') ||
             dom.helpModal.classList.contains('open');
    }

    announce(msg) {
      if (dom.srAnnouncer) {
        dom.srAnnouncer.textContent = msg;
      }
    }

    // ========================================================================
    // 8. MIDNIGHT MONITORING (Unobtrusive Rollover)
    // ========================================================================
    initMidnightCheck() {
      setInterval(() => {
        const currentDay = ReleaseScheduler.getCurrentDayNumber();
        if (currentDay !== this.todayDayNumber) {
          this.todayDayNumber = currentDay;
          this.updateMenuScreenInfo();
          // If idling on menu or solved past game, update seamlessly
          if (dom.menuScreen.classList.contains('screen-active')) {
            this.updateMenuScreenInfo();
          }
        }
      }, 30000);
    }
  }

  // Initialize engine on DOM content loaded
  document.addEventListener('DOMContentLoaded', () => {
    new HangmanGame();
  });
})();