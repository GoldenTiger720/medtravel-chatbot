# Question Templates - Visual Guide

## 🎨 Template Card Examples

### Example 1: Dental Implants
```
┌─────────────────────────────────────────┐
│  [Dental Care]                          │
│                                         │
│  [IMAGE: Modern dental clinic]          │
│  https://images.unsplash.com/           │
│  photo-1606811841689                    │
│                                         │
├─────────────────────────────────────────┤
│  I need dental implants in Turkey.     │
│  What are my options?                   │
│                                         │
│  Find top-rated dental clinics in       │
│  Turkey offering implant procedures     │
│                                         │
│  [dental] [implants] [turkey]          │
└─────────────────────────────────────────┘
```

### Example 2: Rhinoplasty (Cosmetic)
```
┌─────────────────────────────────────────┐
│  [Cosmetic Surgery]                     │
│                                         │
│  [IMAGE: Medical aesthetics]            │
│  https://images.unsplash.com/           │
│  photo-1576091160399                    │
│                                         │
├─────────────────────────────────────────┤
│  Looking for rhinoplasty surgeons      │
│  in South Korea                         │
│                                         │
│  World-class rhinoplasty procedures     │
│  in South Korea                         │
│                                         │
│  [cosmetic] [rhinoplasty] [korea]      │
└─────────────────────────────────────────┘
```

### Example 3: IVF Treatment (Fertility)
```
┌─────────────────────────────────────────┐
│  [Fertility Treatment]                  │
│                                         │
│  [IMAGE: Fertility clinic]              │
│  https://images.unsplash.com/           │
│  photo-1584820927498                    │
│                                         │
├─────────────────────────────────────────┤
│  IVF treatment in Czech Republic        │
│  under $5000                            │
│                                         │
│  Affordable IVF treatment with high     │
│  success rates                          │
│                                         │
│  [ivf] [fertility] [czech]             │
└─────────────────────────────────────────┘
```

## 📱 UI Layout Examples

### Desktop View (4 columns)
```
╔════════════════════════════════════════════════════════════════╗
║                   How can we help you today?                   ║
║         Start a conversation to get personalized               ║
║                    recommendations                              ║
║                                                                 ║
║        [Hide Templates] ← Toggle Button                        ║
║                                                                 ║
║              Popular Questions                                  ║
║         Choose a question to get started                        ║
║                                                                 ║
║  [All] [Dental] [Cosmetic] [Fertility] [Orthopedic]...        ║
║                                                                 ║
║  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐          ║
║  │ Dental  │  │Cosmetic │  │Fertility│  │Orthoped.│          ║
║  │Implants │  │Rhino.   │  │  IVF    │  │  Knee   │          ║
║  │ Turkey  │  │ Korea   │  │  Czech  │  │  India  │          ║
║  └─────────┘  └─────────┘  └─────────┘  └─────────┘          ║
║                                                                 ║
║  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐          ║
║  │  Teeth  │  │ Breast  │  │   Egg   │  │   Hip   │          ║
║  │Whitening│  │Augment. │  │Freezing │  │Thailand │          ║
║  │  Dubai  │  │ Mexico  │  │  Spain  │  │         │          ║
║  └─────────┘  └─────────┘  └─────────┘  └─────────┘          ║
║                                                                 ║
║  ... (continues for all 20 templates)                          ║
╚════════════════════════════════════════════════════════════════╝
```

### Mobile View (1 column)
```
╔═══════════════════════════════╗
║  How can we help you today?   ║
║                               ║
║  [Hide Templates]             ║
║                               ║
║  Popular Questions            ║
║                               ║
║  [All] [Dental] [Cosmetic]    ║
║  [Fertility] [Orthopedic]...  ║
║                               ║
║  ┌─────────────────────────┐  ║
║  │   [Dental Care]         │  ║
║  │                         │  ║
║  │   [Image]               │  ║
║  │                         │  ║
║  │ Dental implants in      │  ║
║  │ Turkey. What are my     │  ║
║  │ options?                │  ║
║  │                         │  ║
║  │ [tags...]               │  ║
║  └─────────────────────────┘  ║
║                               ║
║  ┌─────────────────────────┐  ║
║  │   [Cosmetic Surgery]    │  ║
║  │                         │  ║
║  │   [Image]               │  ║
║  │   ...                   │  ║
║  └─────────────────────────┘  ║
║                               ║
║  (Scrollable...)              ║
╚═══════════════════════════════╝
```

## 🎯 Category Filter View

### All Categories Selected
```
[All] [Dental] [Cosmetic] [Fertility] [Orthopedic] [Cardiac] [General]
 ▓▓▓   ░░░░░    ░░░░░░░     ░░░░░░░      ░░░░░░░░     ░░░░░░    ░░░░░░
Active  Inactive Inactive   Inactive     Inactive     Inactive  Inactive

Showing: 20 templates
```

### Dental Category Selected
```
[All] [Dental] [Cosmetic] [Fertility] [Orthopedic] [Cardiac] [General]
 ░░░    ▓▓▓▓     ░░░░░░░     ░░░░░░░      ░░░░░░░░     ░░░░░░    ░░░░░░

Showing: 3 templates (Implants, Whitening, Veneers)
```

### Cosmetic Category Selected
```
[All] [Dental] [Cosmetic] [Fertility] [Orthopedic] [Cardiac] [General]
 ░░░    ░░░░░     ▓▓▓▓▓▓▓     ░░░░░░░      ░░░░░░░░     ░░░░░░    ░░░░░░

Showing: 4 templates (Rhinoplasty, Breast, Lipo, Facelift)
```

## 🌈 Color-Coded Categories

### Visual Color Guide
```
┌─ Dental ────────────┐    ┌─ Cosmetic ──────────┐
│ 🔵 Blue Theme       │    │ 🟣 Purple Theme     │
│ bg-blue-500/10      │    │ bg-purple-500/10    │
│ text-blue-600       │    │ text-purple-600     │
└─────────────────────┘    └─────────────────────┘

┌─ Fertility ─────────┐    ┌─ Orthopedic ────────┐
│ 🩷 Pink Theme       │    │ 🟢 Green Theme      │
│ bg-pink-500/10      │    │ bg-green-500/10     │
│ text-pink-600       │    │ text-green-600      │
└─────────────────────┘    └─────────────────────┘

┌─ Cardiac ───────────┐    ┌─ General ───────────┐
│ 🔴 Red Theme        │    │ ⚫ Gray Theme       │
│ bg-red-500/10       │    │ bg-gray-500/10      │
│ text-red-600        │    │ text-gray-600       │
└─────────────────────┘    └─────────────────────┘
```

## 🎬 User Interaction Flow

### Step-by-Step Visual Flow

```
1. Initial State
   ┌─────────────────────┐
   │  Chat Interface     │
   │  (Empty)            │
   │                     │
   │  ✨ Templates       │
   │  Displayed          │
   └─────────────────────┘

2. User Hovers Card
   ┌─────────────────────┐
   │  Card Scales 102%   │
   │  Shadow Increases   │
   │  Image Zooms 110%   │
   │  Cursor: Pointer    │
   └─────────────────────┘

3. User Clicks Card
   ┌─────────────────────┐
   │  Question → Input   │
   │  Templates Hide     │
   │  Form Submits       │
   └─────────────────────┘

4. Loading State
   ┌─────────────────────┐
   │  [Spinner]          │
   │  "Searching for     │
   │   best options..."  │
   └─────────────────────┘

5. Results Display
   ┌─────────────────────┐
   │  AI Response        │
   │                     │
   │  ┌──┐ ┌──┐ ┌──┐    │
   │  │C1│ │C2│ │C3│    │  Clinics
   │  └──┘ └──┘ └──┘    │
   │                     │
   │  ┌──┐ ┌──┐ ┌──┐    │
   │  │H1│ │H2│ │H3│    │  Hotels
   │  └──┘ └──┘ └──┘    │
   │                     │
   │  ┌──────────┐       │
   │  │ Flight 1 │       │  Flights
   │  └──────────┘       │
   └─────────────────────┘
```

## 📊 Template Distribution Chart

```
Categories          Count    Percentage
─────────────────────────────────────────
Dental              3        15%  ███
Cosmetic            4        20%  ████
Fertility           3        15%  ███
Orthopedic          3        15%  ███
Cardiac             3        15%  ███
General Medical     4        20%  ████
─────────────────────────────────────────
TOTAL               20       100%
```

## 🗺️ Geographic Distribution

### Popular Destinations Covered

```
Europe
  ├─ Czech Republic (IVF)
  ├─ Spain (Egg Freezing)
  ├─ Germany (Spine, Cancer)
  └─ Georgia (Surrogacy)

Asia
  ├─ Turkey (Implants, Lipo, Bariatric)
  ├─ South Korea (Rhinoplasty, LASIK)
  ├─ India (Knee, Angioplasty)
  ├─ Thailand (Veneers, Hip, Checkup)
  ├─ UAE (Facelift, Valve)
  └─ Singapore (Bypass)

Americas
  └─ Mexico (Breast Augmentation)
```

## 🌐 Bilingual Example Comparison

### English vs Arabic Layout

**English (LTR)**
```
┌─────────────────────────────────┐
│ [Dental Care]                   │
│                                 │
│ I need dental implants in       │
│ Turkey. What are my options?    │
│                                 │
│ Find top-rated dental clinics   │
│                                 │
│ [dental] [implants] [turkey]    │
└─────────────────────────────────┘
```

**Arabic (RTL)**
```
┌─────────────────────────────────┐
│                   [رعاية الأسنان] │
│                                 │
│       أحتاج إلى زراعة أسنان في  │
│            تركيا. ما هي خياراتي؟ │
│                                 │
│   ابحث عن أفضل عيادات الأسنان   │
│                                 │
│    [turkey] [implants] [dental] │
└─────────────────────────────────┘
```

## 🎨 Hover States

### Normal State
```
┌─────────────────┐
│ [Category]      │
│                 │
│ [Image 100%]    │
│                 │
│ Question text   │
│ Description     │
│ [tags]          │
└─────────────────┘
opacity: 1
scale: 1
shadow: sm
```

### Hover State
```
┌─────────────────┐
│ [Category]      │
│                 │
│ [Image 110%]    │ ← Zoomed
│                 │
│ Question text   │ ← Primary color
│ Description     │
│ [tags]          │
└─────────────────┘
opacity: 1
scale: 1.02         ← Slightly larger
shadow: lg          ← Larger shadow
cursor: pointer
transition: smooth
```

## 💫 Animation Sequence

### Card Entrance Animation (Optional Future Enhancement)
```
Time: 0ms    → opacity: 0, translateY: 20px
Time: 100ms  → opacity: 0.5, translateY: 10px
Time: 200ms  → opacity: 1, translateY: 0px
```

### Stagger Effect
```
Card 1: delay 0ms
Card 2: delay 50ms
Card 3: delay 100ms
Card 4: delay 150ms
...
```

## 📐 Exact Dimensions

### Card Sizes
```
Desktop (4 col):  Width: ~300px, Height: auto
Tablet (3 col):   Width: ~250px, Height: auto
Tablet (2 col):   Width: ~350px, Height: auto
Mobile (1 col):   Width: 100%, Height: auto
```

### Image Sizes
```
Aspect Ratio: 16:9 or 2:1
Height: 160px (fixed)
Width: 100% (responsive)
Object-fit: cover
```

### Badge Dimensions
```
Padding: 12px (x) × 4px (y)
Font Size: 12px
Border Radius: 9999px (full)
Border: 1px solid
```

## 🎯 Click Targets (Accessibility)

### Minimum Touch Targets
```
Card:        Min 280px × 240px ✅
Button:      Min 44px × 44px ✅
Filter Tab:  Min 80px × 36px ✅
```

## 📱 Responsive Breakpoints

```
screens: {
  'sm':   '640px',   → 1 column
  'md':   '768px',   → 2 columns
  'lg':   '1024px',  → 3 columns
  'xl':   '1280px',  → 4 columns
  '2xl':  '1536px',  → 4 columns
}
```

## ✅ Checklist for Testing

### Visual Testing
- [ ] All 20 cards display with images
- [ ] Category badges show correct colors
- [ ] Hover effects work smoothly
- [ ] Responsive grid adapts correctly
- [ ] RTL layout works in Arabic

### Functional Testing
- [ ] Category filters work
- [ ] Cards are clickable
- [ ] Auto-submission works
- [ ] Templates hide after selection
- [ ] Toggle button works

### Performance Testing
- [ ] Images load quickly
- [ ] Smooth scrolling
- [ ] No layout shift
- [ ] Fast filtering
- [ ] Efficient rendering

---

## 🎉 Visual Summary

The Question Templates system provides a **beautiful, intuitive, and functional** interface for users to explore medical tourism options. With carefully designed cards, smooth interactions, and comprehensive bilingual support, it transforms the user experience from text-based queries to visual, guided exploration.

**Test it now at:** http://localhost:3000/chat
