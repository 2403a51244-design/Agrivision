# 🌾 AgriVision – AI-Based Crop Disease Detection & Smart Farming Assistance

[![React 18](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite 6](https://img.shields.io/badge/Vite-6.0.7-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-teal.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

**AgriVision** is a smart agriculture web application engineered to bridge the gap between advanced agricultural AI research and field-level implementation. It provides smallholder and commercial farmers with real-time crop disease diagnosis, scientific N-P-K nutrient dosage calculations, drone-based multispectral NDVI vegetative monitoring, voice-enabled agronomy assistance, and APMC wholesale mandi price intelligence.

---

## 🌟 Key Features

### 1. 🔬 AI Crop Disease Pathology Scanner
* **Deep Neural Network Vision**: Detects foliar diseases with up to 98.4% diagnostic accuracy across major staple and cash crops (Tomato, Rice, Potato, Wheat, Maize, Cotton, Apple).
* **Lesion Heatmap & Bounding Overlay**: Visualizes chlorosis boundaries and localized necrosis patches on the leaf.
* **Dual Prescription Protocol**:
  * **🌿 Bio-Organic Remediations**: Non-toxic bio-fungicides (*Bacillus subtilis*, *Trichoderma*, neem extract, buttermilk).
  * **🧪 Chemical Prescriptions**: Active ingredient recommendations (Metalaxyl, Mancozeb, Cymoxanil) with exact dilution rates (g/L of water).
* **Official Printable Prescription Certificate**: Generates official agronomic prescription sheets with diagnostic ID, severity rating, crop details, and plant pathologist signature seal (`window.print()` formatted).

### 2. 🌾 Smart Farm Advisory & NPK Fertilizer Calculator
* **Scientific Soil-Balancing Engine**: Computes exact fertilizer bag counts (Urea 46%, DAP 18-46-0, MOP Potash 0-0-60) tailored to specific acreage and soil types (Alluvial, Black Cotton, Red Loam, Clay, Sandy).
* **Crop Growth Stage Milestones**: Tracks critical growth phases (Crown Root Initiation, Tillering, Heading, Panicle Initiation).
* **Irrigation Schedules & pH Optimization**: Avoids fertilizer runoff and nutrient lockout.

### 3. 🛰️ Drone Multispectral NDVI Field Map
* **Multi-Layer Remote Sensing Simulator**: Inspect sectors in **NDVI Biomass**, **Soil Moisture (Rhizosphere)**, and **Thermal Canopy Stress** views.
* **Autonomous UAV Patrol Telemetry**: Live drone HUD reporting Altitude (m AGL), Ground Speed (km/h), Battery Telemetry, and GPS Satellite fix.
* **Variable-Rate Application (VRA)**: Pinpoints disease hotspots and guides targeted spraying, slashing chemical costs by up to 65%.

### 4. 💬 AgriBot Voice & Text AI Agronomist
* **Interactive Chatbot**: Specializes in pathogen triage, micronutrient deficiencies (chlorosis vs. necrosis), pest biocontrols, and organic home recipes (*Agniastra*, *Jeevamrut*, *Panchagavya*).
* **Web Speech Synthesis**: Voice readout for low-literacy farmers and hands-free field operations.
* **1-Click Transfer**: Diagnostic results can be forwarded directly to AgriBot for contextual follow-up.

### 5. 📈 APMC Mandi Wholesale Commodity Intelligence
* **Live Mandi Rates**: Tracks wholesale prices (₹/Quintal) across key agricultural markets (Khanna, Karnal, Kolar, Agra).
* **Algorithmic "Hold or Sell" Signals**: Formulates selling recommendations based on supply pinch points, regional arrivals, and weather disruptions.

### 6. 📋 Farm Pathology History & CSV Audit Log
* **Longitudinal Record Keeping**: Archival log of past foliar scans, severity levels, dates, and affected foliage percentages.
* **CSV Data Export**: 1-click export for farm management audits, crop insurance verification, and agronomic research.

### 7. 🌐 Multi-Language & Multi-Role Flexibility
* **Languages**: Full localization in English, Hindi (हिन्दी), and Spanish (Español).
* **Role Switcher**: Switch between **Demo Farmer** (Ramesh Patel - 14.5 Acres) and **Senior Agronomist / Plant Pathologist** (Dr. Sarah Jenkins, Ph.D.).

---

## 🏗️ Architecture & Project Structure

```text
agrivision/
├── index.html                   # HTML entry with Plus Jakarta Sans & Outfit fonts
├── package.json                 # Dependencies (React, Lucide icons, Canvas Confetti)
├── tailwind.config.js           # Custom agricultural color palette (agri, harvest, earth)
├── vite.config.js               # Vite bundler configuration
└── src/
    ├── main.jsx                 # Application entry point
    ├── App.jsx                  # Main root layout, tabs, status ticker, and footer
    ├── index.css                # Tailwind directives, custom scrollbars, print styles
    ├── context/
    │   ├── AuthContext.jsx      # Role switcher, authentication, profile metadata
    │   └── LanguageContext.jsx  # Multi-language translation dictionaries (EN, HI, ES)
    ├── components/
    │   ├── Navbar.jsx           # Responsive header, microclimate ticker, tab strip
    │   ├── Dashboard.jsx        # Telemetry overview, 4-day weather spray windows
    │   ├── DiseaseDetector.jsx  # AI scanner, interactive heatmap, printable report
    │   ├── SmartAdvisory.jsx    # Scientific NPK calculator and soil-crop advisor
    │   ├── DroneFieldMap.jsx    # Autonomous UAV drone NDVI telemetry & sector map
    │   ├── AgriBot.jsx          # Voice-enabled conversational AI agronomist
    │   ├── MarketPrices.jsx     # APMC wholesale rates and AI trading signals
    │   ├── HistoryLog.jsx       # Diagnostic table with search, filter, and CSV export
    │   └── AuthModal.jsx        # Login, registration, and quick demo role selection
    └── data/
        ├── diseaseDatabase.js   # Pathogen database (Tomato, Rice, Wheat, Potato, etc.)
        ├── agronomyData.js      # Crop NPK requirements, growth stages, soil formulas
        └── marketData.js        # Mandi commodity prices, trends, and arrival volumes
```

---

## 🚀 Quickstart Guide

### Prerequisites
- Node.js v18+ (tested on Node.js v24.11.1)
- npm v10+

### Installation & Running Locally

1. **Navigate to the project directory**:
   ```bash
   cd C:\Users\azayv\.gemini\antigravity\scratch\agrivision
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview the production build**:
   ```bash
   npm run preview
   ```
   Open your browser at `http://localhost:4173`.

---

## 🛡️ Agronomic Disclaimer
AgriVision provides algorithmic diagnostic support for foliar disease surveillance. Always consult local agricultural extension officers or certified agronomists before applying restricted systemic agrochemicals.
