# CREATION'S Website Design Guide

Version: 1.0  
Stack: Next.js App Router + TypeScript + Tailwind CSS + shadcn/ui + Cloudinary

---

## 1. Design Direction

CREATION'S should feel like a premium residential interiors brand rather than an e-commerce catalogue or SaaS product.

The visual direction is:

- warm
- editorial
- calm
- premium
- residential
- photography-first
- minimal
- approachable

The permanent website should use restrained branding. Seasonal poster graphics such as umbrellas, hanging ornaments, festive borders, and campaign artwork should be reserved for campaign banners and social creatives rather than the core site UI.

Primary design principle:

> Let interior photography, typography, whitespace, and material-inspired colours carry the brand.

---

## 2. Brand Colour System

### Core palette

| Token | Name | Hex | Primary use |
|---|---|---:|---|
| `background` | Warm Ivory | `#F8F4EC` | Main page background |
| `surface` | Soft White | `#FFFDF9` | Cards and elevated surfaces |
| `surface-alt` | Soft Sand | `#EEE6D8` | Alternate sections |
| `brand` | Burgundy | `#722F37` | Primary CTA, brand accents |
| `brand-dark` | Deep Burgundy | `#572229` | Button hover, strong accents |
| `sage` | Muted Sage | `#7B8264` | Secondary accent |
| `olive` | Deep Olive | `#4B4A20` | Footer / rare feature sections |
| `gold` | Antique Gold | `#B58A4A` | Fine decorative accents |
| `champagne` | Champagne | `#D7BC82` | Soft premium accent |
| `foreground` | Espresso | `#29241F` | Primary text |
| `foreground-soft` | Warm Charcoal | `#403A34` | Secondary headings |
| `muted-foreground` | Warm Taupe | `#746B62` | Supporting copy |
| `border` | Warm Border | `#DED5C8` | Default borders |
| `border-strong` | Strong Border | `#CFC3B3` | Strong separators |

### Colour hierarchy

Approximate visual distribution:

- 70% warm ivory / white / sand
- 15% espresso typography
- 8% burgundy
- 4% sage / olive
- 3% gold

Do not implement these as literal percentages. They are a visual constraint.

### Colour rules

1. Burgundy is the primary brand colour.
2. Gold is decorative, not a primary UI colour.
3. Sage is secondary and should remain muted.
4. Deep olive should appear sparingly, preferably in the footer or a single feature area.
5. Avoid pure black for normal text.
6. Avoid bright reds, neon colours, cool greys, and saturated blues in the permanent website.
7. Do not place gold body text on ivory backgrounds.

---

## 3. CSS Variables

Use semantic tokens rather than raw hex values inside React components.

Example:

```css
:root {
  --background: #f8f4ec;
  --foreground: #29241f;

  --card: #fffdf9;
  --card-foreground: #29241f;

  --popover: #fffdf9;
  --popover-foreground: #29241f;

  --primary: #722f37;
  --primary-foreground: #fffdf9;

  --secondary: #eee6d8;
  --secondary-foreground: #29241f;

  --muted: #eee6d8;
  --muted-foreground: #746b62;

  --accent: #7b8264;
  --accent-foreground: #fffdf9;

  --border: #ded5c8;
  --input: #ded5c8;
  --ring: #722f37;

  --brand-burgundy: #722f37;
  --brand-burgundy-dark: #572229;
  --brand-sage: #7b8264;
  --brand-olive: #4b4a20;
  --brand-gold: #b58a4a;
  --brand-champagne: #d7bc82;
  --brand-ivory: #f8f4ec;
  --brand-sand: #eee6d8;
  --brand-espresso: #29241f;

  --radius: 0.75rem;
}
```

Avoid:

```tsx
<div className="bg-[#722F37] text-[#FFFDF9]" />
```

Prefer semantic utilities generated from the design tokens.

---

## 4. Typography

### Display font

**Cormorant Garamond**

Use for:

- hero headings
- section headings
- editorial statements
- major callouts

Recommended weights:

- 500: default headings
- 600: occasional emphasis

Avoid heavy 700+ display typography unless a specific composition requires it.

### Body / UI font

**Manrope**

Use for:

- navigation
- body copy
- labels
- buttons
- forms
- contact information
- captions

Recommended weights:

- 400: body
- 500: navigation / labels
- 600: buttons / emphasis

### Type scale

| Role | Desktop | Mobile | Notes |
|---|---:|---:|---|
| Hero H1 | 64–72px | 44–48px | Display font, tight leading |
| Section H2 | 44–52px | 34–40px | Display font |
| H3 | 24–30px | 22–26px | Display or body depending context |
| Lead | 18px / 30px | 17px / 28px | Body font |
| Body | 16px / 27px | 16px / 26px | Body font |
| Small | 14px / 22px | 14px / 22px | Captions / metadata |
| Eyebrow | 12–13px | 12px | Uppercase, ~0.14em tracking |

### Typography rules

- Keep body copy widths around 60–72 characters.
- Avoid centred paragraphs longer than two short lines.
- Prefer sentence case.
- Reserve uppercase for eyebrow labels and small navigation details.
- Do not use more than two font families.

---

## 5. Buttons

### Primary

Use for the single strongest action in a section.

Examples:

- Explore Collection
- Chat on WhatsApp
- Visit Our Store

Style:

- background: Burgundy
- text: Soft White
- hover: Deep Burgundy
- height: 48–52px
- horizontal padding: 24–28px
- border radius: pill / `rounded-full`
- font: Manrope
- weight: 600
- shadow: none by default

### Secondary

Style:

- transparent background
- Burgundy text
- 1px Burgundy border
- pill radius
- hover to Burgundy background + Soft White text

### Text CTA

Use for low-emphasis navigation.

Examples:

- View collection →
- View project →
- Learn more →

Do not place every action inside a filled button.

### Button rules

- Maximum two prominent buttons in one CTA group.
- Primary action appears first.
- Keep button copy concise.
- Icon use should be functional, not decorative.
- Use consistent heights across the site.

---

## 6. Border Radius

Recommended scale:

| Element | Radius |
|---|---:|
| Small controls | 8px |
| Default cards | 12px |
| Images | 16px |
| Large feature cards | 16–20px |
| Dialogs | 20px |
| Buttons | Full pill |

Base token:

```css
--radius: 0.75rem;
```

Avoid excessive rounding. The website should retain some architectural structure.

---

## 7. Borders and Shadows

Prefer:

- whitespace
- background contrast
- 1px warm borders
- photography
- subtle tonal hierarchy

Avoid strong drop shadows.

When elevation is genuinely required:

```css
box-shadow: 0 12px 40px rgba(41, 36, 31, 0.07);
```

Borders should normally use `#DED5C8`. Use `#CFC3B3` only when stronger separation is needed.

---

## 8. Spacing System

Base spacing sequence:

```text
4
8
12
16
24
32
40
48
64
80
96
120
144
```

Component spacing should usually use `8 / 12 / 16 / 24 / 32`.

Section spacing:

- Mobile: 64–80px vertical
- Desktop: 96–128px vertical

Hero:

- Desktop minimum height: 85–90vh
- Mobile top padding: ~40px after navigation
- Mobile bottom padding: ~64px

Do not compress sections simply to fit more content on screen.

---

## 9. Layout

### Global container

Maximum content width: `1280px`.

Recommended utility pattern:

```tsx
<div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
  {children}
</div>
```

### Reading width

Long-form text should normally remain within `680–760px`.

### Preferred layouts

- hero: 5/7 or 6/6 content/image split
- categories: 2x2 desktop, 1-column mobile
- gallery: editorial mixed grid
- about: image + text split
- testimonials: 3 columns desktop, swipe/stack on mobile
- location: text + map

---

## 10. Photography

Photography is the primary visual asset of the website.

Desired treatment:

- warm
- natural
- residential
- softly lit
- editorial
- realistic
- premium

Avoid:

- aggressive HDR
- excessive saturation
- cool blue colour grading
- highly staged stock-photo compositions
- unrelated generic luxury interiors
- excessive filters

Prefer actual CREATION'S installations whenever possible.

### Image ratios

| Context | Ratio |
|---|---|
| Hero | 4:5 or 3:4 |
| Category | 4:5 |
| Gallery landscape | 4:3 |
| Gallery portrait | 3:4 |
| About | 4:5 |
| Style cards | 3:4 |

### Image UI

Recommended wrapper:

```text
overflow-hidden
rounded-2xl
```

Hover:

```text
scale 1.00 → approximately 1.025
duration 500–700ms
```

Keep image animation subtle.

---

## 11. Cloudinary

Suggested asset structure:

```text
creations/
├── hero/
│   └── main-living-room
├── categories/
│   ├── curtains
│   ├── blinds
│   ├── upholstery
│   └── bedspreads
├── projects/
│   ├── living-room-01
│   ├── bedroom-01
│   └── ...
├── about/
│   ├── store
│   └── team
└── campaigns/
    ├── rain-wear/
    ├── festive-wear/
    └── summer-wear/
```

Use descriptive public IDs and keep high-quality originals in Cloudinary.

---

## 12. Navigation

Desktop structure:

```text
CREATION'S

Collections
Gallery
About
Visit Us

WhatsApp
```

Style:

- height: 76–84px
- sticky
- Warm Ivory translucent surface
- subtle backdrop blur
- 1px warm bottom border

Mobile navigation should open inside a shadcn `Sheet`.

Do not use a complex mega-menu in the first release.

---

## 13. Homepage Structure

Recommended order:

1. Header / navigation
2. Hero
3. Product categories
4. Why CREATION'S
5. Featured projects / gallery
6. Find Your Style
7. About CREATION'S
8. Testimonials
9. Primary contact CTA
10. Store location / map
11. Footer
12. Mobile persistent contact bar

The landing page should optimise for WhatsApp messages, phone calls, store visits, and brand discovery.

---

## 14. shadcn/ui Usage

shadcn components should support the design system, not define it.

### Install initially

- `button`
- `sheet`
- `dialog`
- `separator`

Purpose:

- `button`: CTAs
- `sheet`: mobile navigation
- `dialog`: gallery image lightbox
- `separator`: footer / subtle structural dividers

### Add later only when required

- `carousel`: testimonials / mobile project slider
- `accordion`: FAQs
- `input`: contact form
- `textarea`: contact form
- `form`: validated form workflow
- `sonner`: form success state

### Avoid initially

- sidebar
- data-table
- command
- menubar
- dashboard-oriented components

Plain Next.js `Link` elements are enough for the primary desktop navigation in version 1.

---

## 15. Component Structure

### `components/ui/`

Contains shadcn primitives. Avoid business-specific copy or layout here.

### `components/common/`

Examples:

- `SectionHeading`
- `WhatsAppButton`
- `CloudinaryImage`
- `ContactBar`

### `components/layout/`

Examples:

- `Header`
- `MobileNav`
- `Footer`
- `Container`
- `Section`

### `components/sections/`

Examples:

- `HeroSection`
- `CategorySection`
- `BenefitsSection`
- `GallerySection`
- `StyleSection`
- `AboutSection`
- `TestimonialsSection`
- `ContactCTASection`
- `LocationSection`

---

## 16. Component Principles

1. Server Components by default.
2. Add `"use client"` only where browser interaction is required.
3. Keep content data outside presentation components where practical.
4. Do not hardcode the same business information in multiple components.
5. Keep styling local using Tailwind utilities.
6. Use semantic design tokens.
7. Build reusable layout primitives before page-specific abstractions.
8. Avoid abstracting one-off elements prematurely.

---

## 17. Animation

Recommended:

- image scale on hover
- slight opacity / translate entrance for major sections
- smooth mobile navigation
- restrained button transitions

Avoid:

- parallax-heavy layouts
- bouncing CTAs
- constant floating elements
- long animation sequences
- large page transition effects

Target duration:

- 200–300ms for controls
- 500–700ms for photography

Animation must never delay navigation or contact actions.

---

## 18. Responsive Behaviour

Design mobile-first.

Check at minimum:

```text
375px
430px
768px
1024px
1280px
1440px
```

Mobile priorities:

1. readable hero
2. immediate CTA
3. full-width photography
4. simple navigation
5. persistent Call / WhatsApp / Directions actions
6. no tiny multi-column content

---

## 19. Accessibility

Minimum requirements:

- semantic heading hierarchy
- descriptive image `alt` text
- keyboard-accessible navigation
- visible focus states
- sufficient text contrast
- buttons and links must remain distinguishable
- adequate touch targets
- meaningful dialog labels
- decorative images should use empty alt text where appropriate

Do not reduce opacity on body text to the point that it becomes difficult to read.

---

## 20. Copy Style

Copy should be concise, warm, confident, product-aware, and locally relevant.

Avoid generic luxury language such as:

> Transform your dreams into timeless elegance.

Prefer specific statements such as:

> Custom curtains, blinds and upholstery selected for your home.

---

## 21. Footer

The footer may use Deep Olive `#4B4A20`.

Suggested treatment:

- Deep Olive background
- Warm Ivory text
- Antique Gold minor accents
- Burgundy should not dominate here

Include:

- logo
- product categories
- address
- phone
- WhatsApp
- opening hours
- directions
- social links
- copyright

---

## 22. Seasonal Campaigns

Campaigns may deliberately deviate from the permanent website palette.

Examples:

- Rain Wear
- Festive Wear
- Summer Wear
- Diwali
- seasonal offers

Campaign graphics may include umbrella ornaments, festive borders, stronger maroon, decorative gold, and illustrated seasonal elements.

Keep these visually contained inside campaign banners, cards, or dedicated landing sections. Do not let campaign styling redefine the global website UI.

---

## 23. Initial Build Order

1. design tokens / global CSS
2. fonts
3. `Container`
4. `Section`
5. `Button` variants
6. Header
7. Mobile navigation
8. Hero
9. Category section
10. Gallery
11. Remaining homepage sections
12. Footer
13. mobile contact bar
14. final accessibility / responsive review

Do not build all homepage sections before validating the Header + Hero direction.

---

## 24. Definition of Done for a Section

Before a section is considered complete:

- desktop layout works
- mobile layout works
- text hierarchy is clear
- spacing follows the system
- colour tokens are semantic
- image ratio is intentional
- keyboard behaviour works where interactive
- no duplicated business data
- no unnecessary client component
- no raw hardcoded brand hex values in JSX
- CTA behaviour is clear
- visuals remain consistent with this guide

---

## 25. Canonical Design Snapshot

```text
PRIMARY BRAND
Burgundy       #722F37
Deep Burgundy  #572229

SECONDARY
Sage           #7B8264
Deep Olive     #4B4A20
Antique Gold   #B58A4A
Champagne      #D7BC82

SURFACES
Warm Ivory     #F8F4EC
Soft White     #FFFDF9
Soft Sand      #EEE6D8

TEXT
Espresso       #29241F
Warm Charcoal  #403A34
Warm Taupe     #746B62

BORDERS
Warm Border    #DED5C8
Strong Border  #CFC3B3

TYPE
Display        Cormorant Garamond
Body / UI      Manrope

CONTENT WIDTH
1280px max

RADIUS
8 / 12 / 16 / 20px
Buttons: pill

SECTION SPACING
Mobile         64–80px
Desktop        96–128px

STYLE
Warm
Editorial
Minimal
Residential
Premium
Photography-first
```
