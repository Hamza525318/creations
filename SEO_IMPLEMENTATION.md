# CREATION'S Technical SEO Implementation Guide

This document is the canonical technical SEO reference and operational guide for the **CREATION'S** website.

---

## 1. Overview & Technical Architecture

The CREATION'S website is built on Next.js App Router (Server Components by default) with an integrated SEO architecture adhering strictly to Google Search Central guidelines:

* **Canonical Base Origin (`metadataBase`)**: Configured globally in `src/app/layout.tsx` using `siteConfig.url` (`NEXT_PUBLIC_SITE_URL`).
* **Self-Referencing Canonical URLs**: Every indexable page defines its own canonical alternate link to prevent duplicate content indexing.
* **No Meta Keywords**: Obsolete `<meta name="keywords">` tags are intentionally omitted. Keywords are naturally woven into semantic H1/H2 tags, page body copy, internal anchor text, and structured data.
* **Dynamic Structured Data (JSON-LD)**: Programmatically generated JSON-LD for Local Business (`HomeGoodsStore`), Website (`WebSite`), and Breadcrumbs (`BreadcrumbList`).
* **Admin / API Indexing Protection**: Sensitive routes (`/admin`, `/api`) are protected via server-side authentication, `robots.txt` disallows, and `robots: { index: false, follow: false }` metadata.
* **Core Web Vitals & Image Optimization**: Priority loading on hero and category covers (LCP), Cloudinary image transformations, explicit aspect ratios (CLS prevention), and standard lazy loading below the fold.

---

## 2. Verified Local Business NAP Information

All public components, footer, showroom section, and structured data source their Name, Address, and Phone (NAP) facts directly from [`src/config/site.ts`](src/config/site.ts):

| Property | Official Business Information |
| :--- | :--- |
| **Business Name** | **CREATION'S** (Legal Name: *CREATION'S Home Furnishings*) |
| **Tagline** | *Changing Home Styles* |
| **Address** | New no: 37 (Old no: 11), 1, Urur Olcott Kuppam Rd, near Rajaji Bhavan, Besant Nagar, Chennai, Tamil Nadu 600090 |
| **Landline Phone** | `044 2491 9327` (`+91 44 2491 9327`) |
| **Mobile & WhatsApp** | `+91 95970 90006` |
| **Hours** | Monday – Sunday: 11:00 AM – 8:00 PM (Open all 7 days) |
| **Locality** | Besant Nagar, Chennai, Tamil Nadu, India |

---

## 3. Page-to-Keyword Mapping

Each public page targets a distinct commercial and local search topic without keyword stuffing:

| Route | Primary Keyword Topic | Secondary Local Terms | Primary H1 Direction |
| :--- | :--- | :--- | :--- |
| `/` | *Home furnishings Besant Nagar*, *Home furnishings Chennai* | *Curtains & blinds Besant Nagar*, *Home decor store Chennai* | Editorial brand hero with location context in surrounding copy |
| `/curtains` | *Curtains in Besant Nagar*, *Curtains Chennai* | *Curtain shop Besant Nagar*, *Sheer curtains Chennai*, *Blackout drapes* | *Curtains designed around your space.* |
| `/blinds` | *Blinds in Besant Nagar*, *Blinds Chennai* | *Window blinds Chennai*, *Roman blinds Besant Nagar*, *Roller shades* | *Clean, considered window solutions.* |
| `/upholstery` | *Upholstery in Besant Nagar*, *Upholstery Chennai* | *Sofa upholstery Chennai*, *Furniture re-covering Besant Nagar*, *Upholstery fabrics* | *Give familiar furniture a fresh perspective.* |
| `/bedspreads` | *Bedspreads in Besant Nagar*, *Bedspreads Chennai* | *Bedspread shop Chennai*, *Luxury quilts*, *Bedroom linens Besant Nagar* | *Comfort, texture and character for the bedroom.* |

---

## 4. Structured Data (Schema.org JSON-LD)

Implemented via React server components in `src/components/seo/`:

### A. Local Business Schema (`HomeGoodsStore`)
* **File**: [`src/components/seo/local-business-schema.tsx`](src/components/seo/local-business-schema.tsx)
* **Location**: Rendered on Homepage (`/`)
* **Properties**:
  * `@type`: `HomeGoodsStore`
  * `@id`: `https://creations-home.com/#business`
  * `name`: `CREATION'S`
  * `telephone`: `+91 95970 90006`
  * `address`: PostalAddress (Besant Nagar, Chennai 600090)
  * `geo`: GeoCoordinates (`13.0002`, `80.2667`)
  * `openingHoursSpecification`: Mo-Su 11:00-20:00
  * `logo`: Owner-managed logo from Cloudinary (`branding.logo-primary`) with fallback

### B. WebSite Schema (`WebSite`)
* **File**: [`src/components/seo/website-schema.tsx`](src/components/seo/website-schema.tsx)
* **Location**: Rendered on Homepage (`/`)
* **Properties**:
  * `@type`: `WebSite`
  * `@id`: `https://creations-home.com/#website`
  * `publisher`: Linked directly to `#business`

### C. Breadcrumb Schema (`BreadcrumbList`)
* **File**: [`src/components/seo/breadcrumb-schema.tsx`](src/components/seo/breadcrumb-schema.tsx)
* **Location**: Rendered on each Category Page (`/curtains`, `/blinds`, `/upholstery`, `/bedspreads`)
* **Hierarchy**: `Home > [Category Name]`

---

## 5. Crawl & Index Configuration

### Sitemap (`src/app/sitemap.ts`)
* Accessible at: `/sitemap.xml`
* Outputs absolute production URLs for all public canonical routes (`/`, `/curtains`, `/blinds`, `/upholstery`, `/bedspreads`).
* Excludes `/admin`, `/api`, and auth routes.

### Robots Directive (`src/app/robots.ts`)
* Accessible at: `/robots.txt`
* Rules:
  ```text
  User-agent: *
  Allow: /
  Disallow: /admin/
  Disallow: /api/

  Sitemap: https://creations-home.com/sitemap.xml
  ```

### Admin Protection
* Protected with `noindex, nofollow` in `src/app/admin/layout.tsx`.

---

## 6. Image SEO & Core Web Vitals

* **Largest Contentful Paint (LCP)**:
  * Homepage hero image and Category cover images are marked with `priority={true}` in Next.js `<Image />`.
  * Proper `sizes` attributes prevent mobile devices from downloading desktop-scale assets.
* **Cumulative Layout Shift (CLS)**:
  * Image containers enforce explicit aspect ratios (`4:5`, `16:9`, `16:10`, etc.) using Tailwind aspect ratio utilities and Next.js Image `fill`.
* **Image Accessibility & Discoverability**:
  * Mandatory alt text on all owner-uploaded catalog items (`creations-catalog`).
  * Alt text is meaningful and descriptive for screen-readers and Google Image Search.

---

## 7. Manual Search Console & Google Business Profile Tasks

### Google Search Console Setup
1. **Property Creation**: Add `https://creations-home.com` as a Domain or URL prefix property in [Google Search Console](https://search.google.com/search-console).
2. **HTML Verification**: Copy the Google verification token into the production environment variable:
   ```env
   GOOGLE_SITE_VERIFICATION=your_verification_token
   ```
3. **Submit Sitemap**: In GSC, navigate to **Sitemaps** and submit `sitemap.xml`.
4. **URL Inspection**: Test live URL rendering for `/`, `/curtains`, `/blinds`, `/upholstery`, and `/bedspreads`.
5. **Monitor Indexing & Core Web Vitals**: Review the **Coverage** and **Core Web Vitals** reports 7–14 days after launch.

### Google Business Profile Checklist
* [x] **Match Exact Business Name**: "CREATION'S"
* [x] **Match Verified Address**: New no: 37 (Old no: 11), 1, Urur Olcott Kuppam Rd, near Rajaji Bhavan, Besant Nagar, Chennai 600090
* [x] **Match Phone Numbers**: Mobile `+91 95970 90006`, Landline `044 2491 9327`
* [x] **Match Operating Hours**: Monday – Sunday: 11:00 AM – 8:00 PM
* [ ] **Website URL**: Ensure Google Business Profile website link points to canonical `https://creations-home.com`.
* [ ] **Primary Category**: Set primary category on GBP to *Curtain store* / *Home goods store* / *Blinds shop*.
* [ ] **Showroom Photos**: Add high-resolution photos of the Besant Nagar showroom and fabric displays.
