// Agronomy data, soil requirements, and fertilizer calculation constants

export const CROPS_DATA = [
  {
    id: "wheat",
    name: "Wheat (Triticum aestivum)",
    season: "Rabi (Winter)",
    optimalPh: "6.0 - 7.5",
    standardNPK: { n: 120, p: 60, k: 40 }, // kg per hectare
    waterRequirement: "450 - 650 mm",
    growthDurationDays: 125,
    stages: ["Crown Root Initiation (21d)", "Tillering (40d)", "Jointing (60d)", "Flowering (85d)", "Milking (100d)"],
    tips: "Ensure crown root initiation (CRI) irrigation at 21 days after sowing. Avoid lodging by balancing nitrogen."
  },
  {
    id: "rice",
    name: "Rice / Paddy (Oryza sativa)",
    season: "Kharif (Monsoon)",
    optimalPh: "5.5 - 6.5",
    standardNPK: { n: 150, p: 50, k: 50 },
    waterRequirement: "1200 - 1500 mm",
    growthDurationDays: 135,
    stages: ["Nursery (25d)", "Tillering (45d)", "Panicle Initiation (70d)", "Heading/Flowering (95d)", "Maturity (130d)"],
    tips: "Maintain 2-5 cm standing water during panicle development. Drain fields 10 days before harvest."
  },
  {
    id: "tomato",
    name: "Tomato (Solanum lycopersicum)",
    season: "All Season / Rabi / Kharif",
    optimalPh: "6.0 - 6.8",
    standardNPK: { n: 180, p: 100, k: 120 },
    waterRequirement: "600 - 800 mm",
    growthDurationDays: 110,
    stages: ["Transplanting (15d)", "Vegetative (35d)", "First Flower (50d)", "Fruit Set (75d)", "Harvesting (90-120d)"],
    tips: "Calcium sprays prevent Blossom End Rot. Stake plants to prevent soil contact and fungal diseases."
  },
  {
    id: "potato",
    name: "Potato (Solanum tuberosum)",
    season: "Rabi (Winter)",
    optimalPh: "5.2 - 6.5",
    standardNPK: { n: 160, p: 100, k: 150 },
    waterRequirement: "500 - 700 mm",
    growthDurationDays: 100,
    stages: ["Sprouting (20d)", "Vegetative (40d)", "Tuber Initiation (55d)", "Tuber Bulking (80d)", "Maturation (100d)"],
    tips: "Earthing up at 30 and 45 days prevents tuber greening and protects from potato tuber moth."
  },
  {
    id: "maize",
    name: "Maize / Corn (Zea mays)",
    season: "Kharif & Spring",
    optimalPh: "6.0 - 7.2",
    standardNPK: { n: 150, p: 60, k: 50 },
    waterRequirement: "500 - 800 mm",
    growthDurationDays: 110,
    stages: ["Knee High (30d)", "Tasseling (55d)", "Silking (65d)", "Grain Filling (85d)", "Physiological Maturity (110d)"],
    tips: "Crucial moisture-sensitive stages are silking and grain filling. Avoid drought stress during tassel emergence."
  },
  {
    id: "cotton",
    name: "Cotton (Gossypium hirsutum)",
    season: "Kharif",
    optimalPh: "6.5 - 8.0",
    standardNPK: { n: 120, p: 60, k: 60 },
    waterRequirement: "700 - 1000 mm",
    growthDurationDays: 160,
    stages: ["Seedling (30d)", "Square Formation (60d)", "Flowering (90d)", "Boll Development (120d)", "Boll Bursting (150d)"],
    tips: "Monitor whitefly and pink bollworm regularly using pheromone traps. Nip apical buds at 90 days."
  }
];

export const SOIL_TYPES = [
  { id: "alluvial", name: "Alluvial Soil (Loamy / Silt)", fertility: "High", waterRetention: "Medium", phRange: "6.5 - 7.5" },
  { id: "black", name: "Black Cotton Soil (Clayey)", fertility: "High", waterRetention: "Very High", phRange: "7.0 - 8.5" },
  { id: "red", name: "Red & Yellow Soil", fertility: "Moderate", waterRetention: "Low to Medium", phRange: "5.5 - 6.8" },
  { id: "sandy", name: "Sandy Loam Soil", fertility: "Low to Moderate", waterRetention: "Low", phRange: "6.0 - 7.0" }
];

export function calculateFertilizer(cropId, areaInAcres, soilType) {
  const crop = CROPS_DATA.find(c => c.id === cropId) || CROPS_DATA[0];
  // 1 Hectare = 2.471 Acres
  const hectares = areaInAcres / 2.471;

  // Base kg required
  let totalN = crop.standardNPK.n * hectares;
  let totalP = crop.standardNPK.p * hectares;
  let totalK = crop.standardNPK.k * hectares;

  // Soil adjustment
  if (soilType === "sandy") {
    totalN *= 1.15; // Leaching factor
    totalK *= 1.10;
  } else if (soilType === "black") {
    totalP *= 1.05; // Fixation factor
  }

  // Common fertilizer commercial grades:
  // Urea = 46% N (0.46)
  // DAP (Diammonium Phosphate) = 18% N, 46% P2O5
  // MOP (Muriate of Potash) = 60% K2O
  // 1 Bag = 50 kg (or 45kg for modern urea)
  
  // Calculate DAP needed for all P
  const dapKg = totalP / 0.46;
  const nSuppliedByDap = dapKg * 0.18;

  // Remaining N supplied by Urea
  const remainingN = Math.max(0, totalN - nSuppliedByDap);
  const ureaKg = remainingN / 0.46;

  // MOP for K
  const mopKg = totalK / 0.60;

  return {
    ureaBags: (ureaKg / 45).toFixed(1),
    ureaKg: Math.round(ureaKg),
    dapBags: (dapKg / 50).toFixed(1),
    dapKg: Math.round(dapKg),
    mopBags: (mopKg / 50).toFixed(1),
    mopKg: Math.round(mopKg),
    totalPureN: Math.round(totalN),
    totalPureP: Math.round(totalP),
    totalPureK: Math.round(totalK),
    applicationSchedule: [
      { stage: "Basal (At Sowing / Transplanting)", detail: "100% DAP + 100% MOP + 33% Urea" },
      { stage: "First Top Dressing (Vegetative, 25-30 days)", detail: "33% Urea" },
      { stage: "Second Top Dressing (Flowering / Tillering)", detail: "34% Urea + Micronutrient Zinc/Boron Spray" }
    ]
  };
}
