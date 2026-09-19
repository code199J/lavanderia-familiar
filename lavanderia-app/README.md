# Lavandería Familiar App - PWA Familiar

## 🌐 Deployed on Netlify

### Live Site
**https://kind-olives-eat-lokum.netlify.app**

*Every change is automatically deployed to all family members' phones.*

## 📱 How to Use (for all family members)

### Mobile Setup (30 seconds)

#### Option 1: Install from the link
1. Open: `https://kind-olives-eat-lokum.netlify.app` in Safari or Chrome
2. **iPhone (Safari):** Tap 📤 (Share) → "Add to Home Screen" → "Add"
3. **Android (Chrome):** Tap ⋮ (3 dots) → "Install app" → "Add"
4. ✅ Icono `👕 Lavandería Familiar` appears on your home screen

#### Option 2: Use as progressive web app
Open in browser → All features work even offline after first load

---

## 🎯 How It Works

| Task | Frequency | Who Does It |
|------|-----------|-------------|
| **Personal Laundry 👕** | Every 4 days | Automatic rotation: Mafer → Anto → Jhonnathan → Daniela |
| **Bed Sheets 🛏️** | Every 7 days | Whoever's turn on that day |
| **Towels 🧽** | Every 14 days | Whoever's turn on that day |

### 🎯 **Golden Rule**
> If you don't do your laundry **that specific day** → You lose the turn for good.

---

## ⚙️ Family Setup (once, for each person)

1. Open the app on your phone
2. Tap ⚙️ (settings button)
3. Configure:
   - **Names:** Mafer, Anto (shown in pink), Jhonnathan, Daniela
   - **Bed Sheets:** Sunday (every week)
   - **Towels:** Saturday (every 14 days)
   - **Detergent:** "I have soap available"
4. Tap **Save** → Your configuration is saved locally

---

## 🔴 Warning System

### Detergent Alert
- When someone sets "No soap available"
- **Everyone** sees a large red warning banner
- When soap is purchased → Tap "I bought soap ✓" → Warning disappears

### Lost Days
- If you don't do your laundry before midnight of your assigned day
- The task shows as "❌ Lost" (cannot be marked as done)
- Next turn automatically moves to the next person

---

## 📊 What You'll See

### Home Screen
- **Week view** (Monday to Sunday)
- **Today's date highlighted** (blue border)
- **Colored cards** for each task
- **Anto shown in pink** (family's special touch!)

### Legend at Bottom
- Different colors for different family members
- Clear indicators for each type of laundry

### Day Details
- Tap any day → See all tasks for that day
- Mark as done ✅ when completed
- Visual feedback for lost/assigned days

---

## 🔄 Features & Updates

### Offline Capability
- ✅ Works completely offline after first visit
- ✅ All data saved locally in your browser
- ✅ No internet needed for daily use

### Responsive Design
- ✅ Perfect on mobile phones (no horizontal scrolling)
- ✅ Optimized for touch interactions
- ✅ Small screen friendly (up to 320px width)

### Anto Pink Theme
- ✅ Anto's tasks and assignments shown in pink
- ✅ Family-specific visual personalization
- ✅ All family members have distinct colors

### Lost Day Logic
- ✅ Automatic detection of missed days
- ✅ Clear visual indicators for lost tasks
- ✅ No double-marking of past-due tasks

---

## 📁 Project Structure

```
lavanderia-app/
├── index.html              # Main interface
├── app.js                  # Complete logic
├── styles.css              # Responsive design (Anto pink)
├── manifest.json           # PWA configuration
├── sw.js                   # Service worker (offline support)
├── icon-192.png             # 192x192 icon
├── icon-512.png             # 512x512 icon
├── GUIA_FAMILIA.md          # Complete instructions
└── README.md                # This file
```

---

## 🛠 Development

### Local Development
1. Clone this repository
2. Open `index.html` in your browser
3. Changes are reflected immediately

### Deploy on Netlify
1. Go to [netlify.com](https://netlify.com)
2. Create a new site from GitHub
3. Connect your repository
4. Deploy! (automatic for every change)

### Key Features Implemented
- ✅ PWA (Progressive Web App) support
- ✅ Offline functionality
- ✅ Mobile-responsive design
- ✅ Family-specific color coding (Anto pink)
- ✅ Lost day detection and prevention
- ✅ Alert system for detergent
- ✅ Smooth animations and transitions
- ✅ Accessibility features

---

## 💡 Usage Tips

### For Maximum Family Coordination
1. **Open the link together** the first time (all family members)
2. **Set identical configurations** (same days, names)
3. **Check daily** before midnight
4. **Mark completed tasks** immediately

### Troubleshooting
- **App not installing?** Try Chrome (Android) or Safari (iPhone)
- **Not working offline?** Make sure you've visited at least once
- **Configuration issues?** Clear browser cache and reload

---

## 🔄 How Updates Work

Every change I make is **automatically deployed to all family members**:

- `styles.css` → New design improvements
- `app.js` → Bug fixes and new features  
- `index.html` → UI enhancements
- All files → Continuous improvement

**No app store waiting periods!**

---

## 📞 Support

### Questions or Issues?
Ask **Jhonnathan** (who created it 😉)

### Contact via GitHub
Create an issue in this repository

---

## ✨ Special Features

### Anto Pink
- Anto's assignments shown in pink throughout the app
- Family-specific visual identity
- Makes it easy to spot Anto's tasks at a glance

### Lost Day Protection
- Smart detection of missed deadlines
- Prevents accidental double-marking
- Clear visual feedback for missed opportunities

### Mobile-Optimized
- No horizontal scrolling on any device
- Touch-friendly buttons and interactions
- Fast loading and smooth animations

---

## 🎯 The Result

**One simple link** that works perfectly on every family member's phone:
- ✅ Clear visual organization
- ✅ Easy daily tracking
- ✅ Family coordination made simple
- ✅ Modern, responsive design
- ✅ Anto pink personal touch
- ✅ Completely offline capable

**Ready to organize your family's laundry?**

📱 **Visit:** https://kind-olives-eat-lokum.netlify.app

---

*Created with ❤️ for the La Familia App*
