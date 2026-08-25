# CREATION'S Technical SEO Implementation Guide (v2.0)

This document is the canonical technical SEO reference and operational guide for the **CREATION'S** website.

---

## 1. Business Positioning & Target Audience

* **Primary Proposition**: **Curtains and Blinds Store in Besant Nagar, Chennai**
* **Supporting Categories**: Upholstery, Bedspreads & Cushions
* **Geographic Service Scope**:
  * **Primary Core Hub**: Besant Nagar (Showroom on Urur Olcott Kuppam Rd near Rajaji Bhavan)
  * **Secondary Neighbourhoods**: Adyar, ECR (East Coast Road), Thiruvanmiyur, Kotturpuram, South Chennai

---

## 2. Verified Local Business NAP Information

All public components, footer, showroom section, and structured data source their Name, Address, and Phone (NAP) facts directly from [`src/config/site.ts`](src/config/site.ts):

| Property | Official Business Information |
| :--- | :--- |
| **Business Name** | **CREATION'S** (Legal Name: *CREATION'S Curtains & Blinds Store*) |
| **Tagline** | *Curtains and Blinds Store in Besant Nagar* |
| **Canonical URL** | `https://www.creations.ind.in` |
| **Address** | New no: 37 (Old no: 11), 1, Urur Olcott Kuppam Rd, near Rajaji Bhavan, Besant Nagar, Chennai, Tamil Nadu 600090 |
| **Landline Phone** | `044 2491 9327` (`+91 44 2491 9327`) |
| **Mobile & WhatsApp** | `+91 95970 90006` |
| **Hours** | Monday – Sunday: 11:00 AM – 8:00 PM (Open all 7 days) |
| **Locality** | Besant Nagar, Chennai, Tamil Nadu, India |

---

## 3. Keyword Hierarchy & Mapping

### Keyword Tiers
* **Tier 1 (Highest Local Priority)**:
  * `Curtains in Besant Nagar`
  * `Blinds in Besant Nagar`
  * `Curtain and Blinds Store in Besant Nagar`
* **Tier 2 (Chennai-Wide Commercial Intent)**:
  * `Curtains Chennai`
  * `Blinds Chennai`
  * `Curtain Store Chennai`
  * `Window Blinds Chennai`
* **Tier 3 (Product Specific Variants)**:
  * `Ready Made Curtains`
  * `Ready to Fit Curtains`
  * `Sheer Curtains Chennai`
  * `Blackout Curtains Chennai`
  * `Roman Blinds Chennai`
* **Tier 4 (Nearby Contextual Relevance)**:
  * `Curtains Adyar`
  * `Blinds Adyar`
  * `Curtains ECR`
  * `Blinds ECR`

### Page-to-Keyword Mapping Matrix

| Route | Primary Keyword Topic | Secondary Terms | Primary H1 / Title Direction |
| :--- | :--- | :--- | :--- |
| `/` | *Curtains & Blinds Store in Besant Nagar* | *Home Furnishings Chennai, Besant Nagar showroom* | **Title**: `Curtains & Blinds Store in Besant Nagar, Chennai \| CREATION'S`<br>**H1**: `Curtains and Blinds Store in Besant Nagar` |
| `/curtains` | *Curtains in Besant Nagar* | *Curtains Chennai, Ready Made Curtains, Ready to Fit Curtains, Sheer Curtains* | **Title**: `Curtains in Besant Nagar, Chennai \| CREATION'S`<br>**H1**: `Curtains for Homes in Besant Nagar and Chennai` |
| `/blinds` | *Blinds in Besant Nagar* | *Blinds Chennai, Window Blinds Chennai, Roman Blinds, Roller Shades, Wooden Blinds* | **Title**: `Blinds in Besant Nagar, Chennai \| CREATION'S`<br>**H1**: `Window Blinds for Besant Nagar and Chennai Homes` |
| `/upholstery` | *Upholstery in Besant Nagar* | *Upholstery Chennai, Sofa Re-covering, Upholstery Fabrics* | **Title**: `Upholstery in Besant Nagar, Chennai \| CREATION'S`<br>**H1**: `Give familiar furniture a fresh perspective.` |
| `/bedspreads` | *Bedspreads in Besant Nagar* | *Bedspreads Chennai, Luxury Quilts, Bedroom Linens* | **Title**: `Bedspreads in Besant Nagar, Chennai \| CREATION'S`<br>**H1**: `Comfort, texture and character for the bedroom.` |
| `/measurement-guide` | *How to Measure Curtains & Blinds* | *Window measurement guide, inside recess, outside recess* | **Title**: `Window Measurement Guide \| CREATION'S Besant Nagar`<br>**H1**: `Window Measurement Guide` |

---

## 4. Contextual Location Strategy (Adyar & ECR)

* **No Thin Duplicate Pages**: We do not create separate `/curtains-adyar` or `/curtains-ecr` pages without unique local customer projects, distinct photos, or independent physical showrooms.
* **Contextual In-Content Relevance**: Adyar and ECR are naturally cited across the homepage hero, showroom location section, and category guides as nearby served neighbourhoods within a 5–15 minute drive of our Besant Nagar studio.

---

## 5. Structured Data (Schema.org JSON-LD)

Implemented via Server Components in `src/components/seo/`:

1. **LocalBusiness / HomeGoodsStore** (`src/components/seo/local-business-schema.tsx`):
   * `@type`: `HomeGoodsStore`
   * `@id`: `https://www.creations.ind.in/#business`
   * `name`: `CREATION'S`
   * `legalName`: `CREATION'S Curtains & Blinds Store`
   * `areaServed`: `["Besant Nagar", "Adyar", "ECR", "Chennai", "Tamil Nadu"]`
   * `hasMap`: Google Maps Showroom URL
   * `openingHoursSpecification`: Mo-Su 11:00–20:00

2. **WebSite Schema** (`src/components/seo/website-schema.tsx`):
   * `@type`: `WebSite`
   * `publisher`: Linked directly to `#business`

3. **BreadcrumbList Schema** (`src/components/seo/breadcrumb-schema.tsx`):
   * Generated dynamically on each category route (`Home > Curtains`, etc.)

---

## 6. Sitemaps, Robots & Indexing Protection

* **Sitemap**: `/sitemap.xml` dynamically generated in `src/app/sitemap.ts` targeting canonical `https://www.creations.ind.in`.
* **Robots**: `/robots.txt` generated in `src/app/robots.ts`.
* **Admin & API Protection**: Disallowed in `robots.txt` and flagged with `noindex, nofollow` headers.

---

## 7. Search Console Tracking & Review

Track performance over 4–8 week windows across query clusters:
* **Brand**: `creations besant nagar`, `creations curtains`, `creations chennai`
* **Curtains**: `curtains besant nagar`, `curtains chennai`, `curtain shop besant nagar`, `ready made curtains chennai`
* **Blinds**: `blinds besant nagar`, `blinds chennai`, `window blinds chennai`, `roman blinds chennai`
* **Nearby Areas**: `curtains adyar`, `blinds adyar`, `curtains ecr`, `blinds ecr`
