# Quick Test Guide: Translation & Multi-Alphabet City Search

## 🌐 How to Test the App

### Test 1: Translation Switching (UI Translation)
1. Open the app at `http://localhost:8000`
2. Click the language dropdown (top right)
3. Select each language and observe:
   - **Title** changes to weather name in that language
   - **Button** changes to "Get Weather" equivalent
   - **Placeholder** text updates for city input
   - **Language label** changes
   - For **Arabic (العربية)**, **Persian (فارسی)**, **Pashto (پښتو)**: page layout flips to RTL

---

### Test 2: City Search in Different Alphabets

#### English/Latin Alphabet ✅
- London
- Tokyo
- Paris
- New York

#### Russian (Cyrillic) ✅
Select Russian language, then search for:
- Москва (Moscow)
- Санкт-Петербург (Saint Petersburg)  
- Казань (Kazan)
- Новосибирск (Novosibirsk)

#### Arabic (العربية) ✅
Select Arabic language, then search for:
- القاهرة (Cairo)
- الرياض (Riyadh)
- دبي (Dubai)
- بيروت (Beirut)

#### Chinese (中文) ✅
Select Chinese language, then search for:
- 北京 (Beijing)
- 上海 (Shanghai)
- 广州 (Guangzhou)
- 深圳 (Shenzhen)

#### Japanese (日本語) ✅
Select Japanese language, then search for:
- 東京 (Tokyo)
- 京都 (Kyoto)
- 大阪 (Osaka)
- 横浜 (Yokohama)

#### Korean (한국어) ✅
Select Korean language, then search for:
- 서울 (Seoul)
- 부산 (Busan)
- 대구 (Daegu)
- 인천 (Incheon)

#### Greek ✅
Try searching for these (English input, but works with Greek names):
- Athens
- Thessaloniki

#### Hebrew ✅
- Tel Aviv
- Jerusalem

#### Hindi/Devanagari ✅
- Delhi
- Mumbai
- Bangalore

#### Thai ✅
- Bangkok
- Chiang Mai

---

## 🎯 Expected Results

When you search for a city:
1. **Loading indicator** appears (button shows "Loading..." in selected language)
2. **Weather card** displays with:
   - City name (as returned by API)
   - Temperature in °C
   - Humidity percentage
   - Weather description (in selected language if supported by OpenWeatherMap)
   - Weather icon
3. **Map** shows the city location

When you switch languages:
1. **All UI text** updates immediately
2. **Weather display** refreshes with translated text
3. **Page direction** changes to RTL for right-to-left languages

---

## 🔍 Technical Details

### API Encoding Example
When you search for "北京":
```
Input: 北京
Encoded: %E5%8C%97%E4%BA%AC
API URL: https://api.openweathermap.org/data/2.5/weather?q=%E5%8C%97%E4%BA%AC...
API Response: Name: "Beijing", Weather in Chinese
```

### Browser Console
Open Browser DevTools (F12) → Console to see:
```
Initial language: ru
Weather fetch error: (if any)
API Response: {...actual weather data...}
```

---

## ✅ Verification Checklist

- [ ] Language selector updates UI text
- [ ] Arabic/Persian/Pashto activates RTL mode
- [ ] Can search for Russian city with Cyrillic characters
- [ ] Can search for Arabic city with Arabic characters
- [ ] Can search for Chinese city with Chinese characters
- [ ] Can search for Japanese city with Japanese characters
- [ ] Can search for Korean city with Korean characters
- [ ] Weather data displays after search
- [ ] Map appears below weather card
- [ ] Button disables during loading ("Loading..." text shows)
- [ ] Language preference persists after page reload

---

## 🐛 Troubleshooting

**Q: Text doesn't change when I select a language**
- A: Check browser console (F12) for errors. Make sure lang/xx.json files exist.

**Q: Non-Latin city search returns "not found"**
- A: Some small towns may not be in the API database. Try major cities first.

**Q: Weather description is in English not my language**
- A: OpenWeatherMap doesn't support all languages. This is expected for Uzbek, Kazakh, etc.

**Q: Page doesn't go RTL for Arabic**
- A: Check if you selected Arabic. The app sets `dir="rtl"` automatically.

**Q: Map doesn't appear**
- A: Check browser console for network errors. OpenStreetMap may be blocked.

---

## 📊 Language Support Matrix

| Language | UI | Search | Weather Desc | RTL |
|----------|----|----|-------|-----|
| English | ✅ | ✅ | ✅ | ❌ |
| Russian | ✅ | ✅ | ✅ | ❌ |
| Chinese | ✅ | ✅ | ✅ | ❌ |
| Arabic | ✅ | ✅ | ✅ | ✅ |
| Persian | ✅ | ✅ | ✅ | ✅ |
| Japanese | ✅ | ✅ | ✅ | ❌ |
| Korean | ✅ | ✅ | ✅ | ❌ |
| Spanish | ✅ | ✅ | ✅ | ❌ |
| French | ✅ | ✅ | ✅ | ❌ |
| German | ✅ | ✅ | ✅ | ❌ |
| Portuguese | ✅ | ✅ | ✅ | ❌ |
| Turkish | ✅ | ✅ | ✅ | ❌ |
| Italian | ✅ | ✅ | ✅ | ❌ |
| Indonesian | ✅ | ✅ | ✅ | ❌ |
| Vietnamese | ✅ | ✅ | ✅ | ❌ |
| Uzbek | ✅ | ✅ | 🟡 | ❌ |
| Kazakh | ✅ | ✅ | 🟡 | ❌ |
| Kyrgyz | ✅ | ✅ | 🟡 | ❌ |
| Turkmen | ✅ | ✅ | 🟡 | ❌ |
| Tajik | ✅ | ✅ | 🟡 | ❌ |
| Pashto | ✅ | ✅ | 🟡 | ✅ |

✅ = Fully supported | 🟡 = Partial (UI only, description in English) | ❌ = Not applicable
