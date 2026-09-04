/* script.js */
/**
 * BAR HANGMAN — Master Production Engine
 * Complete 5-Example Playthrough & Professional Bartender Knowledge System.
 * Self-contained static web application.
 */

'use strict';

/* ==========================================================================
   1. SCRIPT.JS CONTENT DATA ARCHITECTURE (EXACTLY 5 PLAYABLE EXAMPLES)
   ========================================================================== */
/**
 * The 5 curated examples below form the complete playthrough dataset.
 * Structured cleanly for future extension without game-engine modification.
 */
const PLAYABLE_CHALLENGES = [
  {
    id: "negroni",
    name: "NEGRONI",
    category: "COCKTAIL",
    family: "Aperitivo / Equal Parts",
    glass: "Double Rocks Glass",
    spec: "1 oz London Dry Gin • 1 oz Campari • 1 oz Sweet Vermouth",
    clueLevel1: "Bitter-sweet Italian aperitivo traditionally built in equal thirds.",
    clueLevel2: "Stirred over a large ice rock and garnished with an expressed orange peel.",
    clueLevel3: "Originates in Florence (circa 1919) when Count Camillo fortified his Americano with gin.",
    whyItMatters: "Mastering equal-parts balance is the fundamental benchmark for Italian bitter cocktail mechanics.",
    tip: "Always stir, never shake; shaking aerates and clouds delicate vermouth.",
    history: "Created at Caffè Casoni in Florence, Italy, by bartender Fosco Scarselli."
  },
  {
    id: "jigger",
    name: "JIGGER",
    category: "TOOL",
    family: "Station Measure",
    glass: "Barware Equipment",
    spec: "Japanese-style dual cone (1 oz / 2 oz) with interior precision etched calibration",
    clueLevel1: "Essential hourglass-shaped metal bar tool used for accurate volume measurement.",
    clueLevel2: "Consistency in ratio balance separates craft cocktail bars from careless free-pouring.",
    clueLevel3: "Named historically from the small measure of spirits distributed on 19th-century naval vessels.",
    whyItMatters: "Precision guarantees consistent recipe execution, palate balance, and inventory control.",
    tip: "Pour to the very brim meniscus, not 2mm below, to honor intended recipe proportions.",
    history: "Patented in America in the late 19th century as multi-chambered measuring metalware."
  },
  {
    id: "chartreuse",
    name: "CHARTREUSE",
    category: "INGREDIENT",
    family: "Herbal Liqueur",
    glass: "Modifier / Elixir",
    spec: "Green (55% ABV, 130 botanicals) & Yellow (43% ABV, sweeter honey and saffron profile)",
    clueLevel1: "Pungent French herbal liqueur crafted by Carthusian monks since 1737.",
    clueLevel2: "Crucial modifier in modern classics like the Last Word, Bijou, and Champs-Élysées.",
    clueLevel3: "Naturally colored green from chlorophyll; recipe is known to only two monks at any time.",
    whyItMatters: "High alcohol herbal depth that cuts through bold base spirits and rich citrus alike.",
    tip: "Due to high proof and intense herbal pungency, 0.75 oz is generally the maximum needed in a build.",
    history: "Given as an ancient manuscript elixir of long life to the monks of Vauvert in 1605."
  },
  {
    id: "daiquiri",
    name: "DAIQUIRI",
    category: "COCKTAIL",
    family: "Classic Sour",
    glass: "Chilled Coupe Glass",
    spec: "2 oz White Rum • 0.75 oz Fresh Lime Juice • 0.75 oz Rich Demerara Syrup (2:1)",
    clueLevel1: "The canonical 3-ingredient rum sour that tests any bartender's technique.",
    clueLevel2: "Shaken vigorously with dense ice to achieve tiny reflective ice flecks across the surface.",
    clueLevel3: "Named after an iron mining port in southeastern Cuba near Santiago.",
    whyItMatters: "Bartenders evaluate a colleague's technique and dilution control by ordering a Daiquiri.",
    tip: "A hard, fast 10-second shake emulsifies lime oils without over-diluting the rum.",
    history: "Recorded in Cuba circa 1898 by mining engineer Jennings Cox and popularized at El Floridita."
  },
  {
    id: "mise-en-place",
    name: "MISE EN PLACE",
    category: "SERVICE",
    family: "Station Management",
    glass: "Professional Principle",
    spec: "Every bottle, tool, garnish, and towel positioned in its designated pocket before service begins",
    clueLevel1: "Culinary French discipline translated to the bar station: 'everything in its place'.",
    clueLevel2: "Clean bar towels, stocked speed rails, fresh-cut garnishes, and clear ice wells.",
    clueLevel3: "Without it, peak rush hours collapse into bottleneck delays and spilled drinks.",
    whyItMatters: "Speed and muscle memory originate from clean, predictable station geometry.",
    tip: "Always return bottles to the exact rail slot so you never have to look down while pouring.",
    history: "Pioneered by Auguste Escoffier and standardized across fine beverage hospitality."
  }
];

/* ==========================================================================
   2. DATA VALIDATION SUBSYSTEM
   ========================================================================== */
function validateChallengeDataset(dataset) {
  if (!Array.now && !Array.isArray(dataset)) {
    throw new Error("Challenge dataset must be an array.");
  }
  if (dataset.length !== 5) {
    console.warn(`Dataset contract requirement: exactly 5 playable examples. Received: ${dataset.length}`);
  }
  const seenIds = new Set();
  dataset.forEach((item, index) => {
    if (!item.id || typeof item.id !== 'string') throw new Error(`Item ${index} missing valid id.`);
    if (seenIds.has(item.id)) throw new Error(`Duplicate challenge id detected: ${item.id}`);
    seenIds.add(item.id);
    if (!item.name || typeof item.name !== 'string') throw new Error(`Item ${item.id} missing name.`);
    if (!item.category || typeof item.category !== 'string') throw new Error(`Item ${item.id} missing category.`);
    if (!item.spec || typeof item.spec !== 'string') throw new Error(`Item ${item.id} missing spec.`);
  });
  return true;
}

try {
  validateChallengeDataset(PLAYABLE_CHALLENGES);
} catch (err) {
  console.error("Dataset validation error:", err);
}

/* ==========================================================================
   3. SYNTHESIZED WEB AUDIO ENGINE (Zero External Assets)
   ========================================================================== */
class BartenderSoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playLetterTap() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.05);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      // Gracefully handle browser audio restrictions
    }
  }

  playCorrectChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 1046.50].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.1, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.29);
      });
    } catch (e) {}
  }

  playWrongKnock() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.linearRampToValueAtTime(35, now + 0.1);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  playSolveFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const chord = [392.00, 523.25, 659.25, 783.99, 1046.50];
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.12, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.55);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.56);
      });
    } catch (e) {}
  }

  playGlassBreak() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(500 + i * 180, now + i * 0.04);
        gain.gain.setValueAtTime(0.12, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.07);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.08);
      }
    } catch (e) {}
  }
}

const audio = new BartenderSoundEngine();

/* ==========================================================================
   4. GAME STATE MODEL & LOCAL STORAGE
   ========================================================================== */
class BartenderGameState {
  constructor() {
    this.currentMode = 'classic'; // 'classic', 'daily', 'rush', 'practice'
    this.currentPuzzleIndex = 0;
    this.activePuzzle = null;
    this.guessedLetters = new Set();
    this.mistakes = 0;
    this.maxMistakes = 6;
    this.score = 0;
    this.streak = 0;
    this.roundStartTime = 0;
    this.timerSeconds = 60;
    this.timerInterval = null;
    this.clueLevel = 1;
    this.isInputLocked = false;

    // Shift summary records
    this.shiftHistory = [];

    // Local storage persistence
    this.storageKey = 'bar_hangman_save_v2';
    this.savedData = this.loadPersistentData();
    this.mistakeBank = this.savedData.mistakeBank || [];
  }

  loadPersistentData() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn("Storage warning:", e);
    }
    return {
      highScore: 0,
      bestStreak: 0,
      totalPlayed: 0,
      totalWon: 0,
      unlockedCodexIds: ["negroni"],
      mistakeBank: [],
      categoryMastery: {
        COCKTAIL: 0,
        TOOL: 0,
        INGREDIENT: 0,
        SERVICE: 0
      }
    };
  }

  savePersistentData() {
    try {
      this.savedData.mistakeBank = this.mistakeBank;
      localStorage.setItem(this.storageKey, JSON.stringify(this.savedData));
    } catch (e) {
      console.warn("Could not save to storage:", e);
    }
  }

  getRankTitle() {
    const wins = this.savedData.totalWon;
    if (wins < 2) return "Barback";
    if (wins < 5) return "Apprentice";
    if (wins < 10) return "Bartender";
    if (wins < 20) return "Senior Bartender";
    return "Master Mixologist";
  }

  recordSolve(clean, earnedPoints) {
    this.savedData.totalPlayed++;
    this.savedData.totalWon++;
    this.streak++;
    if (this.streak > this.savedData.bestStreak) {
      this.savedData.bestStreak = this.streak;
    }
    if (this.score > this.savedData.highScore) {
      this.savedData.highScore = this.score;
    }

    if (this.activePuzzle) {
      if (!this.savedData.unlockedCodexIds.includes(this.activePuzzle.id)) {
        this.savedData.unlockedCodexIds.push(this.activePuzzle.id);
      }
      const cat = this.activePuzzle.category;
      if (this.savedData.categoryMastery[cat] !== undefined) {
        this.savedData.categoryMastery[cat]++;
      }
      this.mistakeBank = this.mistakeBank.filter(id => id !== this.activePuzzle.id);

      this.shiftHistory.push({
        id: this.activePuzzle.id,
        name: this.activePuzzle.name,
        won: true,
        clean: clean,
        points: earnedPoints
      });
    }

    this.savePersistentData();
  }

  recordLoss() {
    this.savedData.totalPlayed++;
    this.streak = 0;

    if (this.activePuzzle) {
      if (!this.mistakeBank.includes(this.activePuzzle.id)) {
        this.mistakeBank.push(this.activePuzzle.id);
      }
      this.shiftHistory.push({
        id: this.activePuzzle.id,
        name: this.activePuzzle.name,
        won: false,
        clean: false,
        points: 0
      });
    }

    this.savePersistentData();
  }

  resetShift() {
    this.currentPuzzleIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.shiftHistory = [];
  }
}

const state = new BartenderGameState();

/* ==========================================================================
   5. UI CONTROLLER & VIEW BINDINGS
   ========================================================================== */
class BartenderUIController {
  constructor() {
    // HUD Elements
    this.hudRank = document.getElementById('hud-rank');
    this.hudProgress = document.getElementById('hud-progress');
    this.hudStreak = document.getElementById('hud-streak');
    this.hudScore = document.getElementById('hud-score');
    this.hudTimerContainer = document.getElementById('hud-timer-container');
    this.hudTimer = document.getElementById('hud-timer');

    // Glass Station
    this.strikesCount = document.getElementById('strikes-count');
    this.strikePips = document.getElementById('strike-pips');
    this.liquidFill = document.getElementById('liquid-fill');
    this.cracks = [
      document.getElementById('crack-1'),
      document.getElementById('crack-2'),
      document.getElementById('crack-3')
    ];
    this.puzzleCategory = document.getElementById('puzzle-category');

    // Clue Card
    this.clueLevelBadge = document.getElementById('clue-level-badge');
    this.clueFamily = document.getElementById('clue-family');
    this.clueText = document.getElementById('clue-text');
    this.btnRevealClue = document.getElementById('btn-reveal-clue');
    this.btnVowelHint = document.getElementById('btn-vowel-hint');

    // Word Slots & Keyboard
    this.wordSlotsContainer = document.getElementById('word-slots');
    this.keyboardContainer = document.getElementById('virtual-keyboard');

    // Bold Guess
    this.btnSolveOpen = document.getElementById('btn-solve-open');
    this.boldGuessPanel = document.getElementById('bold-guess-panel');
    this.boldGuessInput = document.getElementById('bold-guess-input');
    this.btnSubmitBold = document.getElementById('btn-submit-bold');
    this.btnCancelBold = document.getElementById('btn-cancel-bold');

    // Knowledge Modal
    this.knowledgeModal = document.getElementById('knowledge-modal');
    this.modalStatus = document.getElementById('modal-result-status');
    this.modalTitle = document.getElementById('modal-drink-title');
    this.modalFamily = document.getElementById('modal-meta-family');
    this.modalGlass = document.getElementById('modal-meta-glass');
    this.modalSpecFormula = document.getElementById('modal-spec-formula');
    this.modalWhyMatters = document.getElementById('modal-why-matters');
    this.modalBartenderTip = document.getElementById('modal-bartender-tip');
    this.modalHistoryNote = document.getElementById('modal-history-note');
    this.metricRoundScore = document.getElementById('metric-round-score');
    this.metricAccuracy = document.getElementById('metric-accuracy');
    this.metricShiftTime = document.getElementById('metric-shift-time');
    this.btnNextPuzzle = document.getElementById('btn-next-puzzle');

    // Shift Summary Modal
    this.summaryModal = document.getElementById('shift-summary-modal');
    this.sumScore = document.getElementById('sum-score');
    this.sumSolved = document.getElementById('sum-solved');
    this.sumRank = document.getElementById('sum-rank');
    this.sumStreak = document.getElementById('sum-streak');
    this.summaryBreakdownList = document.getElementById('summary-breakdown-list');
    this.btnRestartShift = document.getElementById('btn-restart-shift');
    this.btnOpenCodexFromSum = document.getElementById('btn-open-codex-from-sum');

    // Stats Modal
    this.statsModal = document.getElementById('stats-modal');
    this.btnStats = document.getElementById('btn-stats');
    this.btnCloseStats = document.getElementById('btn-close-stats');
    this.stPlayed = document.getElementById('st-total-played');
    this.stWon = document.getElementById('st-total-won');
    this.stStreak = document.getElementById('st-high-streak');
    this.stScore = document.getElementById('st-high-score');
    this.tierProgress = document.getElementById('tier-bar-progress');
    this.tierPrompt = document.getElementById('tier-next-prompt');
    this.catMasteryList = document.getElementById('category-mastery-list');

    // Codex Modal
    this.codexModal = document.getElementById('codex-modal');
    this.btnCodex = document.getElementById('btn-codex');
    this.btnCloseCodex = document.getElementById('btn-close-codex');
    this.codexSearch = document.getElementById('codex-search');
    this.codexFilterCat = document.getElementById('codex-filter-category');
    this.codexListContainer = document.getElementById('codex-list-container');

    // Sound Controls
    this.btnSound = document.getElementById('btn-sound');
    this.soundIconOn = document.querySelector('.icon-sound-on');
    this.soundIconOff = document.querySelector('.icon-sound-off');

    // Navigation Tabs
    this.navTabs = document.querySelectorAll('.nav-tab');
    this.reviewBadge = document.getElementById('review-count');

    // Toast
    this.toast = document.getElementById('toast-message');
    this.toastTimer = null;

    this.initKeyboard();
    this.bindEvents();
    this.updateHUD();
  }

  bindEvents() {
    // Mode navigation
    this.navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const mode = tab.dataset.mode;
        this.navTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        gameEngine.switchMode(mode);
      });
    });

    // Sound toggle
    this.btnSound.addEventListener('click', () => {
      audio.enabled = !audio.enabled;
      if (audio.enabled) {
        this.soundIconOn.classList.remove('hidden');
        this.soundIconOff.classList.add('hidden');
        this.showToast("Sound On");
        audio.playLetterTap();
      } else {
        this.soundIconOn.classList.add('hidden');
        this.soundIconOff.classList.remove('hidden');
        this.showToast("Sound Muted");
      }
    });

    // Stats modal
    this.btnStats.addEventListener('click', () => this.openStatsModal());
    this.btnCloseStats.addEventListener('click', () => this.statsModal.classList.add('hidden'));

    // Codex modal
    this.btnCodex.addEventListener('click', () => this.openCodexModal());
    this.btnCloseCodex.addEventListener('click', () => this.codexModal.classList.add('hidden'));
    this.codexSearch.addEventListener('input', () => this.renderCodexList());
    this.codexFilterCat.addEventListener('change', () => this.renderCodexList());

    // In-game assists
    this.btnRevealClue.addEventListener('click', () => gameEngine.revealDeeperClue());
    this.btnVowelHint.addEventListener('click', () => gameEngine.useLetterHint());

    // Next puzzle or Shift Complete button
    this.btnNextPuzzle.addEventListener('click', () => {
      this.knowledgeModal.classList.add('hidden');
      gameEngine.advanceAfterModal();
    });

    // Shift summary buttons
    this.btnRestartShift.addEventListener('click', () => {
      this.summaryModal.classList.add('hidden');
      gameEngine.restartFullShift();
    });

    this.btnOpenCodexFromSum.addEventListener('click', () => {
      this.summaryModal.classList.add('hidden');
      this.openCodexModal();
    });

    // Bold Guess Panel
    this.btnSolveOpen.addEventListener('click', () => {
      const isHidden = this.boldGuessPanel.classList.contains('hidden');
      if (isHidden) {
        this.boldGuessPanel.classList.remove('hidden');
        this.btnSolveOpen.setAttribute('aria-expanded', 'true');
        this.boldGuessInput.focus();
      } else {
        this.boldGuessPanel.classList.add('hidden');
        this.btnSolveOpen.setAttribute('aria-expanded', 'false');
      }
    });

    this.btnCancelBold.addEventListener('click', () => {
      this.boldGuessPanel.classList.add('hidden');
      this.btnSolveOpen.setAttribute('aria-expanded', 'false');
      this.boldGuessInput.value = '';
    });

    this.btnSubmitBold.addEventListener('click', () => {
      gameEngine.submitBoldGuess(this.boldGuessInput.value.trim());
      this.boldGuessInput.value = '';
      this.boldGuessPanel.classList.add('hidden');
      this.btnSolveOpen.setAttribute('aria-expanded', 'false');
    });

    this.boldGuessInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        gameEngine.submitBoldGuess(this.boldGuessInput.value.trim());
        this.boldGuessInput.value = '';
        this.boldGuessPanel.classList.add('hidden');
        this.btnSolveOpen.setAttribute('aria-expanded', 'false');
      }
    });

    // Physical Keyboard Input
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      if (e.key === 'Escape') {
        this.statsModal.classList.add('hidden');
        this.codexModal.classList.add('hidden');
        return;
      }
      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char)) {
        gameEngine.handleGuess(char);
      }
    });

    // Close modals on overlay backdrop tap
    [this.knowledgeModal, this.statsModal, this.codexModal, this.summaryModal].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal && modal !== this.knowledgeModal && modal !== this.summaryModal) {
          modal.classList.add('hidden');
        }
      });
    });
  }

  initKeyboard() {
    const layout = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    this.keyboardContainer.innerHTML = '';
    layout.forEach(row => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'kb-row';
      row.forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'key-btn';
        btn.dataset.letter = letter;
        btn.textContent = letter;
        btn.setAttribute('aria-label', `Call letter ${letter}`);
        btn.addEventListener('click', () => {
          gameEngine.handleGuess(letter);
        });
        rowDiv.appendChild(btn);
      });
      this.keyboardContainer.appendChild(rowDiv);
    });
  }

  resetKeyboard() {
    const keys = this.keyboardContainer.querySelectorAll('.key-btn');
    keys.forEach(k => {
      k.className = 'key-btn';
      k.removeAttribute('disabled');
    });
  }

  markKey(letter, isCorrect) {
    const btn = this.keyboardContainer.querySelector(`button[data-letter="${letter}"]`);
    if (btn) {
      btn.classList.remove('correct', 'wrong');
      btn.classList.add(isCorrect ? 'correct' : 'wrong');
      btn.setAttribute('disabled', 'true');
    }
  }

  renderWordSlots(puzzle, guessedLetters) {
    this.wordSlotsContainer.innerHTML = '';
    const words = puzzle.name.split(' ');

    words.forEach(word => {
      const wordGroup = document.createElement('div');
      wordGroup.className = 'word-group';

      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        const slot = document.createElement('div');
        slot.className = 'letter-slot';

        if (/[A-Z]/.test(char)) {
          if (guessedLetters.has(char)) {
            slot.textContent = char;
            slot.classList.add('revealed');
          } else {
            slot.textContent = '';
          }
        } else {
          slot.textContent = char;
          slot.classList.add('special-char');
        }
        wordGroup.appendChild(slot);
      }
      this.wordSlotsContainer.appendChild(wordGroup);
    });
  }

  updateHUD() {
    this.hudRank.textContent = state.getRankTitle();
    this.hudProgress.textContent = `${state.currentPuzzleIndex + 1} / ${gameEngine.activePool.length}`;
    this.hudStreak.textContent = state.streak;
    this.hudScore.textContent = state.score;
    this.reviewBadge.textContent = state.mistakeBank.length;

    if (state.currentMode === 'rush') {
      this.hudTimerContainer.classList.remove('hidden');
      this.hudTimer.textContent = `${state.timerSeconds}s`;
    } else {
      this.hudTimerContainer.classList.add('hidden');
    }
  }

  updateMistakes(mistakes, maxMistakes) {
    this.strikesCount.textContent = mistakes;
    const pips = this.strikePips.querySelectorAll('.pip');
    pips.forEach((pip, idx) => {
      if (idx < mistakes) {
        pip.classList.add('active-strike');
      } else {
        pip.classList.remove('active-strike');
      }
    });
    this.strikePips.setAttribute('aria-label', `Mistake strikes: ${mistakes} of ${maxMistakes}`);

    // Dynamic liquid drain: 75px full height
    const percentLeft = Math.max(0, 1 - (mistakes / maxMistakes));
    const liquidY = 20 + (75 * (1 - percentLeft));
    const liquidH = 75 * percentLeft;
    this.liquidFill.setAttribute('y', liquidY);
    this.liquidFill.setAttribute('height', liquidH);

    // Progressive glass stress cracks
    this.cracks[0].classList.toggle('hidden', mistakes < 2);
    this.cracks[1].classList.toggle('hidden', mistakes < 4);
    this.cracks[2].classList.toggle('hidden', mistakes < 6);
  }

  setClue(puzzle, level) {
    this.puzzleCategory.textContent = puzzle.category;
    this.clueFamily.textContent = puzzle.family;
    this.clueLevelBadge.textContent = `Station Clue (Level ${level})`;

    if (level === 1) {
      this.clueText.textContent = puzzle.clueLevel1;
    } else if (level === 2) {
      this.clueText.textContent = `${puzzle.clueLevel1} ${puzzle.clueLevel2}`;
    } else {
      this.clueText.textContent = `${puzzle.clueLevel1} ${puzzle.clueLevel2} ${puzzle.clueLevel3}`;
    }
  }

  showToast(msg) {
    this.toast.textContent = msg;
    this.toast.classList.remove('hidden');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toast.classList.add('hidden');
    }, 2100);
  }

  showKnowledgeModal(isWin, puzzle, earnedPoints, accuracy, solveDuration, isLastTicket) {
    this.modalStatus.textContent = isWin ? "TICKET SERVED CLEAN" : "DRINK VOIDED / STATION SPILL";
    this.modalStatus.className = isWin ? "modal-badge-banner" : "modal-badge-banner failed";
    this.modalTitle.textContent = puzzle.name;
    this.modalFamily.textContent = puzzle.family;
    this.modalGlass.textContent = puzzle.glass;
    this.modalSpecFormula.textContent = puzzle.spec;
    this.modalWhyMatters.textContent = puzzle.whyItMatters;
    this.modalBartenderTip.textContent = puzzle.tip;
    this.modalHistoryNote.textContent = puzzle.history;

    this.metricRoundScore.textContent = isWin ? `+${earnedPoints}` : `0`;
    this.metricAccuracy.textContent = `${accuracy}%`;
    this.metricShiftTime.textContent = `${solveDuration}s`;

    this.btnNextPuzzle.textContent = isLastTicket ? "Complete Shift & Review \u2192" : "Next Ticket \u2192";
    this.knowledgeModal.classList.remove('hidden');
  }

  showShiftSummary() {
    this.sumScore.textContent = state.score;
    const cleanWins = state.shiftHistory.filter(h => h.won).length;
    this.sumSolved.textContent = `${cleanWins} / ${state.shiftHistory.length}`;
    this.sumRank.textContent = state.getRankTitle();
    this.sumStreak.textContent = state.savedData.bestStreak;

    this.summaryBreakdownList.innerHTML = '';
    state.shiftHistory.forEach((ticket, idx) => {
      const row = document.createElement('div');
      row.className = `summary-ticket-row ${ticket.won ? 'clean' : 'voided'}`;
      row.innerHTML = `
        <span><strong>#${idx + 1}</strong> ${ticket.name}</span>
        <span>${ticket.won ? `+${ticket.points} pts` : 'Voided (0 pts)'}</span>
      `;
      this.summaryBreakdownList.appendChild(row);
    });

    this.summaryModal.classList.remove('hidden');
  }

  openStatsModal() {
    this.stPlayed.textContent = state.savedData.totalPlayed;
    this.stWon.textContent = state.savedData.totalWon;
    this.stStreak.textContent = state.savedData.bestStreak;
    this.stScore.textContent = state.savedData.highScore;

    const wins = state.savedData.totalWon;
    let nextTierGoal = 2;
    if (wins >= 2) nextTierGoal = 5;
    if (wins >= 5) nextTierGoal = 10;
    if (wins >= 10) nextTierGoal = 20;

    const pct = Math.min(100, Math.round((wins / nextTierGoal) * 100));
    this.tierProgress.style.width = `${pct}%`;
    const remaining = Math.max(0, nextTierGoal - wins);
    this.tierPrompt.textContent = remaining === 0 
      ? "Top Station Rank Achieved!" 
      : `${remaining} clean tickets until next promotion.`;

    this.catMasteryList.innerHTML = '';
    Object.entries(state.savedData.categoryMastery).forEach(([cat, count]) => {
      const row = document.createElement('div');
      row.className = 'cat-mastery-row';
      row.innerHTML = `<span>${cat}</span> <strong>${count} Mastered</strong>`;
      this.catMasteryList.appendChild(row);
    });

    this.statsModal.classList.remove('hidden');
  }

  openCodexModal() {
    this.codexModal.classList.remove('hidden');
    this.renderCodexList();
  }

  renderCodexList() {
    const query = this.codexSearch.value.toUpperCase();
    const filterCat = this.codexFilterCat.value;
    this.codexListContainer.innerHTML = '';

    const list = PLAYABLE_CHALLENGES.filter(item => {
      const matchesSearch = item.name.includes(query) || item.family.toUpperCase().includes(query);
      const matchesCat = (filterCat === 'ALL' || item.category === filterCat);
      return matchesSearch && matchesCat;
    });

    if (list.length === 0) {
      this.codexListContainer.innerHTML = `<p style="text-align:center; color:#A89B87; padding:20px;">No recipes match the active filter.</p>`;
      return;
    }

    list.forEach(entry => {
      const isUnlocked = state.savedData.unlockedCodexIds.includes(entry.id);
      const card = document.createElement('div');
      card.className = `codex-item-card ${isUnlocked ? '' : 'locked'}`;

      if (isUnlocked) {
        card.innerHTML = `
          <div class="codex-item-header">
            <h4 class="codex-item-name">${entry.name}</h4>
            <span class="codex-item-cat">${entry.category}</span>
          </div>
          <p class="codex-item-detail"><strong>Spec:</strong> ${entry.spec}</p>
          <p class="codex-item-detail"><strong>Glass:</strong> ${entry.glass}</p>
          <p class="codex-item-detail" style="font-style:italic; margin-top:2px;">"${entry.tip}"</p>
        `;
      } else {
        card.innerHTML = `
          <div class="codex-item-header">
            <h4 class="codex-item-name">${entry.name.replace(/[A-Z]/g, '•')}</h4>
            <span class="codex-item-cat">${entry.category}</span>
          </div>
          <p class="codex-item-detail"><em>Complete this ticket during a shift to log ingredients and station notes.</em></p>
        `;
      }
      this.codexListContainer.appendChild(card);
    });
  }
}

/* ==========================================================================
   6. CORE GAMEPLAY ENGINE & ORCHESTRATOR
   ========================================================================== */
class BartenderGameEngine {
  constructor() {
    this.ui = null;
    this.activePool = [];
  }

  init() {
    this.ui = new BartenderUIController();
    this.switchMode('classic');
  }

  switchMode(mode) {
    state.currentMode = mode;
    this.stopTimer();
    state.resetShift();

    if (mode === 'classic') {
      // Direct fixed progression of the 5 canonical examples
      this.activePool = [...PLAYABLE_CHALLENGES];
    } else if (mode === 'daily') {
      // Deterministic single daily feature from the 5 examples
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
      const dailyIndex = dayOfYear % PLAYABLE_CHALLENGES.length;
      this.activePool = [PLAYABLE_CHALLENGES[dailyIndex]];
      this.ui.showToast("Daily Spec Ticket Prepared");
    } else if (mode === 'rush') {
      this.activePool = [...PLAYABLE_CHALLENGES];
      state.timerSeconds = 60;
      this.startTimer();
      this.ui.showToast("Service Rush: 60-Second Shift!");
    } else if (mode === 'practice') {
      if (state.mistakeBank.length === 0) {
        this.ui.showToast("No missed tickets on file. Practicing standard specs.");
        this.activePool = [...PLAYABLE_CHALLENGES];
      } else {
        this.activePool = PLAYABLE_CHALLENGES.filter(item => state.mistakeBank.includes(item.id));
        this.ui.showToast(`Reviewing ${this.activePool.length} missed drink tickets`);
      }
    }

    state.currentPuzzleIndex = 0;
    this.loadPuzzle(this.activePool[0]);
  }

  startTimer() {
    this.stopTimer();
    state.timerInterval = setInterval(() => {
      state.timerSeconds--;
      this.ui.updateHUD();
      if (state.timerSeconds <= 0) {
        this.stopTimer();
        this.handleGameOver(false);
      }
    }, 1000);
  }

  stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  loadPuzzle(puzzle) {
    if (!puzzle) return;
    state.activePuzzle = puzzle;
    state.guessedLetters = new Set();
    state.mistakes = 0;
    state.clueLevel = 1;
    state.isInputLocked = false;
    state.roundStartTime = Date.now();

    this.ui.resetKeyboard();
    this.ui.updateMistakes(state.mistakes, state.maxMistakes);
    this.ui.setClue(state.activePuzzle, state.clueLevel);
    this.ui.renderWordSlots(state.activePuzzle, state.guessedLetters);
    this.ui.updateHUD();
  }

  advanceAfterModal() {
    const nextIdx = state.currentPuzzleIndex + 1;
    if (nextIdx >= this.activePool.length) {
      // Completed the 5-example shift!
      this.stopTimer();
      this.ui.showShiftSummary();
    } else {
      state.currentPuzzleIndex = nextIdx;
      this.loadPuzzle(this.activePool[state.currentPuzzleIndex]);
    }
  }

  restartFullShift() {
    this.switchMode(state.currentMode);
  }

  handleGuess(letter) {
    if (state.isInputLocked || !state.activePuzzle || state.mistakes >= state.maxMistakes) return;
    if (state.guessedLetters.has(letter)) return;

    state.guessedLetters.add(letter);
    const target = state.activePuzzle.name;

    if (target.includes(letter)) {
      audio.playCorrectChime();
      this.ui.markKey(letter, true);
      this.ui.renderWordSlots(state.activePuzzle, state.guessedLetters);
      this.checkWinCondition();
    } else {
      audio.playWrongKnock();
      state.mistakes++;
      this.ui.markKey(letter, false);
      this.ui.updateMistakes(state.mistakes, state.maxMistakes);

      if (state.mistakes >= state.maxMistakes) {
        audio.playGlassBreak();
        this.handleGameOver(false);
      }
    }
  }

  checkWinCondition() {
    const target = state.activePuzzle.name;
    let isComplete = true;

    for (let i = 0; i < target.length; i++) {
      const char = target[i];
      if (/[A-Z]/.test(char) && !state.guessedLetters.has(char)) {
        isComplete = false;
        break;
      }
    }

    if (isComplete) {
      audio.playSolveFanfare();
      this.handleGameOver(true);
    }
  }

  revealDeeperClue() {
    if (state.clueLevel >= 3) {
      this.ui.showToast("All station tasting clues unlocked!");
      return;
    }
    if (state.score < 20) {
      this.ui.showToast("Need 20 shift points for deeper clue");
      return;
    }
    state.score = Math.max(0, state.score - 20);
    state.clueLevel++;
    audio.playLetterTap();
    this.ui.setClue(state.activePuzzle, state.clueLevel);
    this.ui.updateHUD();
    this.ui.showToast("Deeper Tasting Notes Revealed (-20 pts)");
  }

  useLetterHint() {
    if (state.isInputLocked || !state.activePuzzle) return;

    if (state.score < 30) {
      this.ui.showToast("Need 30 shift points for a letter hint");
      return;
    }

    const unrevealedLetters = [];
    const target = state.activePuzzle.name;
    for (let i = 0; i < target.length; i++) {
      const char = target[i];
      if (/[A-Z]/.test(char) && !state.guessedLetters.has(char)) {
        if (!unrevealedLetters.includes(char)) {
          unrevealedLetters.push(char);
        }
      }
    }

    if (unrevealedLetters.length === 0) return;

    state.score = Math.max(0, state.score - 30);
    const pick = unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)];
    this.ui.showToast(`Lead Bartender Hints: "${pick}" (-30 pts)`);
    this.handleGuess(pick);
    this.ui.updateHUD();
  }

  submitBoldGuess(fullGuess) {
    if (state.isInputLocked || !fullGuess || !state.activePuzzle) return;

    const normalizedGuess = fullGuess.toUpperCase().replace(/[^A-Z]/g, '');
    const normalizedTarget = state.activePuzzle.name.toUpperCase().replace(/[^A-Z]/g, '');

    if (normalizedGuess === normalizedTarget) {
      audio.playSolveFanfare();
      // Reveal all letters
      for (let i = 0; i < state.activePuzzle.name.length; i++) {
        const c = state.activePuzzle.name[i];
        if (/[A-Z]/.test(c)) state.guessedLetters.add(c);
      }
      this.ui.renderWordSlots(state.activePuzzle, state.guessedLetters);
      this.ui.showToast("FLAWLESS QUICK-CALL! +150 BONUS");
      this.handleGameOver(true, true);
    } else {
      audio.playGlassBreak();
      state.mistakes = Math.min(state.maxMistakes, state.mistakes + 2);
      this.ui.updateMistakes(state.mistakes, state.maxMistakes);
      this.ui.showToast("Wrong Call! Station Penalty (+2 Faults)");
      if (state.mistakes >= state.maxMistakes) {
        this.handleGameOver(false);
      }
    }
  }

  handleGameOver(isWin, isBold = false) {
    state.isInputLocked = true;
    const durationSec = Math.max(1, Math.round((Date.now() - state.roundStartTime) / 1000));
    let roundPoints = 0;
    let accuracyPct = 100;

    if (isWin) {
      const cleanBonus = state.mistakes === 0 ? 50 : 0;
      const speedBonus = Math.max(0, 30 - durationSec);
      roundPoints = 100 + cleanBonus + speedBonus + (isBold ? 150 : 0);
      state.score += roundPoints;

      const totalLetters = state.guessedLetters.size;
      accuracyPct = totalLetters > 0 
        ? Math.round(((totalLetters - state.mistakes) / totalLetters) * 100)
        : 100;

      state.recordSolve(state.mistakes === 0, roundPoints);
    } else {
      state.recordLoss();
      // Reveal all letters so user learns
      for (let i = 0; i < state.activePuzzle.name.length; i++) {
        const c = state.activePuzzle.name[i];
        if (/[A-Z]/.test(c)) state.guessedLetters.add(c);
      }
      this.ui.renderWordSlots(state.activePuzzle, state.guessedLetters);
    }

    this.ui.updateHUD();

    const isLastTicket = (state.currentPuzzleIndex + 1) >= this.activePool.length;

    setTimeout(() => {
      this.ui.showKnowledgeModal(isWin, state.activePuzzle, roundPoints, accuracyPct, durationSec, isLastTicket);
    }, 550);
  }
}

// Global bootstrap
const gameEngine = new BartenderGameEngine();
window.addEventListener('DOMContentLoaded', () => {
  gameEngine.init();
});