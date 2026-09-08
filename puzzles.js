/**
 * THE COUPE — Cocktail Content Database
 * 
 * CONTRACT & ARCHITECTURE:
 *  - Each puzzle is fully self-contained.
 *  - New puzzles can be appended continuously to the array without touching script.js.
 *  - Fields:
 *      id: Unique immutable slug
 *      day: Assigned calendar release sequence index (1, 2, 3...)
 *      curriculum: Category from the Master 32-Subject Cocktail Curriculum
 *      curriculumLevel: Level 1 (Foundations) through Level 5 (Expert)
 *      difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Expert'
 *      answer: Target phrase (letters A-Z; punctuation auto-resolved)
 *      clue: Thematic, New York Times-style clue
 *      notes: Detailed historical lore, specs, and field facts revealed upon conclusion
 */

window.COCKTAIL_PUZZLES = [
  {
    id: "puzzle-001-negroni",
    day: 1,
    curriculum: "Level 1 — Classic Cocktails (Category 2)",
    curriculumLevel: 1,
    difficulty: "Beginner",
    answer: "NEGRONI",
    clue: "The 1919 Florence classic of equal parts gin, sweet vermouth, and a crimson bitter aperitivo.",
    notes: "Legend records that Count Camillo Negroni asked bartender Fosco Scarselli at Caffè Casoni in Florence to strengthen his Americano by swapping soda water for London dry gin. Garnished with an orange slice rather than lemon to signal the upgrade."
  },
  {
    id: "puzzle-002-chartreuse",
    day: 2,
    curriculum: "Level 2 — Liqueurs & Cordials (Category 9)",
    curriculumLevel: 2,
    difficulty: "Medium",
    answer: "CHARTREUSE",
    clue: "Herbal liqueur crafted since 1737 by French Carthusian monks from a recipe of 130 botanicals.",
    notes: "Based on a 1605 manuscript gifted by Duke François-Annibal d’Estrées, only two Carthusian monks at a time know the secret formula. The natural green color is derived directly from chlorophyll in the plant extraction."
  },
  {
    id: "puzzle-003-mai-tai",
    day: 3,
    curriculum: "Level 4 — Tiki & Tropical Cocktails (Category 27)",
    curriculumLevel: 4,
    difficulty: "Easy",
    answer: "MAI TAI",
    clue: "Trader Vic's 1944 rum triumph built with lime, orgeat, and orange curaçao, named from the Tahitian for 'the best'.",
    notes: "Created by Victor J. Bergeron (Trader Vic) in Oakland, CA. Upon serving it to Tahitian friends Ham and Carrie Guild, Carrie exclaimed 'Maita'i roa a'e!' ('Out of this world!'). Traditional specs require rich Jamaican pot-still rum and true almond orgeat."
  },
  {
    id: "puzzle-004-vieux-carre",
    day: 4,
    curriculum: "Level 3 — Specs, Ratios & Balance (Category 22)",
    curriculumLevel: 3,
    difficulty: "Hard",
    answer: "VIEUX CARRE",
    clue: "New Orleans French Quarter tribute balancing spicy rye, cognac, sweet vermouth, Benedictine, and two bitters.",
    notes: "Invented in 1938 by Walter Bergeron at the Hotel Monteleone's legendary revolving Carousel Bar. The drink uses a split base of American rye whiskey and French cognac, seasoned with both Angostura and Peychaud’s bitters."
  },
  {
    id: "puzzle-005-corpse-reviver",
    day: 5,
    curriculum: "Level 5 — Advanced Cocktail Lore (Category 32)",
    curriculumLevel: 5,
    difficulty: "Medium",
    answer: "CORPSE REVIVER",
    clue: "Harry Craddock's morning pick-me-up: 'Four of these taken in swift succession will unrevive the corpse again.'",
    notes: "Codified in the 1930 Savoy Cocktail Book. While the No. 1 variation is brandy-based, the iconic No. 2 calls for equal parts gin, lemon juice, Cointreau, and Kina Lillet (now Cocchi Americano or Lillet Blanc), finished with a rinse of absinthe."
  },
  {
    id: "puzzle-006-nick-and-nora",
    day: 6,
    curriculum: "Level 3 — Glassware (Category 20)",
    curriculumLevel: 3,
    difficulty: "Easy",
    answer: "NICK AND NORA",
    clue: "Curved stemmed cocktail chalice named after Dashiell Hammett's tippling detectives in The Thin Man.",
    notes: "Revived during the 1990s cocktail renaissance by Dale DeGroff and Audrey Saunders, this bell-shaped glassware offers an alternative to the spill-prone V-shaped martini glass, preserving aromatics and cold temperatures."
  }
];