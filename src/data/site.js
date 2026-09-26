// ============================ EDIT ME ============================
// Single source of truth for the hub. Add a link by copying a line in `links`.
// A `type:"form"` link needs a matching entry in `forms`.
// Set GA_ID + WEBAPP_URL when you have them (blank = feature simply stays off).
// =================================================================
export const site = {
  name: "YOGA SHAKTI",
  sub: "with Ashish Anant",
  tagline: "Yoga rooted in Tantra and the classical texts — breath, calm, and healing.",
  signoff: "॥ SHIVOHAM ॥",

  GA_ID: "G-LW2ETQ7QGN",        // GA4 id (analytics on; loads after cookie consent)
  WEBAPP_URL: "https://script.google.com/macros/s/AKfycbwhnfVyoPvF7ymlbBuypAagnBkn0zHjA0y-HnIYJMls7PGzIlt8RSGRONoPpos4hLUYyQ/exec",   // Apps Script /exec URL (native guide form + click logging)

  // Events auto-feed: paste the two "Publish to web -> CSV" links from the YS Events sheet.
  // Blank = the Events page uses the built-in list below (still auto-hides past dates).
  eventsCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQurwDFxEAjf94Per8cVx0Uo3xmliRXFq2DRg_98H7yaBg0OZ_RUQaHVEAiXPVniyPBLsdJyGiUOn8K/pub?gid=675903072&single=true&output=csv",     // published CSV of the "Events" tab
  settingsCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQurwDFxEAjf94Per8cVx0Uo3xmliRXFq2DRg_98H7yaBg0OZ_RUQaHVEAiXPVniyPBLsdJyGiUOn8K/pub?gid=301183497&single=true&output=csv",   // published CSV of the "Settings" tab (B1 = months ahead)
  eventsFallbackMonths: 6,
  // Weekly timetable + pricing: published CSV of the "Schedule" tab. Blank = use `schedule` below.
  scheduleCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQurwDFxEAjf94Per8cVx0Uo3xmliRXFq2DRg_98H7yaBg0OZ_RUQaHVEAiXPVniyPBLsdJyGiUOn8K/pub?gid=2000180042&single=true&output=csv",
  // Built-in fallback for the weekly timetable (the sheet's Schedule tab overrides it live).
  // key must match the Key column in the sheet. was = regular price in ₹/month (blank = no strike-through).
  schedule: [
    { key: "morning", days: "Mon, Wed & Fri", time: "6:00–7:00 AM IST", was: 2000, now: "FREE", show: true },
    { key: "evening", days: "Sunday",         time: "5:00 PM IST",      was: 1000, now: "FREE", show: true }
  ],
  statsCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQurwDFxEAjf94Per8cVx0Uo3xmliRXFq2DRg_98H7yaBg0OZ_RUQaHVEAiXPVniyPBLsdJyGiUOn8K/pub?gid=1155328677&single=true&output=csv",      // published CSV of the "Stats" tab (for a future "by the numbers" section)

  // Hero video: drop a calm 6–10s muted clip at /public/assets/hero.mp4 and set the path
  // below to turn the hero image into an autoplay video that settles on the still photo.
  // Blank = static photo only (recommended until you have a good, well-lit clip).
  heroVideo: "/assets/hero_v4.mp4",   // v4 (Full HD 1920x1080); autoplay muted; settles on hero-endingimage_v4.png

  // Phase 0.5 switch: set to true once the welcome video / YouTube push is live to show
  // the "Watch on YouTube" (red, primary) + "Join Free" (teal outline) hero CTA. false = single Join Free button.
  heroYouTubeCta: false,

  forms: {
    shakti: { url: "https://docs.google.com/forms/d/e/1FAIpQLSdF5ib8TpBWRSy9AC2S5EigYn1itvVHiPHT8XaBpkOXQBxCsw/viewform", entry: "entry.1379156727" },
    heal:   { url: "https://docs.google.com/forms/d/e/1FAIpQLSc7w2bCU0zpoVQRrd5SDrQ2QstUF_4MHDyXXBCN5R1-6e0i8Q/viewform", entry: "entry.1672993159" }
  },

  // Native on-site registration (replaces the Google Forms once switched over).
  // waGroup = the WhatsApp sub-group link shown on the thank-you screen (blank = we say we'll message them).
  registration: {
    shakti: { path: "/sessions/register/",      defaultSource: "Website-Sessions", waGroup: "" },
    heal:   { path: "/nadi-shodhana/register/", defaultSource: "Website-Nadi",     waGroup: "" }
  },

  contact: {
    general: "yogashakti@ashishanant.com",
    workshops: "workshops@ashishanant.com"
  },
  // The WhatsApp Community is the ANNOUNCEMENTS group only. It does NOT enrol anyone
  // in a specific session/workshop — those have their own sub-groups, entered via registration.
  whatsappCommunity: "https://chat.whatsapp.com/LVShguYTaB64N99IV1qMxf",
  // Direct 1:1 WhatsApp for quick questions near CTAs (wa.me needs country code, no +/spaces)
  whatsappDirect: "https://wa.me/917065317849?text=" + encodeURIComponent("Namaste! I have a question about the Yoga Shakti sessions."),

  links: [
    { id: "about",   label: "About Yoga Shakti with Ashish Anant", type: "page", href: "/about/" },
    { id: "shakti",  label: "Free Live Yoga Sessions", sub: "Live, with me · complimentary", type: "page", href: "/sessions/" },
    { id: "heal",    label: "Nadi Shodhana — The Healing Breath", sub: "Complimentary workshop", type: "page", href: "/nadi-shodhana/" },
    { id: "breathe", label: "Yogic Breathing Guide", sub: "Complimentary PDF + workshop invite", type: "page", href: "/guide/" }
  ],

  socials: [
    { label: "YouTube",   icon: "brand-youtube",   color: "#FF0000", href: "https://www.youtube.com/@YOGASHAKTIwithAshishAnant?sub_confirmation=1" },
    { label: "Instagram", icon: "brand-instagram", color: "#E1306C", href: "https://www.instagram.com/yogashaktiwithashishanant/" },
    { label: "Facebook",  icon: "brand-facebook",  color: "#1877F2", href: "https://www.facebook.com/profile.php?id=61591079892753" },
    { label: "WhatsApp",  icon: "brand-whatsapp",  color: "#25D366", href: "https://chat.whatsapp.com/LVShguYTaB64N99IV1qMxf" },
    { label: "Threads",   icon: "brand-threads",   color: "#000000", href: "https://www.threads.com/@yogashaktiwithashishanant" }
  ]
};

// ?src -> funnel SOURCE vocabulary (falls back to "Website")
export const SRC_MAP = {
  youtube: "YouTube", yt: "YouTube",
  "ad-a": "Ad-A-Brand", "ad-b": "Ad-B-Benefit",   // A/B creative attribution (Meta ads)
  ig: "IG-profile", "ig-profile": "IG-profile", instagram: "IG-profile",
  fb: "FB-profile", "fb-profile": "FB-profile", facebook: "FB-profile",
  threads: "Threads-profile", "threads-profile": "Threads-profile",
  wa: "WhatsApp", whatsapp: "WhatsApp",
  qr: "QR", email: "Email", website: "Website"
};
