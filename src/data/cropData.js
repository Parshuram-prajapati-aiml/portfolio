export const cropCategories = [
  { id: 'tomato', name: 'Tomato', icon: '🍅', scientific: 'Solanum lycopersicum' },
  { id: 'potato', name: 'Potato', icon: '🥔', scientific: 'Solanum tuberosum' },
  { id: 'rice', name: 'Rice', icon: '🌾', scientific: 'Oryza sativa' },
  { id: 'wheat', name: 'Wheat', icon: '🌾', scientific: 'Triticum aestivum' },
  { id: 'corn', name: 'Corn', icon: '🌽', scientific: 'Zea mays' }
];

export const diseaseDatabase = {
  // TOMATO DISEASES
  'tomato_early_blight': {
    name: 'Early Blight (Tomato)',
    crop: 'Tomato',
    type: 'Fungal (Alternaria solani)',
    symptoms: [
      'Dark brown to black spots with concentric rings (target-like pattern) on older leaves.',
      'Leaves turn yellow and eventually drop off, exposing fruit to sunscald.',
      'Dark, sunken spots appearing at the stem end of the fruit.'
    ],
    causes: [
      'High humidity combined with warm temperatures (24-29°C / 75-85°F).',
      'Fungal spores overwintering in soil or debris from previous seasons.',
      'Splashing water from overhead irrigation spreading spores upwards.'
    ],
    organicRemedies: [
      'Neem Oil Spray: Apply cold-pressed neem oil (1-2%) diluted in warm soapy water weekly.',
      'Baking Soda Solution: Mix 1 tablespoon baking soda, 1 teaspoon liquid soap in 4L water and spray leaves.',
      'Mulch Soil: Lay down straw or plastic mulch to prevent soil spores from splashing onto lower leaves.',
      'Crop Rotation: Avoid planting tomatoes or potatoes in the same spot for at least 3 years.'
    ],
    chemicalRemedies: [
      'Copper-based Fungicides: Apply copper octanoate or copper sulfate at first sign of disease.',
      'Chlorothalonil: A highly effective broad-spectrum preventative fungicide sprayed every 7-10 days.',
      'Mancozeb: Apply to protect foliage during warm, wet periods.'
    ]
  },
  'tomato_late_blight': {
    name: 'Late Blight (Tomato)',
    crop: 'Tomato',
    type: 'Oomycete (Phytophthora infestans)',
    symptoms: [
      'Water-soaked, blue-grey or dark green spots on leaves that rapidly enlarge.',
      'White, fuzzy fungal growth on the undersides of infected leaves during wet weather.',
      'Large, firm, dark brown greasy lesions on tomato fruits.'
    ],
    causes: [
      'Cool, wet, humid weather with temperatures between 15-22°C (60-72°F).',
      'Wind-blown spores traveling miles from other infected fields.',
      'Infected volunteer plants or tomato debris left in the field.'
    ],
    organicRemedies: [
      'Copper Hydroxide Spray: Approved for organic farming to form a protective layer.',
      'Compost Tea Spray: Rich in beneficial microbes that outcompete late blight pathogens.',
      'Pruning: Remove lower leaves up to 45cm off the ground to increase airflow.',
      'Destroy Infected Plants: Bag and throw away infected plants immediately. Do NOT compost them.'
    ],
    chemicalRemedies: [
      'Mefenoxam or Metalaxyl: Systemic fungicides that penetrate leaf tissue.',
      'Chlorothalonil or Mancozeb: Apply preventatively as a defensive barrier.'
    ]
  },
  'tomato_mosaic_virus': {
    name: 'Tomato Mosaic Virus (ToMV)',
    crop: 'Tomato',
    type: 'Viral (Tobacco Mosaic Virus family)',
    symptoms: [
      'Mottled light and dark green mosaic pattern on leaves.',
      'Leaves may become distorted, crinkled, or fern-like ("shoestringing").',
      'Stunted plant growth and uneven ripening of fruits with internal brown necrotic spots.'
    ],
    causes: [
      'Mechanical transmission through hands, tools, or clothing brushing infected plants.',
      'Sowing contaminated, uncertified tomato seed.',
      'Pests like whiteflies, aphids, or thrips carrying viral particles.'
    ],
    organicRemedies: [
      'Sanitize Tools: Soak tools in a 20% dry milk solution or 10% household bleach between cuts.',
      'Wash Hands: Wash thoroughly with soap or milk if handling tobacco products or infected plants.',
      'Remove Infected Plants: Pull out and burn infected plants instantly to curb transmission.',
      'Weeding: Keep the field free of solanaceous weeds (e.g. nightshade) which harbor the virus.'
    ],
    chemicalRemedies: [
      'No Direct Chemical Treatment: Viral diseases cannot be cured with chemicals.',
      'Insecticides: Apply imidacloprid or acetamiprid to control insect vectors (aphids/whiteflies).'
    ]
  },

  // POTATO DISEASES
  'potato_early_blight': {
    name: 'Early Blight (Potato)',
    crop: 'Potato',
    type: 'Fungal (Alternaria solani)',
    symptoms: [
      'Concentric target-like brown spots on leaves, starting on older lower leaves.',
      'Dark, dry, sunken circular lesions on tubers, reducing storage quality.'
    ],
    causes: [
      'Alternating wet and dry foliage conditions during warm temperatures.',
      'Poor soil nutrient management (especially low nitrogen).'
    ],
    organicRemedies: [
      'Crop Rotation: Rotate with non-solanaceous crops (e.g., corn, beans).',
      'Optimize Fertilization: Ensure balanced nitrogen and potassium levels to maintain plant vigor.',
      'Neem Spray: Apply organic neem extract to prevent fungal germination.'
    ],
    chemicalRemedies: [
      'Mancozeb or Azoxystrobin: Highly effective fungicides sprayed before canopy closure.'
    ]
  },
  'potato_late_blight': {
    name: 'Late Blight (Potato)',
    crop: 'Potato',
    type: 'Oomycete (Phytophthora infestans)',
    symptoms: [
      'Rapidly spreading dark blotches on leaves that look scalded or burnt.',
      'Tubers develop a reddish-brown dry rot that spreads inward.',
      'Can destroy entire fields within a few days under high moisture.'
    ],
    causes: [
      'Extremely high moisture, dew, or rain, coupled with moderate temperatures (12-24°C).',
      'Infected seed tubers planted in the spring.'
    ],
    organicRemedies: [
      'Certified Disease-Free Seed: Buy only certified pathogen-free seed potatoes.',
      'Bordeaux Mixture: Spray organic-approved copper sulfate and lime mix preventatively.',
      'Tuber Hilling: Build deep soil hills over tubers to create a barrier against falling spores.'
    ],
    chemicalRemedies: [
      'Fluazinam or Cyazofamid: Excellent protective fungicides to arrest spore germination.',
      'Systemic Fungicides: Metalaxyl-M applied during outbreak conditions.'
    ]
  },

  // RICE DISEASES
  'rice_leaf_blast': {
    name: 'Rice Blast',
    crop: 'Rice',
    type: 'Fungal (Magnaporthe oryzae)',
    symptoms: [
      'Spindle-shaped (diamond-shaped) spots on leaves with grey/whitish centers and brown borders.',
      'Collar rot: dark lesions causing leaves to break off at the stem junction.',
      'Neck rot: grey-brown rot at the base of the panicle causing it to bend and produce empty grains.'
    ],
    causes: [
      'High relative humidity (>90%) and cool night temperatures (20-24°C).',
      'Excessive application of nitrogen fertilizer.',
      'Extended periods of leaf wetness from fog or rain.'
    ],
    organicRemedies: [
      'Silicon Fertilizer: Silicon helps toughen the leaf cell walls, creating a physical barrier to fungi.',
      'Avoid Over-fertilizing: Moderate nitrogen application; divide it into multiple smaller doses.',
      'Water Control: Maintain consistent shallow flooding rather than letting fields dry and crack.',
      'Bio-control agents: Use Pseudomonas fluorescens formulations as seed and foliar spray.'
    ],
    chemicalRemedies: [
      'Tricyclazole: The gold-standard systemic fungicide for controlling neck and leaf blast.',
      'Azoxystrobin: Excellent broad preventive action sprayed at early booting stage.',
      'Isoprothiolane: Systemic fungicide to protect against panicle infection.'
    ]
  },
  'rice_brown_spot': {
    name: 'Brown Spot',
    crop: 'Rice',
    type: 'Fungal (Cochliobolus miyabeanus)',
    symptoms: [
      'Numerous small, oval, dark brown spots resembling sesame seeds on leaves.',
      'Spots are uniform across the leaf surface and have yellow halos around them.',
      'Grain discoloration and reduced weight, making milling difficult.'
    ],
    causes: [
      'Nutrient-deficient soils (often called "poor-man\'s disease" due to low nitrogen/potassium).',
      'Acid soils, sandy soils, or dry soils with poor water retention.',
      'High humidity (>88%) and temperature of 25-30°C.'
    ],
    organicRemedies: [
      'Balanced Nutrition: Apply organic farmyard manure, compost, and potassium-rich ash.',
      'Seed Treatment: Soak seeds in hot water (52-54°C) for 10-15 minutes before sowing.',
      'Water Management: Avoid drought stress by ensuring adequate irrigation during growth phases.'
    ],
    chemicalRemedies: [
      'Propiconazole: Spray at tillering and boot stages to suppress spot growth.',
      'Mancozeb + Carbendazim Mixture: Effective protective and curative compound.'
    ]
  },

  // WHEAT DISEASES
  'wheat_yellow_rust': {
    name: 'Yellow (Stripe) Rust',
    crop: 'Wheat',
    type: 'Fungal (Puccinia striiformis)',
    symptoms: [
      'Bright yellow to orange pustules (uredinia) arranged in neat, parallel stripes along leaf veins.',
      'Powdery yellow spores rubbing off easily on fingers.',
      'Leaves dry up, shrivel, and die, reducing grain filling and yield drastically.'
    ],
    causes: [
      'Cool temperatures (10-15°C / 50-60°F) and high moisture (dew or light rain).',
      'Wind carrying spores over hundreds of kilometers across continental air currents.',
      'Susceptible wheat varieties planted widely.'
    ],
    organicRemedies: [
      'Resistant Varieties: The most effective method. Plant rust-resistant seed cultivars.',
      'Foliar Wood Ash Spray: Lightly dusting plants with dry wood ash can disrupt spore attachment.',
      'Early Sowing: Plant crops early in the season to complete grain development before rust peaks.'
    ],
    chemicalRemedies: [
      'Tebuconazole or Propiconazole: High-performance triazole systemic fungicides applied on appearance of stripes.',
      'Pyraclostrobin: Provides strong protective and curative barrier.'
    ]
  },
  'wheat_leaf_rust': {
    name: 'Leaf (Brown) Rust',
    crop: 'Wheat',
    type: 'Fungal (Puccinia triticina)',
    symptoms: [
      'Randomly scattered circular, orange-brown pustules on the upper leaf surface.',
      'Pustules do not form stripes (unlike yellow rust) but look like freckles.'
    ],
    causes: [
      'Warmer temperatures than yellow rust (15-22°C) combined with high relative humidity.',
      'Overwintering rust spores on volunteer wheat plants.'
    ],
    organicRemedies: [
      'Destroy Volunteer Wheat: Kill any wild or volunteer wheat growing out-of-season.',
      'Garlic Extract Spray: Natural garlic sprays exhibit anti-fungal properties against rust spores.'
    ],
    chemicalRemedies: [
      'Triadimefon or Epoxiconazole: Apply at early stages of brown freckling.'
    ]
  },

  // CORN DISEASES
  'corn_common_rust': {
    name: 'Common Rust (Corn)',
    crop: 'Corn',
    type: 'Fungal (Puccinia sorghi)',
    symptoms: [
      'Cinnamon-brown, powdery, elongated pustules on both upper and lower leaf surfaces.',
      'Pustules rupture the leaf epidermis, releasing millions of powdery spores.',
      'Severe cases turn leaves yellow, brown, and cause early plant death.'
    ],
    causes: [
      'High humidity (>95%) and moderate temperatures (16-23°C / 60-74°F).',
      'Wind-blown spores migrating from southern warm regions.',
      'Planting corn continuous year-after-year in the same plot.'
    ],
    organicRemedies: [
      'Deep Tillage: Bury residue deep into the soil after harvest to decompose fungal hosts.',
      'Rotate Crops: Rotate corn with soybeans, clover, or alfalfa for at least one year.',
      'Sulfur Dusting: Natural elemental sulfur dust protects leaves from rust germination.'
    ],
    chemicalRemedies: [
      'Pyraclostrobin + Metconazole: Combo chemical to secure crop yields in high-risk zones.',
      'Azoxystrobin: Spray preventatively during the vegetative (V4-V8) growth stages.'
    ]
  },
  'corn_gray_leaf_spot': {
    name: 'Gray Leaf Spot',
    crop: 'Corn',
    type: 'Fungal (Cercospora zeae-maydis)',
    symptoms: [
      'Long, narrow, rectangular, greyish-to-tan spots restricted between leaf veins.',
      'Lesions look like small matches or rectangles on the leaf blades.',
      'Blighting of entire leaves under highly favorable hot and wet climates.'
    ],
    causes: [
      'Extended warm temperatures (25-32°C) and prolonged leaf wetness (dew or rain).',
      'High-yield zero-till farming where infested crop debris remains on the soil surface.'
    ],
    organicRemedies: [
      'Residue Management: Chop and incorporate crop residue into the soil to accelerate decay.',
      'Wide Row Spacing: Increase spacing to improve wind flow and speed up leaf drying.'
    ],
    chemicalRemedies: [
      'Propiconazole or Trifloxystrobin: Applied around the tasseling (VT) stage if disease threshold is reached.'
    ]
  },

  // HEALTHY CROPS
  'tomato_healthy': {
    name: 'Healthy Tomato Plant',
    crop: 'Tomato',
    type: 'Healthy',
    symptoms: [
      'Vibrant green, uniform leaf color without blemishes, dry spots, or curling.',
      'Firm stems and abundant flowering/fruit development with shiny skin.'
    ],
    causes: [
      'Optimal water scheduling, balanced soil nutrition, and clean structural cultivation.'
    ],
    organicRemedies: [
      'Keep up the great work! Maintain consistent watering (drip irrigation preferred) and weekly weeding.',
      'Apply organic vermicompost every 30 days during flowering and fruiting.'
    ],
    chemicalRemedies: [
      'No chemicals needed. Keep synthetic sprays away to preserve beneficial pollinators and ladybugs.'
    ]
  },
  'potato_healthy': {
    name: 'Healthy Potato Plant',
    crop: 'Potato',
    type: 'Healthy',
    symptoms: [
      'Broad, deep green foliage, robust stalks, and firm erect structure.'
    ],
    causes: [
      'Excellent drainage, loose aerated soil, and virus-free seed stock.'
    ],
    organicRemedies: [
      'Add organic compost during hilling to protect rising underground tubers from sunlight.'
    ],
    chemicalRemedies: [
      'None required. Do not apply fungicides.'
    ]
  },
  'rice_healthy': {
    name: 'Healthy Rice Plant',
    crop: 'Rice',
    type: 'Healthy',
    symptoms: [
      'Bright green leaves growing tall, strong roots, and packed healthy seed heads (panicles).'
    ],
    causes: [
      'Balanced soil pH, stable water management, and perfect nitrogen ratios.'
    ],
    organicRemedies: [
      'Incorporate green manure (like Sesbania) before transplanting, and maintain proper water levels.'
    ],
    chemicalRemedies: [
      'None required.'
    ]
  },
  'wheat_healthy': {
    name: 'Healthy Wheat Plant',
    crop: 'Wheat',
    type: 'Healthy',
    symptoms: [
      'Lush green leaf canopy with upright blades, strong tillering, and healthy seed spikes.'
    ],
    causes: [
      'Healthy soil organic matter, cold winter growth, and timely irrigation.'
    ],
    organicRemedies: [
      'Maintain adequate phosphorus for strong root development and winter survival.'
    ],
    chemicalRemedies: [
      'None required.'
    ]
  },
  'corn_healthy': {
    name: 'Healthy Corn Plant',
    crop: 'Corn',
    type: 'Healthy',
    symptoms: [
      'Thick, sturdy stalks with dark green leaves extending broadly, showing no striping or spots.'
    ],
    causes: [
      'High soil nitrogen, regular warmth, and deep moisture.'
    ],
    organicRemedies: [
      'Side-dress with well-rotted chicken manure or compost at the knee-high growth stage.'
    ],
    chemicalRemedies: [
      'None required.'
    ]
  }
};
