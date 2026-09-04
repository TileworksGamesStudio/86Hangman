/* script.js */
/**
 * BAR HANGMAN — Master Game Production Engine
 * A pure vanilla JavaScript professional cocktail and beverage knowledge game.
 */

'use strict';

/* ==========================================================================
   1. SOUND ENGINE (Synthesized via Web Audio API - Zero External Assets)
   ========================================================================== */
class BartenderSoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
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

    // Wood counter tap sound
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  playCorrectChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    // Crystal wine glass chime (harmonic bell)
    const now = this.ctx.currentTime;
    [523.25, 659.25, 1046.50].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);
      gain.gain.setValueAtTime(0.12, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.36);
    });
  }

  playWrongKnock() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    // Low wooden thud / fault knock
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(85, now);
    osc.frequency.linearRampToValueAtTime(30, now + 0.12);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playSolveFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    // Cocktail shaker clink & triumphant chord
    const now = this.ctx.currentTime;
    const chord = [392.00, 523.25, 659.25, 783.99, 1046.50];
    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.15, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.6);
    });
  }

  playGlassBreak() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    // Failure glass clatter
    const now = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(450 + Math.random() * 600, now + i * 0.05);
      gain.gain.setValueAtTime(0.15, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.09);
    }
  }
}

const audio = new BartenderSoundEngine();

/* ==========================================================================
   2. CURATED BARTENDER CONTENT DATABASE (Facts, specs, and tasting notes)
   ========================================================================== */
const COCKTAIL_DATABASE = [
  {
    id: "negroni",
    name: "NEGRONI",
    category: "COCKTAIL",
    family: "Aperitivo / Equal Parts",
    glass: "Double Rocks Glass",
    spec: "1 oz London Dry Gin • 1 oz Campari • 1 oz Sweet Vermouth",
    clueLevel1: "Bitter-sweet Italian aperitivo traditionally built in equal thirds.",
    clueLevel2: "Stirred over a large cube, garnished with an expressed orange peel.",
    clueLevel3: "Originates in Florence (circa 1919) when Count Camillo asked to fortify his Americano.",
    whyItMatters: "Mastering equal-parts balance is the benchmark for Italian bitter cocktail mechanics.",
    tip: "Always stir, never shake; shaking clouds vermouth and causes unwanted rapid aeration.",
    history: "Created at Caffè Casoni in Florence, Italy, by bartender Fosco Scarselli."
  },
  {
    id: "margarita",
    name: "MARGARITA",
    category: "COCKTAIL",
    family: "Daisy Family",
    glass: "Coupe or Rocks Glass",
    spec: "2 oz Blanco Tequila • 1 oz Fresh Lime Juice • 0.75 oz Cointreau",
    clueLevel1: "Iconic agave sour relying on citrus and triple sec modifier.",
    clueLevel2: "Derived from the Daisy family ('Margarita' is Spanish for Daisy).",
    clueLevel3: "Traditionally served with a half-salted rim to control sodium palate fatigue.",
    whyItMatters: "The most requested tequila sour globally; balance hinges on agave vs triple sec sweetness.",
    tip: "Salt only half the rim so the guest has autonomy over every sip.",
    history: "Various origin claims trace it between Tijuana and Ensenada, Mexico in the late 1930s."
  },
  {
    id: "daiquiri",
    name: "DAIQUIRI",
    category: "COCKTAIL",
    family: "Classic Sour",
    glass: "Coupe Glass",
    spec: "2 oz White Rum • 0.75 oz Fresh Lime Juice • 0.75 oz Rich Demerara Syrup (2:1)",
    clueLevel1: "The canonical 3-ingredient rum sour that tests any bartender's technique.",
    clueLevel2: "Shaken vigorously with dense ice to achieve tiny reflective ice flecks.",
    clueLevel3: "Named after an iron mining town in southeastern Cuba.",
    whyItMatters: "Bartenders evaluate a colleague's technique and dilution control by ordering a Daiquiri.",
    tip: "A hard, fast 10-second shake emulsifies the lime oils without over-diluting the spirit.",
    history: "Recorded in Cuba circa 1898 by mining engineer Jennings Cox."
  },
  {
    id: "old-fashioned",
    name: "OLD FASHIONED",
    category: "COCKTAIL",
    family: "Old Fashioned / Sling",
    glass: "Rocks Glass",
    spec: "2 oz Bourbon or Rye • 1 Sugar Cube (or barspoon 2:1 syrup) • 2 dashes Angostura • Orange twist",
    clueLevel1: "The original definition of a cocktail: spirit, sugar, water, and bitters.",
    clueLevel2: "Slowly stirred with cold cubes to gradually develop texture and chill.",
    clueLevel3: "Origin traced to the Pendennis Club in Louisville, Kentucky.",
    whyItMatters: "Teaches the fundamental discipline of dilution without citrus or dairy modifiers.",
    tip: "Express the orange oils across the rim and down the stem of the glass before dropping it in.",
    history: "Named in the 1880s when patrons demanded cocktails made 'the old-fashioned way'."
  },
  {
    id: "manhattan",
    name: "MANHATTAN",
    category: "COCKTAIL",
    family: "Aromatic / Stirred",
    glass: "Nick & Nora Glass",
    spec: "2 oz Rye Whiskey • 1 oz Sweet Italian Vermouth • 2 Dashes Angostura Bitters",
    clueLevel1: "Stirred rye whiskey and vermouth benchmark dating to 19th-century New York.",
    clueLevel2: "Garnished with a brandied cherry; rich, aromatic, and silky.",
    clueLevel3: "Originally preferred with spicy rye rather than sweet corn bourbon.",
    whyItMatters: "The archetype for all vermouth-fortified grain spirit cocktails.",
    tip: "Keep sweet vermouth refrigerated after opening to halt oxidation of delicate wine botanicals.",
    history: "Invented at The Manhattan Club in New York City in the early 1870s."
  },
  {
    id: "martini",
    name: "DRY MARTINI",
    category: "COCKTAIL",
    family: "Aromatic / Ancestral",
    glass: "Chilled Martini or Nick & Nora",
    spec: "2.5 oz London Dry Gin • 0.5 oz Dry Vermouth • 1 Dash Orange Bitters",
    clueLevel1: "The king of aperitifs, demanding sub-zero chill and crystal clarity.",
    clueLevel2: "Choice of garnish dictates personality: lemon twist (aromatic) or olive (savory).",
    clueLevel3: "Evolved through the Martinez and Marguerite in the late 19th century.",
    whyItMatters: "Purity of temperature: served below -2°C for silky mouthfeel.",
    tip: "Pre-chill the glassware in the freezer; a warm coupe spoils a dry martini instantly.",
    history: "Immortalized in the Savoy Cocktail Book and beloved by classic hotel bartenders worldwide."
  },
  {
    id: "sazerac",
    name: "SAZERAC",
    category: "COCKTAIL",
    family: "New Orleans Ancestral",
    glass: "Chilled Rocks Glass (No Ice)",
    spec: "2 oz Rye Whiskey • 1 Sugar Cube • 3 Dashes Peychaud's Bitters • Absinthe Rinse",
    clueLevel1: "New Orleans hallmark famous for an anise-scented absinthe glass rinse.",
    clueLevel2: "Served neat in a chilled tumbler with expressed lemon peel discarded.",
    clueLevel3: "Originally formulated with French Cognac before phylloxera forced the shift to American rye.",
    whyItMatters: "Teaches the rinse technique: providing aroma without altering liquid density.",
    tip: "Discard the lemon twist after expressing oils over the surface; do not drop it in.",
    history: "Created in the 19th century by Antoine Peychaud in the French Quarter of New Orleans."
  },
  {
    id: "jigger",
    name: "JIGGER",
    category: "TOOL",
    family: "Station Measure",
    glass: "Equipment Tool",
    spec: "Japanese style (1 oz / 2 oz) or bell style with interior etched lines",
    clueLevel1: "Essential hourglass-shaped metal bar tool used for accurate volume measurement.",
    clueLevel2: "Consistency in balance separates craft cocktail bars from careless free-pouring.",
    clueLevel3: "Named historically from the small measure of spirits distributed on naval vessels.",
    whyItMatters: "Precision guarantees consistent recipe execution and inventory cost control.",
    tip: "Pour to the very brim meniscus, not 2mm below, to honor intended recipe ratios.",
    history: "Patented in America in the late 19th century as multi-chambered measuring cups."
  },
  {
    id: "barspoon",
    name: "BARSPOON",
    category: "TOOL",
    family: "Stirring Equipment",
    glass: "Equipment Tool",
    spec: "30cm to 45cm twisted stem with weighted teardrop or muddler tip",
    clueLevel1: "Long-stemmed spiraled utensil designed for silent, effortless stirring in mixing glasses.",
    clueLevel2: "The spiral shaft allows fingers to push and pull while the spoon stays against the glass wall.",
    clueLevel3: "Standard metric unit for small ingredient measures: 1 barspoon equals approx 5ml / 0.17 oz.",
    whyItMatters: "Enables smooth dilution and chilling without aerating clear stirred drinks.",
    tip: "Keep the convex back of the spoon pressed against the inner glass wall while stirring.",
    history: "Evolved from European medicine and dessert spoons in the mid-19th century."
  },
  {
    id: "hawthorne-strainer",
    name: "HAWTHORNE",
    category: "TOOL",
    family: "Separation Tool",
    glass: "Equipment Tool",
    spec: "Perforated metal plate equipped with a flexible coiled wire spring",
    clueLevel1: "Spring-loaded strainer used over shaker tins to hold back ice blocks.",
    clueLevel2: "The spring can be 'closed' by pushing forward on the tab for a finer gate.",
    clueLevel3: "Patented in 1892; named after the Hawthorne Café in Boston.",
    whyItMatters: "Adapts flexibly to tins of varying diameters, ensuring controlled, spill-free pours.",
    tip: "Push the finger tab forward to gate the spring tightly, holding back small ice shards.",
    history: "Invented by William Wright in 1892 and manufactured by the Denny brothers."
  },
  {
    id: "chartreuse",
    name: "CHARTREUSE",
    category: "INGREDIENT",
    family: "Herbal Elixir",
    glass: "Modifier / Liqueur",
    spec: "Green (55% ABV, 130 botanicals) & Yellow (43% ABV, sweeter honey notes)",
    clueLevel1: "Pungent French herbal liqueur crafted by Carthusian monks since 1737.",
    clueLevel2: "Crucial modifier in modern classics like the Last Word and Bijou.",
    clueLevel3: "Naturally colored green from chlorophyll; recipe is known to only two monks at a time.",
    whyItMatters: "High alcohol herbal depth that cuts through bold spirits and rich citrus alike.",
    tip: "Due to high proof and intense herbal pungency, 0.75 oz is generally the maximum needed in a build.",
    history: "Given as an ancient manuscript elixir to the monks of Vauvert in 1605."
  },
  {
    id: "campari",
    name: "CAMPARI",
    category: "INGREDIENT",
    family: "Bitter Italian Aperitivo",
    glass: "Modifier / Amaro",
    spec: "Infused with bitter herbs, aromatic plants, and fruit in water and alcohol (approx 24% ABV)",
    clueLevel1: "Vibrant ruby-red Italian bitter aperitif indispensable in a Boulevardier.",
    clueLevel2: "Key flavor notes include chinotto orange, cascarilla bark, and gentian root.",
    clueLevel3: "Created in Novara, Italy in 1860 by Gaspare Campari.",
    whyItMatters: "Defines the global bittersweet palate profile in contemporary mixology.",
    tip: "Bitterness stimulates gastric juices, making it the premier pre-dinner aperitivo modifier.",
    history: "Famously colored with carmine cochineal until synthetic red was adopted in 2006."
  },
  {
    id: "angostura",
    name: "ANGOSTURA",
    category: "INGREDIENT",
    family: "Aromatic Bitters",
    glass: "Modifier / Bitters",
    spec: "Gentian, herbs, and spices bottled at 44.7% ABV with oversized paper label",
    clueLevel1: "Trinidad-produced concentrated aromatic bitters with an oversized label.",
    clueLevel2: "A few drops deliver warm baking spices, gentian bitterness, and wood bark.",
    clueLevel3: "Formulated in 1824 by Dr. Johann Siegert as a medicinal stomach tonic.",
    whyItMatters: "Acts as the 'salt and pepper' of mixology, knitting disparate spirits and sugars together.",
    tip: "Hold the bottle completely upside down and snap your wrist downward for a uniform, measured dash.",
    history: "Named after the town of Angostura (now Ciudad Bolívar, Venezuela)."
  },
  {
    id: "coupe",
    name: "COUPE",
    category: "GLASSWARE",
    family: "Stemmed Glassware",
    glass: "Coupe Glass",
    spec: "5.5 oz to 7 oz shallow saucer-bowl with elongated stem",
    clueLevel1: "Stemmed saucer glass ideal for drinks shaken or stirred and served 'up'.",
    clueLevel2: "Prevents hand heat from warming cold cocktail liquid during conversation.",
    clueLevel3: "Myth claims modeled after Marie Antoinette's breast (debunked; pre-dates her).",
    whyItMatters: "The standard workhorse glass for modern craft cocktails served without ice.",
    tip: "Never fill to the absolute lip; leave at least 0.5 inches of wash line headspace.",
    history: "Designed in England in the mid-17th century specifically for sparkling wine."
  },
  {
    id: "nick-and-nora",
    name: "NICK AND NORA",
    category: "GLASSWARE",
    family: "Stemmed Glassware",
    glass: "Stemmed Chalice",
    spec: "5 oz to 6 oz curved bell-shaped cocktail glass",
    clueLevel1: "Curved-sided stemmed glass designed to avoid the sloshing spills of V-shaped martinis.",
    clueLevel2: "Named after the fictional cocktail-loving detective couple in The Thin Man.",
    clueLevel3: "Popularized in the 1990s cocktail renaissance by bar maestro Dale DeGroff.",
    whyItMatters: "More ergonomic than classic wide martini glasses, holding aromas securely.",
    tip: "Ideal for 3 oz spirits-forward stirred serves like Manhattans and Martinis.",
    history: "Named after Dashiell Hammett's 1934 detective characters Nick and Nora Charles."
  },
  {
    id: "dry-shake",
    name: "DRY SHAKE",
    category: "TECHNIQUE",
    family: "Emulsification",
    glass: "Technique Method",
    spec: "Shaking cocktail ingredients with egg white or aquafaba WITHOUT ice first",
    clueLevel1: "Bar technique: shaking ingredients without ice to whip rich velvety egg foam.",
    clueLevel2: "Warm agitation builds protein matrices before ice is added for chill and dilution.",
    clueLevel3: "The reverse method chills with ice first, then strains and shakes warm.",
    whyItMatters: "Essential for Ramos Gin Fizzes, Whiskey Sours, and Pisco Sours.",
    tip: "Take the spring off a Hawthorne strainer and drop it into the shaker to act as an emulsifying whisk.",
    history: "Developed to maximize creamy meringue foam on traditional 19th-century flips and sours."
  },
  {
    id: "double-strain",
    name: "DOUBLE STRAIN",
    category: "TECHNIQUE",
    family: "Clarity & Texture",
    glass: "Technique Method",
    spec: "Pouring through a primary Hawthorne strainer and a secondary fine-mesh tea sieve",
    clueLevel1: "Using a fine-mesh tea strainer alongside a shaker gate to catch tiny ice shards.",
    clueLevel2: "Prevents ice crystals from melting prematurely and preserves velvety foam.",
    clueLevel3: "Standard operating procedure for all craft cocktails served 'up' in stemmed glass.",
    whyItMatters: "Guarantees crystal clarity in citrus cocktails and smooth mouthfeel.",
    tip: "Hold the fine strainer directly above the glass rim to avoid splashing the outside of the vessel.",
    history: "Adopted broadly during the cocktail revival of the early 2000s in London and New York."
  },
  {
    id: "mise-en-place",
    name: "MISE EN PLACE",
    category: "SERVICE",
    family: "Bar Station Management",
    glass: "Professional Principle",
    spec: "Everything in its designated place prior to the first customer ticket",
    clueLevel1: "Culinary French philosophy translated to the bar: 'everything in its place'.",
    clueLevel2: "Clean bar towels, stocked speed rails, fresh-cut garnishes, and clean ice wells.",
    clueLevel3: "Without it, peak rush hours collapse into chaos and delayed ticket times.",
    whyItMatters: "Speed and muscle memory originate from clean, predictable station geometry.",
    tip: "Always return bottles to the exact speed-rail pocket so you never have to look down while pouring.",
    history: "Pioneered by Auguste Escoffier and standardized across fine beverage hospitality."
  },
  {
    id: "vermouth",
    name: "VERMOUTH",
    category: "INGREDIENT",
    family: "Fortified Aromatized Wine",
    glass: "Modifier / Fortified Wine",
    spec: "Wine base fortified with neutral spirit and infused with wormwood, herbs, and spices",
    clueLevel1: "Fortified aromatized wine flavored with botanicals and Artemisia (wormwood).",
    clueLevel2: "Separated into sweet (Italian/rosso) and dry (French/white) styles.",
    clueLevel3: "Because it has a wine base, it spoils and turns to vinegar if left unrefrigerated.",
    whyItMatters: "The bedrock modifier for the Martini, Manhattan, and Negroni.",
    tip: "Treat vermouth like wine: vacuum-seal, store in the fridge, and discard after 30-45 days.",
    history: "Originates from Turin, Italy (Antonio Benedetto Carpano, 1786) and Chambéry, France."
  },
  {
    id: "mezcal",
    name: "MEZCAL",
    category: "SPIRIT",
    family: "Agave Distillate",
    glass: "Neat in Jícara / Copita or Cocktails",
    spec: "100% Agave cooked in underground earthen stone pits, wild fermented, copper or clay distilled",
    clueLevel1: "Artisanal Mexican agave spirit renowned for its earthy, smoky terroir.",
    clueLevel2: "Most frequently produced in Oaxaca from Espadín and wild agaves.",
    clueLevel3: "While all tequila is technically mezcal, tequila is made only from Blue Weber agave in specific zones.",
    whyItMatters: "Provides complex smoke and vegetal depth in modern cocktail riffs like the Oaxaca Old Fashioned.",
    tip: "Never shoot artisanal mezcal; sip gently ('besitos' or little kisses) to appreciate terroir.",
    history: "Indigenous fermentation combined with Spanish pot-still distillation dating back centuries."
  }
];

/* ==========================================================================
   3. GAME STATE MANAGER
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
    this.usedLetterPicks = 0;

    // Persistent storage data
    this.storageKey = 'bar_hangman_save_v1';
    this.savedData = this.loadPersistentData();

    // Mistake Bank for review mode
    this.mistakeBank = this.savedData.mistakeBank || [];
  }

  loadPersistentData() {
    try {
      const item = localStorage.getItem(this.storageKey);
      if (item) {
        return JSON.parse(item);
      }
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
    return {
      highScore: 0,
      bestStreak: 0,
      totalPlayed: 0,
      totalWon: 0,
      unlockedCodexIds: ["negroni", "margarita"],
      mistakeBank: [],
      categoryMastery: {
        COCKTAIL: 0,
        SPIRIT: 0,
        INGREDIENT: 0,
        TOOL: 0,
        GLASSWARE: 0,
        TECHNIQUE: 0,
        SERVICE: 0
      }
    };
  }

  savePersistentData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.savedData));
    } catch (e) {
      console.warn('Could not save data:', e);
    }
  }

  getRankTitle() {
    const s = this.savedData.totalWon;
    if (s < 3) return "Barback";
    if (s < 8) return "Apprentice";
    if (s < 16) return "Bartender";
    if (s < 26) return "Senior Bartender";
    if (s < 40) return "Head Mixologist";
    return "Master of the Bar";
  }

  recordSolve(clean) {
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
      // Unlock in Codex
      if (!this.savedData.unlockedCodexIds.includes(this.activePuzzle.id)) {
        this.savedData.unlockedCodexIds.push(this.activePuzzle.id);
      }
      // Increment category
      const cat = this.activePuzzle.category;
      if (this.savedData.categoryMastery[cat] !== undefined) {
        this.savedData.categoryMastery[cat]++;
      }
      // If was in mistake bank, remove
      this.mistakeBank = this.mistakeBank.filter(id => id !== this.activePuzzle.id);
      this.savedData.mistakeBank = this.mistakeBank;
    }

    this.savePersistentData();
  }

  recordLoss() {
    this.savedData.totalPlayed++;
    this.streak = 0;
    if (this.activePuzzle) {
      if (!this.mistakeBank.includes(this.activePuzzle.id)) {
        this.mistakeBank.push(this.activePuzzle.id);
        this.savedData.mistakeBank = this.mistakeBank;
      }
    }
    this.savePersistentData();
  }
}

const state = new BartenderGameState();

/* ==========================================================================
   4. UI & DOM CONTROLLER
   ========================================================================== */
class BartenderUIController {
  constructor() {
    // Top HUD
    this.hudRank = document.getElementById('hud-rank');
    this.hudStreak = document.getElementById('hud-streak');
    this.hudScore = document.getElementById('hud-score');
    this.hudTimerContainer = document.getElementById('hud-timer-container');
    this.hudTimer = document.getElementById('hud-timer');

    // Glass & Strikes
    this.strikesCount = document.getElementById('strikes-count');
    this.strikePips = document.getElementById('strike-pips');
    this.liquidFill = document.getElementById('liquid-fill');
    this.cracks = [
      document.getElementById('crack-1'),
      document.getElementById('crack-2'),
      document.getElementById('crack-3')
    ];
    this.puzzleCategory = document.getElementById('puzzle-category');

    // Clues
    this.clueLevelBadge = document.getElementById('clue-level-badge');
    this.clueFamily = document.getElementById('clue-family');
    this.clueText = document.getElementById('clue-text');
    this.btnRevealClue = document.getElementById('btn-reveal-clue');
    this.btnVowelHint = document.getElementById('btn-vowel-hint');

    // Slots & Keyboard
    this.wordSlotsContainer = document.getElementById('word-slots');
    this.keyboardContainer = document.getElementById('virtual-keyboard');

    // Bold Guess
    this.btnSolveOpen = document.getElementById('btn-solve-open');
    this.boldGuessPanel = document.getElementById('bold-guess-panel');
    this.boldGuessInput = document.getElementById('bold-guess-input');
    this.btnSubmitBold = document.getElementById('btn-submit-bold');
    this.btnCancelBold = document.getElementById('btn-cancel-bold');

    // Modals
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

    // Audio Button
    this.btnSound = document.getElementById('btn-sound');
    this.soundIconOn = document.getElementById('sound-icon-on');
    this.soundIconOff = document.getElementById('sound-icon-off');

    // Navigation Tabs
    this.navTabs = document.querySelectorAll('.nav-tab');
    this.reviewBadge = document.getElementById('review-count');

    // Toast
    this.toast = document.getElementById('toast-message');

    this.initKeyboard();
    this.bindEvents();
    this.updateHUD();
  }

  bindEvents() {
    // Mode tabs
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

    // Stats modal triggers
    this.btnStats.addEventListener('click', () => this.openStatsModal());
    this.btnCloseStats.addEventListener('click', () => this.statsModal.classList.add('hidden'));

    // Codex modal triggers
    this.btnCodex.addEventListener('click', () => this.openCodexModal());
    this.btnCloseCodex.addEventListener('click', () => this.codexModal.classList.add('hidden'));
    this.codexSearch.addEventListener('input', () => this.renderCodexList());
    this.codexFilterCat.addEventListener('change', () => this.renderCodexList());

    // In-game Actions
    this.btnRevealClue.addEventListener('click', () => gameEngine.revealDeeperClue());
    this.btnVowelHint.addEventListener('click', () => gameEngine.useLetterHint());
    this.btnNextPuzzle.addEventListener('click', () => {
      this.knowledgeModal.classList.add('hidden');
      gameEngine.loadNextPuzzle();
    });

    // Bold Guess Panel
    this.btnSolveOpen.addEventListener('click', () => {
      const isHidden = this.boldGuessPanel.classList.contains('hidden');
      if (isHidden) {
        this.boldGuessPanel.classList.remove('hidden');
        this.boldGuessInput.focus();
      } else {
        this.boldGuessPanel.classList.add('hidden');
      }
    });

    this.btnCancelBold.addEventListener('click', () => {
      this.boldGuessPanel.classList.add('hidden');
      this.boldGuessInput.value = '';
    });

    this.btnSubmitBold.addEventListener('click', () => {
      gameEngine.submitBoldGuess(this.boldGuessInput.value.trim());
      this.boldGuessInput.value = '';
      this.boldGuessPanel.classList.add('hidden');
    });

    this.boldGuessInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        gameEngine.submitBoldGuess(this.boldGuessInput.value.trim());
        this.boldGuessInput.value = '';
        this.boldGuessPanel.classList.add('hidden');
      }
    });

    // Hardware Keyboard Input Listener
    window.addEventListener('keydown', (e) => {
      // Ignore if user is currently typing inside the bold guess input or search
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char)) {
        gameEngine.handleGuess(char);
      }
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
        btn.setAttribute('aria-label', `Letter ${letter}`);
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
          // Hyphens, ampersands, or dots
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

    // Glass graphic feedback
    // Drain liquid as mistakes increase
    const percentLeft = Math.max(0, 1 - (mistakes / maxMistakes));
    const liquidY = 20 + (80 * (1 - percentLeft));
    const liquidH = 80 * percentLeft;
    this.liquidFill.setAttribute('y', liquidY);
    this.liquidFill.setAttribute('height', liquidH);

    // Show glass fracture cracks
    this.cracks[0].classList.toggle('hidden', mistakes < 2);
    this.cracks[1].classList.toggle('hidden', mistakes < 4);
    this.cracks[2].classList.toggle('hidden', mistakes < 6);
  }

  setClue(puzzle, level) {
    this.puzzleCategory.textContent = puzzle.category;
    this.clueFamily.textContent = puzzle.family;
    this.clueLevelBadge.textContent = `Clue Level ${level}`;

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
    }, 2200);
  }

  showKnowledgeModal(isWin, puzzle, earnedPoints, accuracy, solveDuration) {
    this.modalStatus.textContent = isWin ? "TICKET SERVED CLEAN" : "STATION SPILL / TICKET VOID";
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

    this.knowledgeModal.classList.remove('hidden');
  }

  openStatsModal() {
    this.stPlayed.textContent = state.savedData.totalPlayed;
    this.stWon.textContent = state.savedData.totalWon;
    this.stStreak.textContent = state.savedData.bestStreak;
    this.stScore.textContent = state.savedData.highScore;

    // Rank percentage bar
    const wins = state.savedData.totalWon;
    let nextTierGoal = 5;
    if (wins >= 5) nextTierGoal = 15;
    if (wins >= 15) nextTierGoal = 30;
    if (wins >= 30) nextTierGoal = 50;
    const pct = Math.min(100, Math.round((wins / nextTierGoal) * 100));
    this.tierProgress.style.width = `${pct}%`;
    this.tierPrompt.textContent = `${nextTierGoal - wins} more perfect tickets to rank up`;

    // Category mastery list
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

    const list = COCKTAIL_DATABASE.filter(item => {
      const matchesSearch = item.name.includes(query) || item.family.toUpperCase().includes(query);
      const matchesCat = (filterCat === 'ALL' || item.category === filterCat);
      return matchesSearch && matchesCat;
    });

    if (list.length === 0) {
      this.codexListContainer.innerHTML = `<p style="text-align:center; color:#999; padding:20px;">No recipes match the filter.</p>`;
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
            <h4 class="codex-item-name">${this.obfuscateName(entry.name)}</h4>
            <span class="codex-item-cat">${entry.category}</span>
          </div>
          <p class="codex-item-detail"><em>Solve this ticket in Classic or Daily mode to unlock recipe and station notes.</em></p>
        `;
      }
      this.codexListContainer.appendChild(card);
    });
  }

  obfuscateName(name) {
    return name.replace(/[A-Z]/g, '•');
  }
}

/* ==========================================================================
   5. CORE GAMEPLAY ENGINE
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

    if (mode === 'classic') {
      this.activePool = [...COCKTAIL_DATABASE].sort(() => 0.5 - Math.random());
    } else if (mode === 'daily') {
      // Deterministic daily puzzle using date seed
      const todayStr = new Date().toISOString().slice(0, 10);
      let seed = 0;
      for (let i = 0; i < todayStr.length; i++) seed += todayStr.charCodeAt(i);
      const dailyIndex = seed % COCKTAIL_DATABASE.length;
      this.activePool = [COCKTAIL_DATABASE[dailyIndex]];
      this.ui.showToast("Daily Spec Ticket Loaded");
    } else if (mode === 'rush') {
      this.activePool = [...COCKTAIL_DATABASE].sort(() => 0.5 - Math.random());
      state.timerSeconds = 60;
      this.startTimer();
      this.ui.showToast("Rush Shift: 60s Speed Run!");
    } else if (mode === 'practice') {
      if (state.mistakeBank.length === 0) {
        this.ui.showToast("No mistakes on file! Great job.");
        this.activePool = [...COCKTAIL_DATABASE].sort(() => 0.5 - Math.random());
      } else {
        this.activePool = COCKTAIL_DATABASE.filter(item => state.mistakeBank.includes(item.id));
        this.ui.showToast(`Practicing ${this.activePool.length} missed specs`);
      }
    }

    state.currentPuzzleIndex = 0;
    this.loadPuzzle(this.activePool[0] || COCKTAIL_DATABASE[0]);
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
    state.activePuzzle = puzzle;
    state.guessedLetters = new Set();
    state.mistakes = 0;
    state.clueLevel = 1;
    state.usedLetterPicks = 0;
    state.roundStartTime = Date.now();

    this.ui.resetKeyboard();
    this.ui.updateMistakes(state.mistakes, state.maxMistakes);
    this.ui.setClue(state.activePuzzle, state.clueLevel);
    this.ui.renderWordSlots(state.activePuzzle, state.guessedLetters);
    this.ui.updateHUD();
  }

  loadNextPuzzle() {
    state.currentPuzzleIndex++;
    if (state.currentPuzzleIndex >= this.activePool.length) {
      if (state.currentMode === 'rush') {
        this.ui.showToast("Rush shift finished!");
        this.switchMode('classic');
        return;
      }
      state.currentPuzzleIndex = 0;
      this.activePool.sort(() => 0.5 - Math.random());
    }
    this.loadPuzzle(this.activePool[state.currentPuzzleIndex]);
  }

  handleGuess(letter) {
    if (!state.activePuzzle || state.mistakes >= state.maxMistakes) return;
    if (state.guessedLetters.has(letter)) return;

    audio.playLetterTap();
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

    for (let char of target) {
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
      this.ui.showToast("All available bar specs unlocked!");
      return;
    }
    if (state.score < 20 && state.score > 0) {
      this.ui.showToast("Need 20 points for a deeper clue");
      return;
    }
    state.score = Math.max(0, state.score - 20);
    state.clueLevel++;
    audio.playLetterTap();
    this.ui.setClue(state.activePuzzle, state.clueLevel);
    this.ui.updateHUD();
    this.ui.showToast("Station Tasting Notes Revealed (-20 pts)");
  }

  useLetterHint() {
    const unrevealedLetters = [];
    const target = state.activePuzzle.name;
    for (let char of target) {
      if (/[A-Z]/.test(char) && !state.guessedLetters.has(char)) {
        if (!unrevealedLetters.includes(char)) {
          unrevealedLetters.push(char);
        }
      }
    }

    if (unrevealedLetters.length === 0) return;

    state.score = Math.max(0, state.score - 40);
    state.usedLetterPicks++;
    const pick = unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)];
    this.handleGuess(pick);
    this.ui.updateHUD();
    this.ui.showToast(`Bar Lead Hints: "${pick}"`);
  }

  submitBoldGuess(fullGuess) {
    if (!fullGuess || !state.activePuzzle) return;

    const normalizedGuess = fullGuess.toUpperCase().replace(/[^A-Z]/g, '');
    const normalizedTarget = state.activePuzzle.name.toUpperCase().replace(/[^A-Z]/g, '');

    if (normalizedGuess === normalizedTarget) {
      // Rapid Clean Solve!
      audio.playSolveFanfare();
      state.score += 150;
      // Reveal all letters
      for (let char of state.activePuzzle.name) {
        if (/[A-Z]/.test(char)) state.guessedLetters.add(char);
      }
      this.ui.renderWordSlots(state.activePuzzle, state.guessedLetters);
      this.ui.showToast("FLAWLESS BOLD CALL! +150 PTS");
      this.handleGameOver(true, true);
    } else {
      audio.playGlassBreak();
      state.mistakes = Math.min(state.maxMistakes, state.mistakes + 2);
      this.ui.updateMistakes(state.mistakes, state.maxMistakes);
      this.ui.showToast("Wrong Call! Station Strike Penalty (+2)");
      if (state.mistakes >= state.maxMistakes) {
        this.handleGameOver(false);
      }
    }
  }

  handleGameOver(isWin, isBold = false) {
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

      state.recordSolve(state.mistakes === 0);
    } else {
      state.recordLoss();
      // Reveal target so player learns the correct answer
      for (let char of state.activePuzzle.name) {
        if (/[A-Z]/.test(char)) state.guessedLetters.add(char);
      }
      this.ui.renderWordSlots(state.activePuzzle, state.guessedLetters);
    }

    this.ui.updateHUD();

    setTimeout(() => {
      this.ui.showKnowledgeModal(isWin, state.activePuzzle, roundPoints, accuracyPct, durationSec);
    }, 600);
  }
}

// Global initialization
const gameEngine = new BartenderGameEngine();
window.addEventListener('DOMContentLoaded', () => {
  gameEngine.init();
});