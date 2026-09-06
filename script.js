/* script.js */
/**
 * BAR HANGMAN — Master Production Engine
 * Complete 5-Ticket Bartender Knowledge System with System Continuity,
 * Mode-Aware Lifecycles, Contained Screen Scrolling, & State Persistence.
 */

'use strict';

/* ==========================================================================
   1. CONTENT DATA ARCHITECTURE (CANONICAL 5 PLAYABLE TICKETS)
   ========================================================================== */
const PLAYABLE_CHALLENGES = [
  /* ==========================================================================
     CORE 5 FOUNDATIONAL CHALLENGES
     ========================================================================== */
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
  },

  /* ==========================================================================
     35 ADDITIONAL EXPANSION CHALLENGES
     ========================================================================== */
  {
    id: "old-fashioned",
    name: "OLD FASHIONED",
    category: "COCKTAIL",
    family: "Ancestral / Spirit-Forward",
    glass: "Single Rocks Glass",
    spec: "2 oz Rye or Bourbon • 1 Barspoon Rich Demerara Syrup (2:1) • 2 Dashes Angostura Bitters",
    clueLevel1: "The primordial American cocktail formula: spirit, sugar, water, and bitters.",
    clueLevel2: "Built directly in the glass or mixing vessel, stirred slowly with clear ice, orange peel garnish.",
    clueLevel3: "Originated in the early 19th century when patrons demanded drinks prepared in the 'old-fashioned way'.",
    whyItMatters: "The ultimate showcase of base whiskey character, requiring careful dilution control.",
    tip: "Express the orange oils over the rim and stem before dropping the disc into the drink.",
    history: "Defined in print by 1806 in The Balance and Columbian Repository in Hudson, New York."
  },
  {
    id: "manhattan",
    name: "MANHATTAN",
    category: "COCKTAIL",
    family: "Spirit-Forward Vermouth",
    glass: "Chilled Nick & Nora",
    spec: "2 oz Rye Whiskey • 1 oz Sweet Vermouth • 2 Dashes Angostura Bitters",
    clueLevel1: "The benchmark whiskey and aromatized wine cocktail named after a New York borough.",
    clueLevel2: "Stirred to freezing point with dense ice cubes, strained up, and garnished with a brandied cherry.",
    clueLevel3: "Popularized at the Manhattan Club in New York City during the early 1870s.",
    whyItMatters: "Teaches bartenders how spicy rye grain intersects with botanical herbal vermouth.",
    tip: "Rye whiskey cuts through sweet vermouth far cleaner than softer, sweeter wheated bourbon.",
    history: "Invented in Manhattan during the 1870s; first recorded in print by O.H. Byron in 1884."
  },
  {
    id: "margarita",
    name: "MARGARITA",
    category: "COCKTAIL",
    family: "Daisy / Agave Sour",
    glass: "Rocks or Coupe Glass",
    spec: "2 oz Blanco Tequila • 0.75 oz Fresh Lime Juice • 0.75 oz Cointreau Orange Liqueur",
    clueLevel1: "The world's most ordered tequila cocktail, balancing citrus acid and dry triple sec.",
    clueLevel2: "Served over fresh ice with an optional half-salted rim to control sodium on the palate.",
    clueLevel3: "Direct descendant of the classic 1930s Tequila Daisy (Margarita is Spanish for Daisy).",
    whyItMatters: "Tests high-volume sour balance; poor versions rely on cloying commercial sour mix.",
    tip: "Salt only half the rim so guests can alternate between salted and unsalted sips.",
    history: "Evolved across the Mexican-American border between Tijuana and Juárez in the late 1930s."
  },
  {
    id: "martini",
    name: "MARTINI",
    category: "COCKTAIL",
    family: "Spirit-Forward Dry",
    glass: "Chilled Martini / Nick & Nora",
    spec: "2.5 oz London Dry Gin • 0.5 oz Dry Vermouth • 1 Dash Orange Bitters",
    clueLevel1: "The king of aperitif cocktails, celebrated for its crisp, icy, botanical profile.",
    clueLevel2: "Stirred silently with dense cracked ice until frosted, garnished with lemon twist or green olive.",
    clueLevel3: "Evolved from the sweeter 19th-century Martinez as distillation techniques produced drier gins.",
    whyItMatters: "Ordering protocols test a bartender's command of gin styles, vermouth ratios, and customer preference.",
    tip: "Keep vermouth refrigerated once opened; oxidized vermouth ruins an otherwise pristine Martini.",
    history: "Transitioned from the sweeter Martinez into the dry gin standard by the 1900s."
  },
  {
    id: "sazerac",
    name: "SAZERAC",
    category: "COCKTAIL",
    family: "New Orleans Ancestral",
    glass: "Chilled Single Rocks (No Ice)",
    spec: "2 oz Rye Whiskey • 1 Sugar Cube • 3 Dashes Peychaud's Bitters • Herbsaint or Absinthe Rinse",
    clueLevel1: "New Orleans' official cocktail, served neat in an absinthe-rinsed glass without ice.",
    clueLevel2: "Distinct bright red hue from anise-heavy creole bitters, finished with an expressed lemon peel.",
    clueLevel3: "Originally based on Sazerac de Forge et Fils cognac before the phylloxera blight forced a shift to rye.",
    whyItMatters: "Demands precise glassware prep; excess absinthe rinse will overpower the rye backbone.",
    tip: "Discard the lemon twist after expressing; do not drop it into the finished drink.",
    history: "Created in mid-19th-century New Orleans coffee houses by apothecary Antoine Peychaud."
  },
  {
    id: "mai-tai",
    name: "MAI TAI",
    category: "COCKTAIL",
    family: "Tiki / Exotic Sour",
    glass: "Double Old Fashioned Glass",
    spec: "2 oz Aged Jamaican & Martinique Rum • 0.75 oz Fresh Lime • 0.5 oz Orgeat • 0.5 oz Orange Curaçao",
    clueLevel1: "The crown jewel of Polynesian pop cocktail culture, meaning 'out of this world' in Tahitian.",
    clueLevel2: "Shaken with crushed ice, poured unstrained, crowned with spent lime shell and fragrant fresh mint bouquet.",
    clueLevel3: "Formulated in 1944 at Trader Vic's in Oakland to showcase 17-year-old J. Wray & Nephew rum.",
    whyItMatters: "Authentic recipes require real almond orgeat, not synthetic neon-red grenadine and pineapple juice.",
    tip: "Slap the mint bouquet firmly against your wrist before garnishing to rupture essential aromatic oils.",
    history: "Created by Victor J. Bergeron (Trader Vic) in Oakland, California, in 1944."
  },
  {
    id: "espresso-martini",
    name: "ESPRESSO MARTINI",
    category: "COCKTAIL",
    family: "Modern Classic / Coffee Cordial",
    glass: "Chilled Coupe Glass",
    spec: "1.5 oz Vodka • 1 oz Fresh Espresso • 0.75 oz Coffee Liqueur • 0.25 oz Rich Simple Syrup",
    clueLevel1: "Caffeine-forward modern classic famous for its dense crema foam surface.",
    clueLevel2: "Shaken hard with large ice to froth coffee proteins, garnished with 3 coffee beans representing health, wealth, and happiness.",
    clueLevel3: "Created in London in 1983 by Dick Bradsell for a model who asked for a drink to wake her up.",
    whyItMatters: "Requires freshly pulled hot espresso; room-temperature coffee fails to form silky emulsified foam.",
    tip: "Shake immediately after adding fresh espresso to avoid melting ice prematurely.",
    history: "Invented by Dick Bradsell at the Soho Brasserie in London, originally christened the Vodka Espresso."
  },
  {
    id: "aperol-spritz",
    name: "APEROL SPRITZ",
    category: "COCKTAIL",
    family: "Spritz / Carbonated Aperitivo",
    glass: "Large Wine Glass",
    spec: "3 oz Prosecco • 2 oz Aperol • 1 oz Soda Water (3-2-1 Ratio)",
    clueLevel1: "Bright orange, low-ABV Italian terrace refresher built directly over cubed ice.",
    clueLevel2: "Effervescent, bittersweet, garnished with a juicy half orange wheel and an optional green olive.",
    clueLevel3: "Rooted in the 19th-century Austro-Hungarian custom of spraying still Italian wine with sparkling water.",
    whyItMatters: "Understanding build sequence prevents unmixed liqueur from sitting dense at the bottom.",
    tip: "Add prosecco first, then Aperol, then soda to allow natural carbonation to blend the drink.",
    history: "The modern Aperol recipe gained iconic Venetian traction throughout the 1950s."
  },
  {
    id: "corpse-reviver",
    name: "CORPSE REVIVER",
    category: "COCKTAIL",
    family: "Equal Parts / Morning Cure",
    glass: "Chilled Coupe Glass",
    spec: "0.75 oz Gin • 0.75 oz Cointreau • 0.75 oz Lillet Blanc • 0.75 oz Fresh Lemon • 1 Dash Absinthe",
    clueLevel1: "Famous hangover restorative cocktail from the legendary Savoy Cocktail Book.",
    clueLevel2: "Equal-parts citrus build rinsed with absinthe, warning that 'four taken in swift succession will unrevive the corpse'.",
    clueLevel3: "Documented in London in 1930 as Corpse Reviver Number Two by head bartender Harry Craddock.",
    whyItMatters: "Mastering absinthe rinse integration without allowing the anise flavor to drown out delicate Lillet.",
    tip: "Atomizing the absinthe rinse onto the glass interior delivers aroma without puddling liquid.",
    history: "Formulated by Harry Craddock at the American Bar at the Savoy Hotel in London, 1930."
  },
  {
    id: "aviation",
    name: "AVIATION",
    category: "COCKTAIL",
    family: "Floral Sour",
    glass: "Chilled Coupe Glass",
    spec: "2 oz London Dry Gin • 0.5 oz Maraschino Liqueur • 0.25 oz Crème de Violette • 0.75 oz Lemon Juice",
    clueLevel1: "Pale violet-hued pre-Prohibition sour paying tribute to early 20th-century aeronautics.",
    clueLevel2: "Vigorously shaken sour carrying floral violet notes and dry cherry stone complexity.",
    clueLevel3: "First published in Hugo Ensslin's 1916 Recipes for Mixed Drinks before Violette vanished for decades.",
    whyItMatters: "Crème de Violette is intensely floral; a few drops too many makes the drink taste like soapy perfume.",
    tip: "Measure violette with extreme restraint; aim for a sky-blue tint rather than deep purple.",
    history: "Created by Hugo Ensslin at New York City's Hotel Wallick right before American Prohibition."
  },
  {
    id: "boulevardier",
    name: "BOULEVARDIER",
    category: "COCKTAIL",
    family: "Negroni Variation / Whiskey Bitter",
    glass: "Double Rocks or Coupe",
    spec: "1.5 oz Bourbon or Rye • 1 oz Campari • 1 oz Sweet Vermouth",
    clueLevel1: "The autumnal whiskey cousin of the classic gin Negroni.",
    clueLevel2: "Stirred to rich dilution; spicy American whiskey provides warmth against bitter gentian and sweet vermouth.",
    clueLevel3: "Devised in 1920s Paris by expatriate American writer Erskine Gwynne, editor of The Boulevardier magazine.",
    whyItMatters: "Demonstrates how altering base spirit proofs changes the balance of bitter aperitifs.",
    tip: "Bumping the whiskey ratio to 1.5 oz (instead of equal parts) prevents Campari from overpowering the grain.",
    history: "Recorded by bartender Harry McElhone in his 1927 classic Barflies and Cocktails in Paris."
  },
  {
    id: "last-word",
    name: "LAST WORD",
    category: "COCKTAIL",
    family: "Equal Parts / Herbal Sour",
    glass: "Chilled Coupe Glass",
    spec: "0.75 oz Gin • 0.75 oz Green Chartreuse • 0.75 oz Maraschino Liqueur • 0.75 oz Fresh Lime Juice",
    clueLevel1: "Pale green, four-ingredient equal-parts masterpiece combining pungent alpine herbs with lime sour.",
    clueLevel2: "Shaken hard with ice, double-strained into an un-garnished or brandied-cherry crowned coupe.",
    clueLevel3: "Invented at the Detroit Athletic Club in 1916 and resurrected in 2004 by Murray Stenson at Seattle's Zig Zag Café.",
    whyItMatters: "The modern craft cocktail renaissance blueprint for balancing high-proof herbal liqueurs.",
    tip: "A high-proof London dry gin prevents the pungent Chartreuse botanicals from running away with the drink.",
    history: "Created at the Detroit Athletic Club in 1916 and rediscovered during the 2000s craft boom."
  },
  {
    id: "penicillin",
    name: "PENICILLIN",
    category: "COCKTAIL",
    family: "Modern Classic / Scotch Sour",
    glass: "Double Rocks Glass",
    spec: "2 oz Blended Scotch • 0.75 oz Fresh Lemon • 0.75 oz Honey-Ginger Syrup • 0.25 oz Peated Islay Scotch Float",
    clueLevel1: "Smoky, spicy, medicinal modern classic that redefined Scotch whisky in modern cocktail bars.",
    clueLevel2: "Built over a large rock, crowned with a fragrant smoky Islay Scotch float and candied ginger garnish.",
    clueLevel3: "Created in 2005 by Australian bartender Sam Ross at New York City's legendary Milk & Honey.",
    whyItMatters: "Teaches the layered float technique, keeping peated smoke concentrated in the nose rather than stirred into the liquid.",
    tip: "Pour the peated Islay Scotch over the inverted back of a barspoon to achieve a clean, floating surface layer.",
    history: "Invented by Sam Ross at Milk & Honey on Eldridge Street in New York, 2005."
  },
  {
    id: "whiskey-sour",
    name: "WHISKEY SOUR",
    category: "COCKTAIL",
    family: "Sour",
    glass: "Coupe",
    spec: "2 oz Bourbon or Rye Whiskey • 0.75 oz Fresh Lemon Juice • 0.75 oz Rich Simple Syrup (2:1) • 0.5 oz Egg White (Optional)",
    clueLevel1: "Classic American whiskey sour with bright citrus and optional silky foam.",
    clueLevel2: "Dry-shaken first, then shaken with ice and served up with bitters and a lemon twist.",
    clueLevel3: "A 19th-century American classic built around whiskey, fresh lemon, sugar, and optional egg white.",
    whyItMatters: "Teaches the foundational sour ratio and balance of spirit, acid, sweetness, and texture.",
    tip: "Dry shake before adding ice to fully emulsify the egg white.",
    history: "Documented in American cocktail culture during the 1860s."
  },
  {
    id: "tom-collins",
    name: "TOM COLLINS",
    category: "COCKTAIL",
    family: "Highball / Collins",
    glass: "Collins",
    spec: "2 oz Old Tom or London Dry Gin • 0.75 oz Fresh Lemon Juice • 0.75 oz Simple Syrup • 2.5 oz Club Soda",
    clueLevel1: "Tall, sparkling gin sour served over ice.",
    clueLevel2: "Shake gin, lemon, and syrup, then strain over ice and top gently with club soda.",
    clueLevel3: "A 19th-century Jerry Thomas classic named for the famous Tom Collins practical joke.",
    whyItMatters: "Demonstrates how carbonation lengthens and transforms a sour into a refreshing highball.",
    tip: "Add club soda after shaking so carbonation is not lost.",
    history: "Popularized in the 1870s through Jerry Thomas's cocktail writing."
  },
  {
    id: "french-75",
    name: "FRENCH 75",
    category: "COCKTAIL",
    family: "Highball / Collins",
    glass: "Champagne Flute",
    spec: "1 oz London Dry Gin • 0.5 oz Fresh Lemon Juice • 0.5 oz Simple Syrup • 3 oz Brut Champagne",
    clueLevel1: "Elegant sparkling gin cocktail with bright lemon acidity.",
    clueLevel2: "Shake gin, lemon, and sugar, strain into a flute, and top with brut Champagne.",
    clueLevel3: "Named after the powerful French 75mm field gun for its deceptively forceful kick.",
    whyItMatters: "Teaches precise integration of a shaken cocktail base with delicate sparkling wine.",
    tip: "Never shake Champagne; add it gently after straining.",
    history: "First associated with Harry's New York Bar in Paris around 1915."
  },
  {
    id: "mint-julep",
    name: "MINT JULEP",
    category: "COCKTAIL",
    family: "Old Fashioned",
    glass: "Julep Cup",
    spec: "2.5 oz Kentucky Straight Bourbon • 0.5 oz Rich Turbinado Syrup (2:1) • 8-10 Fresh Spearmint Leaves",
    clueLevel1: "Bourbon, mint, and sugar served over a mountain of crushed ice.",
    clueLevel2: "Gently press the mint, add bourbon and syrup, then churn with crushed ice.",
    clueLevel3: "The signature drink of the Kentucky Derby and a historic American Southern classic.",
    whyItMatters: "Requires careful mint extraction, dilution, and temperature control.",
    tip: "Press mint gently instead of muddling aggressively to avoid bitter chlorophyll.",
    history: "Developed in the American South during the early 19th century."
  },
  {
    id: "moscow-mule",
    name: "MOSCOW MULE",
    category: "COCKTAIL",
    family: "Highball / Collins",
    glass: "Copper Mug",
    spec: "2 oz Vodka • 0.5 oz Fresh Lime Juice • 4 oz Spicy Ginger Beer",
    clueLevel1: "A crisp vodka highball powered by fresh lime and spicy ginger beer.",
    clueLevel2: "Build over crushed ice and stir gently in a chilled copper mug.",
    clueLevel3: "Created in 1941 to promote vodka and copper mugs in Hollywood.",
    whyItMatters: "Shows how ginger heat, citrus acidity, and carbonation create a balanced highball.",
    tip: "Use spicy ginger beer rather than sweet ginger ale.",
    history: "Popularized in 1941 by the Cock 'n Bull pub and Smirnoff in Hollywood."
  },
  {
    id: "dark-n-stormy",
    name: "DARK 'N STORMY",
    category: "COCKTAIL",
    family: "Highball / Collins",
    glass: "Highball",
    spec: "2 oz Goslings Black Seal Rum • 0.5 oz Fresh Lime Juice • 4 oz Ginger Beer",
    clueLevel1: "Dark Bermudian rum layered over bright, spicy ginger beer.",
    clueLevel2: "Build lime and ginger beer over ice, then float the dark rum on top.",
    clueLevel3: "The dark rum resembles a storm cloud over the sea, giving the drink its name.",
    whyItMatters: "Teaches density, layering, and the relationship between molasses rum and spicy carbonation.",
    tip: "Float the rum gently over a barspoon for the signature storm-cloud effect.",
    history: "Developed in Bermuda after World War I and associated with Goslings Black Seal Rum."
  },
  {
    id: "bramble",
    name: "BRAMBLE",
    category: "COCKTAIL",
    family: "Sour",
    glass: "Rocks",
    spec: "2 oz London Dry Gin • 0.75 oz Fresh Lemon Juice • 0.5 oz Simple Syrup • 0.5 oz Creme de Mure",
    clueLevel1: "A gin sour crowned with dark blackberry liqueur.",
    clueLevel2: "Strain the shaken sour over crushed ice, then drizzle blackberry liqueur over the mound.",
    clueLevel3: "The blackberry bleed through crushed ice evokes fruit growing through a bramble bush.",
    whyItMatters: "Demonstrates layered presentation and the contrast between bright citrus and dark berry richness.",
    tip: "Add Creme de Mure after straining to preserve the visual gradient.",
    history: "Created by Dick Bradsell at Fred's Club in London in 1984."
  },
  {
    id: "blood-and-sand",
    name: "BLOOD AND SAND",
    category: "COCKTAIL",
    family: "Sour",
    glass: "Coupe",
    spec: "0.75 oz Blended Scotch Whisky • 0.75 oz Sweet Red Vermouth • 0.75 oz Cherry Heering Liqueur • 0.75 oz Fresh Orange Juice",
    clueLevel1: "Equal-parts Scotch cocktail combining smoke, cherry, vermouth, and orange.",
    clueLevel2: "Shake hard with ice and serve up with an orange peel and brandied cherry.",
    clueLevel3: "Named after Rudolph Valentino's 1922 bullfighter film.",
    whyItMatters: "Shows how equal parts can balance smoky whisky with sweet fruit and aromatized wine.",
    tip: "Use fresh orange juice to prevent the drink from becoming overly sweet.",
    history: "Published in the 1930 Savoy Cocktail Book."
  },
  {
    id: "vieux-carre",
    name: "VIEUX CARRE",
    category: "COCKTAIL",
    family: "Old Fashioned",
    glass: "Rocks",
    spec: "0.75 oz Rye Whiskey • 0.75 oz Cognac • 0.75 oz Sweet Red Vermouth • 1 Barspoon Benedictine D.O.M. • 1 Dash Peychaud's Bitters",
    clueLevel1: "Complex New Orleans stirred cocktail with a split rye and Cognac base.",
    clueLevel2: "Stir with dense ice and strain over a large clear cube.",
    clueLevel3: "Its name means 'old square' in French, referring to New Orleans' French Quarter.",
    whyItMatters: "Teaches split-base construction and how herbal liqueur bridges whiskey, brandy, and vermouth.",
    tip: "Measure Benedictine carefully because its honeyed herbal flavor is powerful.",
    history: "Created by Walter Bergeron at New Orleans' Hotel Monteleone in 1938."
  },
  {
    id: "brandy-crusta",
    name: "BRANDY CRUSTA",
    category: "COCKTAIL",
    family: "Daisy",
    glass: "Nick & Nora",
    spec: "2 oz Cognac • 0.25 oz Cointreau or Triple Sec • 0.25 oz Maraschino Liqueur • 0.5 oz Fresh Lemon Juice",
    clueLevel1: "Historic brandy sour surrounded by a sugar crust and lemon peel.",
    clueLevel2: "Shake hard and strain into a glass lined with a long curled lemon peel.",
    clueLevel3: "An important ancestor of both the Sidecar and the Margarita.",
    whyItMatters: "Combines citrus, orange liqueur, maraschino, and elaborate garnish technique.",
    tip: "Line the entire rim with a carefully pared lemon peel before adding the drink.",
    history: "Created by Joseph Santini in New Orleans during the 1850s."
  },
  {
    id: "pisco-sour",
    name: "PISCO SOUR",
    category: "COCKTAIL",
    family: "Sour",
    glass: "Coupe",
    spec: "2 oz Pisco • 1 oz Fresh Key Lime Juice • 0.75 oz Simple Syrup • 0.5 oz Egg White",
    clueLevel1: "Floral South American grape spirit sour with a creamy foam cap.",
    clueLevel2: "Dry shake, wet shake hard, double strain, and finish with bitters on the foam.",
    clueLevel3: "A Peruvian classic built from unaged grape brandy, citrus, sugar, and egg white.",
    whyItMatters: "Tests foam production, acid balance, and the distinctive character of Pisco.",
    tip: "Add Angostura drops to the foam after straining rather than shaking them into the drink.",
    history: "Associated with Victor Morris in Lima, Peru, during the 1920s."
  },
  {
    id: "singapore-sling",
    name: "SINGAPORE SLING",
    category: "COCKTAIL",
    family: "Highball / Collins",
    glass: "Collins",
    spec: "1.5 oz London Dry Gin • 0.5 oz Cherry Heering • 0.25 oz Benedictine • 4 oz Fresh Pineapple Juice",
    clueLevel1: "A tropical gin highball with cherry, herbal, and pineapple flavors.",
    clueLevel2: "Shake hard with ice, strain over fresh ice, and finish with a soda splash.",
    clueLevel3: "Created at Singapore's Raffles Hotel as a discreetly fruit-forward drink.",
    whyItMatters: "Demonstrates how fruit, herbal liqueur, and gin can be lengthened into a tall cocktail.",
    tip: "Use fresh pineapple juice for natural acidity and a foamy texture.",
    history: "Created by Ngiam Tong Boon at the Raffles Hotel in Singapore around 1915."
  },
  {
    id: "vesper",
    name: "VESPER",
    category: "COCKTAIL",
    family: "Martini",
    glass: "Martini",
    spec: "2.25 oz London Dry Gin • 0.75 oz 100-Proof Grain Vodka • 0.5 oz Cocchi Americano or Lillet Blanc",
    clueLevel1: "James Bond's high-proof gin-and-vodka Martini variation.",
    clueLevel2: "Shake hard until ice-cold and strain into chilled stemware with a large lemon peel.",
    clueLevel3: "Bond specifies three measures of gin, one of vodka, and half a measure of Kina Lillet.",
    whyItMatters: "Teaches how proof, dilution, and quinquina bitterness affect a Martini-style cocktail.",
    tip: "Cocchi Americano restores more of the bitter quinine character associated with original Kina Lillet.",
    history: "Introduced by Ian Fleming in the 1953 novel Casino Royale."
  },
  {
    id: "paper-plane",
    name: "PAPER PLANE",
    category: "COCKTAIL",
    family: "Sour",
    glass: "Nick & Nora",
    spec: "0.75 oz Bourbon Whiskey • 0.75 oz Aperol • 0.75 oz Amaro Nonino Quintessentia • 0.75 oz Fresh Lemon Juice",
    clueLevel1: "Modern equal-parts sour combining bourbon, Aperol, amaro, and lemon.",
    clueLevel2: "Shake hard with ice and strain into a chilled Nick & Nora glass.",
    clueLevel3: "Named after M.I.A.'s song and created during the late-2000s craft cocktail revival.",
    whyItMatters: "Shows how bitter, sweet, sour, and spirit elements can be balanced in equal measure.",
    tip: "Use Amaro Nonino rather than a heavier amaro to preserve the drink's light balance.",
    history: "Created by Sam Ross at The Violet Hour in Chicago in 2008."
  },
  {
    id: "bees-knees",
    name: "BEE'S KNEES",
    category: "COCKTAIL",
    family: "Sour",
    glass: "Coupe",
    spec: "2 oz London Dry Gin • 0.75 oz Fresh Lemon Juice • 0.75 oz Honey Syrup (3:1 Honey to Water)",
    clueLevel1: "Prohibition-era gin sour sweetened with floral honey.",
    clueLevel2: "Shake hard with ice and double strain into a chilled coupe.",
    clueLevel3: "Honey and lemon were used to soften the rough edges of Prohibition-era gin.",
    whyItMatters: "Teaches how honey syrup adds floral depth while maintaining a balanced sour structure.",
    tip: "Dilute honey before service so it dissolves cleanly in cold cocktails.",
    history: "Developed during Prohibition in the 1920s."
  },
  {
    id: "jungle-bird",
    name: "JUNGLE BIRD",
    category: "COCKTAIL",
    family: "Sour",
    glass: "Rocks",
    spec: "1.5 oz Blackstrap or Dark Jamaican Rum • 0.75 oz Campari • 1.5 oz Fresh Pineapple Juice • 0.5 oz Fresh Lime Juice",
    clueLevel1: "Tropical dark-rum cocktail sharpened by bitter Campari.",
    clueLevel2: "Shake hard to emulsify the pineapple, then strain over fresh ice.",
    clueLevel3: "Created at the Kuala Lumpur Hilton and named for the tropical bird aviary nearby.",
    whyItMatters: "Shows how assertive bitterness can balance rich rum and sweet tropical fruit.",
    tip: "Use a full-flavored dark rum capable of standing up to Campari.",
    history: "Created at the Aviary Bar of the Kuala Lumpur Hilton in 1978."
  },
  {
    id: "paloma",
    name: "PALOMA",
    category: "COCKTAIL",
    family: "Highball / Agave Refresher",
    glass: "Collins or Highball Glass",
    spec: "2 oz Blanco Tequila • 0.5 oz Fresh Lime Juice • Pinch of Salt • 4 oz Grapefruit Soda",
    clueLevel1: "Mexico's true national cocktail favorite, far outpacing the Margarita in domestic consumption.",
    clueLevel2: "Built tall over cubed ice, salted rim or saline drop, topped with sparkling pink grapefruit soda.",
    clueLevel3: "Named after 'La Paloma' ('The Dove'), the popular 19th-century folk song.",
    whyItMatters: "Showcases how carbonated fruit sodas and mineral salinity balance vegetal agave flavors.",
    tip: "Adding a tiny pinch of sea salt directly into the shaker amplifies the sweet grapefruit notes.",
    history: "Commonly attributed to legendary cantinero Don Javier Delgado Corona of La Capilla in Tequila, Mexico."
  },
  {
    id: "gimlet",
    name: "GIMLET",
    category: "COCKTAIL",
    family: "Classic Sour / Cordial Sour",
    glass: "Chilled Coupe Glass",
    spec: "2 oz London Dry Gin • 0.75 oz Fresh Lime Juice • 0.75 oz Simple Syrup (or Lime Cordial)",
    clueLevel1: "Crisp, tart, maritime sour invented to ward off scurvy among naval sailors.",
    clueLevel2: "Shaken vigorously with ice, strained clean, and garnished with a paper-thin wheel of fresh lime.",
    clueLevel3: "Historically popularized with Rose's bottled lime cordial on Royal Navy warships.",
    whyItMatters: "A benchmark of simple sour acidity; modern craft bars make their own lime-oil cordial from scratch.",
    tip: "Using fresh lime juice combined with a rich oleo-saccharum cordial yields far brighter flavor than bottled cordial.",
    history: "Named after British naval surgeon Rear-Admiral Sir Thomas Gimlette in the late 19th century."
  },
  {
    id: "ramos-gin-fizz",
    name: "RAMOS GIN FIZZ",
    category: "COCKTAIL",
    family: "Fizz / Emulsified Dairy",
    glass: "Tall Delmonico / Highball (No Ice)",
    spec: "2 oz Gin • 0.5 oz Lemon • 0.5 oz Lime • 0.75 oz Simple • 1 oz Heavy Cream • 1 Egg White • Orange Flower Water • Soda",
    clueLevel1: "New Orleans' most labor-intensive brunch cocktail, requiring an exhaustive physical shake.",
    clueLevel2: "Boasts a stiff, meringue-like foam soufflé head that rises majestically several inches above the glass rim.",
    clueLevel3: "Invented by Henry C. Ramos in 1888, who employed 'shaker boys' to shake each drink for 12 continuous minutes.",
    whyItMatters: "The definitive masterclass in protein and citrus emulsification and station stamina.",
    tip: "Chill the glass in the freezer, let the drink rest for 1 minute before pouring soda slowly down the center to lift the foam.",
    history: "Invented by Henry C. Ramos at the Imperial Cabinet Saloon in New Orleans in 1888."
  },
  {
    id: "clover-club",
    name: "CLOVER CLUB",
    category: "COCKTAIL",
    family: "Egg White Sour / Fruit Sour",
    glass: "Chilled Coupe Glass",
    spec: "2 oz London Dry Gin • 0.5 oz Fresh Lemon Juice • 0.5 oz Raspberry Syrup • 1 Egg White",
    clueLevel1: "Pre-Prohibition Philadelphia gentlemen's club sour with a velvety pink foam blanket.",
    clueLevel2: "Requires a reverse dry shake to build microscopic protein bubbles from fresh raspberry and egg white.",
    clueLevel3: "Named after the Clover Club of Philadelphia, a group of prominent journalists and lawyers founded in 1882.",
    whyItMatters: "Teaches bartenders how tart fresh raspberries and egg albumin create a luxurious, dessert-like texture.",
    tip: "Real raspberry reduction syrup must be used; artificial grenadine produces an unpleasantly cloying aftertaste.",
    history: "Originated at the Bellevue-Stratford Hotel in Philadelphia around the turn of the 20th century."
  },
  {
    id: "sidecar",
    name: "SIDECAR",
    category: "COCKTAIL",
    family: "Crusta / Brandy Sour",
    glass: "Chilled Coupe (Sugar Rim)",
    spec: "1.5 oz Cognac • 0.75 oz Cointreau • 0.75 oz Fresh Lemon Juice",
    clueLevel1: "The quintessential French brandy sour, famed for its elegant balance and delicate sugar-crusted rim.",
    clueLevel2: "Shaken hard with ice, strained into a glass with a half-sugared lip to provide contrasting crunchy sweetness.",
    clueLevel3: "Created in Paris or London near the end of World War I, named after an army captain's motorcycle attachment.",
    whyItMatters: "Demonstrates the Crusta lineage where fruit acid, oak barrel tannin, and orange liqueur intersect.",
    tip: "Keep the sugar rim light and exterior-only so excess granules do not fall into the cocktail liquid.",
    history: "Claimed by Harry's New York Bar in Paris and Buck's Club in London during the early 1920s."
  },
  {
    id: "boston-shaker",
    name: "BOSTON SHAKER",
    category: "TOOL",
    family: "Agitation Vessel",
    glass: "Barware Equipment",
    spec: "Two-piece metal-on-metal tins (typically 28 oz large tin and 18 oz cheater tin)",
    clueLevel1: "The high-volume craft standard two-piece shaking apparatus preferred over three-piece cobblers.",
    clueLevel2: "Creates a vacuum thermal seal when shaken with ice; broken with a firm palm heel tap on the seam.",
    clueLevel3: "Replaced fragile glass-and-tin combinations in modern cocktail bars to prevent accidental shattering.",
    whyItMatters: "Allows maximum thermal exchange, rapid aeration, and quick turnaround times during high-speed service.",
    tip: "Seat the small tin at an intentional slight angle to create an easy release strike point along the spine.",
    history: "Standardized across American saloons during the late 19th century as the fastest mixing container."
  },
  {
    id: "hawthorne-strainer",
    name: "HAWTHORNE STRAINER",
    category: "TOOL",
    family: "Filtration Tool",
    glass: "Barware Equipment",
    spec: "Flat metal perforated disc surrounded by an adaptable wire coil with stabilizing tabs",
    clueLevel1: "Perforated metal strainer with a flexible spring coil that hugs the interior rim of a shaking tin.",
    clueLevel2: "Finger tab allows the bartender to gate or close the pour opening to regulate ice chunk passage.",
    clueLevel3: "Patented in 1892 in Boston, named after the Hawthorne Café where the patent holders operated.",
    whyItMatters: "Essential for rapid single-handed pouring from shaker tins while holding back heavy ice shards.",
    tip: "Push the strainer forward with your index finger to close the gate when pouring delicate drinks up.",
    history: "Patented by William Wright in 1892 and manufactured by the Denny family of Boston."
  },
  {
    id: "bar-spoon",
    name: "BAR SPOON",
    category: "TOOL",
    family: "Agitation & Measure",
    glass: "Barware Equipment",
    spec: "30cm to 40cm twisted spiral shaft, teardrop counterbalance or muddler tip, 5ml bowl measure",
    clueLevel1: "Elongated spiral-handled spoon engineered to spin effortlessly between bartender fingers.",
    clueLevel2: "Bowl holds exactly 5ml (one standard barspoon measure), used to stir spirit-forward cocktails without splashing.",
    clueLevel3: "Evolved from European medicine and sucket spoons used to eat preserved fruit from deep jars.",
    whyItMatters: "Smooth rotation keeps the concave face against the mixing glass wall, chilling without splashing or aeration.",
    tip: "Do not grip the spoon tightly; push and pull gently with your thumb and middle finger in an orbit.",
    history: "Adapted for American saloons in the mid-19th century from decorative English silver sucket spoons."
  },
  {
    id: "muddler",
    name: "MUDDLER",
    category: "TOOL",
    family: "Extraction Tool",
    glass: "Barware Equipment",
    spec: "8-to-10 inch dense hardwood or food-grade polymer baton with flat or lightly toothed base",
    clueLevel1: "Baton tool used to press fruit, sugar cubes, citrus rinds, and herbs in the bottom of a tin.",
    clueLevel2: "Crucial for drinks like the Caipirinha, Old Fashioned, and Mint Julep.",
    clueLevel3: "Direct successor to the 18th-century toddy stick used to break up solid loaf sugar.",
    whyItMatters: "Over-muddling tender herbs like mint releases bitter chlorophyll; under-muddling leaves oils trapped.",
    tip: "Gently press and twist citrus wheels to express oils, but press mint with light pressure only.",
    history: "Descended from 18th-century colonial toddy sticks used to crush compressed brown sugar blocks."
  },
  {
    id: "julep-strainer",
    name: "JULEP STRAINER",
    category: "TOOL",
    family: "Filtration Tool",
    glass: "Barware Equipment",
    spec: "Perforated concave metal scallop shell with fixed handle, designed without springs",
    clueLevel1: "Bowl-shaped perforated metal strainer without a spring coil, resting inside a mixing glass.",
    clueLevel2: "Historically used to hold back crushed ice while patrons drank mint juleps before drinking straws.",
    clueLevel3: "The original 19th-century bar strainer, now reserved primarily for stirred mixing glasses.",
    whyItMatters: "Fits cleanly into the curved concavity of crystal stirring beakers without catching or clogging.",
    tip: "Insert the convex face pointing upward into the beaker to create a natural, smooth pouring funnel.",
    history: "Originated in the American South during the early 1800s to keep ice from touching gentlemen's teeth."
  },
  {
    id: "fine-mesh-strainer",
    name: "FINE MESH STRAINER",
    category: "TOOL",
    family: "Double Straining",
    glass: "Barware Equipment",
    spec: "Conical wire mesh basket with extended rim rest and welded wire handle",
    clueLevel1: "Secondary small wire sieve held directly above the cocktail glass during the pour.",
    clueLevel2: "Catches microscopic ice flecks, citrus pulp, and fragmented mint shreds for a mirror-like finish.",
    clueLevel3: "Adopted from culinary pastry kitchens into craft cocktail bars during the early 2000s resurgence.",
    whyItMatters: "Ensures drinks served up (like a Daiquiri or Cosmopolitan) possess a crystal-clear, unclouded surface.",
    tip: "Tap the side of the mesh strainer with the Hawthorne tin rim to speed up draining of thick egg white drinks.",
    history: "Popularized in London cocktail bars during the late 1990s to guarantee pristine visual presentation."
  },
  {
    id: "citrus-peeler",
    name: "CITRUS PEELER",
    category: "TOOL",
    family: "Garnish Preparation",
    glass: "Barware Equipment",
    spec: "Y-shaped carbon steel or stainless peeler blade with ergonomic crossbar grip",
    clueLevel1: "Y-shaped kitchen cutting tool used by craft bartenders to slice broad, uniform citrus peels.",
    clueLevel2: "Engineered to shave the aromatic oil-rich zest without biting deeply into bitter white pith.",
    clueLevel3: "Preferred over paring knives for speed, finger safety, and precision during high-volume service.",
    whyItMatters: "Expressed citrus oils contain essential limonene aromas that set the crucial initial sensory note.",
    tip: "Maintain firm, even downward pressure across the fruit surface to yield a wide, rectangular swatch.",
    history: "The Rex Y-peeler, patented in Switzerland in 1947, became the global gold standard for bar prep."
  },
  {
    id: "angostura-bitters",
    name: "ANGOSTURA BITTERS",
    category: "INGREDIENT",
    family: "Aromatic Bitters",
    glass: "Bottle / Dasher Top",
    spec: "44.7% ABV tincture of gentian, herbs, and spices with iconic oversized paper label",
    clueLevel1: "The world's most famous aromatic cocktail bitters, identifiable by its trademark oversized label.",
    clueLevel2: "A few dashes provide woodsy, cinnamon, allspice, and bitter gentian structure to classic cocktails.",
    clueLevel3: "Formulated in Venezuela in 1824 by German physician Dr. Johann Siegert as a cure for soldier ailments.",
    whyItMatters: "The salt-and-pepper of cocktail craft, tying volatile alcohol and sweet sugars into harmony.",
    tip: "Hold the bottle completely upside down perpendicular to the tin to ensure consistent dash volume.",
    history: "Developed in the town of Angostura, Venezuela, and manufactured in Trinidad since 1875."
  },
  {
    id: "maraschino",
    name: "MARASCHINO",
    category: "INGREDIENT",
    family: "Fruit Liqueur / Spirit",
    glass: "Straw-Wrapped Bottle",
    spec: "32% ABV clear distillate of sour Marasca cherries, including crushed pits and stems",
    clueLevel1: "Clear cherry liqueur with a nutty, funky, dark cherry stone profile, packaged in straw webbing.",
    clueLevel2: "Essential backbone modifier in the Aviation, Last Word, Martinez, and Hemingway Daiquiri.",
    clueLevel3: "Produced along the Adriatic coast of Croatia and Italy by distillers like Luxardo since 1821.",
    whyItMatters: "Tastes like almond and cherry stone rather than sweet artificial candy cherry juice.",
    tip: "Very potent; 0.25 oz to 0.5 oz is usually sufficient to anchor an entire 3 oz drink.",
    history: "Distilled from sour Marasca cherries in Zadar, Croatia, dating back to medieval monasteries."
  },
  {
    id: "orgeat",
    name: "ORGEAT",
    category: "INGREDIENT",
    family: "Craft Syrup",
    glass: "Prep Bottle",
    spec: "Emulsified sweet almond milk syrup flavored with orange flower water and a dash of brandy",
    clueLevel1: "Milky, opaque almond syrup carrying floral orange blossom notes, crucial to Tiki drinks.",
    clueLevel2: "The defining sweetener and viscosity agent of the 1944 Trader Vic Mai Tai and Japanese Cocktail.",
    clueLevel3: "Originally produced from barley (orge in French) before sweet almonds became the standard base.",
    whyItMatters: "Provides rich fat and marzipan flavor that rounds out sharp lime juice and funky rums.",
    tip: "Always shake before measuring, as natural almond fats and waters will slowly separate on the shelf.",
    history: "Transformed from an archaic French barley medicine into a staple 19th-century cocktail sweetener."
  },
  {
    id: "campari",
    name: "CAMPARI",
    category: "INGREDIENT",
    family: "Italian Bitter / Red Bitter",
    glass: "Backbar Bottle",
    spec: "24% ABV bright red aperitivo bittered with chinotto fruit, cascarilla, and gentian root",
    clueLevel1: "Iconic crimson Italian bitter liqueur known for its aggressive grapefruit peel and gentian bitterness.",
    clueLevel2: "The indispensable heart of the Negroni, Americano, Boulevardier, and Jungle Bird.",
    clueLevel3: "Invented by Gaspare Campari in Novara, Italy, in 1860; historically colored using cochineal dye.",
    whyItMatters: "Its assertive bitterness stimulates saliva glands, preparing the human palate for food.",
    tip: "Store at backbar room temperature; chilling makes its bitter resins tighten and taste harsher.",
    history: "Created in 1860 by Gaspare Campari and popularized at his historic Milan café near the Duomo."
  },
  {
    id: "vermouth",
    name: "VERMOUTH",
    category: "INGREDIENT",
    family: "Fortified Aromatized Wine",
    glass: "Wine / Backbar Bottle",
    spec: "Wine fortified with neutral brandy, sweetened, and infused with wormwood and alpine herbs",
    clueLevel1: "Fortified, aromatized wine infused with botanicals, available in sweet (red) and dry (white) styles.",
    clueLevel2: "The essential modifier in the Martini and Manhattan; derives its name from 'Wermut' (wormwood).",
    clueLevel3: "Pioneered commercially in Turin (sweet) and Chambéry (dry) in the late 18th century.",
    whyItMatters: "Because it is wine-based, it oxidizes quickly once opened; stale vermouth ruins good spirits.",
    tip: "Always refrigerate opened bottles and discard or cook with them after 30 to 45 days.",
    history: "Commercialized by Antonio Benedetto Carpano in Turin, Italy, in 1786."
  },
  {
    id: "mezcal",
    name: "MEZCAL",
    category: "INGREDIENT",
    family: "Agave Spirit",
    glass: "Tradition Veladora / Jícara",
    spec: "Distillate of roasted agave hearts (piñas) cooked in underground earth pits with wood and volcanic rock",
    clueLevel1: "Artisanal Mexican agave spirit celebrated for its earthy, vegetal, and campfire smoke complexity.",
    clueLevel2: "Cooked in conical earthen stone pits before crushing, wild fermentation, and copper or clay pot distillation.",
    clueLevel3: "Produced primarily in Oaxaca from diverse agave varieties, predominantly Espadín.",
    whyItMatters: "Brings wild terroir and smoke notes into modern cocktails, often splitting the base with tequila.",
    tip: "A small 0.25 oz barspoon rinse or split-base pour can add smoke without obliterating other ingredients.",
    history: "Distilled across indigenous Mexican communities for nearly 500 years following the Spanish conquest."
  },
  {
    id: "agave-nectar",
    name: "AGAVE NECTAR",
    category: "INGREDIENT",
    family: "Organic Sweetener",
    glass: "Speed Squeeze Bottle",
    spec: "Filtered organic syrup extracted from the blue agave plant, diluted 2:1 or 3:1 with warm water",
    clueLevel1: "Rich natural syrup extracted from the same succulent plant used to make tequila.",
    clueLevel2: "The cornerstone sweetener in Tommy's Margarita, replacing orange liqueur with pure agave profile.",
    clueLevel3: "High in fructose, dissolving cleanly in cold drinks and possessing a low glycemic index.",
    whyItMatters: "Ties directly into the vegetal terroir of tequila and mezcal better than plain cane sugar.",
    tip: "Always cut raw agave nectar with water before service; raw nectar is too viscous to dissolve when shaken.",
    history: "Popularized in craft cocktails by Julio Bermejo at Tommy's Mexican Restaurant in San Francisco, 1990."
  },
  {
    id: "dilution",
    name: "DILUTION",
    category: "SERVICE",
    family: "Thermodynamics & Science",
    glass: "Physics Principle",
    spec: "15% to 25% water addition in stirred drinks; 20% to 35% water addition in shaken drinks",
    clueLevel1: "The controlled addition of chilled water into a cocktail via melting ice during mixing.",
    clueLevel2: "Opens up aromatic compounds, softens aggressive ethanol burn, and brings balance to the palate.",
    clueLevel3: "Governed by the laws of thermodynamics: there is no chilling without melting.",
    whyItMatters: "An undiluted drink tastes hot and sharp; an over-diluted drink tastes limp, watery, and hollow.",
    tip: "Taste every stirred cocktail with a clean straw before straining to assess balance and temperature.",
    history: "Documented scientifically in modern bar literature by Dave Arnold in Liquid Intelligence (2014)."
  },
  {
    id: "express-peel",
    name: "EXPRESS PEEL",
    category: "SERVICE",
    family: "Garnish Technique",
    glass: "Aroma Finishing",
    spec: "Fold citrus zest skin-side out between thumb and forefinger at a 45-degree angle over the glass",
    clueLevel1: "The deliberate action of folding a citrus peel over a finished cocktail to spray essential oils.",
    clueLevel2: "Creates an invisible aerosol mist of fragrant limonene oils across the surface and rim.",
    clueLevel3: "Transforms the first sensory impression of a drink before the liquid even touches the guest's tongue.",
    whyItMatters: "Olfactory perception accounts for up to 80% of human taste sensation.",
    tip: "Never express the white pith; only pinch the glossy colored outer skin to avoid releasing bitterness.",
    history: "A signature flair of 19th-century saloon professors like Jerry Thomas to scent classic cocktails."
  },
  {
    id: "dry-shake",
    name: "DRY SHAKE",
    category: "SERVICE",
    family: "Emulsification Technique",
    glass: "Station Method",
    spec: "Agitating egg white or aquafaba with cocktail ingredients without ice, followed by a wet shake with ice",
    clueLevel1: "Shaking cocktail ingredients with egg white at room temperature before adding ice.",
    clueLevel2: "Unravels and emulsifies ovalbumin proteins, producing a dense, velvety, pillow-soft head of foam.",
    clueLevel3: "Alternative 'reverse dry shake' method shakes with ice first, strains ice, then shakes warm to maximize foam.",
    whyItMatters: "Ice dampens the mechanical whipping action; shaking dry allows proteins to aerate freely.",
    tip: "Ensure tins are gripped securely; warm air expanding inside the shaker can blow the tins apart.",
    history: "Developed in late 19th-century bars to tame heavy whole-egg and egg-white fizzes and sours."
  },
  {
    id: "speed-rail",
    name: "SPEED RAIL",
    category: "SERVICE",
    family: "Ergonomics & Well",
    glass: "Station Architecture",
    spec: "Stainless steel trough mounted waist-high directly in front of the bartender's ice bin",
    clueLevel1: "Long metal bottle rack mounted directly in front of the ice well for lightning-fast pours.",
    clueLevel2: "Houses the most frequently used house spirits: vodka, gin, rum, tequila, triple sec, and whiskey.",
    clueLevel3: "Designed to minimize unnecessary steps, keeping primary ingredients within arm's reach.",
    whyItMatters: "Reduces service turnaround time and preserves physical ergonomics during intense volume.",
    tip: "Always arrange rail bottles in identical left-to-right order so hands move on pure muscle memory.",
    history: "Engineered into American commercial bar stations during the mid-20th-century restaurant boom."
  },
  {
    id: "wash-line",
    name: "WASH LINE",
    category: "SERVICE",
    family: "Glassware Precision",
    glass: "Visual Standard",
    spec: "The final resting level of liquid below the glass rim, typically 4mm to 6mm below the lip",
    clueLevel1: "The specific height the finished cocktail liquid reaches relative to the rim of the glass.",
    clueLevel2: "A consistent gap prevents embarrassing spills while allowing servers to carry drinks steadily.",
    clueLevel3: "Demonstrates correct measuring and proper ice dilution matched to glassware capacity.",
    whyItMatters: "A wash line that is too low looks like a short pour; one to the brim spills all over the guest.",
    tip: "Select glassware volume that leaves exactly one quarter-inch of space for a standard 5.5 oz washed pour.",
    history: "Codified in luxury cocktail lounges to create uniform visual elegance across tables."
  },
  {
    id: "clear-ice",
    name: "CLEAR ICE",
    category: "SERVICE",
    family: "Ice Quality & Melting",
    glass: "Ice Program",
    spec: "Directionally frozen pure water block carved into 2-inch cubes, free of trapped air and minerals",
    clueLevel1: "Crystal-clear, glass-like ice frozen without trapped white air bubbles or mineral haze.",
    clueLevel2: "Melts dramatically slower than cloudy commercial machine ice, preserving spirit proof and flavor.",
    clueLevel3: "Achieved via directional freezing, forcing impurities down into a sacrificial discard reservoir.",
    whyItMatters: "Slow surface melting prevents delicate spirit-forward drinks like the Old Fashioned from drowning.",
    tip: "Tempering clear ice at room temperature for two minutes before pouring prevents it from cracking on contact.",
    history: "Pioneered in Tokyo high-end cocktail salons during the 1980s and adopted by craft bars worldwide."
  }
];

/* ==========================================================================
   2. SYNTHESIZED WEB AUDIO ENGINE
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
    } catch (e) {}
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
        osc.frequency.setValueAtTime(480 + i * 160, now + i * 0.04);
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
   3. PERSISTENT STATE & SCHEMA MANAGER
   ========================================================================== */
class BartenderGameState {
  constructor() {
    this.storageKey = 'bar_hangman_save_v2';
    this.savedData = this.loadPersistentData();

    // Transient runtime state
    this.currentMode = 'classic';
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
    this.hintCost = 20;
    this.letterHintCost = 30;
    this.isInputLocked = false;
    this.shiftHistory = [];
  }

  loadPersistentData() {
    const defaultData = {
      version: 2,
      soundEnabled: true,
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

    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return defaultData;
      const parsed = JSON.parse(raw);

      return {
        version: 2,
        soundEnabled: typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : defaultData.soundEnabled,
        highScore: typeof parsed.highScore === 'number' ? parsed.highScore : defaultData.highScore,
        bestStreak: typeof parsed.bestStreak === 'number' ? parsed.bestStreak : defaultData.bestStreak,
        totalPlayed: typeof parsed.totalPlayed === 'number' ? parsed.totalPlayed : defaultData.totalPlayed,
        totalWon: typeof parsed.totalWon === 'number' ? parsed.totalWon : defaultData.totalWon,
        unlockedCodexIds: Array.isArray(parsed.unlockedCodexIds) && parsed.unlockedCodexIds.length > 0 
          ? parsed.unlockedCodexIds 
          : defaultData.unlockedCodexIds,
        mistakeBank: Array.isArray(parsed.mistakeBank) ? parsed.mistakeBank : defaultData.mistakeBank,
        categoryMastery: (parsed.categoryMastery && typeof parsed.categoryMastery === 'object') 
          ? { ...defaultData.categoryMastery, ...parsed.categoryMastery } 
          : defaultData.categoryMastery
      };
    } catch (e) {
      console.warn("Storage recovery: safely reverting to fresh schema.", e);
      return defaultData;
    }
  }

  savePersistentData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.savedData));
    } catch (e) {
      console.warn("Local storage write error:", e);
    }
  }

  resetAllRecords() {
    this.savedData = {
      version: 2,
      soundEnabled: this.savedData.soundEnabled,
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
    this.savePersistentData();
  }

  getRankTitle() {
    const wins = this.savedData.totalWon;
    if (wins < 2) return "Barback";
    if (wins < 5) return "Apprentice";
    if (wins < 10) return "Bartender";
    if (wins < 20) return "Senior Bartender";
    return "Master Mixologist";
  }

  getRankProgressInfo() {
    const wins = this.savedData.totalWon;
    if (wins < 2) {
      return { current: "Barback", next: "Apprentice", needed: 2, currentCount: wins, pct: Math.round((wins / 2) * 100) };
    }
    if (wins < 5) {
      return { current: "Apprentice", next: "Bartender", needed: 5, currentCount: wins, pct: Math.round((wins / 5) * 100) };
    }
    if (wins < 10) {
      return { current: "Bartender", next: "Senior Bartender", needed: 10, currentCount: wins, pct: Math.round((wins / 10) * 100) };
    }
    if (wins < 20) {
      return { current: "Senior Bartender", next: "Master Mixologist", needed: 20, currentCount: wins, pct: Math.round((wins / 20) * 100) };
    }
    return { current: "Master Mixologist", next: "Pinnacle", needed: 20, currentCount: wins, pct: 100 };
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
      // Remove from practice review bank if clean solve
      this.savedData.mistakeBank = this.savedData.mistakeBank.filter(id => id !== this.activePuzzle.id);

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
      if (!this.savedData.mistakeBank.includes(this.activePuzzle.id)) {
        this.savedData.mistakeBank.push(this.activePuzzle.id);
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
   4. UI CONTROLLER & VIEW BINDINGS
   ========================================================================== */
class BartenderUIController {
  constructor() {
    // Top Screens
    this.screenMenu = document.getElementById('screen-menu');
    this.screenGame = document.getElementById('screen-game');

    // Menu Hub
    this.menuRankTitle = document.getElementById('menu-rank-title');
    this.menuRecordSub = document.getElementById('menu-record-sub');
    this.menuReviewCount = document.getElementById('menu-review-count');
    this.menuPracticeDesc = document.getElementById('menu-practice-desc');
    this.menuBtnCodex = document.getElementById('menu-btn-codex');
    this.menuBtnStats = document.getElementById('menu-btn-stats');

    // Game Header
    this.btnReturnMenu = document.getElementById('btn-return-menu');
    this.btnSound = document.getElementById('btn-sound');
    this.soundIconOn = document.querySelector('.icon-sound-on');
    this.soundIconOff = document.querySelector('.icon-sound-off');
    this.btnStats = document.getElementById('btn-stats');
    this.btnCodex = document.getElementById('btn-codex');

    // In-game HUD
    this.hudRank = document.getElementById('hud-rank');
    this.hudProgress = document.getElementById('hud-progress');
    this.hudStreak = document.getElementById('hud-streak');
    this.hudScore = document.getElementById('hud-score');
    this.hudTimerContainer = document.getElementById('hud-timer-container');
    this.hudTimer = document.getElementById('hud-timer');

    // Cocktail Station Graphic & Strikes
    this.strikesCount = document.getElementById('strikes-count');
    this.strikePips = document.getElementById('strike-pips');
    this.liquidFill = document.getElementById('liquid-fill');
    this.cracks = [
      document.getElementById('crack-1'),
      document.getElementById('crack-2'),
      document.getElementById('crack-3')
    ];
    this.puzzleCategory = document.getElementById('puzzle-category');

    // Clue Card & Interactive Actions
    this.clueLevelBadge = document.getElementById('clue-level-badge');
    this.clueFamily = document.getElementById('clue-family');
    this.clueText = document.getElementById('clue-text');
    this.btnRevealClue = document.getElementById('btn-reveal-clue');
    this.btnVowelHint = document.getElementById('btn-vowel-hint');

    // Letter Slots & Keyboard
    this.wordSlotsContainer = document.getElementById('word-slots');
    this.keyboardContainer = document.getElementById('virtual-keyboard');

    // Bold Guess
    this.btnSolveOpen = document.getElementById('btn-solve-open');
    this.boldGuessPanel = document.getElementById('bold-guess-panel');
    this.boldGuessInput = document.getElementById('bold-guess-input');
    this.btnSubmitBold = document.getElementById('btn-submit-bold');
    this.btnCancelBold = document.getElementById('btn-cancel-bold');

    // Ticket Knowledge Modal
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
    this.summaryBanner = document.getElementById('summary-banner');
    this.summaryTitle = document.getElementById('summary-title');
    this.summarySub = document.getElementById('summary-sub');
    this.sumScore = document.getElementById('sum-score');
    this.sumSolved = document.getElementById('sum-solved');
    this.sumRank = document.getElementById('sum-rank');
    this.sumStreak = document.getElementById('sum-streak');
    this.summaryBreakdownList = document.getElementById('summary-breakdown-list');
    this.btnRestartShift = document.getElementById('btn-restart-shift');
    this.btnReturnMenuFromSum = document.getElementById('btn-return-menu-from-sum');

    // Career Stats Modal
    this.statsModal = document.getElementById('stats-modal');
    this.btnCloseStats = document.getElementById('btn-close-stats');
    this.btnCloseStatsTop = document.getElementById('btn-close-stats-top');
    this.stPlayed = document.getElementById('st-total-played');
    this.stWon = document.getElementById('st-total-won');
    this.stStreak = document.getElementById('st-high-streak');
    this.stScore = document.getElementById('st-high-score');
    this.tierCurrentTag = document.getElementById('tier-current-tag');
    this.tierProgress = document.getElementById('tier-bar-progress');
    this.tierProgressBar = document.getElementById('tier-progressbar');
    this.tierPrompt = document.getElementById('tier-next-prompt');
    this.catMasteryList = document.getElementById('category-mastery-list');
    this.btnResetStats = document.getElementById('btn-reset-stats');

    // Codex Modal
    this.codexModal = document.getElementById('codex-modal');
    this.btnCloseCodex = document.getElementById('btn-close-codex');
    this.btnCloseCodexTop = document.getElementById('btn-close-codex-top');
    this.codexSearch = document.getElementById('codex-search');
    this.codexFilterCat = document.getElementById('codex-filter-category');
    this.codexListContainer = document.getElementById('codex-list-container');

    // Toast
    this.toast = document.getElementById('toast-message');
    this.toastTimer = null;

    this.initKeyboard();
    this.bindEvents();
    this.syncSoundUI();
    this.updateMenuHub();
  }

  showScreen(screenName) {
    if (screenName === 'menu') {
      this.screenMenu.classList.remove('hidden');
      this.screenGame.classList.add('hidden');
      this.updateMenuHub();
    } else {
      this.screenMenu.classList.add('hidden');
      this.screenGame.classList.remove('hidden');
    }
  }

  updateMenuHub() {
    this.menuRankTitle.textContent = state.getRankTitle();
    this.menuRecordSub.textContent = `Best Shift Score: ${state.savedData.highScore}`;
    const reviewCount = state.savedData.mistakeBank.length;
    this.menuReviewCount.textContent = reviewCount;
    if (reviewCount === 0) {
      this.menuPracticeDesc.textContent = "No botched orders! Ready for standard drilling.";
    } else {
      this.menuPracticeDesc.textContent = `Drill ${reviewCount} previously botched ticket${reviewCount > 1 ? 's' : ''}`;
    }
  }

  syncSoundUI() {
    audio.enabled = state.savedData.soundEnabled;
    if (audio.enabled) {
      this.soundIconOn.classList.remove('hidden');
      this.soundIconOff.classList.add('hidden');
    } else {
      this.soundIconOn.classList.add('hidden');
      this.soundIconOff.classList.remove('hidden');
    }
  }

  bindEvents() {
    // Mode selections
    document.querySelectorAll('.menu-mode-list .menu-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        gameEngine.switchMode(mode);
        this.showScreen('game');
      });
    });

    // Menu secondary buttons
    this.menuBtnCodex.addEventListener('click', () => this.openCodexModal());
    this.menuBtnStats.addEventListener('click', () => this.openStatsModal());

    // In-game header return
    this.btnReturnMenu.addEventListener('click', () => {
      gameEngine.stopTimer();
      this.showScreen('menu');
    });

    // Sound toggle
    this.btnSound.addEventListener('click', () => {
      audio.enabled = !audio.enabled;
      state.savedData.soundEnabled = audio.enabled;
      state.savePersistentData();
      this.syncSoundUI();
      if (audio.enabled) {
        this.showToast("Sound Effects Active");
        audio.playLetterTap();
      } else {
        this.showToast("Sound Muted");
      }
    });

    // Career Stats buttons
    this.btnStats.addEventListener('click', () => this.openStatsModal());
    this.btnCloseStats.addEventListener('click', () => this.statsModal.classList.add('hidden'));
    this.btnCloseStatsTop.addEventListener('click', () => this.statsModal.classList.add('hidden'));

    // Reset records button in stats
    this.btnResetStats.addEventListener('click', () => {
      const confirmed = window.confirm("Reset all Bartender Career Records and unlocked Codex specs?");
      if (confirmed) {
        state.resetAllRecords();
        this.openStatsModal();
        this.updateMenuHub();
        this.showToast("Career Records Reset to Barback");
      }
    });

    // Codex buttons & filters
    this.btnCodex.addEventListener('click', () => this.openCodexModal());
    this.btnCloseCodex.addEventListener('click', () => this.codexModal.classList.add('hidden'));
    this.btnCloseCodexTop.addEventListener('click', () => this.codexModal.classList.add('hidden'));
    this.codexSearch.addEventListener('input', () => this.renderCodexList());
    this.codexFilterCat.addEventListener('change', () => this.renderCodexList());

    // Gameplay Assists
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

    this.btnReturnMenuFromSum.addEventListener('click', () => {
      this.summaryModal.classList.add('hidden');
      this.showScreen('menu');
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
      } else if (e.key === 'Escape') {
        this.boldGuessPanel.classList.add('hidden');
        this.btnSolveOpen.setAttribute('aria-expanded', 'false');
        this.boldGuessInput.value = '';
      }
    });

    // Physical Keyboard Input Listener
    window.addEventListener('keydown', (e) => {
      if (this.screenGame.classList.contains('hidden')) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

      if (e.key === 'Escape') {
        this.statsModal.classList.add('hidden');
        this.codexModal.classList.add('hidden');
        this.boldGuessPanel.classList.add('hidden');
        this.btnSolveOpen.setAttribute('aria-expanded', 'false');
        return;
      }

      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char)) {
        gameEngine.handleGuess(char);
      }
    });

    // Close modals on backdrop click
    [this.statsModal, this.codexModal].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
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
        btn.setAttribute('type', 'button');
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

  renderWordSlots(puzzle, guessedLetters, isGameOverLoss = false) {
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
            if (isGameOverLoss && !puzzle.userGuesses?.has(char)) {
              slot.classList.add('revealed-missed');
            }
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

    if (state.currentMode === 'rush') {
      this.hudTimerContainer.classList.remove('hidden');
      this.hudTimer.textContent = `${state.timerSeconds}s`;
    } else {
      this.hudTimerContainer.classList.add('hidden');
    }

    // Update assist button affordability indicators
    if (state.clueLevel >= 3) {
      this.btnRevealClue.setAttribute('disabled', 'true');
      this.btnRevealClue.title = "All tasting clues revealed";
    } else {
      this.btnRevealClue.removeAttribute('disabled');
      this.btnRevealClue.title = "Unlock deeper tasting notes (-20 round pts)";
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

    const percentLeft = Math.max(0, 1 - (mistakes / maxMistakes));
    const liquidY = 20 + (75 * (1 - percentLeft));
    const liquidH = 75 * percentLeft;
    this.liquidFill.setAttribute('y', liquidY);
    this.liquidFill.setAttribute('height', liquidH);

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
    }, 2200);
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

  showShiftSummary(modeReason = 'normal') {
    this.sumScore.textContent = state.score;
    const cleanWins = state.shiftHistory.filter(h => h.won).length;
    this.sumSolved.textContent = `${cleanWins} / ${state.shiftHistory.length}`;
    this.sumRank.textContent = state.getRankTitle();
    this.sumStreak.textContent = state.streak;

    if (state.currentMode === 'daily') {
      this.summaryBanner.textContent = "DAILY SPEC COMPLETE";
      this.summaryTitle.textContent = "Daily Spec Concluded";
      this.summarySub.textContent = "Today's featured station recipe has been recorded.";
    } else if (state.currentMode === 'rush') {
      this.summaryBanner.textContent = modeReason === 'timeout' ? "SERVICE RUSH: LAST CALL" : "SERVICE RUSH SURVIVED";
      this.summaryTitle.textContent = "Service Rush Concluded";
      this.summarySub.textContent = modeReason === 'timeout' 
        ? "The rush clock expired! Drink tickets processed under high volume." 
        : "All high-speed rush tickets served before last call!";
    } else if (state.currentMode === 'practice') {
      this.summaryBanner.textContent = "MISTAKE REVIEW COMPLETE";
      this.summaryTitle.textContent = "Review Shift Concluded";
      this.summarySub.textContent = "Station drills finished. Cleared tickets removed from mistake log.";
    } else {
      this.summaryBanner.textContent = "SHIFT COMPLETE";
      this.summaryTitle.textContent = `${gameEngine.activePool.length}-Ticket Shift Concluded`;
      this.summarySub.textContent = "All scheduled station drink orders processed.";
    }

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
    this.updateMenuHub();
  }

  openStatsModal() {
    this.stPlayed.textContent = state.savedData.totalPlayed;
    this.stWon.textContent = state.savedData.totalWon;
    this.stStreak.textContent = state.savedData.bestStreak;
    this.stScore.textContent = state.savedData.highScore;

    const rankInfo = state.getRankProgressInfo();
    this.tierCurrentTag.textContent = rankInfo.current;
    this.tierProgress.style.width = `${rankInfo.pct}%`;
    this.tierProgressBar.setAttribute('aria-valuenow', rankInfo.pct);

    if (rankInfo.pct === 100) {
      this.tierPrompt.textContent = "Master Mixologist — Pinnacle Station Rank Achieved!";
    } else {
      const remaining = rankInfo.needed - rankInfo.currentCount;
      this.tierPrompt.textContent = `${remaining} more clean solve${remaining > 1 ? 's' : ''} to reach ${rankInfo.next}.`;
    }

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
    const query = this.codexSearch.value.trim().toUpperCase();
    const filterCat = this.codexFilterCat.value;
    this.codexListContainer.innerHTML = '';

    const list = PLAYABLE_CHALLENGES.filter(item => {
      const matchesSearch = item.name.includes(query) || 
                            item.family.toUpperCase().includes(query) || 
                            item.spec.toUpperCase().includes(query);
      const matchesCat = (filterCat === 'ALL' || item.category === filterCat);
      return matchesSearch && matchesCat;
    });

    if (list.length === 0) {
      this.codexListContainer.innerHTML = `<p style="text-align:center; color:var(--color-parchment-dim); padding:20px; font-size:0.8rem;">No recipe entries match the active filter.</p>`;
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
          <p class="codex-item-detail" style="font-style:italic; margin-top:3px; color:var(--color-parchment-dim);">"${entry.tip}"</p>
        `;
      } else {
        const maskedName = entry.name.split(' ').map(w => '•'.repeat(w.length)).join(' ');
        card.innerHTML = `
          <div class="codex-item-header">
            <h4 class="codex-item-name">${maskedName}</h4>
            <span class="codex-item-cat">${entry.category}</span>
          </div>
          <p class="codex-item-detail" style="color:var(--color-parchment-dim);"><em>Ticket locked. Serve this order cleanly during a shift to log specs and technique notes.</em></p>
        `;
      }
      this.codexListContainer.appendChild(card);
    });
  }
}

/* ==========================================================================
   5. CORE GAMEPLAY ENGINE
   ========================================================================== */
class BartenderGameEngine {
  constructor() {
    this.ui = null;
    this.activePool = [];
    this.userPicksThisTicket = new Set();
  }

  init() {
    this.ui = new BartenderUIController();
  }

  switchMode(mode) {
    state.currentMode = mode;
    this.stopTimer();
    state.resetShift();

    if (mode === 'classic') {
      this.activePool = [...PLAYABLE_CHALLENGES];
      this.ui.showToast("Classic 5-Ticket Shift Started");
    } else if (mode === 'daily') {
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
      const dailyIndex = Math.abs(dayOfYear) % PLAYABLE_CHALLENGES.length;
      this.activePool = [PLAYABLE_CHALLENGES[dailyIndex]];
      this.ui.showToast("Today's Daily Spec Loaded");
    } else if (mode === 'rush') {
      this.activePool = [...PLAYABLE_CHALLENGES];
      state.timerSeconds = 60;
      this.startTimer();
      this.ui.showToast("Service Rush Sprint: 60 Seconds!");
    } else if (mode === 'practice') {
      if (state.savedData.mistakeBank.length === 0) {
        this.ui.showToast("Mistake log clean! Practicing all specs.");
        this.activePool = [...PLAYABLE_CHALLENGES];
      } else {
        this.activePool = PLAYABLE_CHALLENGES.filter(item => state.savedData.mistakeBank.includes(item.id));
        this.ui.showToast(`Drilling ${this.activePool.length} Botched Order${this.activePool.length > 1 ? 's' : ''}`);
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
        this.handleRushTimeout();
      }
    }, 1000);
  }

  stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  handleRushTimeout() {
    state.isInputLocked = true;
    audio.playGlassBreak();
    this.ui.showToast("Last Call! Shift Clock Expired.");
    this.recordTicketOutcome(false, 0, 0, 0);

    setTimeout(() => {
      this.ui.showShiftSummary('timeout');
    }, 600);
  }

  loadPuzzle(puzzle) {
    if (!puzzle) return;
    state.activePuzzle = puzzle;
    state.guessedLetters = new Set();
    this.userPicksThisTicket = new Set();
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
      this.stopTimer();
      this.ui.showShiftSummary('normal');
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
    this.userPicksThisTicket.add(letter);
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
    if (state.isInputLocked || !state.activePuzzle) return;
    if (state.clueLevel >= 3) {
      this.ui.showToast("All station tasting clues revealed!");
      return;
    }

    state.clueLevel++;
    audio.playLetterTap();
    this.ui.setClue(state.activePuzzle, state.clueLevel);
    this.ui.updateHUD();
    this.ui.showToast(`Level ${state.clueLevel} Tasting Clue Unlocked`);
  }

  useLetterHint() {
    if (state.isInputLocked || !state.activePuzzle) return;

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

    if (unrevealedLetters.length === 0) {
      this.ui.showToast("All letters already revealed!");
      return;
    }

    // Pick vowel if available, else random unrevealed consonant
    const vowels = unrevealedLetters.filter(l => ['A', 'E', 'I', 'O', 'U'].includes(l));
    const pick = vowels.length > 0 
      ? vowels[Math.floor(Math.random() * vowels.length)]
      : unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)];

    this.ui.showToast(`Head Bartender Calls: "${pick}" (-30 pts)`);
    this.handleGuess(pick);
    this.ui.updateHUD();
  }

  submitBoldGuess(fullGuess) {
    if (state.isInputLocked || !fullGuess || !state.activePuzzle) return;

    const normalizedGuess = fullGuess.toUpperCase().replace(/[^A-Z]/g, '');
    const normalizedTarget = state.activePuzzle.name.toUpperCase().replace(/[^A-Z]/g, '');

    if (normalizedGuess === normalizedTarget) {
      audio.playSolveFanfare();
      for (let i = 0; i < state.activePuzzle.name.length; i++) {
        const c = state.activePuzzle.name[i];
        if (/[A-Z]/.test(c)) {
          state.guessedLetters.add(c);
          this.userPicksThisTicket.add(c);
        }
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

  recordTicketOutcome(isWin, earnedPoints, accuracyPct, durationSec) {
    if (isWin) {
      state.recordSolve(state.mistakes === 0, earnedPoints);
    } else {
      state.recordLoss();
      // Reveal the missed word in red
      state.activePuzzle.userGuesses = new Set(this.userPicksThisTicket);
      for (let i = 0; i < state.activePuzzle.name.length; i++) {
        const c = state.activePuzzle.name[i];
        if (/[A-Z]/.test(c)) state.guessedLetters.add(c);
      }
      this.ui.renderWordSlots(state.activePuzzle, state.guessedLetters, true);
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
      const cluePenalty = (state.clueLevel - 1) * 20;
      roundPoints = Math.max(20, 100 + cleanBonus + speedBonus + (isBold ? 150 : 0) - cluePenalty);
      state.score += roundPoints;

      const totalPicks = this.userPicksThisTicket.size;
      accuracyPct = totalPicks > 0 
        ? Math.max(10, Math.round(((totalPicks - state.mistakes) / totalPicks) * 100))
        : 100;
    }

    this.recordTicketOutcome(isWin, roundPoints, accuracyPct, durationSec);
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