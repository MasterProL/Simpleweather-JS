// index.js

// Constants
const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
<<<<<<< HEAD
const card = document.querySelector('.card');
const apiKey = ''; // Replace with your OpenWeatherMap API key  
=======
const card = document.querySelector('#weatherCard');
const submitButton = document.querySelector('button[type="submit"]');
>>>>>>> 09378ee (Add multi-language support (JSON files, UI updates, RTL), documentation files)

// API Configuration
const API_CONFIG = {
  key: '3e320bc4c127d23072734fc941253e3a',      // Replace API key with your own for production use, dont share publicly, dont commit to public repository, dont use in high-traffic apps
  baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
  timeout: 8000 // 8 second timeout
};

let isLoading = false;

// Language system
let currentLang = 'en';
let translations = {}; // cache: { 'en': {...}, 'it': {...}, ... }
let lastWeatherData = null; // to re-apply translations when lang changes

const supportedLanguages = [
  'en', 'ru', 'zh', 'es', 'fr', 'de', 'uz', 'it', 'tr', 'pt',
  'fa', 'ar', 'ko', 'ja', 'id', 'vi', 'kz', 'kg', 'tk', 'tg', 'ps'
];

// OpenWeatherMap lang code mapping
// Reference: https://openweathermap.org/api/multilingual
const owLangMap = {
  en: 'en',
  ru: 'ru',
  zh: 'zh_cn',     // Simplified Chinese
  es: 'es',
  fr: 'fr',
  de: 'de',
  ar: 'ar',
  fa: 'fa',
  ja: 'ja',
  ko: 'kr',        // OpenWeather uses 'kr' for Korean
  it: 'it',
  tr: 'tr',
  pt: 'pt',
  vi: 'vi',
  id: 'id',
  // Languages below are not directly supported by OpenWeatherMap
  // They will fallback to English descriptions
  uz: 'en',        // Uzbek - not supported, use English
  kz: 'en',        // Kazakh - not supported, use English
  kg: 'en',        // Kyrgyz - not supported, use English
  tk: 'en',        // Turkmen - not supported, use English
  tg: 'en',        // Tajik - not supported, use English
  ps: 'en',        // Pashto - not supported, use English
};

// Load language file
async function loadLanguage(lang) {
  if (!supportedLanguages.includes(lang)) lang = 'en';

  // Already loaded → apply immediately
  if (translations[lang]) {
    applyTranslations(translations[lang]);
    currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    updateSelectValue(lang);
    if (lastWeatherData) displayWeatherInfo(lastWeatherData); // refresh display
    return;
  }

  try {
    const response = await fetch(`lang/${lang}.json`);
    if (!response.ok) throw new Error(`Language file not found: ${lang}`);
    const data = await response.json();
    translations[lang] = data;
    applyTranslations(data);
    currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    updateSelectValue(lang);
    if (lastWeatherData) displayWeatherInfo(lastWeatherData);
  } catch (err) {
    console.error('Failed to load language:', err);
    // Fallback to English
    if (lang !== 'en') loadLanguage('en');
  }
}

// Apply static UI translations
function applyTranslations(t) {
  // Title
  document.getElementById('appTitle').textContent = t.title || 'Weather';
  document.title = t.title || 'Weather';

  // Input & button
  cityInput.placeholder = t.placeholder || 'Enter city name';
  document.querySelector('button[type="submit"]').textContent = t.button || 'Get Weather';

  // Language selector label & aria
  const label = document.querySelector('label[for="langSelect"]');
  if (label) label.textContent = t['label.lang'] || 'Lang:';

  const select = document.getElementById('langSelect');
  if (select) select.setAttribute('aria-label', t['aria.selectLanguage'] || 'Select language');

  // RTL support
  if (['ar', 'fa', 'ps'].includes(currentLang)) {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
}

// Update <select> value visually
function updateSelectValue(lang) {
  const select = document.getElementById('langSelect');
  if (select) select.value = lang;
}

// Page load: restore language
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLang') ||
                    navigator.language.split('-')[0] ||
                    'en';

  loadLanguage(savedLang);

  // Listen for language change
  document.getElementById('langSelect')?.addEventListener('change', (e) => {
    loadLanguage(e.target.value);
  });
  
  // Log for debugging
  console.log('Initial language:', savedLang);
});

// ────────────────────────────────────────────────
// Weather logic (updated with translations)
// ────────────────────────────────────────────────

weatherForm.addEventListener("submit", async event => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (!city) {
    displayError(translations[currentLang]?.errorEmpty || "Please enter a city name.");
    return;
  }

  if (isLoading) return; // Prevent duplicate requests

  setLoadingState(true);
  try {
    const weatherData = await getWeatherData(city);
    lastWeatherData = weatherData;
    displayWeatherInfo(weatherData);
  } catch (error) {
    console.error('Weather fetch error:', error.message);
    const errorMsg = error.message === 'Request timeout' 
      ? "Request took too long. Please try again." 
      : translations[currentLang]?.errorFetch || "Could not fetch weather data";
    displayError(errorMsg);
  } finally {
    setLoadingState(false);
  }
});

function setLoadingState(loading) {
  isLoading = loading;
  submitButton.disabled = loading;
  submitButton.textContent = loading 
    ? (translations[currentLang]?.loading || 'Loading...') 
    : (translations[currentLang]?.button || 'Get Weather');
}

async function getWeatherData(city) {
  // Get the OpenWeatherMap language code, with proper fallback
  const owLang = owLangMap[currentLang] || 'en';
  const apiUrl = `${API_CONFIG.baseUrl}?q=${encodeURIComponent(city)}&appid=${API_CONFIG.key}&units=metric&lang=${owLang}`;
  
  console.log('API Request:', apiUrl);
  console.log('Current Language:', currentLang, '→ OpenWeather Lang:', owLang);
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
  
  try {
    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling.`);
      }
      throw new Error(`Weather API error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    console.error('Full error:', error);
    throw error;
  }
}

function displayWeatherInfo(data) {
  const t = translations[currentLang] || {};

  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, icon: iconCode }]
  } = data;

  const coord = data.coord || { lon: 0, lat: 0 };
  const { lon, lat } = coord;

  card.textContent = "";
  card.style.display = "flex";

  // City name
  const cityDisplay = document.createElement("h1");
  cityDisplay.textContent = city;
  cityDisplay.classList.add("cityDisplay");

  // Temperature
  const tempDisplay = document.createElement("p");
  tempDisplay.textContent = `${temp.toFixed(1)}${t.degree || '°C'}`;
  tempDisplay.classList.add("tempDisplay");

  // Humidity
  const humidityDisplay = document.createElement("p");
  humidityDisplay.textContent = `${t.humidity || 'Humidity:'} ${humidity}%`;
  humidityDisplay.classList.add("humidityDisplay");

  // Description
  const descDisplay = document.createElement("p");
  descDisplay.textContent = description;
  descDisplay.classList.add("descDisplay");

  // Weather icon
  const weatherIcon = document.createElement("img");
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.alt = description;
  weatherIcon.style.width = "100px";
  weatherIcon.style.height = "100px";
  weatherIcon.classList.add("mb-3");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherIcon);

  // Show map container
  const mapContainer = document.getElementById('mapContainer');
  if (mapContainer) mapContainer.classList.remove('map-hidden');

  // Update map
  const delta = 0.1;
  const bbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
  const mapFrame = document.getElementById('cityMap');
  if (mapFrame) {
    mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
  }
}

function displayError(message) {
  card.textContent = "";
  card.style.display = "flex";

<<<<<<< HEAD
    const errorDisplay = document.createElement('p');
    errorDisplay.classList.add('errorDisplay');

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay); 

}
=======
  const errorDisplay = document.createElement('p');
  errorDisplay.classList.add('errorDisplay');
  errorDisplay.textContent = message;
  card.appendChild(errorDisplay);
}
>>>>>>> 09378ee (Add multi-language support (JSON files, UI updates, RTL), documentation files)
