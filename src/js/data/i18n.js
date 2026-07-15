/**
 * Centralized translations — EN (default), JA, zh-CN
 * Access via JTG.TRANSLATIONS[lang] and JTG.i18n.t(key)
 */
(function (global) {
  "use strict";
  global.JTG = global.JTG || {};
  global.JTG.TRANSLATIONS = {
    en: {
  "meta": {
    "siteName": "Japan Travel Guide",
    "tagline": "Practical multi-city Japan planning"
  },
  "nav": {
    "home": "Home",
    "about": "About",
    "map": "Map",
    "destinations": "Destinations",
    "routes": "Routes",
    "food": "Food",
    "attractions": "Attractions",
    "transport": "Transport",
    "budget": "Budget",
    "packing": "Packing",
    "seasons": "Seasons",
    "festivals": "Festivals",
    "tips": "Tips",
    "faq": "FAQ",
    "gallery": "Gallery",
    "facts": "Fun Facts",
    "tools": "Tools",
    "settings": "Settings",
    "cities": "Cities"
  },
  "common": {
    "learnMore": "Learn more",
    "explore": "Explore",
    "viewAll": "View all",
    "fromTokyo": "From Tokyo",
    "bestTime": "Best time",
    "stay": "Suggested stay",
    "budget": "Budget estimate",
    "weather": "Weather",
    "highlights": "Highlights",
    "overview": "Overview",
    "foodGuide": "Food guide",
    "attractions": "Attractions",
    "transport": "Getting around",
    "travelTips": "Travel tips",
    "days": "days",
    "openGallery": "Open photo gallery",
    "backHome": "Back to home",
    "loading": "Loading…",
    "close": "Close",
    "previous": "Previous",
    "next": "Next",
    "search": "Search",
    "allCities": "All cities",
    "sortBy": "Sort by",
    "sortOrder": "Default order",
    "sortName": "Name",
    "sortTimeAsc": "Time (oldest)",
    "sortTimeDesc": "Time (newest)",
    "emptyGalleryTitle": "Gallery is empty",
    "emptyGalleryDesc": "Photos will appear here after you add them with the local Gallery Manager (Add Photos.command).",
    "settingsTitle": "Settings",
    "language": "Language",
    "distanceUnit": "Distance",
    "tempUnit": "Temperature",
    "theme": "Theme",
    "animation": "Animation",
    "themeLight": "Light",
    "themeDark": "Dark",
    "themeAuto": "Auto",
    "motionFull": "Full",
    "motionReduced": "Reduced",
    "motionOff": "Off",
    "langEn": "English",
    "langJa": "日本語",
    "langZh": "简体中文",
    "backToTop": "Back to top",
    "skipToContent": "Skip to content",
    "copyright": "© 2026 Japan Travel Guide. Crafted for curious travelers.",
    "quickLinks": "Quick links",
    "resources": "Resources",
    "destinations": "Destinations",
    "placeholder": "Photo slot",
    "photoSlot": "Photo slot — add your trip photos in Gallery"
  },
  "hero": {
    "eyebrow": "Independent Japan trip planner",
    "title": "Plan Japan with confidence",
    "lead": "Practical routes, city guides, transport, budgets, and tools — grounded in how people actually travel Japan. Cross-check schedules and passes on official sites before you go.",
    "ctaPrimary": "Start planning",
    "ctaSecondary": "Open travel tools",
    "statCities": "City guides",
    "statRoutes": "Itinerary styles",
    "statTips": "Planning tools",
    "heroImage": "Mount Fuji at dawn"
  },
  "about": {
    "eyebrow": "The archipelago",
    "title": "About Japan",
    "desc": "Japan rewards first-timers and return travelers: dense cities linked by rail, clear seasons, and regions with distinct food and culture. Use this hub to plan, then verify details on official sources.",
    "geoTitle": "Geography",
    "geoText": "From Hokkaido’s snowfields to Okinawa’s coral reefs, Japan stretches across climates and landscapes — volcanoes, forests, and dense megacities.",
    "cultureTitle": "Culture",
    "cultureText": "Omotenashi hospitality, seasonal aesthetics (kisetsukan), and living traditions from tea ceremony to anime fandoms.",
    "historyTitle": "History",
    "historyText": "Shogunate eras, Meiji modernization, and post-war innovation shape temples, castles, and contemporary cityscapes.",
    "foodTitle": "Food",
    "foodText": "Regional specialities, seasonal ingredients, and everything from Michelin counters to late-night ramen alleys.",
    "transportTitle": "Transportation",
    "transportText": "Rail is the backbone: IC cards (Suica, Pasmo, ICOCA, etc.) for local trains/buses/convenience stores; shinkansen for city-to-city. Quiet phones on trains; queue at platform marks.",
    "currencyTitle": "Currency",
    "currencyText": "Yen (JPY). Cards and contactless are common in cities; keep some cash for rural spots, small eateries, and temple offerings. ATMs at convenience stores often accept foreign cards.",
    "languageTitle": "Language",
    "languageText": "Japanese is primary; English signage is common on major transit. Learning a few phrases goes far.",
    "internetTitle": "Internet",
    "internetText": "eSIM or pocket Wi‑Fi before or at the airport is the simplest path. Free Wi‑Fi exists in many stations and cafés but is not universal—download offline maps.",
    "safetyTitle": "Safety",
    "safetyText": "Japan is generally very safe. Still use normal caution with belongings. Save 110 (police), 119 (fire/ambulance), and JNTO visitor hotline info. Consider the Safety Tips app for alerts.",
    "weatherTitle": "Weather",
    "weatherText": "Distinct seasons: cherry blossoms in spring, humid summers, vivid autumn leaves, snowy winters in the north.",
    "seasonsTitle": "Best seasons",
    "seasonsText": "Late March–May and October–November are peak for mild weather and scenery; shoulder seasons mean fewer crowds.",
    "etiquetteTitle": "Etiquette",
    "etiquetteText": "Queue orderly, keep trains quiet (no phone calls in cars), remove shoes where marked, and be respectful at shrines and temples. Tipping is not expected.",
    "whyTitle": "Why visit",
    "whyText": "Nowhere else balances futuristic cities, sacred landscapes, and everyday craftsmanship so gracefully.",
    "photo1": "Traditional street in Kyoto",
    "photo2": "Shinkansen at platform",
    "photo3": "Seasonal kaiseki meal"
  },
  "map": {
    "eyebrow": "Navigate",
    "title": "Interactive map",
    "desc": "City markers use approximate real latitude/longitude. Click a pin or use the list.",
    "panelTitle": "Jump to a city",
    "panelHint": "Positions match real geography. Hover to highlight; click to open the city page."
  },
  "destinations": {
    "eyebrow": "14 cities",
    "title": "Destinations overview",
    "desc": "Distance from Tokyo and typical daytime temperature update with your unit settings."
  },
  "cities": {
    "tokyo": {
      "name": "Tokyo",
      "blurb": "Neon mega-capital of food, fashion, and endless neighborhoods."
    },
    "kyoto": {
      "name": "Kyoto",
      "blurb": "Temples, tea houses, and the heart of classical Japan."
    },
    "osaka": {
      "name": "Osaka",
      "blurb": "Kitchen of Japan — street food, laughter, and castle views."
    },
    "nara": {
      "name": "Nara",
      "blurb": "Ancient capital, free-roaming deer, and Great Buddha calm."
    },
    "hiroshima": {
      "name": "Hiroshima",
      "blurb": "Peace memorials, okonomiyaki, and gateway to Miyajima."
    },
    "yokohama": {
      "name": "Yokohama",
      "blurb": "Harbor skyline, Chinatown, and cosmopolitan waterfront."
    },
    "hakone": {
      "name": "Hakone",
      "blurb": "Onsen towns, lake views, and Mount Fuji panoramas."
    },
    "nikko": {
      "name": "Nikko",
      "blurb": "Ornate shrines set in sacred mountain forests."
    },
    "kanazawa": {
      "name": "Kanazawa",
      "blurb": "Gardens, gold leaf, and preserved samurai districts."
    },
    "sapporo": {
      "name": "Sapporo",
      "blurb": "Northern capital of beer, snow festivals, and seafood."
    },
    "fukuoka": {
      "name": "Fukuoka",
      "blurb": "Kyushu gateway with yatai stalls and relaxed coasts."
    },
    "kobe": {
      "name": "Kobe",
      "blurb": "Port elegance, wagyu fame, and mountain-backed bays."
    },
    "nagasaki": {
      "name": "Nagasaki",
      "blurb": "Layered history, hills, and fusion flavors by the sea."
    },
    "okinawa": {
      "name": "Okinawa",
      "blurb": "Subtropical islands, turquoise water, and island pace."
    }
  },
  "routes": {
    "eyebrow": "Itineraries",
    "title": "Suggested routes",
    "desc": "Ready-made arcs from quick city breaks to deep regional journeys.",
    "d5": "5 days",
    "d7": "7 days",
    "d10": "10 days",
    "d14": "14 days",
    "sakura": "Cherry blossom",
    "autumn": "Autumn leaves",
    "food": "Food lover",
    "anime": "Anime",
    "nature": "Nature",
    "luxury": "Luxury",
    "budget": "Budget backpacker",
    "day": "Day",
    "content": {
      "d5": [
        "Tokyo: neighborhoods, food alleys, and a skyline view.",
        "Day trip to Nikko or Yokohama harbor.",
        "Shinkansen to Kyoto — temples at dusk.",
        "Kyoto classic circuit: Fushimi, Arashiyama, Gion.",
        "Osaka street food night and depart."
      ],
      "d7": [
        "Tokyo deep-dive: Asakusa, teamLab or museum day.",
        "Shibuya–Shinjuku neon and Harajuku side quests.",
        "Hakone onsen and Fuji views.",
        "Kyoto temples and tea districts.",
        "Nara deer park half-day from Kyoto.",
        "Osaka castle + Dotonbori.",
        "Buffer / shopping / depart."
      ],
      "d10": [
        "Tokyo arrival and east-side temples.",
        "West Tokyo youth culture and food.",
        "Day trip: Kamakura or Yokohama.",
        "Rail to Takayama or Kanazawa craft towns.",
        "Kanazawa gardens and geisha districts.",
        "Kyoto immersion day 1.",
        "Kyoto immersion day 2.",
        "Hiroshima Peace Park.",
        "Miyajima floating torii.",
        "Osaka finale feast."
      ],
      "d14": [
        "Tokyo base — 3 flexible days.",
        "Fuji Five Lakes or Hakone.",
        "Kyoto classic temples.",
        "Uji tea and Fushimi Inari.",
        "Nara ancient capital.",
        "Osaka food crawl.",
        "Himeji Castle stop.",
        "Hiroshima & Miyajima.",
        "Naoshima art islands (optional swap).",
        "Fukuoka yatai nights.",
        "Day for Dazaifu or coast.",
        "Fly north or relax buffer.",
        "Sapporo seafood and parks.",
        "Depart from New Chitose or return via Tokyo."
      ],
      "sakura": [
        "Time Tokyo parks for bloom forecasts.",
        "Yokohama waterfront blossoms.",
        "Kyoto temple gardens at peak.",
        "Nara park hanami picnic.",
        "Osaka castle park finale."
      ],
      "autumn": [
        "Nikko mountain maples.",
        "Tokyo city parks and illuminations prep.",
        "Kyoto Arashiyama and Tofuku-ji.",
        "Hiroshima / Miyajima momiji.",
        "Hakone ropeway colors."
      ],
      "food": [
        "Tokyo sushi, ramen, izakaya crawl.",
        "Osaka takoyaki & okonomiyaki school.",
        "Kyoto kaiseki and tofu cuisine.",
        "Kanazawa seafood market morning.",
        "Fukuoka tonkotsu and yatai.",
        "Kobe beef dinner splurge."
      ],
      "anime": [
        "Akihabara and Nakano Broadway.",
        "Ghibli Museum (tickets required).",
        "Odaiba / teamLab digital art.",
        "Kyoto Toei or film sets vibes.",
        "Osaka Den-Den Town."
      ],
      "nature": [
        "Kamikochi or alpine day (seasonal).",
        "Hakone volcanic scenery.",
        "Nikko waterfalls and lake.",
        "Hiroshima coast / Miyajima forest.",
        "Okinawa snorkel day (extend south)."
      ],
      "luxury": [
        "Tokyo flagship ryokan or palace hotel.",
        "Private sushi omakase.",
        "Kyoto machiya stay + tea ceremony.",
        "Hakone ryokan with open-air bath.",
        "First-class rail and Kobe wagyu."
      ],
      "budget": [
        "Capsule / hostel Tokyo base.",
        "Convenience-store breakfast strategy.",
        "Highway bus intercity hops.",
        "Free temples, parks, and viewpoints.",
        "Osaka street food over fine dining.",
        "IC card local rail only."
      ]
    }
  },
  "food": {
    "eyebrow": "Cuisine",
    "title": "Food guide overview",
    "desc": "Major categories to explore — detailed dishes live on each city page.",
    "sushi": "Sushi & sashimi",
    "sushiText": "Vinegared rice and pristine seafood, from conveyor belts to omakase counters.",
    "ramen": "Ramen",
    "ramenText": "Regional broths — shoyu, miso, tonkotsu — and late-night ritual bowls.",
    "street": "Street snacks",
    "streetText": "Takoyaki, taiyaki, yakitori, and festival stalls.",
    "kaiseki": "Kaiseki",
    "kaisekiText": "Seasonal multi-course artistry rooted in tea-ceremony aesthetics.",
    "wagyu": "Wagyu & yakiniku",
    "wagyuText": "Marbled beef grilled tableside or served as melt-in-mouth steaks.",
    "sweets": "Sweets & tea",
    "sweetsText": "Matcha, wagashi, and kissaten coffee culture.",
    "linkHint": "Jump to a city for local specialities →"
  },
  "attractions": {
    "eyebrow": "See & do",
    "title": "Attractions overview",
    "desc": "Browse by category; city pages list the must-sees in context.",
    "temples": "Temples",
    "shrines": "Shrines",
    "castles": "Castles",
    "mountains": "Mountains",
    "parks": "National parks",
    "museums": "Museums",
    "shopping": "Shopping districts",
    "theme": "Theme parks",
    "anime": "Anime locations",
    "nightlife": "Nightlife"
  },
  "transport": {
    "eyebrow": "Getting around",
    "title": "Transportation guide",
    "desc": "National systems that make multi-city trips effortless.",
    "shinkansen": "Shinkansen",
    "shinkansenText": "High-speed spine linking major cities with legendary punctuality.",
    "jrpass": "JR Pass",
    "jrpassText": "The Japan Rail Pass (and regional JR passes) can save money on multi-city rail, but only if your long-distance legs add up. Seat reservations are free with the pass on many trains—book busy routes. Confirm validity (some Nozomi/Mizuho restrictions apply depending on pass type) on official sites.",
    "ic": "IC cards",
    "icText": "IC cards (Suica, Pasmo, ICOCA, and others) work across most urban rail, buses, and many shops. Buy/top up at stations. Welcome Suica and similar tourist options may be available—check current airport/station offers.",
    "metro": "Metro & local rail",
    "metroText": "Dense urban networks with English apps and clear station codes.",
    "bus": "Buses",
    "busText": "Highway buses for budget intercity hops; city buses fill rail gaps.",
    "flights": "Domestic flights",
    "flightsText": "Best for Hokkaido, Kyushu, and Okinawa when time is tight.",
    "ferries": "Ferries",
    "ferriesText": "Island hops and scenic routes — especially Seto Inland Sea and Okinawa."
  },
  "budget": {
    "eyebrow": "Plan costs",
    "title": "Budget planner",
    "desc": "Estimate trip cost in yen, then convert with live rates.",
    "days": "Number of days",
    "accommodation": "Accommodation",
    "hostel": "Hostel / capsule",
    "business": "Business hotel",
    "mid": "Mid-range hotel",
    "luxury": "Luxury / ryokan",
    "transport": "Daily transport style",
    "local": "Local transit only",
    "jrpass": "Rail-heavy / JR Pass style",
    "private": "Taxis & tours",
    "food": "Food budget",
    "foodBudget": "Budget eats",
    "foodMid": "Mix of restaurants",
    "foodGourmet": "Gourmet focused",
    "attractions": "Attractions",
    "attrLight": "Light sightseeing",
    "attrStandard": "Standard pace",
    "attrHeavy": "Ticket-heavy days",
    "currency": "Display currency",
    "total": "Estimated total",
    "lodging": "Lodging",
    "transportLine": "Transport",
    "meals": "Meals",
    "sights": "Attractions",
    "misc": "Misc / buffer",
    "perDay": "Per day",
    "ratesLive": "Live rates",
    "ratesCached": "Cached rates",
    "ratesFallback": "Fallback rates"
  },
  "packing": {
    "eyebrow": "Prepare",
    "title": "Packing checklist",
    "desc": "Tap items to check them off — your list is saved in this browser.",
    "reset": "Reset list",
    "checkAll": "Check all",
    "cat": {
      "documents": "Documents",
      "clothing": "Clothing",
      "tech": "Tech",
      "health": "Health",
      "extras": "Extras"
    },
    "item": {
      "passport": "Passport & visa docs",
      "tickets": "Flight / hotel confirmations",
      "jrpass": "JR Pass voucher (if any)",
      "insurance": "Travel insurance",
      "copies": "Digital copies of IDs",
      "layers": "Layered clothing",
      "comfortableShoes": "Comfortable walking shoes",
      "rainJacket": "Compact rain jacket",
      "formalOption": "Smart-casual outfit",
      "socks": "Extra socks",
      "phone": "Phone + charger",
      "adapter": "Type A/B adapter",
      "powerBank": "Power bank",
      "earbuds": "Earbuds",
      "camera": "Camera",
      "meds": "Personal medications",
      "mask": "Masks",
      "sanitizer": "Hand sanitizer",
      "sunscreen": "Sunscreen",
      "motion": "Motion-sickness tablets",
      "cashYen": "Some yen cash",
      "toteBag": "Foldable tote",
      "phrasebook": "Offline phrase pack",
      "umbrella": "Travel umbrella",
      "snacks": "Familiar snacks"
    }
  },
  "seasons": {
    "eyebrow": "When to go",
    "title": "Seasonal guide",
    "desc": "Temperatures respond to your °C / °F preference.",
    "spring": "Spring",
    "summer": "Summer",
    "autumn": "Autumn",
    "winter": "Winter",
    "springText": "Cherry blossoms, mild days, popular festivals. Pack layers and patience for crowds.",
    "summerText": "Festivals, fireworks, beaches in the south. Hot and humid — hydrate and use shade.",
    "autumnText": "Maple leaves, clear skies, ideal hiking. Book foliage hotspots early.",
    "winterText": "Illuminations, onsen steam, powder snow up north. Cold, dry, and photogenic.",
    "clothing": "Clothing",
    "activities": "Activities",
    "springClothes": "Light coat, layers, comfortable shoes",
    "summerClothes": "Breathable fabrics, hat, sunscreen, umbrella",
    "autumnClothes": "Sweater, light jacket, walking layers",
    "winterClothes": "Coat, thermals, waterproof boots (north)",
    "springAct": "Hanami, temple gardens, city walks",
    "summerAct": "Matsuri, islands, alpine escapes",
    "autumnAct": "Koyo viewing, hiking, food trips",
    "winterAct": "Onsen, ski, illuminations"
  },
  "festivals": {
    "eyebrow": "Celebrate",
    "title": "Major festivals",
    "desc": "A sampling of iconic matsuri and seasonal events across the year.",
    "items": [
      {
        "month": "February",
        "name": "Sapporo Snow Festival",
        "text": "Ice and snow sculptures fill Odori Park."
      },
      {
        "month": "March–April",
        "name": "Cherry blossom festivals",
        "text": "Hanami parties nationwide as sakura bloom."
      },
      {
        "month": "May",
        "name": "Sanja Matsuri (Tokyo)",
        "text": "One of Tokyo’s largest portable-shrine festivals in Asakusa."
      },
      {
        "month": "July",
        "name": "Gion Matsuri (Kyoto)",
        "text": "Month-long celebration with grand processions of floats."
      },
      {
        "month": "August",
        "name": "Awa Odori (Tokushima)",
        "text": "Electrifying summer dance festival in Shikoku."
      },
      {
        "month": "August",
        "name": "Obon season",
        "text": "Ancestral remembrance, dances, and homecomings."
      },
      {
        "month": "November",
        "name": "Autumn foliage events",
        "text": "Light-ups at temples and gardens across Honshu."
      },
      {
        "month": "December",
        "name": "Winter illuminations",
        "text": "Cities sparkle with large-scale light displays."
      }
    ]
  },
  "tips": {
    "eyebrow": "Know before you go",
    "title": "Common travel tips",
    "desc": "Nationwide basics — city pages add regional notes.",
    "etiquette": "Etiquette",
    "etiquetteText": "Avoid phone calls on local trains; use vestibules on long-distance trains if needed. Queue at doors and escalators (follow local side). No tipping in restaurants—pay at the register or tablet.",
    "phrases": "Useful phrases",
    "phrasesText": "Arigatou gozaimasu (thank you), Sumimasen (excuse me), Eigo ga wakarimasu ka? (Do you understand English?).",
    "emergency": "Emergency numbers",
    "emergencyText": "Police 110 · Fire/Ambulance 119 · Japan Helpline 0570-000-911",
    "sim": "SIM & eSIM",
    "simText": "Buy eSIM before landing or grab airport SIM/Wi‑Fi counters.",
    "wifi": "Wi‑Fi",
    "wifiText": "Free Wi‑Fi in many stations, convenience stores, and cafés; pocket Wi‑Fi is reliable.",
    "cash": "Cash vs card",
    "cashText": "Cards widely accepted in cities; keep cash for rural spots, shrines, and small eateries.",
    "tipping": "Tipping",
    "tippingText": "Not expected — excellent service is the norm without extra payment.",
    "transit": "Transit etiquette",
    "transitText": "Priority seats, quiet cars where marked, backpacks in front during rush hour."
  },
  "faq": {
    "eyebrow": "Questions",
    "title": "FAQ",
    "desc": "Quick answers for first-time and returning visitors.",
    "q1": "Do I need a JR Pass?",
    "a1": "Buy a Japan Rail Pass only if you will ride enough long-distance JR trains (especially shinkansen) during 7/14/21 days. Tokyo-only or one short hop: use IC cards and point-to-point tickets. Always price your exact legs on official JR / japanrailpass.net pages—pass rules and prices change.",
    "q2": "Is Japan expensive?",
    "a2": "It can be, but convenience-store meals, business hotels, and regional cities keep costs manageable.",
    "q3": "When is cherry blossom season?",
    "a3": "Peak bloom is often late March–early April in Tokyo and Kyoto, earlier in Kyushu/Okinawa and later in Tohoku/Hokkaido. Check JNTO seasonal guides and that year’s cherry-blossom forecast—dates shift yearly.",
    "q4": "Can I drink tap water?",
    "a4": "Yes — tap water is safe across Japan.",
    "q5": "How much cash should I carry?",
    "a5": "Carry some cash on day one (many travelers start around ¥10,000–30,000), then refill at convenience-store ATMs that accept foreign cards (often 7-Eleven, Japan Post). Cards work widely in cities.",
    "q6": "Is English widely spoken?",
    "a6": "Major stations and hotels manage basic English; translation apps help elsewhere.",
    "q7": "Are credit cards accepted?",
    "a7": "Yes in most urban venues; some temples, markets, and rural inns remain cash-preferred.",
    "q8": "What about vegetarian or allergy needs?",
    "a8": "Cities offer more options; learn key allergy phrases and check dashi/bonito in broths."
  },
  "galleryCta": {
    "title": "Photo gallery",
    "desc": "Browse curated travel photography by city, place, and season — full resolution when you open each shot.",
    "button": "Enter the gallery"
  },
  "gallery": {
    "backToGuide": "Back to the guide",
    "eyebrow": "Photo gallery",
    "heading": "Moments from Japan",
    "pageIntro": "Browse by city, season, and category. Grid uses fast thumbs; open a photo for a sharp medium view, then load the original when you want full quality.",
    "searchPlaceholder": "Search name, place, city, date…",
    "sortLocation": "Location",
    "sortCity": "City",
    "sortCategory": "Category",
    "qualityMedium": "Medium",
    "qualityFull": "Full",
    "filterAll": "All",
    "filterCities": "Cities",
    "filterTemples": "Temples",
    "filterShrines": "Shrines",
    "filterNature": "Nature",
    "filterFood": "Food",
    "filterNeon": "Neon / Night",
    "filterTravel": "Travel",
    "filterCulture": "Culture",
    "photoCount": "photos",
    "loadFull": "Load full quality",
    "loadingPhoto": "Loading photo…",
    "managerHint": "Add photos with the local Gallery Manager: double-click Add Photos.command or run python3 tools/gallery_manager.py"
  },
  "funFacts": {
    "eyebrow": "Did you know?",
    "title": "Fun facts",
    "desc": "Refresh for another slice of Japan trivia.",
    "refresh": "Another fact",
    "items": {
      "0": "Japan consists of 14,125 islands, of which 430 are inhabited.",
      "1": "Vending machines sell everything from hot coffee to umbrellas.",
      "2": "Tokyo’s metro system moves millions of riders daily with near-mythic punctuality.",
      "3": "There are over 150,000 convenience stores across Japan.",
      "4": "Mount Fuji is an active volcano last erupting in 1707.",
      "5": "The shinkansen has recorded decades of operation without a fatal crash due to derailment or collision.",
      "6": "KitKat flavors in Japan include wasabi, sake, and regional specialties.",
      "7": "Sumo wrestlers traditionally throw salt to purify the ring.",
      "8": "Capsule hotels originated in Osaka in the late 1970s.",
      "9": "Japan has more than 3,000 onsen hot spring towns and resorts.",
      "10": "The bullet train’s nose designs reduce tunnel boom noise.",
      "11": "Square watermelons exist mainly as ornamental luxury gifts.",
      "12": "Slurping ramen is considered a compliment to the chef.",
      "13": "Manhole covers are often uniquely designed per city.",
      "14": "The word “tsunami” is Japanese for harbor wave.",
      "15": "Deer in Nara bow for crackers — sometimes.",
      "16": "Tokyo was formerly called Edo.",
      "17": "Japan’s railway network includes themed “joy trains.”",
      "18": "Christmas cake is a Japanese holiday tradition even though Christmas is not a national holiday.",
      "19": "Robot restaurants and cafés push hospitality into sci-fi territory.",
      "20": "Shibuya Crossing can see thousands of pedestrians per light cycle.",
      "21": "Origami cranes symbolize peace and healing.",
      "22": "Many temples stamp elaborate goshuin seals in special books.",
      "23": "Washoku, traditional Japanese cuisine, is UNESCO-listed.",
      "24": "Some rural stations are staffed by cats — as honorary stationmasters.",
      "25": "Pachinko parlors create a unique wall of sound and light.",
      "26": "The Imperial Palace grounds occupy prime real estate in central Tokyo.",
      "27": "Autumn leaf forecasts are followed as closely as cherry blossom forecasts.",
      "28": "Fugu (pufferfish) chefs require special licenses.",
      "29": "Japan uses a mix of Western and Japanese calendar eras.",
      "30": "Umbrellas are often left in public stands with surprising trust.",
      "31": "Tatami mats are measured as a traditional room unit.",
      "32": "Night views from Hakodate and Kobe rank among Japan’s “three major nightscapes.”",
      "33": "Matcha was historically reserved for elites and tea masters.",
      "34": "The 7-Eleven egg sandwich has a cult following among travelers.",
      "35": "Some trains feature women-only cars during rush hours.",
      "36": "Hanami picnic culture dates back centuries.",
      "37": "Okinawa has its own languages and cultural roots distinct from mainland Japan.",
      "38": "Gold leaf from Kanazawa adorns sweets, lacquer, and even soft-serve.",
      "39": "Japan’s toilet technology includes heated seats and bidet functions as standard in many places.",
      "40": "Railway bento (ekiben) turn train rides into tasting tours.",
      "41": "The Seto Inland Sea is dotted with art islands like Naoshima.",
      "42": "Sapporo’s snow festival builds massive ice sculptures each February.",
      "43": "Kyoto has thousands of Buddhist temples and Shinto shrines.",
      "44": "Wagyu grading considers marbling, color, and fat quality.",
      "45": "Fireworks festivals (hanabi) light summer riversides nationwide.",
      "46": "Many Japanese hotels provide yukata robes for guests.",
      "47": "The concept of “forest bathing” (shinrin-yoku) began in Japan in the 1980s."
    }
  },

  "tools": {
    "backToGuide": "Back to the guide",
    "eyebrow": "Travel tools",
    "heading": "Plan Japan with <em>clarity</em>",
    "intro": "Budget planner, packing checklist, live currency, world clocks, Japan tax, JR Pass check, rail estimates, and emergency numbers.",
    "currencyLabel": "Live currency converter",
    "currencySub": "Daily rates via frankfurter.dev (JPY-centered).",
    "amount": "Amount",
    "from": "From",
    "to": "To",
    "clockLabel": "World clock",
    "clockSub": "Japan uses one timezone (JST). Compare with home for calls and arrivals.",
    "tzTokyo": "Tokyo",
    "tzOsaka": "Osaka",
    "tzSapporo": "Sapporo",
    "tzNaha": "Naha (Okinawa)",
    "tzShanghai": "Shanghai",
    "tzSeoul": "Seoul",
    "tzSydney": "Sydney",
    "tzLondon": "London",
    "tzNewYork": "New York",
    "tzUtc": "UTC",
    "taxLabel": "Japan consumption tax",
    "taxSub": "Standard rate is typically 10% (some groceries 8%). Tipping is not expected.",
    "taxBill": "Price before tax (¥)",
    "taxRate": "Tax %",
    "taxOnly": "Tax",
    "preTax": "Before tax",
    "noTip": "Tipping is not customary in Japan — excellent service is part of the culture, not the bill.",
    "jrLabel": "JR Pass sense-check",
    "jrSub": "Rough comparison of a tourist rail pass vs long-distance tickets. Always verify official prices.",
    "jrDays": "Trip length (days)",
    "jrLegs": "Long-distance rail legs (approx.)",
    "jrWorthIt": "Pass may pay off",
    "jrMaybeNot": "Tickets may be cheaper",
    "jrSave": "Est. savings",
    "jrDiff": "Est. difference",
    "jrPassEst": "Pass estimate",
    "jrTicketsEst": "Ticket estimate",
    "jrDisclaimer": "Indicative only · confirm on official JR sites",
    "railLabel": "Shinkansen fare estimate",
    "railSub": "Indicative ordinary-car one-way averages for planning.",
    "railRoute": "Route",
    "railTrips": "Number of one-ways",
    "railOneWay": "Approx. one-way",
    "railDisclaimer": "Not a booking tool · fares vary by train/type/seat",
    "emergencyLabel": "Useful numbers in Japan",
    "emergencySub": "Save these before you need them.",
    "emPolice": "Police",
    "emFire": "Fire & ambulance",
    "emCoast": "Coast Guard",
    "emHelpline": "Japan Helpline (English-friendly)",
    "emMedical": "Non-emergency medical advice (many areas)",
    "emNote": "Also save your country’s embassy or consulate in Japan."
  },
  "legal": {
    "privacyLink": "Privacy Policy",
    "termsLink": "Terms of Use",
    "privacyTitle": "Privacy Policy",
    "termsTitle": "Terms of Use"
  },


  "plan": {
    "eyebrow": "How to use this guide",
    "title": "Four steps to a solid trip",
    "desc": "Work top to bottom, then open each city page. Confirm fares and entry rules on official sites before you book.",
    "step1Title": "Pick cities",
    "step1Text": "Compare 14 destinations with distances from Tokyo, seasons, and suggested stay length.",
    "step2Title": "Shape a route",
    "step2Text": "Use 5–14 day arcs or theme trips (food, nature, sakura) as a starting skeleton.",
    "step3Title": "Solve transport",
    "step3Text": "IC cards, shinkansen basics, and when a JR Pass or regional pass may make sense.",
    "step4Title": "Run the numbers",
    "step4Text": "Budget, packing, currency, tax, rail estimates, and emergency numbers in Travel Tools.",
    "trustNote": "Fares, pass rules, and entry requirements change. Confirm with JR, airlines, and japan.travel (JNTO) before booking."
  },
  "official": {
    "eyebrow": "Official & practical",
    "title": "Resources you can rely on",
    "desc": "This site helps you plan. For visas, safety, rail passes, and destination depth, use JNTO and operators.",
    "jnto": "Travel Japan (JNTO)",
    "jntoDesc": "Official destination guides, itineraries, and planning hub",
    "jr": "Japan Rail Pass guide (JNTO)",
    "jrDesc": "Coverage, reservations, and when regional passes may fit better",
    "train": "Trains & buses (JNTO)",
    "trainDesc": "How to ride, tickets, IC cards, and manners",
    "hotline": "Japan Visitor Hotline",
    "hotlineDesc": "Multilingual visitor support — save before you travel",
    "safety": "Safety Tips",
    "safetyDesc": "Emergency and disaster guidance for travelers",
    "jrOfficial": "japanrailpass.net",
    "jrOfficialDesc": "Official JR Pass product rules and purchase info"
  },

  "footer": {
    "aboutBlurb": "A premium, offline-friendly planning companion for multi-city Japan trips."
  },
  "cityPage": {
    "back": "All destinations",
    "distanceNote": "Approximate distance from Tokyo Station",
    "stayValue": "{n} days",
    "budgetDay": "per day (mid-range excl. long-distance rail)",
    "weatherAvg": "Typical daytime range",
    "gettingThere": "Getting there",
    "moreInGallery": "Photos coming in the gallery"
  },
  "cityContent": {
    "tokyo": {
      "tagline": "Neon capital of endless discovery",
      "overview": "Tokyo is a constellation of cities within a city — historic Asakusa, youth-driven Shibuya, refined Ginza, and green retreats like Meiji Jingu.",
      "bestTime": "March–May & October–November; summer festivals are vibrant but humid.",
      "stay": "4–5",
      "budget": "¥12,000–25,000",
      "weather": "Humid summers, mild winters, beautiful spring and autumn.",
      "gettingThere": "Narita (NRT) and Haneda (HND) airports; extensive JR, metro, and private rail.",
      "food": [
        {
          "e": "🍣",
          "n": "Edomae sushi",
          "d": "Classic Tokyo-style nigiri at counters from affordable to legendary."
        },
        {
          "e": "🍜",
          "n": "Tokyo ramen",
          "d": "Shoyu-forward bowls and creative shop scenes in Ogikubo and beyond."
        },
        {
          "e": "🍢",
          "n": "Yakitori alleys",
          "d": "Smoke-scented side streets under railway tracks."
        },
        {
          "e": "🍰",
          "n": "Depachika sweets",
          "d": "Department-store basements stacked with cakes and gifts."
        }
      ],
      "attractions": [
        {
          "c": "temples",
          "n": "Sensō-ji",
          "d": "Tokyo’s iconic temple approach in Asakusa."
        },
        {
          "c": "shrines",
          "n": "Meiji Jingu",
          "d": "Forest shrine amid Harajuku energy."
        },
        {
          "c": "museums",
          "n": "teamLab / modern museums",
          "d": "Digital art and world-class collections."
        },
        {
          "c": "shopping",
          "n": "Ginza & Shinjuku",
          "d": "Luxury flagships to mega electronics."
        },
        {
          "c": "anime",
          "n": "Akihabara",
          "d": "Otaku culture, arcades, and character shops."
        },
        {
          "c": "nightlife",
          "n": "Golden Gai & rooftop bars",
          "d": "Tiny bars and skyline cocktails."
        }
      ],
      "transportLocal": "Get a Suica/Pasmo. Prefer metro/JR over taxis in traffic. Walk neighborhoods — distances deceive on the map.",
      "tips": [
        "Buy museum and teamLab tickets online early.",
        "Use coin lockers at major stations when hotel check-in is late.",
        "Sunday pedestrian zones in Ginza are great for relaxed photos.",
        "Convenience stores solve almost any forgotten essential."
      ],
      "highlights": [
        "Shibuya scramble",
        "Asakusa & Skytree views",
        "Day trips to Nikko/Hakone/Yokohama"
      ]
    },
    "kyoto": {
      "tagline": "Classical heart of Japan",
      "overview": "Japan’s cultural capital: thousands of temples and shrines, geisha districts, zen gardens, and kaiseki cuisine beside the Kamogawa.",
      "bestTime": "Late March–April (sakura) and November (momiji); weekdays beat weekends.",
      "stay": "3–4",
      "budget": "¥11,000–22,000",
      "weather": "Hot summers, chilly winters, magical spring and autumn light.",
      "gettingThere": "Shinkansen to Kyoto Station (~2h15 from Tokyo); buses and local rail within the basin.",
      "food": [
        {
          "e": "🍲",
          "n": "Kaiseki",
          "d": "Seasonal multi-course dining rooted in tea aesthetics."
        },
        {
          "e": "🍵",
          "n": "Matcha & wagashi",
          "d": "Uji tea culture and delicate sweets."
        },
        {
          "e": "🥣",
          "n": "Yudofu",
          "d": "Simple simmered tofu in temple neighborhoods."
        },
        {
          "e": "🍜",
          "n": "Kyoto ramen",
          "d": "Lighter shoyu and chicken-based broths."
        }
      ],
      "attractions": [
        {
          "c": "shrines",
          "n": "Fushimi Inari",
          "d": "Thousands of vermilion torii gates."
        },
        {
          "c": "temples",
          "n": "Kinkaku-ji & Kiyomizu-dera",
          "d": "Golden pavilion and hillside views."
        },
        {
          "c": "shopping",
          "n": "Nishiki Market",
          "d": "Kyoto’s kitchen alley."
        },
        {
          "c": "parks",
          "n": "Arashiyama",
          "d": "Bamboo grove and river basin."
        }
      ],
      "transportLocal": "Buses are useful but crowded; subway + walking often better. Consider a day bus pass only if hopping many stops.",
      "tips": [
        "Visit iconic spots at opening time.",
        "Dress modestly for temples; quiet voices in sacred spaces.",
        "Gion alleys are for respectful strolling — no blocking maiko for photos.",
        "Reserve popular restaurants days ahead."
      ],
      "highlights": [
        "Fushimi Inari hike",
        "Tea in Uji",
        "Night illuminations in peak seasons"
      ]
    },
    "osaka": {
      "tagline": "Japan’s kitchen and comedy capital",
      "overview": "Friendly, food-obsessed Osaka pairs castle history with neon Dotonbori, underground malls, and unforgettable street snacks.",
      "bestTime": "Spring and autumn; summer is lively with festivals.",
      "stay": "2–3",
      "budget": "¥10,000–20,000",
      "weather": "Similar to Kyoto basin — hot summers, mild winters.",
      "gettingThere": "Shin-Osaka shinkansen; KIX airport via Haruka or Nankai lines.",
      "food": [
        {
          "e": "🐙",
          "n": "Takoyaki",
          "d": "Octopus balls — crispy outside, molten inside."
        },
        {
          "e": "🥞",
          "n": "Okonomiyaki",
          "d": "Savory pancakes with local flair."
        },
        {
          "e": "🍜",
          "n": "Osaka ramen & kushikatsu",
          "d": "Fried skewers — no double-dipping!"
        },
        {
          "e": "🐡",
          "n": "Kappo dining",
          "d": "Counter cuisine beyond street food."
        }
      ],
      "attractions": [
        {
          "c": "castles",
          "n": "Osaka Castle",
          "d": "Landmark keep and parkland."
        },
        {
          "c": "nightlife",
          "n": "Dotonbori",
          "d": "Neon signs and canal energy."
        },
        {
          "c": "theme",
          "n": "Universal Studios Japan",
          "d": "Major theme park draws."
        },
        {
          "c": "shopping",
          "n": "Shinsaibashi",
          "d": "Retail arcades and boutiques."
        }
      ],
      "transportLocal": "Osaka Metro + JR Loop Line cover most sights. IC cards work everywhere.",
      "tips": [
        "Come hungry — itinerary around meals works best.",
        "USJ tickets sell out on holidays.",
        "Shinsekai offers retro vibes and budget eats.",
        "Easy base for day trips to Nara, Kobe, Kyoto."
      ],
      "highlights": [
        "Dotonbori night",
        "Castle park",
        "Food alley hopping"
      ]
    },
    "nara": {
      "tagline": "Ancient capital and sacred deer",
      "overview": "Japan’s first permanent capital charms with UNESCO temples, the Great Buddha, and free-roaming deer in Nara Park.",
      "bestTime": "Spring and autumn; early morning for softer light and fewer buses.",
      "stay": "1–2",
      "budget": "¥9,000–16,000",
      "weather": "Pleasant spring/autumn; hot open parkland in summer.",
      "gettingThere": "Express from Kyoto (~45m) or Osaka (~40m); very doable as a day trip.",
      "food": [
        {
          "e": "🍪",
          "n": "Shika senbei culture",
          "d": "Deer crackers (for deer!) and sweet souvenirs."
        },
        {
          "e": "🍜",
          "n": "Miwa somen",
          "d": "Delicate regional noodles."
        },
        {
          "e": "🍠",
          "n": "Kaki no ha zushi",
          "d": "Persimmon-leaf pressed sushi."
        },
        {
          "e": "🍵",
          "n": "Nakatanidou mochi",
          "d": "Famous high-speed mochi pounding shows."
        }
      ],
      "attractions": [
        {
          "c": "temples",
          "n": "Tōdai-ji",
          "d": "Home of the Great Buddha."
        },
        {
          "c": "shrines",
          "n": "Kasuga Taisha",
          "d": "Lantern-lined shrine paths."
        },
        {
          "c": "parks",
          "n": "Nara Park",
          "d": "Deer, grass, and temple approaches."
        },
        {
          "c": "museums",
          "n": "Nara National Museum",
          "d": "Buddhist art treasures."
        }
      ],
      "transportLocal": "Walkable core around Nara Park; buses for outlying temples like Horyu-ji.",
      "tips": [
        "Bow politely; hide snacks — deer can be assertive.",
        "Combine with Kyoto if short on nights.",
        "Climb Nigatsu-do for elevated views.",
        "Try early/late to avoid tour-bus peaks."
      ],
      "highlights": [
        "Great Buddha hall",
        "Kasuga lanterns",
        "Parkland walks"
      ]
    },
    "hiroshima": {
      "tagline": "Peace, resilience, and island gates",
      "overview": "A modern city shaped by remembrance and renewal — the Peace Memorial Park, vibrant food scene, and ferry access to Miyajima’s floating torii.",
      "bestTime": "March–May & October–November; clear days for island photos.",
      "stay": "2",
      "budget": "¥10,000–18,000",
      "weather": "Mild Seto climate; rainy season in early summer.",
      "gettingThere": "Shinkansen to Hiroshima Station; streetcars across the city; ferry to Miyajima.",
      "food": [
        {
          "e": "🥞",
          "n": "Hiroshima okonomiyaki",
          "d": "Layered style with noodles — different from Osaka."
        },
        {
          "e": "🦪",
          "n": "Oysters",
          "d": "Seto Inland Sea specialties in season."
        },
        {
          "e": "🍜",
          "n": "Onomichi ramen nearby",
          "d": "Soy-based bowls on day trips."
        },
        {
          "e": "🍁",
          "n": "Momiji manju",
          "d": "Maple-leaf shaped cakes from Miyajima."
        }
      ],
      "attractions": [
        {
          "c": "museums",
          "n": "Peace Memorial Museum",
          "d": "Essential, sobering history."
        },
        {
          "c": "shrines",
          "n": "Itsukushima on Miyajima",
          "d": "Iconic “floating” torii."
        },
        {
          "c": "castles",
          "n": "Hiroshima Castle",
          "d": "Reconstruction with local history exhibits."
        },
        {
          "c": "parks",
          "n": "Shukkeien",
          "d": "Compact historic garden."
        }
      ],
      "transportLocal": "Trams are charming and practical. Day luggage lockers at the station help for Miyajima.",
      "tips": [
        "Allow quiet time at the Peace Park.",
        "Check torii tides if you want the classic “floating” look.",
        "Try a food tour downtown after memorial visits.",
        "Consider an art-island detour if extending."
      ],
      "highlights": [
        "Peace Park",
        "Miyajima",
        "Okonomiyaki dinner"
      ]
    },
    "yokohama": {
      "tagline": "Harbor city next door to Tokyo",
      "overview": "Japan’s second city offers waterfront parks, the world’s largest Chinatown of its kind, cup-noodle creativity, and easy access from Tokyo.",
      "bestTime": "Year-round; evenings for bay illuminations.",
      "stay": "1–2",
      "budget": "¥11,000–20,000",
      "weather": "Bay breezes moderate summer heat slightly versus inland Tokyo.",
      "gettingThere": "30–40 minutes from central Tokyo by JR or Minatomirai Line.",
      "food": [
        {
          "e": "🥟",
          "n": "Chinatown bites",
          "d": "Bao, noodles, and shumai in colorful streets."
        },
        {
          "e": "🍜",
          "n": "Ie-kei ramen",
          "d": "Yokohama-born rich pork-soy style."
        },
        {
          "e": "☕",
          "n": "Harbor cafés",
          "d": "Waterfront coffee with skyline views."
        },
        {
          "e": "🍰",
          "n": "Western confectionery heritage",
          "d": "Port city pastry history."
        }
      ],
      "attractions": [
        {
          "c": "museums",
          "n": "Cup Noodles Museum",
          "d": "Design your own noodles."
        },
        {
          "c": "shopping",
          "n": "Minato Mirai",
          "d": "Modern waterfront complex."
        },
        {
          "c": "parks",
          "n": "Yamashita Park",
          "d": "Classic harbor promenade."
        },
        {
          "c": "nightlife",
          "n": "Bay Quarter evenings",
          "d": "Lights on the water."
        }
      ],
      "transportLocal": "Minatomirai Line + walking covers most tourist areas.",
      "tips": [
        "Perfect half-day or overnight from Tokyo.",
        "Combine Red Brick Warehouse with sunset photos.",
        "Sankeien Garden is worth the short transit hop.",
        "Great rainy-day museum city."
      ],
      "highlights": [
        "Harbor skyline",
        "Chinatown",
        "Cosmo Clock views"
      ]
    },
    "hakone": {
      "tagline": "Onsen country with Fuji views",
      "overview": "A classic mountain escape: ropeways over sulfurous valleys, Lake Ashi pirateships, open-air museums, and ryokan baths.",
      "bestTime": "Clear winter days for Fuji; autumn colors are superb.",
      "stay": "1–2",
      "budget": "¥15,000–35,000",
      "weather": "Cooler than Tokyo; pack layers even in summer evenings.",
      "gettingThere": "Romancecar or shinkansen+bus from Tokyo (~90m). Hakone Free Pass simplifies loops.",
      "food": [
        {
          "e": "🍜",
          "n": "Yuba cuisine",
          "d": "Tofu skin dishes in mountain inns."
        },
        {
          "e": "🥚",
          "n": "Kuro-tamago",
          "d": "Black eggs cooked in sulfur springs."
        },
        {
          "e": "🍲",
          "n": "Kaiseki at ryokan",
          "d": "Multi-course dinners with room stays."
        },
        {
          "e": "🍰",
          "n": "Onsen manju",
          "d": "Warm steamed buns as souvenirs."
        }
      ],
      "attractions": [
        {
          "c": "mountains",
          "n": "Owakudani",
          "d": "Volcanic valley via ropeway."
        },
        {
          "c": "parks",
          "n": "Lake Ashi",
          "d": "Torii views toward Fuji on clear days."
        },
        {
          "c": "museums",
          "n": "Open-Air Museum",
          "d": "Sculptures in mountain air."
        },
        {
          "c": "shrines",
          "n": "Hakone Jinja",
          "d": "Lakeside shrine path."
        }
      ],
      "transportLocal": "Loop with train, cable car, ropeway, boat, and bus. Luggage forward service is popular.",
      "tips": [
        "Check volcanic activity updates for Owakudani.",
        "Fuji views are weather-dependent — stay flexible.",
        "Private onsen rooms worth booking in advance.",
        "Day trip is possible; overnight is better."
      ],
      "highlights": [
        "Ropeway loop",
        "Ryokan onsen",
        "Lake Ashi"
      ]
    },
    "nikko": {
      "tagline": "Sacred shrines in cedar forests",
      "overview": "Ornate Tokugawa shrines, thundering waterfalls, and highland lakes make Nikko a spiritual and scenic northbound escape.",
      "bestTime": "Autumn foliage is legendary; spring greens are lush.",
      "stay": "1–2",
      "budget": "¥10,000–18,000",
      "weather": "Cooler mountain climate; winters can be snowy.",
      "gettingThere": "Limited Express from Asakusa (~2h) or JR routes from Tokyo.",
      "food": [
        {
          "e": "🍜",
          "n": "Yuba soba",
          "d": "Local tofu-skin and buckwheat dishes."
        },
        {
          "e": "🔥",
          "n": "Kanjiyaki / miso classics",
          "d": "Hearty mountain flavors."
        },
        {
          "e": "Trout",
          "n": "River fish",
          "d": "Fresh highland aquaculture plates."
        },
        {
          "e": "🍡",
          "n": "Sweet street snacks",
          "d": "Along the approach roads."
        }
      ],
      "attractions": [
        {
          "c": "shrines",
          "n": "Toshogu",
          "d": "Lavish mausoleum complex."
        },
        {
          "c": "mountains",
          "n": "Kegon Falls",
          "d": "Dramatic drop from Lake Chuzenji."
        },
        {
          "c": "parks",
          "n": "Oku-Nikko",
          "d": "Highlands, marshlands, hiking."
        },
        {
          "c": "temples",
          "n": "Rinno-ji",
          "d": "Important temple within the sacred precinct."
        }
      ],
      "transportLocal": "Buses essential for Chuzenji and highlands; World Heritage area is walkable.",
      "tips": [
        "Start early for Toshogu crowds.",
        "Wear grippy shoes after rain on stone paths.",
        "Combine shrines morning + nature afternoon.",
        "Autumn weekends book out — plan ahead."
      ],
      "highlights": [
        "Toshogu carvings",
        "Kegon Falls",
        "Cedar avenues"
      ]
    },
    "kanazawa": {
      "tagline": "Garden city of craft and gold",
      "overview": "Spared wartime destruction, Kanazawa preserves samurai and geisha districts, Kenrokuen garden, fresh seafood, and gold-leaf craft.",
      "bestTime": "Spring and autumn; winter brings atmospheric snow.",
      "stay": "2",
      "budget": "¥11,000–20,000",
      "weather": "Sea-of-Japan side — snowier winters than Tokyo.",
      "gettingThere": "Hokuriku Shinkansen from Tokyo (~2.5h).",
      "food": [
        {
          "e": "🍣",
          "n": "Omicho market sushi",
          "d": "Morning seafood legends."
        },
        {
          "e": "🥇",
          "n": "Gold-leaf soft serve",
          "d": "Edible sparkle souvenirs."
        },
        {
          "e": "🍣",
          "n": "Jibu-ni & kaga cuisine",
          "d": "Regional duck stew and refined Kaga dishes."
        },
        {
          "e": "🍵",
          "n": "Tea house sweets",
          "d": "In Higashi Chaya district."
        }
      ],
      "attractions": [
        {
          "c": "parks",
          "n": "Kenrokuen",
          "d": "One of Japan’s three great gardens."
        },
        {
          "c": "castles",
          "n": "Kanazawa Castle Park",
          "d": "Adjacent historic grounds."
        },
        {
          "c": "shopping",
          "n": "Higashi Chaya",
          "d": "Teahouse district streets."
        },
        {
          "c": "museums",
          "n": "21st Century Museum",
          "d": "Contemporary art icon."
        }
      ],
      "transportLocal": "Loop buses link major sights; old districts are best on foot.",
      "tips": [
        "Buy garden tickets combos if available.",
        "Morning market visits beat tour groups.",
        "Great stop between Tokyo and Kyoto on rail loops.",
        "Try a gold-leaf craft workshop."
      ],
      "highlights": [
        "Kenrokuen",
        "Chaya districts",
        "Market sushi"
      ]
    },
    "sapporo": {
      "tagline": "Northern capital of beer and snow",
      "overview": "Hokkaido’s largest city is a base for seafood markets, beer culture, winter festivals, ski day trips, and wide orderly boulevards.",
      "bestTime": "February for Snow Festival; summer for mild escapes from Honshu heat.",
      "stay": "2–3",
      "budget": "¥11,000–21,000",
      "weather": "Snowy winters, fresh summers, gorgeous autumn.",
      "gettingThere": "Flights to New Chitose; limited long rail from Tokyo (overnight or long day).",
      "food": [
        {
          "e": "🦀",
          "n": "Seafood bowls",
          "d": "Crab, uni, and roe rice bowls."
        },
        {
          "e": "🍜",
          "n": "Sapporo miso ramen",
          "d": "Rich, warming northern style."
        },
        {
          "e": "🍺",
          "n": "Beer hall classics",
          "d": "Sapporo beer culture and jingisukan lamb."
        },
        {
          "e": "🧀",
          "n": "Dairy & sweets",
          "d": "Hokkaido milk soft-serve and chocolates."
        }
      ],
      "attractions": [
        {
          "c": "parks",
          "n": "Odori Park",
          "d": "Festival spine of the city."
        },
        {
          "c": "museums",
          "n": "Beer Museum",
          "d": "Brewing heritage tastings."
        },
        {
          "c": "mountains",
          "n": "Moinayama & nearby peaks",
          "d": "Night views and ski access."
        },
        {
          "c": "shopping",
          "n": "Tanukikoji",
          "d": "Covered shopping arcade."
        }
      ],
      "transportLocal": "Subway is simple (3 lines). Winter sidewalks can be icy — boots help.",
      "tips": [
        "Book Snow Festival lodging far ahead.",
        "Day trip to Otaru canals if time.",
        "Try a soup curry for local comfort food.",
        "Domestic flight often beats full rail time."
      ],
      "highlights": [
        "Snow Festival",
        "Market breakfast",
        "Miso ramen"
      ]
    },
    "fukuoka": {
      "tagline": "Kyushu’s friendly gateway",
      "overview": "A compact, food-loving city famous for outdoor yatai stalls, tonkotsu ramen, beaches nearby, and easy access across Kyushu.",
      "bestTime": "Spring and autumn; summer for coastal days.",
      "stay": "2–3",
      "budget": "¥9,000–18,000",
      "weather": "Generally milder winters; humid summers.",
      "gettingThere": "Hakata Station (shinkansen) and FUK airport close to downtown.",
      "food": [
        {
          "e": "🍜",
          "n": "Hakata tonkotsu ramen",
          "d": "Creamy pork-bone broth, thin noodles, kaedama refills."
        },
        {
          "e": "🍢",
          "n": "Yatai stalls",
          "d": "Open-air evening food carts (rules vary by season)."
        },
        {
          "e": "🐟",
          "n": "Mentaiko",
          "d": "Spicy cod roe specialty."
        },
        {
          "e": "🥟",
          "n": "Gyoza & motsunabe",
          "d": "Local comfort hotpots and dumplings."
        }
      ],
      "attractions": [
        {
          "c": "shrines",
          "n": "Kushida Shrine",
          "d": "Hakozaki and festival heritage."
        },
        {
          "c": "temples",
          "n": "Dazaifu Tenmangu day trip",
          "d": "Scholar shrine beyond the city."
        },
        {
          "c": "shopping",
          "n": "Canal City & Tenjin",
          "d": "Retail and urban energy."
        },
        {
          "c": "parks",
          "n": "Ohori Park",
          "d": "Lake walks near downtown."
        }
      ],
      "transportLocal": "Subway + buses; many hotels walkable to Hakata/Tenjin.",
      "tips": [
        "Queue early for famous ramen shops.",
        "Yatai etiquette: order drinks, share tables politely.",
        "Great base for Kyushu rail adventures.",
        "Day trip to Nanzoin’s giant reclining Buddha."
      ],
      "highlights": [
        "Yatai night",
        "Tonkotsu lunch",
        "Dazaifu side trip"
      ]
    },
    "kobe": {
      "tagline": "Port luxury between mountains and sea",
      "overview": "Elegant harbor city known for wagyu beef, jazz history, Kitano foreign residences, and night views from the Ropeway.",
      "bestTime": "Spring and autumn; December illuminations are famous.",
      "stay": "1–2",
      "budget": "¥12,000–30,000",
      "weather": "Seto-side mild climate; mountain winds possible.",
      "gettingThere": "30 minutes from Osaka; shinkansen via Shin-Kobe.",
      "food": [
        {
          "e": "🥩",
          "n": "Kobe beef",
          "d": "Splurge steaks and teppanyaki."
        },
        {
          "e": "🍞",
          "n": "Bakery culture",
          "d": "Famous breads and sweets."
        },
        {
          "e": "🍷",
          "n": "Nada sake district",
          "d": "Brewery visits nearby."
        },
        {
          "e": "🍰",
          "n": "Harbor desserts",
          "d": "Western-influenced cafés."
        }
      ],
      "attractions": [
        {
          "c": "mountains",
          "n": "Rokko / Shiawase no Mura views",
          "d": "Nightscape cable car options."
        },
        {
          "c": "museums",
          "n": "Kitano Ijinkan",
          "d": "Historic foreign houses."
        },
        {
          "c": "shopping",
          "n": "Harborland",
          "d": "Waterfront retail."
        },
        {
          "c": "parks",
          "n": "Meriken Park",
          "d": "Earthquake memorial and port art."
        }
      ],
      "transportLocal": "JR, Hankyu, Hanshin lines; compact sightseeing cores.",
      "tips": [
        "Book beef restaurants ahead for dinner.",
        "Combine with Osaka or Himeji day.",
        "Check ropeway hours for night views.",
        "Walk Kitano in the morning light."
      ],
      "highlights": [
        "Wagyu dinner",
        "Harborland",
        "Kitano slopes"
      ]
    },
    "nagasaki": {
      "tagline": "Hills, harbors, and layered history",
      "overview": "A port shaped by Dutch, Chinese, and Japanese exchange — hillside trams, fusion food, peace sites, and photogenic twilight streets.",
      "bestTime": "Spring and autumn; summer for harbor festivals.",
      "stay": "2",
      "budget": "¥10,000–18,000",
      "weather": "Mild winters; humid rainy summers.",
      "gettingThere": "Rail via Hakata or flights; limited express Kamome services.",
      "food": [
        {
          "e": "🍜",
          "n": "Champon & sara udon",
          "d": "Nagasaki noodle icons."
        },
        {
          "e": "🍰",
          "n": "Castella cake",
          "d": "Portuguese-influenced sponge."
        },
        {
          "e": "🍲",
          "n": "Shippoku cuisine",
          "d": "Fusion banquet styles."
        },
        {
          "e": "🐟",
          "n": "Harbor seafood",
          "d": "Fresh catches near the port."
        }
      ],
      "attractions": [
        {
          "c": "museums",
          "n": "Peace Park & Atomic Bomb Museum",
          "d": "Essential historical context."
        },
        {
          "c": "shopping",
          "n": "Dejima & Chinatown",
          "d": "Historic trade quarters."
        },
        {
          "c": "theme",
          "n": "Glover Garden",
          "d": "Hillside foreign residences and views."
        },
        {
          "c": "nightlife",
          "n": "Harbor night illuminations",
          "d": "Meganejo and waterfront lights (seasonal)."
        }
      ],
      "transportLocal": "Trams are the classic way up and down the slopes; comfortable shoes required.",
      "tips": [
        "Pace memorial sites thoughtfully.",
        "Try castella tasting sets as souvenirs.",
        "Evenings on the slopes are atmospheric.",
        "Combine with Unzen or Huis Ten Bosch if extending."
      ],
      "highlights": [
        "Glover Garden",
        "Peace sites",
        "Champon lunch"
      ]
    },
    "okinawa": {
      "tagline": "Subtropical islands of turquoise water",
      "overview": "A different Japan: Ryukyu heritage, American influences, coral seas, island time, and cuisine built on pork, seaweed, and sunshine.",
      "bestTime": "April–June & October–November; summer is beach peak and typhoon-aware.",
      "stay": "4–7",
      "budget": "¥11,000–22,000",
      "weather": "Warm most of the year; typhoon season roughly July–September.",
      "gettingThere": "Flights to Naha (OKA); ferries and short flights to outer islands.",
      "food": [
        {
          "e": "🍜",
          "n": "Okinawa soba",
          "d": "Wheat noodles in pork broth — not buckwheat."
        },
        {
          "e": "🐷",
          "n": "Rafute & taco rice",
          "d": "Slow pork and local fusion plates."
        },
        {
          "e": "🧃",
          "n": "Sata andagi & awamori",
          "d": "Fried doughnuts and island spirit."
        },
        {
          "e": "🥭",
          "n": "Tropical fruit",
          "d": "Pineapple, mango, passionfruit seasons."
        }
      ],
      "attractions": [
        {
          "c": "castles",
          "n": "Shuri Castle area",
          "d": "Ryukyu kingdom heritage (check rebuild status)."
        },
        {
          "c": "parks",
          "n": "Kerama / blue beaches",
          "d": "World-class snorkeling waters."
        },
        {
          "c": "museums",
          "n": "Okinawa Prefectural Museum",
          "d": "Culture and nature context."
        },
        {
          "c": "nightlife",
          "n": "Kokusai-dori evenings",
          "d": "Souvenirs, live houses, people-watching."
        }
      ],
      "transportLocal": "Rental car is ideal outside Naha. Buses exist but are slower. IC cards limited versus mainland.",
      "tips": [
        "Sun protection is non-negotiable.",
        "Respect coral — reef-safe sunscreen.",
        "Island hopping needs buffer days for weather.",
        "Try a traditional minshuku stay."
      ],
      "highlights": [
        "Beach day",
        "Shuri culture",
        "Island soba"
      ]
    }
  }
},
    ja: {
  "meta": {
    "siteName": "日本旅行ガイド",
    "tagline": "列島をめぐる上質な旅"
  },
  "nav": {
    "home": "ホーム",
    "about": "日本について",
    "map": "地図",
    "destinations": "都市",
    "routes": "ルート",
    "food": "グルメ",
    "attractions": "観光",
    "transport": "交通",
    "budget": "予算",
    "packing": "荷物",
    "seasons": "季節",
    "festivals": "祭り",
    "tips": "ヒント",
    "faq": "FAQ",
    "gallery": "ギャラリー",
    "facts": "豆知識",
    "tools": "ツール",
    "settings": "設定",
    "cities": "都市一覧"
  },
  "common": {
    "learnMore": "詳しく見る",
    "explore": "探索する",
    "viewAll": "すべて見る",
    "fromTokyo": "東京から",
    "bestTime": "ベストシーズン",
    "stay": "滞在目安",
    "budget": "予算目安",
    "weather": "天候",
    "highlights": "ハイライト",
    "overview": "概要",
    "foodGuide": "グルメガイド",
    "attractions": "観光スポット",
    "transport": "移動について",
    "travelTips": "旅のヒント",
    "days": "日間",
    "openGallery": "ギャラリーを開く",
    "backHome": "ホームへ戻る",
    "loading": "読み込み中…",
    "close": "閉じる",
    "previous": "前へ",
    "next": "次へ",
    "search": "検索",
    "allCities": "すべての都市",
    "sortBy": "並び替え",
    "sortOrder": "標準",
    "sortName": "名前",
    "sortTimeAsc": "時期（古い順）",
    "sortTimeDesc": "時期（新しい順）",
    "emptyGalleryTitle": "ギャラリーは空です",
    "emptyGalleryDesc": "ローカルの Gallery Manager（Add Photos.command）で写真を追加すると表示されます。",
    "settingsTitle": "設定",
    "language": "言語",
    "distanceUnit": "距離",
    "tempUnit": "気温",
    "theme": "テーマ",
    "animation": "アニメーション",
    "themeLight": "ライト",
    "themeDark": "ダーク",
    "themeAuto": "自動",
    "motionFull": "フル",
    "motionReduced": "控えめ",
    "motionOff": "オフ",
    "langEn": "English",
    "langJa": "日本語",
    "langZh": "简体中文",
    "backToTop": "ページ上部へ",
    "skipToContent": "本文へスキップ",
    "copyright": "© 2026 Japan Travel Guide. 旅好きのために。",
    "quickLinks": "クイックリンク",
    "resources": "リソース",
    "destinations": "目的地",
    "placeholder": "写真プレースホルダー"
  },
  "hero": {
    "eyebrow": "実用的な日本旅行プランナー",
    "title": "自信を持って日本を計画する",
    "lead": "ルート、都市、交通、予算、ツールまで実用重視。出発前に運賃・パス・入国は公式情報で必ず確認を。",
    "ctaPrimary": "計画を始める",
    "ctaSecondary": "旅行ツールを開く",
    "statCities": "都市",
    "statRoutes": "ルート案",
    "statTips": "旅のヒント",
    "heroImage": "夜明けの富士山"
  },
  "about": {
    "eyebrow": "列島",
    "title": "日本について",
    "desc": "四つの主島、無数の伝統。古の儀式と未来的デザインが共存します。",
    "geoTitle": "地理",
    "geoText": "北海道の雪原から沖縄の珊瑚礁まで、火山・森・巨大都市が連なります。",
    "cultureTitle": "文化",
    "cultureText": "おもてなし、季節感、茶の湯からアニメ文化まで生きる伝統。",
    "historyTitle": "歴史",
    "historyText": "幕府、明治の近代化、戦後の革新が景観に刻まれています。",
    "foodTitle": "食",
    "foodText": "郷土料理と季節の食材。ミシュランから深夜ラーメンまで。",
    "transportTitle": "交通",
    "transportText": "鉄道とICカード、歩きやすい街で個人旅行がしやすい国です。",
    "currencyTitle": "通貨",
    "currencyText": "日本円。都市部ではカードも普及、現金もまだ便利です。",
    "languageTitle": "言語",
    "languageText": "日本語が中心。主要交通では英語表示も増えています。",
    "internetTitle": "インターネット",
    "internetText": "eSIMやポケットWi‑Fi、駅・カフェの無料Wi‑Fi。",
    "safetyTitle": "安全",
    "safetyText": "世界でも安全な旅行先の一つ。一般的な注意は忘れずに。",
    "weatherTitle": "気候",
    "weatherText": "四季がはっきり。春の桜、夏の湿気、秋の紅葉、北の雪。",
    "seasonsTitle": "おすすめ時期",
    "seasonsText": "3–5月と10–11月が人気。肩シーズンは混雑が少なめ。",
    "etiquetteTitle": "マナー",
    "etiquetteText": "車内は静かに、室内は靴を脱ぎ、列を守り、神社では敬意を。",
    "whyTitle": "訪れる理由",
    "whyText": "未来都市と聖地、日常の職人技がこれほど優雅に両立する場所は稀です。",
    "photo1": "京都の伝統的な町並み",
    "photo2": "ホームの新幹線",
    "photo3": "季節の会席料理"
  },
  "map": {
    "eyebrow": "ナビ",
    "title": "インタラクティブマップ",
    "desc": "都市マーカーはおおよその緯度経度に配置。ピンまたはリストから開けます。",
    "panelTitle": "都市へジャンプ",
    "panelHint": "位置は実際の地理に対応。ホバーで強調、クリックで都市ページへ。"
  },
  "destinations": {
    "eyebrow": "14都市",
    "title": "目的地一覧",
    "desc": "東京からの距離と気温は設定の単位に連動します。"
  },
  "cities": {
    "tokyo": {
      "name": "東京",
      "blurb": "食とファッション、無限の街が広がる首都。"
    },
    "kyoto": {
      "name": "京都",
      "blurb": "寺院と茶屋、古典日本の中心地。"
    },
    "osaka": {
      "name": "大阪",
      "blurb": "日本の台所。屋台グルメと活気。"
    },
    "nara": {
      "name": "奈良",
      "blurb": "古都と鹿、大仏の静けさ。"
    },
    "hiroshima": {
      "name": "広島",
      "blurb": "平和の祈り、お好み焼き、宮島への玄関。"
    },
    "yokohama": {
      "name": "横浜",
      "blurb": "港のスカイラインと中華街。"
    },
    "hakone": {
      "name": "箱根",
      "blurb": "温泉と湖、富士の眺望。"
    },
    "nikko": {
      "name": "日光",
      "blurb": "森に抱かれた華麗な社寺。"
    },
    "kanazawa": {
      "name": "金沢",
      "blurb": "庭園と金箔、武家屋敷。"
    },
    "sapporo": {
      "name": "札幌",
      "blurb": "ビールと雪まつり、海の幸の北の都。"
    },
    "fukuoka": {
      "name": "福岡",
      "blurb": "屋台と海が近い九州の玄関。"
    },
    "kobe": {
      "name": "神戸",
      "blurb": "港町の気品と和牛、山と海。"
    },
    "nagasaki": {
      "name": "長崎",
      "blurb": "歴史の重層と丘の街並み。"
    },
    "okinawa": {
      "name": "沖縄",
      "blurb": "亜熱帯の島々と碧い海。"
    }
  },
  "routes": {
    "eyebrow": "行程",
    "title": "おすすめルート",
    "desc": "短期から長期、テーマ別のモデルコース。",
    "d5": "5日間",
    "d7": "7日間",
    "d10": "10日間",
    "d14": "14日間",
    "sakura": "桜",
    "autumn": "紅葉",
    "food": "美食",
    "anime": "アニメ",
    "nature": "自然",
    "luxury": "ラグジュアリー",
    "budget": "予算重視",
    "day": "日目",
    "content": {
      "d5": [
        "東京の街歩きと夜景。",
        "日光または横浜へ日帰り。",
        "新幹線で京都へ。",
        "伏見・嵐山・祇園。",
        "大阪の食べ歩きと出発。"
      ],
      "d7": [
        "東京：浅草とミュージアム。",
        "渋谷・新宿・原宿。",
        "箱根温泉と富士。",
        "京都の寺社。",
        "奈良の鹿と大仏。",
        "大阪城と道頓堀。",
        "買い物と出発。"
      ],
      "d10": [
        "東京東エリア。",
        "東京西のカルチャー。",
        "鎌倉または横浜。",
        "金沢など工芸の街へ。",
        "兼六園とひがし茶屋。",
        "京都1日目。",
        "京都2日目。",
        "広島平和記念公園。",
        "宮島。",
        "大阪で締め。"
      ],
      "d14": [
        "東京ベース3日。",
        "富士五湖または箱根。",
        "京都クラシック。",
        "宇治と伏見稲荷。",
        "奈良。",
        "大阪グルメ。",
        "姫路城。",
        "広島・宮島。",
        "直島など（入替可）。",
        "福岡屋台。",
        "太宰府や海。",
        "バッファ日。",
        "札幌の海の幸。",
        "新千歳または東京から帰国。"
      ],
      "sakura": [
        "東京の開花に合わせた公園。",
        "横浜の海岸線。",
        "京都の庭園。",
        "奈良公園でピクニック。",
        "大阪城公園。"
      ],
      "autumn": [
        "日光の山紅葉。",
        "東京の公園。",
        "嵐山・東福寺。",
        "宮島の紅葉。",
        "箱根ロープウェイ。"
      ],
      "food": [
        "東京の寿司・ラーメン・居酒屋。",
        "大阪たこ焼き・お好み焼き。",
        "京都の会席と湯豆腐。",
        "金沢の市場。",
        "福岡とんこつと屋台。",
        "神戸ビーフ。"
      ],
      "anime": [
        "秋葉原と中野ブロードウェイ。",
        "ジブリ美術館（要予約）。",
        "お台場のデジタルアート。",
        "京都の映像文化。",
        "大阪日本橋。"
      ],
      "nature": [
        "上高地など（季節による）。",
        "箱根の火山景観。",
        "日光の滝と湖。",
        "宮島の森。",
        "沖縄シュノーケル。"
      ],
      "luxury": [
        "東京の最高級ステイ。",
        "おまかせ寿司。",
        "京町家と茶道。",
        "箱根の露天風呂旅館。",
        "グリーン車と神戸牛。"
      ],
      "budget": [
        "カプセル／ホステル。",
        "コンビニ朝食。",
        "高速バス移動。",
        "無料の寺社と展望。",
        "大阪のストリートフード。",
        "ICカードの市内移動。"
      ]
    }
  },
  "food": {
    "eyebrow": "食文化",
    "title": "グルメ概要",
    "desc": "大枠のジャンル紹介。詳細な名物は各都市ページへ。",
    "sushi": "寿司・刺身",
    "sushiText": "江戸前からおまかせまで、新鮮な海の幸。",
    "ramen": "ラーメン",
    "ramenText": "醤油・味噌・豚骨などご当地スープの世界。",
    "street": "ストリートフード",
    "streetText": "たこ焼き、たい焼き、焼き鳥、祭りの屋台。",
    "kaiseki": "会席",
    "kaisekiText": "季節を盛るコース料理の芸術。",
    "wagyu": "和牛・焼肉",
    "wagyuText": "霜降りをテーブルで、またはステーキで。",
    "sweets": "スイーツと茶",
    "sweetsText": "抹茶、和菓子、喫茶店文化。",
    "linkHint": "ご当地グルメは各都市へ →"
  },
  "attractions": {
    "eyebrow": "見どころ",
    "title": "観光カテゴリ",
    "desc": "カテゴリ別の入口。詳細は都市ページに。",
    "temples": "寺院",
    "shrines": "神社",
    "castles": "城",
    "mountains": "山",
    "parks": "国立公園",
    "museums": "博物館",
    "shopping": "ショッピング街",
    "theme": "テーマパーク",
    "anime": "聖地巡礼",
    "nightlife": "ナイトライフ"
  },
  "transport": {
    "eyebrow": "移動",
    "title": "交通ガイド",
    "desc": "都市間移動を支える全国ネットワーク。",
    "shinkansen": "新幹線",
    "shinkansenText": "主要都市を結ぶ高速鉄道。",
    "jrpass": "JRパス",
    "jrpassText": "外国人向け周遊パス。ルートで元が取れるか計算を。",
    "ic": "ICカード",
    "icText": "Suica・PASMO・ICOCAなど。電車もコンビニも。",
    "metro": "地下鉄・在来線",
    "metroText": "英語アプリと駅番号で迷いにくい。",
    "bus": "バス",
    "busText": "高速バスは節約に。市内バスは鉄道の隙間を補完。",
    "flights": "国内線",
    "flightsText": "北海道・九州・沖縄への時短に。",
    "ferries": "フェリー",
    "ferriesText": "瀬戸内や沖縄など島旅の定番。"
  },
  "budget": {
    "eyebrow": "費用",
    "title": "予算プランナー",
    "desc": "円で試算し、ライブレートで外貨表示。",
    "days": "日数",
    "accommodation": "宿泊",
    "hostel": "ホステル／カプセル",
    "business": "ビジネスホテル",
    "mid": "中級ホテル",
    "luxury": "高級／旅館",
    "transport": "移動スタイル",
    "local": "市内交通中心",
    "jrpass": "鉄道多め／JRパス想定",
    "private": "タクシー・ツアー",
    "food": "食事予算",
    "foodBudget": "節約",
    "foodMid": "バランス",
    "foodGourmet": "美食重視",
    "attractions": "観光",
    "attrLight": "軽め",
    "attrStandard": "標準",
    "attrHeavy": "チケット多め",
    "currency": "表示通貨",
    "total": "合計目安",
    "lodging": "宿泊費",
    "transportLine": "交通費",
    "meals": "食費",
    "sights": "観光費",
    "misc": "予備費",
    "perDay": "1日あたり",
    "ratesLive": "ライブレート",
    "ratesCached": "キャッシュレート",
    "ratesFallback": "予備レート"
  },
  "packing": {
    "eyebrow": "準備",
    "title": "荷物チェックリスト",
    "desc": "タップでチェック。このブラウザに保存されます。",
    "reset": "リセット",
    "checkAll": "すべてチェック",
    "cat": {
      "documents": "書類",
      "clothing": "衣類",
      "tech": "ガジェット",
      "health": "健康",
      "extras": "その他"
    },
    "item": {
      "passport": "パスポート・ビザ",
      "tickets": "航空券・宿の確認",
      "jrpass": "JRパス引換証",
      "insurance": "旅行保険",
      "copies": "身分証のデジタル控え",
      "layers": "重ね着",
      "comfortableShoes": "歩きやすい靴",
      "rainJacket": "薄手の雨具",
      "formalOption": "きれいめの服",
      "socks": "予備の靴下",
      "phone": "スマホと充電器",
      "adapter": "A/Bタイプ変換",
      "powerBank": "モバイルバッテリー",
      "earbuds": "イヤホン",
      "camera": "カメラ",
      "meds": "常備薬",
      "mask": "マスク",
      "sanitizer": "消毒液",
      "sunscreen": "日焼け止め",
      "motion": "酔い止め",
      "cashYen": "現金（円）",
      "toteBag": "折りたたみバッグ",
      "phrasebook": "オフライン会話集",
      "umbrella": "折りたたみ傘",
      "snacks": "慣れ親しんだおやつ"
    }
  },
  "seasons": {
    "eyebrow": "時期",
    "title": "季節ガイド",
    "desc": "気温は℃/℉設定に連動します。",
    "spring": "春",
    "summer": "夏",
    "autumn": "秋",
    "winter": "冬",
    "springText": "桜と過ごしやすい気候。混雑に備えて。",
    "summerText": "祭りと花火、南の海。高温多湿に注意。",
    "autumnText": "紅葉と晴天。人気スポットは早めの予約を。",
    "winterText": "イルミネーションと温泉、北の雪。",
    "clothing": "服装",
    "activities": "アクティビティ",
    "springClothes": "薄手コートと重ね着",
    "summerClothes": "通気性の良い服・帽子・日傘",
    "autumnClothes": "セーターと軽いジャケット",
    "winterClothes": "コート・防寒・防水靴（北）",
    "springAct": "花見、庭園、街歩き",
    "summerAct": "祭り、島、高原へ避難",
    "autumnAct": "紅葉、ハイキング、食べ歩き",
    "winterAct": "温泉、スキー、光の祭典"
  },
  "festivals": {
    "eyebrow": "祝祭",
    "title": "主な祭り",
    "desc": "一年を彩る代表的なイベント。",
    "items": [
      {
        "month": "2月",
        "name": "さっぽろ雪まつり",
        "text": "大通公園が雪と氷の芸術に。"
      },
      {
        "month": "3–4月",
        "name": "桜まつり",
        "text": "全国で花見が最盛期に。"
      },
      {
        "month": "5月",
        "name": "三社祭（東京）",
        "text": "浅草の盛大なお祭り。"
      },
      {
        "month": "7月",
        "name": "祇園祭（京都）",
        "text": "山鉾巡行で知られる一か月の祭。"
      },
      {
        "month": "8月",
        "name": "阿波おどり",
        "text": "徳島の躍動する夏祭り。"
      },
      {
        "month": "8月",
        "name": "お盆",
        "text": "祖先を偲ぶ帰省と盆踊り。"
      },
      {
        "month": "11月",
        "name": "紅葉ライトアップ",
        "text": "寺社の夜間特別公開など。"
      },
      {
        "month": "12月",
        "name": "冬のイルミネーション",
        "text": "都市が光の海に。"
      }
    ]
  },
  "tips": {
    "eyebrow": "事前知識",
    "title": "基本の旅のヒント",
    "desc": "全国共通。地域の補足は各都市ページへ。",
    "etiquette": "マナー",
    "etiquetteText": "車内通話は控え、整列し、チップは不要。",
    "phrases": "便利なフレーズ",
    "phrasesText": "ありがとうございます／すみません／英語がわかりますか？",
    "emergency": "緊急番号",
    "emergencyText": "警察110・消防救急119・ジャパンヘルプライン 0570-000-911",
    "sim": "SIM・eSIM",
    "simText": "渡航前eSIMや空港カウンターが便利。",
    "wifi": "Wi‑Fi",
    "wifiText": "駅やコンビニ、カフェの無料Wi‑Fi。レンタルも安心。",
    "cash": "現金とカード",
    "cashText": "都市はカード可。地方・神社・小さなお店は現金を。",
    "tipping": "チップ",
    "tippingText": "基本不要。サービス料込みの文化です。",
    "transit": "交通マナー",
    "transitText": "優先席、静かな車内、ラッシュ時は前にバッグ。"
  },
  "faq": {
    "eyebrow": "質問",
    "title": "よくある質問",
    "desc": "初訪・再訪どちらにも。",
    "q1": "JRパスは必要？",
    "a1": "長距離移動が多いときだけ。東京だけならICカードで十分。",
    "q2": "日本は高い？",
    "a2": "工夫次第。コンビニ食やビジネスホテル、地方都市で抑えられます。",
    "q3": "桜の時期は？",
    "a3": "東京・京都は例年3月末〜4月初旬。南は早く北は遅め。",
    "q4": "水道水は飲める？",
    "a4": "はい、全国で安全です。",
    "q5": "現金はいくら？",
    "a5": "最初に1–3万円程度、セブン銀行ATMなどで補充。",
    "q6": "英語は通じる？",
    "a6": "主要駅やホテルは基本対応。翻訳アプリも有効。",
    "q7": "カードは使える？",
    "a7": "都市部はほぼ可。寺社や地方の宿は現金のことも。",
    "q8": "ベジタリアンやアレルギーは？",
    "a8": "都市ほど選択肢あり。出汁の確認とフレーズが助けに。"
  },
  "galleryCta": {
    "title": "フォトギャラリー",
    "desc": "都市・場所・季節で写真を閲覧。開くとフル解像度で表示します。",
    "button": "ギャラリーへ"
  },
  "gallery": {
    "backToGuide": "ガイドへ戻る",
    "eyebrow": "フォトギャラリー",
    "heading": "日本の瞬間",
    "pageIntro": "都市・季節・カテゴリで閲覧。グリッドは軽量サムネ、開くと中解像度、必要なら原寸を読み込みます。",
    "searchPlaceholder": "名前・場所・都市・時期で検索…",
    "sortLocation": "場所",
    "sortCity": "都市",
    "sortCategory": "カテゴリ",
    "qualityMedium": "中解像度",
    "qualityFull": "原寸",
    "filterAll": "すべて",
    "filterCities": "都市",
    "filterTemples": "寺院",
    "filterShrines": "神社",
    "filterNature": "自然",
    "filterFood": "食",
    "filterNeon": "ネオン／夜",
    "filterTravel": "旅",
    "filterCulture": "文化",
    "photoCount": "枚",
    "loadFull": "原寸品質を読み込む",
    "loadingPhoto": "写真を読み込み中…",
    "managerHint": "ローカルの Gallery Manager で追加：Add Photos.command をダブルクリック、または python3 tools/gallery_manager.py"
  },
  "funFacts": {
    "eyebrow": "知っていましたか？",
    "title": "豆知識",
    "desc": "更新してもう一つ。",
    "refresh": "別の豆知識",
    "items": {
      "0": "日本の島は1万4125。有人島は約430。",
      "1": "自販機では温かいコーヒーから傘まで売っています。",
      "2": "東京の地下鉄は毎日数百万人を運び、定時運行で知られます。",
      "3": "コンビニは全国に約15,000店以上。",
      "4": "富士山は活火山で、最後の噴火は1707年。",
      "5": "新幹線は長い歴史の中で衝突・脱線による乗客死亡事故がありません。",
      "6": "キットカットにはわさびや酒など日本限定味が多数。",
      "7": "力士は土俵を清めるために塩を撒きます。",
      "8": "カプセルホテルは1970年代末に大阪で誕生。",
      "9": "温泉地は全国に数千か所規模で点在。",
      "10": "新幹線の先頭形状はトンネル微気圧波対策でもあります。",
      "11": "四角いスイカは観賞・贈答用が中心。",
      "12": "ラーメンを音を立ててすするのは歓迎されることも。",
      "13": "マンホールの蓋は自治体ごとにデザインが異なります。",
      "14": "「津波」は日本語由来の国際語です。",
      "15": "奈良の鹿はお辞儀をすることがあります。",
      "16": "東京の旧名は江戸。",
      "17": "日本には観光用の「ジョイフルトレイン」があります。",
      "18": "クリスマスケーキは国民的行事ではないのに定着した文化。",
      "19": "ロボットレストランなど近未来的な娯楽も。",
      "20": "渋谷スクランブルは一度に数千人が渡ることも。",
      "21": "折り鶴は平和と祈りの象徴。",
      "22": "御朱印は寺社を巡る楽しみの一つ。",
      "23": "和食はユネスコ無形文化遺産。",
      "24": "猫が駅長を務める駅もあります。",
      "25": "パチンコ店は独特の光と音の空間。",
      "26": "皇居は東京中心部の広大な緑地。",
      "27": "紅葉前線も桜と同じくらい注目されます。",
      "28": "ふぐ調理には専門の免許が必要。",
      "29": "日本では西暦と和暦が併用されます。",
      "30": "置き傘文化には信頼が感じられます。",
      "31": "畳は部屋の広さの単位にもなります。",
      "32": "函館・神戸などの夜景は日本三大夜景とも。",
      "33": "抹茶はかつて特権層や茶人の世界でした。",
      "34": "セブンの卵サンドは旅人に人気。",
      "35": "ラッシュ時には女性専用車がある路線も。",
      "36": "花見の文化は何世紀も前から。",
      "37": "沖縄には本土とは異なる言語・文化のルーツがあります。",
      "38": "金沢の金箔はスイーツにも。",
      "39": "温水洗浄便座は多くの場所で標準的。",
      "40": "駅弁は車窓の旅を美味しくします。",
      "41": "瀬戸内の直島などはアートの島として有名。",
      "42": "さっぽろ雪まつりは巨大な雪像で知られます。",
      "43": "京都には何千もの寺社があります。",
      "44": "和牛の格付けは霜降りなどを評価します。",
      "45": "夏の花火大会は全国で開催。",
      "46": "旅館やホテルでは浴衣が用意されることが多い。",
      "47": "「森林浴」は1980年代に日本で提唱されました。"
    }
  },

  "tools": {
    "backToGuide": "ガイドへ戻る",
    "eyebrow": "旅行ツール",
    "heading": "日本の旅を<em>見通しよく</em>",
    "intro": "予算プランナー、荷物チェックリスト、為替、世界時計、消費税、JRパス目安、運賃目安、緊急電話。",
    "currencyLabel": "ライブ為替換算",
    "currencySub": "frankfurter.dev の日次レート（円基準）。",
    "amount": "金額",
    "from": "から",
    "to": "へ",
    "clockLabel": "世界時計",
    "clockSub": "日本は全国がJST。帰国先との時差確認に。",
    "tzTokyo": "東京",
    "tzOsaka": "大阪",
    "tzSapporo": "札幌",
    "tzNaha": "那覇（沖縄）",
    "tzShanghai": "上海",
    "tzSeoul": "ソウル",
    "tzSydney": "シドニー",
    "tzLondon": "ロンドン",
    "tzNewYork": "ニューヨーク",
    "tzUtc": "UTC",
    "taxLabel": "日本の消費税",
    "taxSub": "標準は原則10%（一部食品は8%）。チップは不要です。",
    "taxBill": "税抜価格（円）",
    "taxRate": "税率 %",
    "taxOnly": "税額",
    "preTax": "税抜",
    "noTip": "日本ではチップは一般的ではありません。",
    "jrLabel": "JRパス目安",
    "jrSub": "周遊パスと個別乗車券のざっくり比較。公式価格で必ず確認を。",
    "jrDays": "旅行日数",
    "jrLegs": "長距離鉄道の区間数（目安）",
    "jrWorthIt": "パスが得そう",
    "jrMaybeNot": "個別切符の方が得かも",
    "jrSave": "節約目安",
    "jrDiff": "差額目安",
    "jrPassEst": "パス概算",
    "jrTicketsEst": "切符概算",
    "jrDisclaimer": "目安のみ · 公式サイトで確認",
    "railLabel": "新幹線運賃目安",
    "railSub": "普通車片道の概算（計画用）。",
    "railRoute": "区間",
    "railTrips": "片道の回数",
    "railOneWay": "片道おおよそ",
    "railDisclaimer": "予約ツールではありません · 列車・座席で変動",
    "emergencyLabel": "日本の便利な電話番号",
    "emergencySub": "必要なときに備えて保存を。",
    "emPolice": "警察",
    "emFire": "消防・救急",
    "emCoast": "海上保安庁",
    "emHelpline": "ジャパンヘルプライン（英語可）",
    "emMedical": "救急安心センター（地域による）",
    "emNote": "自国の在日大使館・領事館も保存を。"
  },
  "legal": {
    "privacyLink": "プライバシー",
    "termsLink": "利用規約",
    "privacyTitle": "プライバシーポリシー",
    "termsTitle": "利用規約"
  },


  "plan": {
    "eyebrow": "このガイドの使い方",
    "title": "旅の組み立て4ステップ",
    "desc": "上から順に進め、各都市ページで詳細を。予約前に公式の運賃・入国情報を確認してください。",
    "step1Title": "都市を選ぶ",
    "step1Text": "東京からの距離・季節・滞在目安で14都市を比較。",
    "step2Title": "ルートを決める",
    "step2Text": "5〜14日やテーマ別行程を骨格に。",
    "step3Title": "移動を固める",
    "step3Text": "ICカード、新幹線、JRパス／地方パスの判断。",
    "step4Title": "数字を固める",
    "step4Text": "ツールで為替・税・運賃目安・緊急番号。",
    "trustNote": "運賃やパス条件は変わります。JR・航空・japan.travel（JNTO）で確認を。"
  },
  "official": {
    "eyebrow": "公式・実務",
    "title": "頼りになる情報源",
    "desc": "本サイトは計画用。ビザ・安全・鉄道パスの確定はJNTOと事業者で。",
    "jnto": "Travel Japan（JNTO）",
    "jntoDesc": "公式の目的地ガイドと計画ハブ",
    "jr": "ジャパン・レール・パス案内（JNTO）",
    "jrDesc": "対象範囲・指定席・地方パスの考え方",
    "train": "電車・バスの乗り方（JNTO）",
    "trainDesc": "乗車方法、切符、IC、マナー",
    "hotline": "ジャパン・ビジター・ホットライン",
    "hotlineDesc": "多言語の旅行者サポート",
    "safety": "Safety Tips",
    "safetyDesc": "緊急・災害時の旅行者向け情報",
    "jrOfficial": "japanrailpass.net",
    "jrOfficialDesc": "JRパス公式の購入・利用条件"
  },

  "footer": {
    "aboutBlurb": "複数都市の旅を支える、上質でオフラインにも強いガイド。"
  },
  "cityPage": {
    "back": "すべての目的地",
    "distanceNote": "東京駅からのおおよその距離",
    "stayValue": "{n}日間",
    "budgetDay": "1日あたり（中級・長距離鉄道除く）",
    "weatherAvg": "日中の目安",
    "gettingThere": "アクセス",
    "moreInGallery": "写真はギャラリーに追加予定"
  },
  "cityContent": {
    "tokyo": {
      "tagline": "終わりなき発見のネオン首都",
      "overview": "浅草の歴史、渋谷の若者文化、銀座の洗練、明治神宮の森など、都市の中の都市が集まる東京。",
      "bestTime": "3–5月と10–11月。夏祭りは楽しいが多湿。",
      "stay": "4–5",
      "budget": "¥12,000–25,000",
      "weather": "夏は蒸し暑く冬は穏やか。春と秋が特に美しい。",
      "gettingThere": "成田・羽田。JR・地下鉄・私鉄が密集。",
      "food": [
        {
          "e": "🍣",
          "n": "江戸前寿司",
          "d": "カウンターの握り。気軽から名店まで。"
        },
        {
          "e": "🍜",
          "n": "東京ラーメン",
          "d": "醤油ベースや個性派の名店エリア。"
        },
        {
          "e": "🍢",
          "n": "焼き鳥横丁",
          "d": "ガード下の煙と串。"
        },
        {
          "e": "🍰",
          "n": "デパ地下スイーツ",
          "d": "百貨店地下のケーキと手土産。"
        }
      ],
      "attractions": [
        {
          "c": "temples",
          "n": "浅草寺",
          "d": "東京を代表する参道と寺。"
        },
        {
          "c": "shrines",
          "n": "明治神宮",
          "d": "原宿の隣の森の社。"
        },
        {
          "c": "museums",
          "n": "teamLab／美術館",
          "d": "デジタルアートと世界級コレクション。"
        },
        {
          "c": "shopping",
          "n": "銀座＆新宿",
          "d": "ラグジュアリーから家電まで。"
        },
        {
          "c": "anime",
          "n": "秋葉原",
          "d": "オタク文化とアーケード。"
        },
        {
          "c": "nightlife",
          "n": "ゴールデン街＆ルーフトップ",
          "d": "小さなバーと夜景。"
        }
      ],
      "transportLocal": "Suica/PASMOを。渋滞時はタクシーより鉄道。街歩きが基本。",
      "tips": [
        "人気施設はオンライン先行予約。",
        "チェックイン前はコインロッカーを活用。",
        "銀座の歩行者天国は写真向き。",
        "コンビニが忘れ物をほぼ解決。"
      ],
      "highlights": [
        "渋谷スクランブル",
        "浅草とスカイツリー",
        "日光・箱根・横浜への日帰り"
      ]
    },
    "kyoto": {
      "tagline": "日本の古典の心",
      "overview": "数千の寺社、茶屋街、禅庭、鴨川沿いの会席。文化首都・京都。",
      "bestTime": "3–4月の桜と11月の紅葉。平日がねらい目。",
      "stay": "3–4",
      "budget": "¥11,000–22,000",
      "weather": "夏は暑く冬は冷え込み。春と秋の光が格別。",
      "gettingThere": "東京から新幹線約2時間15分。",
      "food": [
        {
          "e": "🍲",
          "n": "会席",
          "d": "茶の湯に根ざす季節のコース。"
        },
        {
          "e": "🍵",
          "n": "抹茶と和菓子",
          "d": "宇治茶と繊細な甘いもの。"
        },
        {
          "e": "🥣",
          "n": "湯豆腐",
          "d": "寺町のシンプルな味わい。"
        },
        {
          "e": "🍜",
          "n": "京都ラーメン",
          "d": "あっさり醤油や鶏系。"
        }
      ],
      "attractions": [
        {
          "c": "shrines",
          "n": "伏見稲荷",
          "d": "千本鳥居。"
        },
        {
          "c": "temples",
          "n": "金閣・清水",
          "d": "黄金の楼閣と山辺の景。"
        },
        {
          "c": "shopping",
          "n": "錦市場",
          "d": "京の台所。"
        },
        {
          "c": "parks",
          "n": "嵐山",
          "d": "竹林と川辺。"
        }
      ],
      "transportLocal": "バスは便利だが混雑。地下鉄＋徒歩が快適なことも。",
      "tips": [
        "名所は開門直後が◎。",
        "寺社では控えめに。",
        "祇園での撮影マナーを守る。",
        "人気店は予約を。"
      ],
      "highlights": [
        "伏見稲荷",
        "宇治でお茶",
        "紅葉ライトアップ"
      ]
    },
    "osaka": {
      "tagline": "食い倒れと笑いの街",
      "overview": "城と道頓堀、地下街、ストリートフードが揃う大阪。",
      "bestTime": "春と秋。夏は祭りで活気。",
      "stay": "2–3",
      "budget": "¥10,000–20,000",
      "weather": "盆地で夏は暑い。",
      "gettingThere": "新大阪、関空アクセス良好。",
      "food": [
        {
          "e": "🐙",
          "n": "たこ焼き",
          "d": "外カリ中トロ。"
        },
        {
          "e": "🥞",
          "n": "お好み焼き",
          "d": "地元流の鉄板焼き。"
        },
        {
          "e": "🍜",
          "n": "串カツ",
          "d": "二度漬け禁止！"
        },
        {
          "e": "🐡",
          "n": "割烹",
          "d": "ストリートだけじゃない味。"
        }
      ],
      "attractions": [
        {
          "c": "castles",
          "n": "大阪城",
          "d": "シンボルの天守と公園。"
        },
        {
          "c": "nightlife",
          "n": "道頓堀",
          "d": "ネオンとグリコ看板。"
        },
        {
          "c": "theme",
          "n": "USJ",
          "d": "大型テーマパーク。"
        },
        {
          "c": "shopping",
          "n": "心斎橋",
          "d": "商店街とブランド。"
        }
      ],
      "transportLocal": "メトロと環状線でほぼカバー。",
      "tips": [
        "空腹で来るのが正解。",
        "USJは繁忙期注意。",
        "新世界はレトロで安い。",
        "奈良・神戸・京都へ基地に。"
      ],
      "highlights": [
        "道頓堀の夜",
        "大阪城",
        "食べ歩き"
      ]
    },
    "nara": {
      "tagline": "古都と鹿",
      "overview": "東大寺の大仏と奈良公園の鹿が迎える古都。",
      "bestTime": "春と秋。朝がおすすめ。",
      "stay": "1–2",
      "budget": "¥9,000–16,000",
      "weather": "公園は夏に暑い。",
      "gettingThere": "京都・大阪から急行約40–45分。",
      "food": [
        {
          "e": "🍪",
          "n": "鹿せんべい文化",
          "d": "鹿用せんべいと土産。"
        },
        {
          "e": "🍜",
          "n": "三輪そうめん",
          "d": "細い郷土麺。"
        },
        {
          "e": "🍠",
          "n": "柿の葉寿司",
          "d": "柿の葉で包んだ押し寿司。"
        },
        {
          "e": "🍵",
          "n": "中谷堂のもち",
          "d": "高速もちつきで有名。"
        }
      ],
      "attractions": [
        {
          "c": "temples",
          "n": "東大寺",
          "d": "大仏殿。"
        },
        {
          "c": "shrines",
          "n": "春日大社",
          "d": "灯籠の参道。"
        },
        {
          "c": "parks",
          "n": "奈良公園",
          "d": "鹿と緑。"
        },
        {
          "c": "museums",
          "n": "奈良国立博物館",
          "d": "仏教美術。"
        }
      ],
      "transportLocal": "公園周辺は徒歩。遠方はバス。",
      "tips": [
        "おやつは隠して。鹿は積極的。",
        "短泊なら京都とセット。",
        "二月堂から眺望。",
        "ツアーバスピークを避ける。"
      ],
      "highlights": [
        "大仏",
        "春日の灯籠",
        "公園散歩"
      ]
    },
    "hiroshima": {
      "tagline": "平和と島の鳥居",
      "overview": "平和記念公園と宮島への玄関口。お好み焼きも名物。",
      "bestTime": "春と秋。",
      "stay": "2",
      "budget": "¥10,000–18,000",
      "weather": "瀬戸内は比較的穏やか。",
      "gettingThere": "新幹線＋市内電車＋宮島フェリー。",
      "food": [
        {
          "e": "🥞",
          "n": "広島お好み焼き",
          "d": "麺入りの層スタイル。"
        },
        {
          "e": "🦪",
          "n": "牡蠣",
          "d": "シーズンの瀬戸内の味。"
        },
        {
          "e": "🍜",
          "n": "尾道ラーメン",
          "d": "近郊の醤油ラーメン。"
        },
        {
          "e": "🍁",
          "n": "もみじ饅頭",
          "d": "宮島の定番土産。"
        }
      ],
      "attractions": [
        {
          "c": "museums",
          "n": "平和記念資料館",
          "d": "必訪の歴史。"
        },
        {
          "c": "shrines",
          "n": "厳島神社",
          "d": "海上の鳥居。"
        },
        {
          "c": "castles",
          "n": "広島城",
          "d": "復興の城と展示。"
        },
        {
          "c": "parks",
          "n": "縮景園",
          "d": "小さな名園。"
        }
      ],
      "transportLocal": "路面電車が便利。",
      "tips": [
        "平和公園では静かに。",
        "鳥居は潮位で印象が変わる。",
        "夜はお好み焼きを。",
        "アートの島へ延長も。"
      ],
      "highlights": [
        "平和公園",
        "宮島",
        "お好み焼き"
      ]
    },
    "yokohama": {
      "tagline": "東京の隣の港町",
      "overview": "みなとみらい、中華街、カップヌードルミュージアム。",
      "bestTime": "通年。夜景が美しい。",
      "stay": "1–2",
      "budget": "¥11,000–20,000",
      "weather": "海風で夏はややしのぎやすい。",
      "gettingThere": "東京から30–40分。",
      "food": [
        {
          "e": "🥟",
          "n": "中華街",
          "d": "点心と肉まん。"
        },
        {
          "e": "🍜",
          "n": "家系ラーメン",
          "d": "横浜発祥の濃厚スープ。"
        },
        {
          "e": "☕",
          "n": "ハーバーカフェ",
          "d": "海辺のコーヒー。"
        },
        {
          "e": "🍰",
          "n": "洋菓子",
          "d": "港町のパティスリー。"
        }
      ],
      "attractions": [
        {
          "c": "museums",
          "n": "カップヌードルミュージアム",
          "d": "自分だけの麺作り。"
        },
        {
          "c": "shopping",
          "n": "みなとみらい",
          "d": "近代的ウォーターフロント。"
        },
        {
          "c": "parks",
          "n": "山下公園",
          "d": "定番の散歩道。"
        },
        {
          "c": "nightlife",
          "n": "ベイエリアの夜",
          "d": "光る港。"
        }
      ],
      "transportLocal": "みなとみらい線＋徒歩。",
      "tips": [
        "東京からの半日に最適。",
        "赤レンガと夕景をセットで。",
        "三溪園もおすすめ。",
        "雨の日の博物館巡り。"
      ],
      "highlights": [
        "港のスカイライン",
        "中華街",
        "大観覧車"
      ]
    },
    "hakone": {
      "tagline": "富士を望む温泉郷",
      "overview": "ロープウェイ、芦ノ湖、美術館、旅館の湯。",
      "bestTime": "冬の晴天は富士に良い。秋は紅葉。",
      "stay": "1–2",
      "budget": "¥15,000–35,000",
      "weather": "東京より涼しい。",
      "gettingThere": "特急または新幹線＋バス約90分。周遊パス便利。",
      "food": [
        {
          "e": "🍜",
          "n": "湯葉料理",
          "d": "山の宿の定番。"
        },
        {
          "e": "🥚",
          "n": "黒たまご",
          "d": "硫黄泉で茹でた卵。"
        },
        {
          "e": "🍲",
          "n": "旅館会席",
          "d": "宿での夕食。"
        },
        {
          "e": "🍰",
          "n": "温泉まんじゅう",
          "d": "温かい土産。"
        }
      ],
      "attractions": [
        {
          "c": "mountains",
          "n": "大涌谷",
          "d": "火山の谷。"
        },
        {
          "c": "parks",
          "n": "芦ノ湖",
          "d": "晴れた日の富士。"
        },
        {
          "c": "museums",
          "n": "彫刻の森",
          "d": "屋外彫刻。"
        },
        {
          "c": "shrines",
          "n": "箱根神社",
          "d": "湖畔の社。"
        }
      ],
      "transportLocal": "電車・ケーブル・船の周遊。",
      "tips": [
        "大涌谷は規制情報を確認。",
        "富士は天気次第。",
        "貸切風呂は予約を。",
        "日帰り可、泊まりがベター。"
      ],
      "highlights": [
        "ロープウェイ",
        "温泉",
        "芦ノ湖"
      ]
    },
    "nikko": {
      "tagline": "森の社寺",
      "overview": "東照宮の極彩彫刻、滝、奥日光の自然。",
      "bestTime": "紅葉が特に有名。",
      "stay": "1–2",
      "budget": "¥10,000–18,000",
      "weather": "山は寒い。冬は雪も。",
      "gettingThere": "浅草から特急約2時間。",
      "food": [
        {
          "e": "🍜",
          "n": "湯葉そば",
          "d": "地元の味。"
        },
        {
          "e": "🔥",
          "n": "味噌料理",
          "d": "山の滋味。"
        },
        {
          "e": "Trout",
          "n": "川魚",
          "d": "高原の魚料理。"
        },
        {
          "e": "🍡",
          "n": "参道スイーツ",
          "d": "門前の甘いもの。"
        }
      ],
      "attractions": [
        {
          "c": "shrines",
          "n": "東照宮",
          "d": "華麗な社殿。"
        },
        {
          "c": "mountains",
          "n": "華厳の滝",
          "d": "中禅寺湖から落下。"
        },
        {
          "c": "parks",
          "n": "奥日光",
          "d": "ハイキング。"
        },
        {
          "c": "temples",
          "n": "輪王寺",
          "d": "聖地の寺院。"
        }
      ],
      "transportLocal": "中禅寺方面はバス必須。",
      "tips": [
        "東照宮は朝イチで。",
        "雨後の石段は滑る。",
        "社寺の午前＋自然の午後。",
        "紅葉週末は混雑。"
      ],
      "highlights": [
        "東照宮",
        "華厳滝",
        "杉並木"
      ]
    },
    "kanazawa": {
      "tagline": "庭園と金箔の街",
      "overview": "兼六園、茶屋街、海鮮、工芸が残る北陸の名都。",
      "bestTime": "春と秋。冬の雪景色も風情。",
      "stay": "2",
      "budget": "¥11,000–20,000",
      "weather": "日本海側で冬は雪が多い。",
      "gettingThere": "北陸新幹線で東京から約2.5時間。",
      "food": [
        {
          "e": "🍣",
          "n": "近江町市場",
          "d": "朝の海鮮。"
        },
        {
          "e": "🥇",
          "n": "金箔ソフト",
          "d": "きらきら土産。"
        },
        {
          "e": "🍣",
          "n": "治部煮・加賀料理",
          "d": "郷土の上品な味。"
        },
        {
          "e": "🍵",
          "n": "茶屋の甘いもの",
          "d": "ひがし茶屋街で。"
        }
      ],
      "attractions": [
        {
          "c": "parks",
          "n": "兼六園",
          "d": "日本三名園。"
        },
        {
          "c": "castles",
          "n": "金沢城公園",
          "d": "庭園の隣。"
        },
        {
          "c": "shopping",
          "n": "ひがし茶屋",
          "d": "茶屋の街並み。"
        },
        {
          "c": "museums",
          "n": "21世紀美術館",
          "d": "現代アート。"
        }
      ],
      "transportLocal": "周遊バス＋徒歩。",
      "tips": [
        "庭園券のセットを確認。",
        "市場は朝がベスト。",
        "東京—京都の間に挟みやすい。",
        "金箔細工体験も。"
      ],
      "highlights": [
        "兼六園",
        "茶屋街",
        "市場寿司"
      ]
    },
    "sapporo": {
      "tagline": "ビールと雪の北都",
      "overview": "海鮮、ラーメン、雪まつり、スキーへの拠点。",
      "bestTime": "2月の雪まつり、夏の涼しさ。",
      "stay": "2–3",
      "budget": "¥11,000–21,000",
      "weather": "冬は雪、夏は爽やか。",
      "gettingThere": "新千歳空港が便利。",
      "food": [
        {
          "e": "🦀",
          "n": "海鮮丼",
          "d": "蟹・うに・イクラ。"
        },
        {
          "e": "🍜",
          "n": "味噌ラーメン",
          "d": "札幌スタイル。"
        },
        {
          "e": "🍺",
          "n": "ビアホール",
          "d": "ジンギスカンとビール。"
        },
        {
          "e": "🧀",
          "n": "乳製品・スイーツ",
          "d": "北海道ミルク。"
        }
      ],
      "attractions": [
        {
          "c": "parks",
          "n": "大通公園",
          "d": "祭りの軸。"
        },
        {
          "c": "museums",
          "n": "ビール博物館",
          "d": "試飲つき。"
        },
        {
          "c": "mountains",
          "n": "藻岩山など",
          "d": "夜景とスキー。"
        },
        {
          "c": "shopping",
          "n": "狸小路",
          "d": "アーケード商店街。"
        }
      ],
      "transportLocal": "地下鉄3路線。冬は滑り止めを。",
      "tips": [
        "雪まつり lodging は超早めに。",
        "小樽へ日帰りも。",
        "スープカレーも名物。",
        "移動は飛行機が時短。"
      ],
      "highlights": [
        "雪まつり",
        "市場の朝食",
        "味噌ラーメン"
      ]
    },
    "fukuoka": {
      "tagline": "九州の玄関",
      "overview": "屋台、豚骨ラーメン、近い空港と博多駅。",
      "bestTime": "春と秋。",
      "stay": "2–3",
      "budget": "¥9,000–18,000",
      "weather": "冬は比較的穏やか。",
      "gettingThere": "博多駅と福岡空港が都心に近い。",
      "food": [
        {
          "e": "🍜",
          "n": "博多とんこつ",
          "d": "細麺と替え玉。"
        },
        {
          "e": "🍢",
          "n": "屋台",
          "d": "夜の屋外スタンド。"
        },
        {
          "e": "🐟",
          "n": "明太子",
          "d": "名産品。"
        },
        {
          "e": "🥟",
          "n": "餃子・もつ鍋",
          "d": "郷土の鍋と点心。"
        }
      ],
      "attractions": [
        {
          "c": "shrines",
          "n": "櫛田神社",
          "d": "祭りの社。"
        },
        {
          "c": "temples",
          "n": "太宰府天満宮",
          "d": "学問の神へ日帰り。"
        },
        {
          "c": "shopping",
          "n": "天神・キャナル",
          "d": "買い物と都会。"
        },
        {
          "c": "parks",
          "n": "大濠公園",
          "d": "都心の湖畔。"
        }
      ],
      "transportLocal": "地下鉄とバス。",
      "tips": [
        "ラーメンは開店狙い。",
        "屋台では一杯頼んでマナー良く。",
        "九州周遊の基地。",
        "南蔵院の大仏も。"
      ],
      "highlights": [
        "屋台",
        "とんこつ",
        "太宰府"
      ]
    },
    "kobe": {
      "tagline": "山と海の港町",
      "overview": "神戸牛、ジャズ、北野異人館、夜景。",
      "bestTime": "春と秋。冬のイルミも有名。",
      "stay": "1–2",
      "budget": "¥12,000–30,000",
      "weather": "瀬戸内は穏やか。",
      "gettingThere": "大阪から約30分。新神戸駅。",
      "food": [
        {
          "e": "🥩",
          "n": "神戸牛",
          "d": "ステーキと鉄板。"
        },
        {
          "e": "🍞",
          "n": "パン文化",
          "d": "有名ベーカリー。"
        },
        {
          "e": "🍷",
          "n": "灘の酒",
          "d": "酒蔵めぐり。"
        },
        {
          "e": "🍰",
          "n": "ハーバーデザート",
          "d": "洋風カフェ。"
        }
      ],
      "attractions": [
        {
          "c": "mountains",
          "n": "六甲・夜景",
          "d": "ロープウェイ展望。"
        },
        {
          "c": "museums",
          "n": "北野異人館",
          "d": "異国情緒の邸宅。"
        },
        {
          "c": "shopping",
          "n": "ハーバーランド",
          "d": "水辺の商業施設。"
        },
        {
          "c": "parks",
          "n": "メリケンパーク",
          "d": "港のメモリアル。"
        }
      ],
      "transportLocal": "JR・阪急・阪神。",
      "tips": [
        "牛は夜の予約を。",
        "大阪や姫路と組合せ。",
        "夜景は運行時間確認。",
        "北野は朝の光が美しい。"
      ],
      "highlights": [
        "神戸牛",
        "ハーバー",
        "北野"
      ]
    },
    "nagasaki": {
      "tagline": "丘と港の歴史都市",
      "overview": "西洋と中国と日本が交わる港町。ちゃんぽんと平和学習。",
      "bestTime": "春と秋。",
      "stay": "2",
      "budget": "¥10,000–18,000",
      "weather": "冬は穏やか、夏は多湿。",
      "gettingThere": "博多から特急かもめ、または空路。",
      "food": [
        {
          "e": "🍜",
          "n": "ちゃんぽん・皿うどん",
          "d": "長崎麺。"
        },
        {
          "e": "🍰",
          "n": "カステラ",
          "d": "南蛮菓子の系譜。"
        },
        {
          "e": "🍲",
          "n": "卓袱料理",
          "d": "融合の宴。"
        },
        {
          "e": "🐟",
          "n": "港の海鮮",
          "d": "新鮮な海の幸。"
        }
      ],
      "attractions": [
        {
          "c": "museums",
          "n": "平和公園・資料館",
          "d": "歴史を学ぶ。"
        },
        {
          "c": "shopping",
          "n": "出島・中華街",
          "d": "交易の記憶。"
        },
        {
          "c": "theme",
          "n": "グラバー園",
          "d": "丘の上の展望。"
        },
        {
          "c": "nightlife",
          "n": "夜の港",
          "d": "ライトアップ（季節）。"
        }
      ],
      "transportLocal": "路面電車と坂道の徒歩。",
      "tips": [
        "平和施設は時間に余裕を。",
        "カステラは試食を。",
        "夕方の坂道が雰囲気◎。",
        "雲仙などへ延長可。"
      ],
      "highlights": [
        "グラバー園",
        "平和公園",
        "ちゃんぽん"
      ]
    },
    "okinawa": {
      "tagline": "碧い海の亜熱帯",
      "overview": "琉球文化、ビーチ、島時間。本土とは違う日本。",
      "bestTime": "4–6月と10–11月。夏は台風に注意。",
      "stay": "4–7",
      "budget": "¥11,000–22,000",
      "weather": "通年暖かい。",
      "gettingThere": "那覇空港。離島は船や飛行機。",
      "food": [
        {
          "e": "🍜",
          "n": "沖縄そば",
          "d": "豚骨系の小麦麺。"
        },
        {
          "e": "🐷",
          "n": "ラフテー・タコライス",
          "d": "豚肉と島の融合。"
        },
        {
          "e": "🧃",
          "n": "サーターアンダーギー・泡盛",
          "d": "揚げ菓子と地酒。"
        },
        {
          "e": "🥭",
          "n": "南国フルーツ",
          "d": "パインやマンゴー。"
        }
      ],
      "attractions": [
        {
          "c": "castles",
          "n": "首里城周辺",
          "d": "琉球王国の遺産（状況確認）。"
        },
        {
          "c": "parks",
          "n": "慶良間などの海",
          "d": "シュノーケル天国。"
        },
        {
          "c": "museums",
          "n": "県立博物館",
          "d": "自然と文化。"
        },
        {
          "c": "nightlife",
          "n": "国際通り",
          "d": "土産と夜の賑わい。"
        }
      ],
      "transportLocal": "那覇以外はレンタカーが便利。",
      "tips": [
        "日焼け対策必須。",
        "サンゴに優しい日焼け止めを。",
        "天候バッファを。",
        "民宿ステイも素敵。"
      ],
      "highlights": [
        "ビーチ",
        "首里の文化",
        "島そば"
      ]
    }
  }
},
    "zh-CN": {
  "meta": {
    "siteName": "日本旅行指南",
    "tagline": "精致的列岛之旅"
  },
  "nav": {
    "home": "首页",
    "about": "关于日本",
    "map": "地图",
    "destinations": "目的地",
    "routes": "路线",
    "food": "美食",
    "attractions": "景点",
    "transport": "交通",
    "budget": "预算",
    "packing": "行李",
    "seasons": "季节",
    "festivals": "节日",
    "tips": "贴士",
    "faq": "常见问题",
    "gallery": "图库",
    "facts": "趣闻",
    "tools": "工具",
    "settings": "设置",
    "cities": "城市"
  },
  "common": {
    "learnMore": "了解更多",
    "explore": "探索",
    "viewAll": "查看全部",
    "fromTokyo": "距东京",
    "bestTime": "最佳季节",
    "stay": "建议停留",
    "budget": "预算参考",
    "weather": "天气",
    "highlights": "亮点",
    "overview": "概览",
    "foodGuide": "美食指南",
    "attractions": "景点",
    "transport": "当地交通",
    "travelTips": "旅行贴士",
    "days": "天",
    "openGallery": "打开图库",
    "backHome": "返回首页",
    "loading": "加载中…",
    "close": "关闭",
    "previous": "上一张",
    "next": "下一张",
    "search": "搜索",
    "allCities": "全部城市",
    "sortBy": "排序",
    "sortOrder": "默认",
    "sortName": "名称",
    "sortTimeAsc": "时间（旧→新）",
    "sortTimeDesc": "时间（新→旧）",
    "emptyGalleryTitle": "图库为空",
    "emptyGalleryDesc": "使用本地图库管理器（Add Photos.command）添加照片后显示在这里。",
    "settingsTitle": "设置",
    "language": "语言",
    "distanceUnit": "距离单位",
    "tempUnit": "温度单位",
    "theme": "主题",
    "animation": "动画",
    "themeLight": "浅色",
    "themeDark": "深色",
    "themeAuto": "跟随系统",
    "motionFull": "完生动画",
    "motionReduced": "减弱动画",
    "motionOff": "关闭",
    "langEn": "English",
    "langJa": "日本語",
    "langZh": "简体中文",
    "backToTop": "回到顶部",
    "skipToContent": "跳到正文",
    "copyright": "© 2026 Japan Travel Guide. 为旅行者而作。",
    "quickLinks": "快速链接",
    "resources": "资源",
    "destinations": "目的地",
    "placeholder": "图片占位"
  },
  "hero": {
    "eyebrow": "实用的日本行程规划",
    "title": "有把握地规划日本之旅",
    "lead": "路线、城市、交通、预算与工具，偏实用。出发前请在官方渠道核实票价、通票与入境规定。",
    "ctaPrimary": "开始规划",
    "ctaSecondary": "打开旅行工具",
    "statCities": "座城市",
    "statRoutes": "条路线灵感",
    "statTips": "条旅行贴士",
    "heroImage": "黎明富士山"
  },
  "about": {
    "eyebrow": "列岛",
    "title": "关于日本",
    "desc": "四大主岛、无数传统，古老礼仪与未来设计并存。",
    "geoTitle": "地理",
    "geoText": "从北海道雪原到冲绳珊瑚礁，火山、森林与超大城市连绵。",
    "cultureTitle": "文化",
    "cultureText": "待客之道、季节美学，从茶道到动漫社群。",
    "historyTitle": "历史",
    "historyText": "幕府、明治维新与战后创新塑造今日景观。",
    "foodTitle": "美食",
    "foodText": "乡土料理与时令食材，米其林到深夜拉面皆有。",
    "transportTitle": "交通",
    "transportText": "铁路与交通卡发达，非常适合自由行。",
    "currencyTitle": "货币",
    "currencyText": "日元。城市普遍可刷卡，现金仍很有用。",
    "languageTitle": "语言",
    "languageText": "日语为主；主要交通枢纽常见英文标识。",
    "internetTitle": "网络",
    "internetText": "eSIM、随身Wi‑Fi与车站/咖啡馆免费网络。",
    "safetyTitle": "安全",
    "safetyText": "全球最安全的旅行地之一，仍需基本防盗意识。",
    "weatherTitle": "气候",
    "weatherText": "四季分明：春樱、夏湿、秋叶、北国冬雪。",
    "seasonsTitle": "最佳季节",
    "seasonsText": "3–5月与10–11月最受欢迎；淡季人少。",
    "etiquetteTitle": "礼仪",
    "etiquetteText": "列车保持安静、室内脱鞋、排队有序、敬重神社。",
    "whyTitle": "为何前往",
    "whyText": "未来都市、圣地山景与日常工艺在此优雅共存。",
    "photo1": "京都传统街巷",
    "photo2": "站台新干线",
    "photo3": "时令怀石料理"
  },
  "map": {
    "eyebrow": "导航",
    "title": "互动地图",
    "desc": "城市标记按大致经纬度放置。点击图钉或右侧列表打开。",
    "panelTitle": "跳转到城市",
    "panelHint": "位置对应真实地理。悬停高亮，点击打开城市页。"
  },
  "destinations": {
    "eyebrow": "14城",
    "title": "目的地总览",
    "desc": "距东京距离与气温随您的单位设置变化。"
  },
  "cities": {
    "tokyo": {
      "name": "东京",
      "blurb": "美食、时尚与无尽街区的霓虹首都。"
    },
    "kyoto": {
      "name": "京都",
      "blurb": "寺院、茶屋与古典日本之心。"
    },
    "osaka": {
      "name": "大阪",
      "blurb": "日本厨房——街头美食与活力。"
    },
    "nara": {
      "name": "奈良",
      "blurb": "古都、神鹿与大佛的宁静。"
    },
    "hiroshima": {
      "name": "广岛",
      "blurb": "和平纪念、大阪烧与宫岛门户。"
    },
    "yokohama": {
      "name": "横滨",
      "blurb": "港湾天际线与中华街。"
    },
    "hakone": {
      "name": "箱根",
      "blurb": "温泉、湖景与富士眺望。"
    },
    "nikko": {
      "name": "日光",
      "blurb": "森林中的华丽社寺。"
    },
    "kanazawa": {
      "name": "金泽",
      "blurb": "庭园、金箔与武家屋敷。"
    },
    "sapporo": {
      "name": "札幌",
      "blurb": "啤酒、雪祭与海鲜的北方之都。"
    },
    "fukuoka": {
      "name": "福冈",
      "blurb": "屋台与海岸风情的九州门户。"
    },
    "kobe": {
      "name": "神户",
      "blurb": "港口优雅、和牛与山海之间。"
    },
    "nagasaki": {
      "name": "长崎",
      "blurb": "层叠历史与山城海景。"
    },
    "okinawa": {
      "name": "冲绳",
      "blurb": "亚热带岛屿与碧蓝海水。"
    }
  },
  "routes": {
    "eyebrow": "行程",
    "title": "推荐路线",
    "desc": "从短途到深度主题行程。",
    "d5": "5天",
    "d7": "7天",
    "d10": "10天",
    "d14": "14天",
    "sakura": "樱花",
    "autumn": "红叶",
    "food": "美食",
    "anime": "动漫",
    "nature": "自然",
    "luxury": "奢华",
    "budget": "穷游",
    "day": "第",
    "content": {
      "d5": [
        "东京街区与天际线。",
        "日光或横滨一日游。",
        "新干线赴京都。",
        "伏见、岚山、祗园。",
        "大阪街头美食后离开。"
      ],
      "d7": [
        "东京：浅草与博物馆。",
        "涩谷新宿原宿。",
        "箱根温泉与富士。",
        "京都寺社。",
        "奈良半日。",
        "大阪城与道顿堀。",
        "缓冲/购物/离开。"
      ],
      "d10": [
        "东京东区。",
        "东京西岸潮流。",
        "镰仓或横滨。",
        "前往金泽等工艺之城。",
        "兼六园与茶屋街。",
        "京都第一天。",
        "京都第二天。",
        "广岛和平公园。",
        "宫岛。",
        "大阪收官。"
      ],
      "d14": [
        "东京三天弹性。",
        "富士五湖或箱根。",
        "京都经典。",
        "宇治与伏见稻荷。",
        "奈良。",
        "大阪美食。",
        "姬路城。",
        "广岛宫岛。",
        "直岛等可选。",
        "福冈屋台。",
        "太宰府或海岸。",
        "缓冲日。",
        "札幌海鲜。",
        "新千岁或经东京回国。"
      ],
      "sakura": [
        "东京按花期排公园。",
        "横滨滨海樱景。",
        "京都庭园。",
        "奈良公园野餐。",
        "大阪城公园。"
      ],
      "autumn": [
        "日光山中红叶。",
        "东京公园。",
        "岚山东福寺。",
        "宫岛红叶。",
        "箱根缆车。"
      ],
      "food": [
        "东京寿司拉面居酒屋。",
        "大阪章鱼烧大阪烧。",
        "京都怀石与豆腐料理。",
        "金泽海鲜市场。",
        "福冈豚骨与屋台。",
        "神户牛肉。"
      ],
      "anime": [
        "秋叶原与中野。",
        "吉卜力美术馆（需票）。",
        "台场数字艺术。",
        "京都影像氛围。",
        "大阪日本桥电器街。"
      ],
      "nature": [
        "上高地等（视季节）。",
        "箱根火山景。",
        "日光瀑布湖泊。",
        "宫岛山林。",
        "冲绳浮潜。"
      ],
      "luxury": [
        "东京顶级酒店/旅馆。",
        "高级寿司omakase。",
        "京都町家与茶道。",
        "箱根露天温泉旅馆。",
        "头等铁路与神户牛。"
      ],
      "budget": [
        "胶囊/青旅。",
        "便利店早餐。",
        "高速巴士城际。",
        "免费寺社与观景点。",
        "大阪街头小吃。",
        "仅用交通卡市内移动。"
      ]
    }
  },
  "food": {
    "eyebrow": "饮食",
    "title": "美食总览",
    "desc": "大类介绍；各地名物见城市页。",
    "sushi": "寿司与刺身",
    "sushiText": "从回转寿司到高级omakase。",
    "ramen": "拉面",
    "ramenText": "酱油、味噌、豚骨等地方汤头。",
    "street": "街头小吃",
    "streetText": "章鱼烧、鲷鱼烧、烤串与祭典摊位。",
    "kaiseki": "怀石",
    "kaisekiText": "呈现季节的多道精品料理。",
    "wagyu": "和牛与烧肉",
    "wagyuText": "桌边炙烤或牛排享用顶级霜降。",
    "sweets": "甜品与茶",
    "sweetsText": "抹茶、和果子与喫茶店文化。",
    "linkHint": "前往城市页看当地特色 →"
  },
  "attractions": {
    "eyebrow": "游览",
    "title": "景点分类",
    "desc": "按类型浏览；细节在城市页。",
    "temples": "寺院",
    "shrines": "神社",
    "castles": "城郭",
    "mountains": "山岳",
    "parks": "国立公园",
    "museums": "博物馆",
    "shopping": "购物街区",
    "theme": "主题乐园",
    "anime": "动漫圣地",
    "nightlife": "夜生活"
  },
  "transport": {
    "eyebrow": "出行",
    "title": "交通指南",
    "desc": "支撑多城市行程的全国交通体系。",
    "shinkansen": "新干线",
    "shinkansenText": "连接主要城市的高速铁路。",
    "jrpass": "JR Pass",
    "jrpassText": "面向游客的周游券，请按路线核算是否划算。",
    "ic": "交通卡",
    "icText": "Suica、Pasmo、ICOCA等，火车公交便利店通用。",
    "metro": "地铁与私铁",
    "metroText": "英文app与站号系统清晰。",
    "bus": "巴士",
    "busText": "高速巴士省钱；市内巴士补铁路空白。",
    "flights": "国内航班",
    "flightsText": "往返北海道、九州、冲绳更省时。",
    "ferries": "渡轮",
    "ferriesText": "濑户内海与冲绳等岛屿行程常用。"
  },
  "budget": {
    "eyebrow": "花费",
    "title": "预算计算器",
    "desc": "以日元估算，并用实时汇率换算。",
    "days": "天数",
    "accommodation": "住宿",
    "hostel": "青旅/胶囊",
    "business": "商务酒店",
    "mid": "中档酒店",
    "luxury": "奢华/温泉旅馆",
    "transport": "交通方式",
    "local": "以市内交通为主",
    "jrpass": "铁路为主/JR Pass",
    "private": "出租车与包车",
    "food": "餐饮预算",
    "foodBudget": "节约",
    "foodMid": "均衡",
    "foodGourmet": "美食向",
    "attractions": "门票",
    "attrLight": "轻度观光",
    "attrStandard": "标准",
    "attrHeavy": "门票较多",
    "currency": "显示货币",
    "total": "预估总计",
    "lodging": "住宿",
    "transportLine": "交通",
    "meals": "餐饮",
    "sights": "景点",
    "misc": "杂费缓冲",
    "perDay": "日均",
    "ratesLive": "实时汇率",
    "ratesCached": "缓存汇率",
    "ratesFallback": "备用汇率"
  },
  "packing": {
    "eyebrow": "行前",
    "title": "行李清单",
    "desc": "点击勾选；保存在本浏览器。",
    "reset": "重置",
    "checkAll": "全选",
    "cat": {
      "documents": "证件",
      "clothing": "衣物",
      "tech": "数码",
      "health": "健康",
      "extras": "其他"
    },
    "item": {
      "passport": "护照与签证材料",
      "tickets": "机票酒店确认单",
      "jrpass": "JR Pass兑换证",
      "insurance": "旅行保险",
      "copies": "证件电子备份",
      "layers": "分层穿搭衣物",
      "comfortableShoes": "舒适步行鞋",
      "rainJacket": "轻便雨衣",
      "formalOption": "稍正式服装",
      "socks": "备用袜子",
      "phone": "手机与充电器",
      "adapter": "A/B 转换插头",
      "powerBank": "充电宝",
      "earbuds": "耳机",
      "camera": "相机",
      "meds": "常用药",
      "mask": "口罩",
      "sanitizer": "免洗消毒液",
      "sunscreen": "防晒",
      "motion": "晕车药",
      "cashYen": "部分日元现金",
      "toteBag": "可折叠手提袋",
      "phrasebook": "离线短语包",
      "umbrella": "折叠伞",
      "snacks": "熟悉的零食"
    }
  },
  "seasons": {
    "eyebrow": "何时去",
    "title": "季节指南",
    "desc": "温度随℃/℉设置变化。",
    "spring": "春",
    "summer": "夏",
    "autumn": "秋",
    "winter": "冬",
    "springText": "樱花与温和天气，热门景点较拥挤。",
    "summerText": "祭典烟火与南部海滩，湿热需防暑。",
    "autumnText": "红叶与晴空，适合徒步，尽早预订。",
    "winterText": "灯饰、温泉与北国雪景。",
    "clothing": "着装",
    "activities": "活动",
    "springClothes": "薄外套与分层",
    "summerClothes": "透气衣物、帽、伞",
    "autumnClothes": "毛衣与薄夹克",
    "winterClothes": "大衣、保暖、防水靴（北方）",
    "springAct": "赏樱、庭园、城市漫步",
    "summerAct": "祭典、海岛、高原避暑",
    "autumnAct": "赏枫、徒步、美食",
    "winterAct": "温泉、滑雪、灯饰"
  },
  "festivals": {
    "eyebrow": "庆典",
    "title": "主要节日",
    "desc": "全年代表性活动一览。",
    "items": [
      {
        "month": "2月",
        "name": "札幌雪节",
        "text": "大通公园冰雪雕塑盛宴。"
      },
      {
        "month": "3–4月",
        "name": "樱花祭",
        "text": "全国进入赏樱高峰。"
      },
      {
        "month": "5月",
        "name": "三社祭（东京）",
        "text": "浅草大型神舆祭典。"
      },
      {
        "month": "7月",
        "name": "祗园祭（京都）",
        "text": "以山鉾巡行为名的月度祭典。"
      },
      {
        "month": "8月",
        "name": "阿波舞",
        "text": "德岛热情夏日群舞。"
      },
      {
        "month": "8月",
        "name": "盂兰盆",
        "text": "祭祖与归省、盆踊。"
      },
      {
        "month": "11月",
        "name": "红叶点灯",
        "text": "各地寺社庭园夜间特别公开。"
      },
      {
        "month": "12月",
        "name": "冬季灯饰",
        "text": "城市大规模灯光秀。"
      }
    ]
  },
  "tips": {
    "eyebrow": "行前须知",
    "title": "通用旅行贴士",
    "desc": "全国通用；地区补充见城市页。",
    "etiquette": "礼仪",
    "etiquetteText": "列车少通话、排队有序、餐厅无需小费。",
    "phrases": "实用短语",
    "phrasesText": "谢谢／不好意思／您懂英语吗？",
    "emergency": "紧急电话",
    "emergencyText": "警察110 · 消防急救119 · Japan Helpline 0570-000-911",
    "sim": "SIM 与 eSIM",
    "simText": "出发前买 eSIM 或在机场办理。",
    "wifi": "Wi‑Fi",
    "wifiText": "车站便利店咖啡馆常有免费网络；随身Wi‑Fi也可靠。",
    "cash": "现金与刷卡",
    "cashText": "城市多可刷卡；乡间、神社、小店备现金。",
    "tipping": "小费",
    "tippingText": "通常不需要。",
    "transit": "乘车礼仪",
    "transitText": "优先席、安静车厢、高峰背包前置。"
  },
  "faq": {
    "eyebrow": "问答",
    "title": "常见问题",
    "desc": "初访与回头客都适用。",
    "q1": "需要买 JR Pass 吗？",
    "a1": "长途铁路多才划算；只玩东京用交通卡即可。",
    "q2": "日本贵吗？",
    "a2": "可高可低：便利店、商务酒店与地方城市能控预算。",
    "q3": "樱花季节？",
    "a3": "东京京都多在3月末至4月初；南早北晚。",
    "q4": "自来水能喝吗？",
    "a4": "可以，日本自来水可安全饮用。",
    "q5": "带多少现金？",
    "a5": "先备1–3万日元，可用7‑11 ATM 取款。",
    "q6": "英语普及吗？",
    "a6": "大站与酒店基本可沟通，翻译app很有用。",
    "q7": "能用信用卡吗？",
    "a7": "城市大多可以；部分寺社与乡间仍偏爱现金。",
    "q8": "素食或过敏？",
    "a8": "大城市选择更多；留意高汤并准备过敏表达。"
  },
  "galleryCta": {
    "title": "摄影图库",
    "desc": "按城市、地点与季节浏览；点开即可查看原图。",
    "button": "进入图库"
  },
  "gallery": {
    "backToGuide": "返回指南",
    "eyebrow": "摄影图库",
    "heading": "日本瞬间",
    "pageIntro": "按城市、季节与分类浏览。网格使用缩略图；打开后先看中等清晰度，需要时可加载原图。",
    "searchPlaceholder": "搜索名称、地点、城市、时间…",
    "sortLocation": "地点",
    "sortCity": "城市",
    "sortCategory": "分类",
    "qualityMedium": "中等",
    "qualityFull": "原图",
    "filterAll": "全部",
    "filterCities": "城市",
    "filterTemples": "寺院",
    "filterShrines": "神社",
    "filterNature": "自然",
    "filterFood": "美食",
    "filterNeon": "霓虹 / 夜景",
    "filterTravel": "旅行",
    "filterCulture": "文化",
    "photoCount": "张",
    "loadFull": "加载原图质量",
    "loadingPhoto": "正在加载照片…",
    "managerHint": "用本地图库管理器添加：双击 Add Photos.command，或运行 python3 tools/gallery_manager.py"
  },
  "funFacts": {
    "eyebrow": "你知道吗？",
    "title": "趣味冷知识",
    "desc": "换一条再看。",
    "refresh": "下一条",
    "items": {
      "0": "日本由14125个岛屿组成，其中约430个有人居住。",
      "1": "自动贩卖机从热咖啡到雨伞什么都卖。",
      "2": "东京地铁每天运送数百万人，以准点著称。",
      "3": "日本便利店数量超过一万五千家。",
      "4": "富士山是活火山，上次喷发在1707年。",
      "5": "新干线长期保持无因碰撞/脱轨导致的乘客死亡事故纪录。",
      "6": "日本KitKat有芥末、清酒等限定口味。",
      "7": "相扑力士会撒盐净化土俵。",
      "8": "胶囊旅馆1970年代末起源于大阪。",
      "9": "日本有数千处温泉地。",
      "10": "新干线车头造型也用于降低隧道微气压波。",
      "11": "方形西瓜多为观赏与礼品用途。",
      "12": "喝拉面发出声音有时被视为赞美。",
      "13": "井盖常有各城市独特图案。",
      "14": "“Tsunami”一词来自日语。",
      "15": "奈良的鹿有时会鞠躬要小饼干。",
      "16": "东京旧称江户。",
      "17": "日本有多列主题观光列车。",
      "18": "圣诞蛋糕在日本很流行，尽管圣诞节不是法定假日。",
      "19": "机器人餐厅把接待变成科幻体验。",
      "20": "涩谷十字路口一次绿灯可有数千人穿越。",
      "21": "千纸鹤象征和平与祈愿。",
      "22": "收集御朱印是参拜乐趣之一。",
      "23": "和食被列入联合国教科文非物质遗产。",
      "24": "有些乡村车站由猫担任“站长”。",
      "25": "弹珠机厅有独特的声光氛围。",
      "26": "皇居占据东京市中心大片绿地。",
      "27": "红叶预报与樱花预报一样受关注。",
      "28": "河豚料理需要专门执照。",
      "29": "日本并用西历与和历。",
      "30": "公共伞架常体现高度信任。",
      "31": "榻榻米也是传统的房间面积单位。",
      "32": "函馆、神户等夜景常被列入“三大夜景”。",
      "33": "抹茶曾属于贵族与茶人世界。",
      "34": "7‑Eleven蛋沙拉三明治深受旅客喜爱。",
      "35": "部分线路高峰有女性专用车厢。",
      "36": "赏花宴会传统可追溯数百年。",
      "37": "冲绳拥有不同于本土的语言与文化根脉。",
      "38": "金泽金箔会出现在甜品上。",
      "39": "智能马桶盖在许多地方已成标配。",
      "40": "车站便当让火车旅行变成美食之旅。",
      "41": "濑户内海直岛等以艺术岛闻名。",
      "42": "札幌雪节以巨型雪雕著称。",
      "43": "京都拥有数千座寺社。",
      "44": "和牛评级关注霜降与肉质。",
      "45": "夏季全国各地举办花火大会。",
      "46": "旅馆常为客人准备浴衣。",
      "47": "“森林浴”概念于1980年代在日本提出。"
    }
  },

  "tools": {
    "backToGuide": "返回指南",
    "eyebrow": "旅行工具",
    "heading": "更清晰地<em>规划日本之旅</em>",
    "intro": "预算规划、行李清单、汇率、世界时钟、消费税、JR Pass 粗算、铁路估算与紧急电话。",
    "currencyLabel": "实时汇率换算",
    "currencySub": "frankfurter.dev 每日汇率（以日元为中心）。",
    "amount": "金额",
    "from": "从",
    "to": "到",
    "clockLabel": "世界时钟",
    "clockSub": "日本全国统一 JST。便于与家乡对时。",
    "tzTokyo": "东京",
    "tzOsaka": "大阪",
    "tzSapporo": "札幌",
    "tzNaha": "那霸（冲绳）",
    "tzShanghai": "上海",
    "tzSeoul": "首尔",
    "tzSydney": "悉尼",
    "tzLondon": "伦敦",
    "tzNewYork": "纽约",
    "tzUtc": "UTC",
    "taxLabel": "日本消费税",
    "taxSub": "标准税率多为 10%（部分食品 8%）。通常无需小费。",
    "taxBill": "税前价格（¥）",
    "taxRate": "税率 %",
    "taxOnly": "税额",
    "preTax": "税前",
    "noTip": "日本一般不收小费——优质服务已是文化的一部分。",
    "jrLabel": "JR Pass 粗算",
    "jrSub": "周游券与长途车票的粗略比较。请以官方价格为准。",
    "jrDays": "行程天数",
    "jrLegs": "长途铁路段数（约）",
    "jrWorthIt": "周游券可能更划算",
    "jrMaybeNot": "单买车票可能更便宜",
    "jrSave": "约可节省",
    "jrDiff": "约差额",
    "jrPassEst": "周游券估算",
    "jrTicketsEst": "车票估算",
    "jrDisclaimer": "仅供参考 · 请查官方",
    "railLabel": "新干线票价参考",
    "railSub": "普通车单程约价，仅供规划。",
    "railRoute": "线路",
    "railTrips": "单程次数",
    "railOneWay": "单程约",
    "railDisclaimer": "非购票系统 · 车次/座席不同价格不同",
    "emergencyLabel": "日本常用电话",
    "emergencySub": "请提前保存。",
    "emPolice": "警察",
    "emFire": "消防与急救",
    "emCoast": "海上保安厅",
    "emHelpline": "Japan Helpline（英语友好）",
    "emMedical": "非紧急医疗咨询（视地区）",
    "emNote": "也请保存本国驻日使领馆电话。"
  },
  "legal": {
    "privacyLink": "隐私政策",
    "termsLink": "使用条款",
    "privacyTitle": "隐私政策",
    "termsTitle": "使用条款"
  },


  "plan": {
    "eyebrow": "如何使用本指南",
    "title": "扎实行程四步走",
    "desc": "从上到下推进，再打开各城市页。预订前请在官方渠道确认票价与入境规定。",
    "step1Title": "选择城市",
    "step1Text": "按距东京距离、季节与建议停留比较14城。",
    "step2Title": "规划路线",
    "step2Text": "以5–14日或主题行程为骨架。",
    "step3Title": "搞定交通",
    "step3Text": "交通卡、新干线基础，以及JR Pass/地区周游券是否划算。",
    "step4Title": "核算费用",
    "step4Text": "在工具页查看汇率、税费、铁路估算与紧急电话。",
    "trustNote": "票价与通票规则会变。请向JR、航司与 japan.travel（JNTO）核实后再预订。"
  },
  "official": {
    "eyebrow": "官方与实用",
    "title": "可依赖的信息源",
    "desc": "本站助你规划。签证、安全、通票细则请以JNTO与运营商为准。",
    "jnto": "Travel Japan（JNTO）",
    "jntoDesc": "官方目的地与行程规划中心",
    "jr": "JR Pass 指南（JNTO）",
    "jrDesc": "适用范围、指定席与地区通票思路",
    "train": "火车与巴士（JNTO）",
    "trainDesc": "乘车方式、车票、IC卡与礼仪",
    "hotline": "日本游客热线",
    "hotlineDesc": "多语言游客支持",
    "safety": "Safety Tips",
    "safetyDesc": "紧急与灾害相关旅行信息",
    "jrOfficial": "japanrailpass.net",
    "jrOfficialDesc": "JR Pass 官方购买与规则"
  },

  "footer": {
    "aboutBlurb": "为多城市日本之旅打造的精致规划伙伴。"
  },
  "cityPage": {
    "back": "全部目的地",
    "distanceNote": "距东京站大致距离",
    "stayValue": "{n} 天",
    "budgetDay": "每日（中档、不含长途铁路）",
    "weatherAvg": "白天气温参考",
    "gettingThere": "抵达方式",
    "moreInGallery": "照片将在图库中更新"
  },
  "cityContent": {
    "tokyo": {
      "tagline": "永无止境的霓虹之都",
      "overview": "浅草历史、涩谷潮流、银座精致与明治神宫的森林——东京是城中之城。",
      "bestTime": "3–5月与10–11月；夏日祭典热闹但潮湿。",
      "stay": "4–5",
      "budget": "¥12,000–25,000",
      "weather": "夏湿热、冬温和，春秋最美。",
      "gettingThere": "成田与羽田机场；JR、地铁与私铁密集。",
      "food": [
        {
          "e": "🍣",
          "n": "江户前寿司",
          "d": "从平价到传奇的柜台握寿司。"
        },
        {
          "e": "🍜",
          "n": "东京拉面",
          "d": "酱油风与个性名店。"
        },
        {
          "e": "🍢",
          "n": "烤串横丁",
          "d": "铁路桥下的烟火气。"
        },
        {
          "e": "🍰",
          "n": "百货地下甜品",
          "d": "蛋糕与伴手礼天堂。"
        }
      ],
      "attractions": [
        {
          "c": "temples",
          "n": "浅草寺",
          "d": "东京标志性参道与寺院。"
        },
        {
          "c": "shrines",
          "n": "明治神宫",
          "d": "原宿旁的森林神社。"
        },
        {
          "c": "museums",
          "n": "teamLab／博物馆",
          "d": "数字艺术与顶级展览。"
        },
        {
          "c": "shopping",
          "n": "银座与新宿",
          "d": "奢侈品到电器。"
        },
        {
          "c": "anime",
          "n": "秋叶原",
          "d": "二次元与游戏厅。"
        },
        {
          "c": "nightlife",
          "n": "黄金街与露台酒吧",
          "d": "小酒吧与天际线。"
        }
      ],
      "transportLocal": "办理Suica/Pasmo；拥堵时优先轨道交通。步行街区往往比地图感觉更远。",
      "tips": [
        "热门票务尽早网购。",
        "晚点入住可用车站储物柜。",
        "银座步行者天国适合拍照。",
        "便利店能解决大部分遗忘物。"
      ],
      "highlights": [
        "涩谷十字路口",
        "浅草与晴空塔",
        "日光/箱根/横滨一日游"
      ]
    },
    "kyoto": {
      "tagline": "古典日本之心",
      "overview": "数千寺社、茶屋、禅庭与鸭川怀石——文化古都京都。",
      "bestTime": "3–4月樱花与11月红叶；尽量选工作日。",
      "stay": "3–4",
      "budget": "¥11,000–22,000",
      "weather": "夏热冬凉，春秋光影最佳。",
      "gettingThere": "东京新干线约2小时15分。",
      "food": [
        {
          "e": "🍲",
          "n": "怀石",
          "d": "根植茶道美学的时令套餐。"
        },
        {
          "e": "🍵",
          "n": "抹茶与和果子",
          "d": "宇治茶与精致甜点。"
        },
        {
          "e": "🥣",
          "n": "汤豆腐",
          "d": "寺町的素雅滋味。"
        },
        {
          "e": "🍜",
          "n": "京都拉面",
          "d": "清淡酱油或鸡汤系。"
        }
      ],
      "attractions": [
        {
          "c": "shrines",
          "n": "伏见稻荷",
          "d": "千本鸟居。"
        },
        {
          "c": "temples",
          "n": "金阁寺与清水寺",
          "d": "金楼与山际景色。"
        },
        {
          "c": "shopping",
          "n": "锦市场",
          "d": "京都厨房。"
        },
        {
          "c": "parks",
          "n": "岚山",
          "d": "竹林与河畔。"
        }
      ],
      "transportLocal": "巴士方便但拥挤；地铁+步行往往更舒适。",
      "tips": [
        "热门点开门即到。",
        "寺社保持安静。",
        "祗园尊重摄影礼仪。",
        "餐厅请提前订位。"
      ],
      "highlights": [
        "伏见稻荷",
        "宇治饮茶",
        "季节点灯"
      ]
    },
    "osaka": {
      "tagline": "美食与欢笑之城",
      "overview": "城郭、道顿堀霓虹、地下街与街头小吃之都。",
      "bestTime": "春秋最佳；夏日祭典热闹。",
      "stay": "2–3",
      "budget": "¥10,000–20,000",
      "weather": "盆地夏季炎热。",
      "gettingThere": "新大阪站；关西机场交通便利。",
      "food": [
        {
          "e": "🐙",
          "n": "章鱼烧",
          "d": "外酥内软。"
        },
        {
          "e": "🥞",
          "n": "大阪烧",
          "d": "当地铁板风味。"
        },
        {
          "e": "🍜",
          "n": "串炸",
          "d": "严禁二次蘸酱！"
        },
        {
          "e": "🐡",
          "n": "割烹",
          "d": "不止街头，也有精致料理。"
        }
      ],
      "attractions": [
        {
          "c": "castles",
          "n": "大阪城",
          "d": "地标天守与公园。"
        },
        {
          "c": "nightlife",
          "n": "道顿堀",
          "d": "霓虹与格力高招牌。"
        },
        {
          "c": "theme",
          "n": "环球影城",
          "d": "大型主题乐园。"
        },
        {
          "c": "shopping",
          "n": "心斋桥",
          "d": "商店街与品牌。"
        }
      ],
      "transportLocal": "地铁与环状线覆盖主要景点。",
      "tips": [
        "空腹到访最正确。",
        "假期留意USJ票。",
        "新世界复古又平价。",
        "可作奈良神户京都基地。"
      ],
      "highlights": [
        "道顿堀之夜",
        "大阪城",
        "街头觅食"
      ]
    },
    "nara": {
      "tagline": "古都与神鹿",
      "overview": "东大寺大佛与奈良公园的鹿迎接你。",
      "bestTime": "春秋；清晨更佳。",
      "stay": "1–2",
      "budget": "¥9,000–16,000",
      "weather": "公园夏季炎热。",
      "gettingThere": "京都/大阪急行约40–45分钟。",
      "food": [
        {
          "e": "🍪",
          "n": "鹿饼干文化",
          "d": "喂鹿小饼与伴手礼。"
        },
        {
          "e": "🍜",
          "n": "三轮素面",
          "d": "细面乡土味。"
        },
        {
          "e": "🍠",
          "n": "柿叶寿司",
          "d": "柿叶包的押寿司。"
        },
        {
          "e": "🍵",
          "n": "中谷堂麻薯",
          "d": "以快速捣麻薯闻名。"
        }
      ],
      "attractions": [
        {
          "c": "temples",
          "n": "东大寺",
          "d": "大佛殿。"
        },
        {
          "c": "shrines",
          "n": "春日大社",
          "d": "灯笼参道。"
        },
        {
          "c": "parks",
          "n": "奈良公园",
          "d": "鹿与绿地。"
        },
        {
          "c": "museums",
          "n": "奈良国立博物馆",
          "d": "佛教美术。"
        }
      ],
      "transportLocal": "公园核心可步行；远端坐巴士。",
      "tips": [
        "零食收好，鹿很积极。",
        "时间紧可与京都同游。",
        "二月堂视野好。",
        "避开旅游车高峰。"
      ],
      "highlights": [
        "大佛",
        "春日灯笼",
        "公园漫步"
      ]
    },
    "hiroshima": {
      "tagline": "和平与海上鸟居",
      "overview": "和平纪念公园与宫岛门户，还有广岛风大阪烧。",
      "bestTime": "春秋。",
      "stay": "2",
      "budget": "¥10,000–18,000",
      "weather": "濑户内气候相对温和。",
      "gettingThere": "新干线+路面电车+宫岛轮渡。",
      "food": [
        {
          "e": "🥞",
          "n": "广岛烧",
          "d": "加面的分层做法。"
        },
        {
          "e": "🦪",
          "n": "牡蛎",
          "d": "时令濑户内海味。"
        },
        {
          "e": "🍜",
          "n": "尾道拉面",
          "d": "近郊酱油拉面。"
        },
        {
          "e": "🍁",
          "n": "红叶馒头",
          "d": "宫岛经典伴手礼。"
        }
      ],
      "attractions": [
        {
          "c": "museums",
          "n": "和平纪念资料馆",
          "d": "必访历史。"
        },
        {
          "c": "shrines",
          "n": "严岛神社",
          "d": "海上鸟居。"
        },
        {
          "c": "castles",
          "n": "广岛城",
          "d": "重建城郭与展览。"
        },
        {
          "c": "parks",
          "n": "缩景园",
          "d": "精致庭园。"
        }
      ],
      "transportLocal": "电车很方便。",
      "tips": [
        "和平公园请保持安静。",
        "鸟居观感随潮汐变化。",
        "夜晚吃广岛烧。",
        "可加艺术岛行程。"
      ],
      "highlights": [
        "和平公园",
        "宫岛",
        "广岛烧"
      ]
    },
    "yokohama": {
      "tagline": "东京隔壁的港湾城市",
      "overview": "未来港、中华街与杯面博物馆。",
      "bestTime": "全年适宜；夜景出色。",
      "stay": "1–2",
      "budget": "¥11,000–20,000",
      "weather": "海风让夏季稍舒适。",
      "gettingThere": "距东京中心30–40分钟。",
      "food": [
        {
          "e": "🥟",
          "n": "中华街",
          "d": "点心与肉包。"
        },
        {
          "e": "🍜",
          "n": "家系拉面",
          "d": "发源于横滨的浓厚汤头。"
        },
        {
          "e": "☕",
          "n": "港湾咖啡",
          "d": "海景咖啡。"
        },
        {
          "e": "🍰",
          "n": "西点",
          "d": "港口城市甜点传统。"
        }
      ],
      "attractions": [
        {
          "c": "museums",
          "n": "杯面博物馆",
          "d": "自制杯面体验。"
        },
        {
          "c": "shopping",
          "n": "港未来",
          "d": "现代滨水综合体。"
        },
        {
          "c": "parks",
          "n": "山下公园",
          "d": "经典海滨步道。"
        },
        {
          "c": "nightlife",
          "n": "湾区夜色",
          "d": "港口灯火。"
        }
      ],
      "transportLocal": "港未来线+步行。",
      "tips": [
        "适合东京半日游。",
        "红砖仓库配日落。",
        "三溪园值得一去。",
        "雨天适合逛博物馆。"
      ],
      "highlights": [
        "港湾天际线",
        "中华街",
        "摩天轮"
      ]
    },
    "hakone": {
      "tagline": "可眺富士的温泉乡",
      "overview": "缆车、芦之湖、美术馆与温泉旅馆。",
      "bestTime": "冬日晴天赏富士；秋赏红叶。",
      "stay": "1–2",
      "budget": "¥15,000–35,000",
      "weather": "比东京更凉。",
      "gettingThere": "特急或新干线+巴士约90分钟；周游券方便。",
      "food": [
        {
          "e": "🍜",
          "n": "汤叶料理",
          "d": "山中旅馆经典。"
        },
        {
          "e": "🥚",
          "n": "黑玉子",
          "d": "硫磺泉煮蛋。"
        },
        {
          "e": "🍲",
          "n": "旅馆怀石",
          "d": "住宿晚餐。"
        },
        {
          "e": "🍰",
          "n": "温泉馒头",
          "d": "热乎伴手礼。"
        }
      ],
      "attractions": [
        {
          "c": "mountains",
          "n": "大涌谷",
          "d": "火山山谷。"
        },
        {
          "c": "parks",
          "n": "芦之湖",
          "d": "晴日富士。"
        },
        {
          "c": "museums",
          "n": "雕刻之森",
          "d": "户外雕塑。"
        },
        {
          "c": "shrines",
          "n": "箱根神社",
          "d": "湖畔神社。"
        }
      ],
      "transportLocal": "火车缆车游船环线。",
      "tips": [
        "关注大涌谷管制。",
        "富士看天气。",
        "包场温泉需预约。",
        "可一日游，过夜更好。"
      ],
      "highlights": [
        "缆车环线",
        "温泉",
        "芦之湖"
      ]
    },
    "nikko": {
      "tagline": "森林中的社寺",
      "overview": "东照宫极彩雕刻、瀑布与奥日光自然。",
      "bestTime": "红叶季尤其著名。",
      "stay": "1–2",
      "budget": "¥10,000–18,000",
      "weather": "山区偏凉，冬季有雪。",
      "gettingThere": "浅草特急约2小时。",
      "food": [
        {
          "e": "🍜",
          "n": "汤叶荞麦",
          "d": "当地风味。"
        },
        {
          "e": "🔥",
          "n": "味噌料理",
          "d": "山味。"
        },
        {
          "e": "Trout",
          "n": "河鱼",
          "d": "高原鱼肴。"
        },
        {
          "e": "🍡",
          "n": "参道甜食",
          "d": "门前小路小吃。"
        }
      ],
      "attractions": [
        {
          "c": "shrines",
          "n": "东照宫",
          "d": "华丽社殿。"
        },
        {
          "c": "mountains",
          "n": "华严瀑布",
          "d": "自中禅寺湖落下。"
        },
        {
          "c": "parks",
          "n": "奥日光",
          "d": "徒步高原。"
        },
        {
          "c": "temples",
          "n": "轮王寺",
          "d": "圣地寺院。"
        }
      ],
      "transportLocal": "中禅寺方向需巴士。",
      "tips": [
        "东照宫尽早到。",
        "雨后石阶湿滑。",
        "上午社寺下午自然。",
        "红叶周末很挤。"
      ],
      "highlights": [
        "东照宫",
        "华严瀑",
        "杉树林荫"
      ]
    },
    "kanazawa": {
      "tagline": "庭园与金箔之城",
      "overview": "兼六园、茶屋街、海鲜与工艺保存完好。",
      "bestTime": "春秋；冬雪亦有风情。",
      "stay": "2",
      "budget": "¥11,000–20,000",
      "weather": "日本海侧冬季多雪。",
      "gettingThere": "北陆新干线自东京约2.5小时。",
      "food": [
        {
          "e": "🍣",
          "n": "近江町市场",
          "d": "清晨海鲜。"
        },
        {
          "e": "🥇",
          "n": "金箔冰淇淋",
          "d": "闪亮伴手礼。"
        },
        {
          "e": "🍣",
          "n": "治部煮与加贺料理",
          "d": "乡土精致菜。"
        },
        {
          "e": "🍵",
          "n": "茶屋甜品",
          "d": "东茶屋街。"
        }
      ],
      "attractions": [
        {
          "c": "parks",
          "n": "兼六园",
          "d": "日本三名园之一。"
        },
        {
          "c": "castles",
          "n": "金泽城公园",
          "d": "毗邻庭园。"
        },
        {
          "c": "shopping",
          "n": "东茶屋",
          "d": "茶屋街景。"
        },
        {
          "c": "museums",
          "n": "21世纪美术馆",
          "d": "当代艺术。"
        }
      ],
      "transportLocal": "循环巴士+步行。",
      "tips": [
        "查看庭园联票。",
        "市场早去。",
        "适合夹在东京与京都之间。",
        "可体验金箔工艺。"
      ],
      "highlights": [
        "兼六园",
        "茶屋街",
        "市场寿司"
      ]
    },
    "sapporo": {
      "tagline": "啤酒与冰雪的北国之都",
      "overview": "海鲜、拉面、雪节与滑雪的基地。",
      "bestTime": "2月雪节；夏季清凉。",
      "stay": "2–3",
      "budget": "¥11,000–21,000",
      "weather": "冬雪夏爽，秋色美。",
      "gettingThere": "新千岁机场最方便。",
      "food": [
        {
          "e": "🦀",
          "n": "海鲜盖饭",
          "d": "蟹、海胆、鱼子。"
        },
        {
          "e": "🍜",
          "n": "味噌拉面",
          "d": "札幌风。"
        },
        {
          "e": "🍺",
          "n": "啤酒堂",
          "d": "成吉思汗烤肉与啤酒。"
        },
        {
          "e": "🧀",
          "n": "乳品甜点",
          "d": "北海道牛奶。"
        }
      ],
      "attractions": [
        {
          "c": "parks",
          "n": "大通公园",
          "d": "节日中轴。"
        },
        {
          "c": "museums",
          "n": "啤酒博物馆",
          "d": "可试饮。"
        },
        {
          "c": "mountains",
          "n": "藻岩山等",
          "d": "夜景与滑雪。"
        },
        {
          "c": "shopping",
          "n": "狸小路",
          "d": "拱廊商店街。"
        }
      ],
      "transportLocal": "地铁三线；冬季防滑。",
      "tips": [
        "雪节住宿尽早订。",
        "可一日游小樽。",
        "汤咖喱也是名物。",
        "交通常以飞机更省时。"
      ],
      "highlights": [
        "雪节",
        "市场早餐",
        "味噌拉面"
      ]
    },
    "fukuoka": {
      "tagline": "九州门户",
      "overview": "屋台、豚骨拉面、机场与博多站都很近。",
      "bestTime": "春秋。",
      "stay": "2–3",
      "budget": "¥9,000–18,000",
      "weather": "冬季相对温和。",
      "gettingThere": "博多站与福冈机场靠近市中心。",
      "food": [
        {
          "e": "🍜",
          "n": "博多豚骨",
          "d": "细面与加面。"
        },
        {
          "e": "🍢",
          "n": "屋台",
          "d": "夜间露天摊。"
        },
        {
          "e": "🐟",
          "n": "明太子",
          "d": "名产。"
        },
        {
          "e": "🥟",
          "n": "饺子与牛杂锅",
          "d": "乡土火锅。"
        }
      ],
      "attractions": [
        {
          "c": "shrines",
          "n": "栉田神社",
          "d": "祭典神社。"
        },
        {
          "c": "temples",
          "n": "太宰府天满宫",
          "d": "学问之神一日游。"
        },
        {
          "c": "shopping",
          "n": "天神与运河城",
          "d": "购物都会。"
        },
        {
          "c": "parks",
          "n": "大濠公园",
          "d": "市中心湖畔。"
        }
      ],
      "transportLocal": "地铁与巴士。",
      "tips": [
        "拉面尽早排队。",
        "屋台点餐保持礼貌。",
        "九州巡游好基地。",
        "可看南藏院大佛。"
      ],
      "highlights": [
        "屋台夜",
        "豚骨",
        "太宰府"
      ]
    },
    "kobe": {
      "tagline": "山海之间的港口都会",
      "overview": "神户牛、爵士、北野异人馆与夜景。",
      "bestTime": "春秋；冬季灯饰有名。",
      "stay": "1–2",
      "budget": "¥12,000–30,000",
      "weather": "濑户内侧较温和。",
      "gettingThere": "距大阪约30分钟；新神户站。",
      "food": [
        {
          "e": "🥩",
          "n": "神户牛",
          "d": "牛排与铁板烧。"
        },
        {
          "e": "🍞",
          "n": "面包文化",
          "d": "知名烘焙。"
        },
        {
          "e": "🍷",
          "n": "滩区清酒",
          "d": "酒藏参观。"
        },
        {
          "e": "🍰",
          "n": "港湾甜品",
          "d": "西式咖啡。"
        }
      ],
      "attractions": [
        {
          "c": "mountains",
          "n": "六甲夜景",
          "d": "缆车展望。"
        },
        {
          "c": "museums",
          "n": "北野异人馆",
          "d": "异国风宅邸。"
        },
        {
          "c": "shopping",
          "n": "港湾乐园",
          "d": "滨水商业。"
        },
        {
          "c": "parks",
          "n": "美利坚公园",
          "d": "港口纪念空间。"
        }
      ],
      "transportLocal": "JR与阪急阪神。",
      "tips": [
        "牛肉晚餐请预约。",
        "可搭配大阪或姬路。",
        "夜景观光注意末班。",
        "北野适合晨光。"
      ],
      "highlights": [
        "神户牛",
        "港湾",
        "北野"
      ]
    },
    "nagasaki": {
      "tagline": "山丘与港湾的历史之城",
      "overview": "西洋、中国与日本交汇的港口；兼具美食与和平教育。",
      "bestTime": "春秋。",
      "stay": "2",
      "budget": "¥10,000–18,000",
      "weather": "冬温和夏湿热。",
      "gettingThere": "博多特急海鸥号或飞机。",
      "food": [
        {
          "e": "🍜",
          "n": "什锦面与皿乌冬",
          "d": "长崎面条。"
        },
        {
          "e": "🍰",
          "n": "长崎蛋糕",
          "d": "南蛮点心谱系。"
        },
        {
          "e": "🍲",
          "n": "卓袱料理",
          "d": "融合宴席。"
        },
        {
          "e": "🐟",
          "n": "港口海鲜",
          "d": "新鲜海味。"
        }
      ],
      "attractions": [
        {
          "c": "museums",
          "n": "和平公园与资料馆",
          "d": "历史学习。"
        },
        {
          "c": "shopping",
          "n": "出岛与中华街",
          "d": "贸易记忆。"
        },
        {
          "c": "theme",
          "n": "哥拉巴园",
          "d": "山丘展望。"
        },
        {
          "c": "nightlife",
          "n": "港口夜色",
          "d": "季节点灯。"
        }
      ],
      "transportLocal": "路面电车与坡道步行。",
      "tips": [
        "和平设施留足时间。",
        "蛋糕可试吃。",
        "傍晚坡道氛围好。",
        "可延长至云仙等。"
      ],
      "highlights": [
        "哥拉巴园",
        "和平公园",
        "什锦面"
      ]
    },
    "okinawa": {
      "tagline": "碧海亚热带岛屿",
      "overview": "琉球文化、沙滩与岛屿节奏——不一样的日本。",
      "bestTime": "4–6月与10–11月；夏季注意台风。",
      "stay": "4–7",
      "budget": "¥11,000–22,000",
      "weather": "全年温暖。",
      "gettingThere": "那霸机场；离岛船或飞机。",
      "food": [
        {
          "e": "🍜",
          "n": "冲绳荞麦面",
          "d": "猪肉汤的小麦面（非荞麦）。"
        },
        {
          "e": "🐷",
          "n": "软软猪肉与塔可饭",
          "d": "猪肉与岛屿融合菜。"
        },
        {
          "e": "🧃",
          "n": "沙塔安德吉与泡盛",
          "d": "炸点心与地酒。"
        },
        {
          "e": "🥭",
          "n": "热带水果",
          "d": "菠萝芒果等。"
        }
      ],
      "attractions": [
        {
          "c": "castles",
          "n": "首里城周边",
          "d": "琉球王国遗产（关注重建动态）。"
        },
        {
          "c": "parks",
          "n": "庆良间等海域",
          "d": "浮潜天堂。"
        },
        {
          "c": "museums",
          "n": "县立博物馆",
          "d": "自然与文化。"
        },
        {
          "c": "nightlife",
          "n": "国际通",
          "d": "伴手礼与夜色。"
        }
      ],
      "transportLocal": "那霸以外租车最方便。",
      "tips": [
        "防晒必须。",
        "使用对珊瑚友好的防晒。",
        "预留天气缓冲。",
        "可住民宿。"
      ],
      "highlights": [
        "海滩日",
        "首里文化",
        "岛面"
      ]
    }
  }
}
  };
})(window);
