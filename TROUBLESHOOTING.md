# Troubleshooting: Weather Not Loading in Other Languages

## Common Issues & Solutions

### Issue 1: "Could not fetch weather data" Error
**Status:** This usually means the API call failed

**Common Causes:**
1. **City name not found** - Try major cities first:
   - English: London, Paris, Tokyo, New York
   - Russian: Москва (Moscow), Санкт-Петербург (Saint Petersburg)
   - Arabic: القاهرة (Cairo), الرياض (Riyadh)
   - Chinese: 北京 (Beijing), 上海 (Shanghai)
   - Japanese: 東京 (Tokyo), 京都 (Kyoto)
   - Korean: 서울 (Seoul), 부산 (Busan)

2. **Typo in city name** - Check spelling carefully

3. **Network issue** - Check browser console (F12) for actual error

4. **API limit reached** - Wait a few seconds and try again

---

## How to Debug

### Step 1: Open Browser Console
Press **F12** → Click **Console** tab

### Step 2: Search for a City
Try searching for "Seoul" (English spelling works in any language)

### Step 3: Check Console Output
You should see:
```
API Request: https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=...&lang=kr
Current Language: ko → OpenWeather Lang: kr
```

### Step 4: Look for Errors
If there's an error, it will show:
- `City "xxx" not found` → Typo in city name
- `Request timeout` → Network too slow
- Other HTTP errors → API problem

---

## Testing Each Language

### Korean (한국어) - English City Names ✅
1. Change language to **한국어**
2. Search for: **Seoul** (not 서울)
3. Should show weather in Korean description

### Korean (한국어) - Korean City Names ✅
1. Change language to **한국어**
2. Search for: **서울** (Seoul in Korean)
3. Should show weather with Korean text

### Russian (Русский) ✅
1. Change language to **Русский**
2. Search for: **Moskva** or **Moscow**
3. Should show weather with Russian text

### Arabic (العربية) ✅
1. Change language to **العربية**
2. Search for: **Cairo** or **الرياض**
3. Should show weather with Arabic text
4. Page layout should switch to RTL

### Chinese (中文) ✅
1. Change language to **中文**
2. Search for: **Beijing** or **北京**
3. Should show weather with Chinese text

---

## API Language Support Matrix

These languages HAVE full weather description support:
- ✅ English (en)
- ✅ Russian (ru)
- ✅ Chinese Simplified (zh_cn)
- ✅ Spanish (es)
- ✅ French (fr)
- ✅ German (de)
- ✅ Arabic (ar)
- ✅ Persian/Farsi (fa)
- ✅ Japanese (ja)
- ✅ Korean (kr)
- ✅ Italian (it)
- ✅ Turkish (tr)
- ✅ Portuguese (pt)
- ✅ Vietnamese (vi)
- ✅ Indonesian (id)

These languages have LIMITED API support (UI translates, but weather description may be in English):
- 🟡 Uzbek (fallback to en)
- 🟡 Kazakh (fallback to en)
- 🟡 Kyrgyz (fallback to en)
- 🟡 Turkmen (fallback to en)
- 🟡 Tajik (fallback to en)
- 🟡 Pashto (fallback to en)

---

## Quick Fixes to Try

### Fix 1: Clear Browser Cache
1. Press **Ctrl + Shift + Delete** (or Cmd + Shift + Delete on Mac)
2. Clear "Cached images and files"
3. Reload page

### Fix 2: Hard Refresh
Press **Ctrl + Shift + R** (or Cmd + Shift + R on Mac) to force reload

### Fix 3: Check Network
1. Open DevTools (F12)
2. Go to **Network** tab
3. Search for a city
4. Look for the API request URL
5. Check if response is successful (green 200 status)

### Fix 4: Try English City Names First
Even in other languages, English city names work fine:
- **Seoul** works in any language
- **Moscow** works in any language
- **Cairo** works in any language

---

## Expected Behavior

### When Everything Works:
1. Select a language from dropdown
2. All UI text updates immediately
3. Type a city name
4. Click "Get Weather" (button shows translated text)
5. Button shows "Loading..." for 2-3 seconds
6. Weather card appears with:
   - City name
   - Temperature
   - Humidity
   - Weather description (in selected language if supported)
   - Weather icon
7. Map appears below with city location

### What You'll See:
```
Москва
-5.2°C
Влажность: 72%
облачное небо
[Weather Icon]
[Map below]
```

---

## Still Not Working? Check This:

1. **Is the browser showing the app?** 
   - URL should be `http://localhost:8000`

2. **Did you select a language?**
   - Check top-right dropdown

3. **Did you type a valid city name?**
   - Try "London" or "Tokyo" first

4. **Is there an error message?**
   - Check Browser Console (F12)

5. **Try these test cities:**
   - London ✅ (works in all languages)
   - Paris ✅ (works in all languages)
   - Tokyo ✅ (works in all languages)
   - New York ✅ (works in all languages)
   - Moscow (Moskva) ✅
   - Cairo ✅
   - Beijing ✅
   - Seoul ✅

---

## Browser Console Debug Commands

You can paste these in the Console (F12) to test:

```javascript
// Check current language
console.log('Current Language:', currentLang);

// Check if translation is loaded
console.log('Translations:', translations);

// Test API call manually
fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=3e320bc4c127d23072734fc941253e3a&units=metric&lang=en')
  .then(r => r.json())
  .then(d => console.log(d));
```

---

## Summary

The app should work in all 21 languages. If you see an error:

1. Check browser console (F12)
2. Try English city names first (London, Paris, Tokyo)
3. Try clearing cache and reloading
4. Look at the actual error message for clues

If the issue persists, share the browser console error and I can fix it!
