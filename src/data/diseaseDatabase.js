// Comprehensive crop disease dataset with real pathogens, symptoms, treatments and sample images

export const DISEASE_DATABASE = [
  {
    id: "tomato-late-blight",
    crop: "Tomato",
    diseaseName: "Late Blight",
    pathogen: "Phytophthora infestans (Oomycete)",
    severity: "High",
    confidence: 96.8,
    affectedArea: "32%",
    description: "A catastrophic fungal-like disease that rapidly destroys foliage, stems, and fruits in humid and cool weather conditions.",
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=800&q=80",
    symptoms: [
      "Water-soaked dark lesions on leaf tips and margins",
      "Purplish-brown blotches expanding rapidly across foliage",
      "White fungal downy growth visible on leaf undersides in high humidity",
      "Brown leathery patches on green and ripening tomatoes"
    ],
    causes: [
      "Prolonged leaf wetness (> 10 hours)",
      "High relative humidity (> 90%) and temperatures between 15°C - 22°C",
      "Infected seed tubers or windblown sporangia from nearby fields"
    ],
    organicTreatments: [
      "Apply copper sulfate / Bordeaux mixture (1%) every 7-10 days",
      "Spray bio-fungicide Bacillus subtilis or Trichoderma harzianum",
      "Prune and destroy infected lower foliage; do not compost infected tissue",
      "Use drip irrigation to prevent water splashing onto foliage"
    ],
    chemicalTreatments: [
      "Mancozeb 75% WP @ 2.5 g/L water (protective application)",
      "Metalaxyl + Mancozeb (Ridomil Gold) @ 2 g/L water at first visible spot",
      "Cymoxanil 8% + Mancozeb 64% WP @ 2.0 g/L for curative action"
    ],
    preventiveMeasures: [
      "Plant certified disease-resistant tomato varieties (e.g., Mountain Magic, Defiant)",
      "Ensure proper plant spacing (60cm x 45cm) for air circulation",
      "Rotate crops with non-solanaceous crops for at least 3 years"
    ],
    riskLevel: "Critical",
    sprayWindow: "Immediate (Within 24 Hours)"
  },
  {
    id: "rice-bacterial-blight",
    crop: "Rice / Paddy",
    diseaseName: "Bacterial Leaf Blight",
    pathogen: "Xanthomonas oryzae pv. oryzae",
    severity: "High",
    confidence: 94.2,
    affectedArea: "28%",
    description: "One of the most destructive rice diseases, causing leaf drying, wilting, and severe grain yield reduction across tropical rice ecologies.",
    imageUrl: "https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=800&q=80",
    symptoms: [
      "Water-soaked stripes turning yellowish-white along leaf margins",
      "Wavy lesion margins progressing downward towards the sheath",
      "Milky bacterial ooze droplets drying into amber beads on leaves",
      "Kresek (seedling wilt) stage causing complete plant death"
    ],
    causes: [
      "Excessive nitrogen fertilizer application (> 150 kg N/ha)",
      "Warm temperatures (25°C - 34°C) with high humidity and rainstorms",
      "Standing deep floodwater facilitating pathogen spread"
    ],
    organicTreatments: [
      "Spray fresh cow dung slurry extract (20%) mixed with neem seed kernel extract (5%)",
      "Foliar application of Pseudomonas fluorescens @ 10 g/L",
      "Drain excess standing water from the paddy field for 3-4 days"
    ],
    chemicalTreatments: [
      "Streptocycline (90% Streptomycin + 10% Tetracycline) @ 6g in 50L water + Copper Oxychloride @ 50g",
      "Plantomycin @ 1.0 g/L at tillering to panicle initiation stage"
    ],
    preventiveMeasures: [
      "Apply balanced N-P-K fertilizer and split nitrogen into 3-4 dressings",
      "Use tolerant cultivars (e.g., IR64, Improved Samba Mahsuri / RP Bio-226)",
      "Treat seeds with Streptocycline (0.1g/kg seed) before germination"
    ],
    riskLevel: "High",
    sprayWindow: "Within 48 Hours"
  },
  {
    id: "potato-early-blight",
    crop: "Potato",
    diseaseName: "Early Blight",
    pathogen: "Alternaria solani",
    severity: "Moderate",
    confidence: 95.1,
    affectedArea: "19%",
    description: "Common foliar fungal disease characterized by distinctive concentric 'target board' lesions on older potato leaves.",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
    symptoms: [
      "Small dark brown to black circular spots on older leaves",
      "Concentric rings producing a characteristic target-board pattern",
      "Yellow chlorotic halos surrounding the dark spots",
      "Premature defoliation starting from the lower canopy"
    ],
    causes: [
      "Alternating wet and dry weather cycles with heavy dew",
      "Plant stress due to low nitrogen, drought, or nematode infestation",
      "Overwintered fungal spores on decaying plant debris in soil"
    ],
    organicTreatments: [
      "Spray Neem oil extract (3-5 ml/L water) or Potassium bicarbonate solution",
      "Apply compost tea rich in beneficial antagonistic microbes",
      "Mulch soil around plants with straw to prevent soil-splashing onto leaves"
    ],
    chemicalTreatments: [
      "Chlorothalonil 75% WP @ 2 g/L preventive spray",
      "Azoxystrobin 23% SC @ 1 ml/L or Difenoconazole 25% EC @ 0.5 ml/L",
      "Propineb 70% WP @ 2.5 g/L"
    ],
    preventiveMeasures: [
      "Maintain adequate plant vigor with balanced potassium and nitrogen fertilization",
      "Practice 3-year crop rotation avoiding tomato, eggplant, and pepper",
      "Destroy and burn crop residues post-harvest"
    ],
    riskLevel: "Moderate",
    sprayWindow: "Safe within 3 Days"
  },
  {
    id: "corn-northern-blight",
    crop: "Corn / Maize",
    diseaseName: "Northern Corn Leaf Blight",
    pathogen: "Exserohilum turcicum (Fungus)",
    severity: "Moderate",
    confidence: 93.7,
    affectedArea: "22%",
    description: "A foliar fungal disease of maize that produces long, elliptical grayish-green or tan lesions that reduce photosynthesis.",
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80",
    symptoms: [
      "Elongated cigar-shaped lesions (2.5 to 15 cm long) on leaves",
      "Lesions start grayish-green and dry to light tan or brown",
      "Dark olive sporulation visible within lesions during wet mornings",
      "Extensive leaf necrosis causing premature drying of the crop"
    ],
    causes: [
      "Extended periods of leaf wetness (6-18 hours) with temperatures 18°C - 27°C",
      "Continuous no-till maize cultivation leaving infected crop debris on topsoil",
      "Susceptible hybrid varieties planted under dense canopy conditions"
    ],
    organicTreatments: [
      "Foliar spray with Bacillus amyloliquefaciens bio-formulations",
      "Apply seaweed extract + potassium silicate to strengthen plant cell walls",
      "Remove severely blighted lower leaves if detected at early vegetative stage"
    ],
    chemicalTreatments: [
      "Pyraclostrobin + Fluxapyroxad (Priaxor) @ 0.75 ml/L",
      "Propiconazole 25% EC @ 1 ml/L at the onset of tassel emergence",
      "Mancozeb 75% WP @ 2.5 g/L"
    ],
    preventiveMeasures: [
      "Plant resistant maize hybrids possessing Ht genes",
      "Deep tillage to bury infected maize stubbles and accelerate decomposition",
      "Avoid excess plant population density (> 75,000 plants/ha)"
    ],
    riskLevel: "Moderate",
    sprayWindow: "Within 3-4 Days"
  },
  {
    id: "apple-scab",
    crop: "Apple",
    diseaseName: "Apple Scab",
    pathogen: "Venturia inaequalis",
    severity: "High",
    confidence: 97.4,
    affectedArea: "15%",
    description: "Major fungal disease of Malus species attacking leaves and developing fruit, causing velvet olive-green lesions and corky deformed fruit.",
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    symptoms: [
      "Dull olive-green velvety spots on leaves with indistinct borders",
      "Leaves become distorted, puckered, and turn yellow before early drop",
      "Scabby brown corky lesions with cracking on developing apple fruits",
      "Stunted fruit development and loss of market grade"
    ],
    causes: [
      "Frequent spring rains with cool temperatures (12°C - 24°C)",
      "Ascospore release from fallen overwintered leaves during bud break",
      "Poor tree canopy aeration due to inadequate winter pruning"
    ],
    organicTreatments: [
      "Lime sulfur sprays during dormant and green tip phenological stages",
      "Sulfur WP @ 3 g/L during vegetative flush",
      "Shred or rake fallen leaves in autumn and apply 5% urea spray to speed breakdown"
    ],
    chemicalTreatments: [
      "Difenoconazole 25% EC @ 0.3 ml/L (curative action up to 96 hours post-infection)",
      "Dodine 65% WP @ 1 g/L or Kresoxim-methyl 44.3% SC @ 0.5 ml/L",
      "Captan 50% WP @ 2.5 g/L preventive spray"
    ],
    preventiveMeasures: [
      "Open center or central leader pruning to maximize sunlight and airflow",
      "Select resistant varieties (Liberty, Freedom, Enterprise, Prima)",
      "Monitor Mills infection periods to time fungicide sprays precisely"
    ],
    riskLevel: "High",
    sprayWindow: "Within 24 Hours of Rain"
  },
  {
    id: "wheat-yellow-rust",
    crop: "Wheat",
    diseaseName: "Stripe / Yellow Rust",
    pathogen: "Puccinia striiformis f. sp. tritici",
    severity: "Critical",
    confidence: 98.1,
    affectedArea: "35%",
    description: "Highly aggressive airborne fungal pathogen causing bright yellow stripe pustules along wheat leaves, capable of causing up to 80% crop loss.",
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    symptoms: [
      "Bright yellowish-orange pustules arranged in narrow linear stripes along leaf veins",
      "Yellow powder (urediniospores) rubs off easily onto fingers or clothes",
      "Leaves turn chlorotic, dry out, and appear burned or scorched",
      "Shriveled grains and poor earhead filling"
    ],
    causes: [
      "Cool temperatures (10°C - 15°C) with high humidity, dew, or intermittent rains",
      "Airborne spores transported across hundreds of miles by wind currents",
      "Planting obsolete or susceptible wheat varieties without rust resistance genes"
    ],
    organicTreatments: [
      "Spray 5% sour buttermilk / fermented whey solution to suppress fungal spore germination",
      "Trichoderma viride foliar application @ 5g/L with surfactant",
      "Ensure balanced potash fertilization to enhance natural systemic resistance"
    ],
    chemicalTreatments: [
      "Propiconazole 25% EC (Tilt) @ 1.0 ml/L or Tebuconazole 25.9% EC @ 1.25 ml/L",
      "Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top) @ 1 ml/L",
      "Apply spray immediately upon noticing the first isolated yellow pustule cluster"
    ],
    preventiveMeasures: [
      "Sow certified rust-resistant varieties (e.g., HD-2967, DBW-187, PBW-550)",
      "Timely sowing in November to avoid late-season epidemic peak",
      "Avoid excess split doses of urea in late growth stages"
    ],
    riskLevel: "Critical",
    sprayWindow: "URGENT: Within 24 Hours"
  },
  {
    id: "cotton-leaf-curl",
    crop: "Cotton",
    diseaseName: "Cotton Leaf Curl Virus (CLCuV)",
    pathogen: "Begomovirus (Vectored by Whitefly - Bemisia tabaci)",
    severity: "High",
    confidence: 92.5,
    affectedArea: "24%",
    description: "Devastating viral disease of cotton characterized by upward or downward leaf curling, vein thickening, and enations (leaf-like growths).",
    imageUrl: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80",
    symptoms: [
      "Upward or downward curling of leaf margins",
      "Swelling, darkening, and thickening of minor and primary leaf veins",
      "Small leafy enations or cup-shaped outgrowths on the underside of leaves",
      "Stunted plant height, reduced boll size, and severe boll drop"
    ],
    causes: [
      "High whitefly (Bemisia tabaci) population acting as primary vector",
      "Nearby weed hosts (Parthenium hysterophorus, Sida cordifolia) harboring the virus",
      "Hot and dry weather favoring rapid whitefly multiplication"
    ],
    organicTreatments: [
      "Install yellow sticky traps (15-20 traps/acre) at canopy height to capture whiteflies",
      "Spray 5% Neem Seed Kernel Extract (NSKE) or Neem oil (3000 ppm) @ 5 ml/L",
      "Conserve natural predators such as Chrysoperla carnea (green lacewing) and ladybird beetles"
    ],
    chemicalTreatments: [
      "Diafenthiuron 50% WP @ 1.2 g/L to suppress whitefly adults and nymphs",
      "Pyriproxyfen 10% EC @ 2 ml/L (insect growth regulator against whitefly nymphs)",
      "Flonicamid 50% WG @ 0.4 g/L for systemic whitefly control"
    ],
    preventiveMeasures: [
      "Plant CLCuV-resistant Bt cotton hybrids",
      "Eradicate weed hosts along field bunds and irrigation channels",
      "Avoid growing alternate host crops (okra, brinjal) adjacent to cotton"
    ],
    riskLevel: "High",
    sprayWindow: "Focus on Vector Control"
  },
  {
    id: "healthy-crop",
    crop: "General Crops",
    diseaseName: "Healthy Crop - No Pathogen Detected",
    pathogen: "None (Healthy Tissue)",
    severity: "None",
    confidence: 99.4,
    affectedArea: "0%",
    description: "The foliage displays strong green coloration, uniform leaf venation, intact cuticle structure, and zero symptoms of biotic or abiotic pathology.",
    imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80",
    symptoms: [
      "Deep, uniform chlorophyll pigmentation",
      "Turgid leaf texture with no wilting or necrosis",
      "Clean margins without lesions, spots, or halo rings",
      "Optimal vegetative growth progression"
    ],
    causes: [
      "Balanced soil nutrients (N-P-K and micronutrients)",
      "Optimal irrigation schedule and proper soil aeration",
      "Effective IPM (Integrated Pest Management) practices in place"
    ],
    organicTreatments: [
      "Continue preventive sprays of Panchagavya / Jeevamrit (3%) every 15 days",
      "Apply seaweed bio-stimulant foliar spray during flowering/fruiting",
      "Maintain microbial biodiversity in rhizosphere with mycorrhizal inoculants"
    ],
    chemicalTreatments: [
      "No chemical fungicides or pesticides required at this stage",
      "Apply balanced foliar 19:19:19 micronutrient booster if high yield is targeted"
    ],
    preventiveMeasures: [
      "Routine weekly scout walks through the crop rows",
      "Keep field borders clean from weed reservoirs",
      "Log soil moisture levels to prevent water stress"
    ],
    riskLevel: "Optimal",
    sprayWindow: "Routine Monitoring"
  }
];
