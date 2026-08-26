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

  GA_ID: "",        // GA4 id e.g. "G-XXXXXXXXXX" (blank = analytics off)
  WEBAPP_URL: "",   // Apps Script /exec URL for click logging (blank = off)

  forms: {
    shakti: { url: "https://docs.google.com/forms/d/e/1FAIpQLSdF5ib8TpBWRSy9AC2S5EigYn1itvVHiPHT8XaBpkOXQBxCsw/viewform", entry: "entry.1379156727" },
    heal:   { url: "https://docs.google.com/forms/d/e/1FAIpQLSc7w2bCU0zpoVQRrd5SDrQ2QstUF_4MHDyXXBCN5R1-6e0i8Q/viewform", entry: "entry.1672993159" }
  },

  contact: {
    general: "yogashakti@ashishanant.com",
    workshops: "workshops@ashishanant.com"
  },
  // The WhatsApp Community is the ANNOUNCEMENTS group only. It does NOT enrol anyone
  // in a specific session/workshop — those have their own sub-groups, entered via registration.
  whatsappCommunity: "https://chat.whatsapp.com/LVShguYTaB64N99IV1qMxf",

  links: [
    { id: "about",   label: "About Yoga Shakti with Ashish Anant", type: "page", href: "/about/" },
    { id: "shakti",  label: "Free Live Yoga Sessions", sub: "Live, with me · complimentary", type: "page", href: "/sessions/" },
    { id: "heal",    label: "Nadi Shodhana — The Healing Breath", sub: "Complimentary workshop", type: "page", href: "/nadi-shodhana/" },
    { id: "breathe", label: "Yogic Breathing Guide", sub: "Complimentary PDF + workshop invite", type: "form", form: "heal" }
  ],

  socials: [
    { label: "YouTube",   icon: "brand-youtube",   color: "#FF0000", href: "https://www.youtube.com/@YOGASHAKTIwithAshishAnant" },
    { label: "Instagram", icon: "brand-instagram", color: "#E1306C", href: "https://www.instagram.com/yogashaktiwithashishanant/" },
    { label: "Facebook",  icon: "brand-facebook",  color: "#1877F2", href: "https://www.facebook.com/profile.php?id=61591079892753" },
    { label: "WhatsApp",  icon: "brand-whatsapp",  color: "#25D366", href: "https://chat.whatsapp.com/LVShguYTaB64N99IV1qMxf" },
    { label: "Threads",   icon: "brand-threads",   color: "#000000", href: "https://www.threads.com/@yogashaktiwithashishanant" }
  ]
};

// ?src -> funnel SOURCE vocabulary (falls back to "Website")
export const SRC_MAP = {
  youtube: "YouTube", yt: "YouTube",
  ig: "IG-profile", "ig-profile": "IG-profile", instagram: "IG-profile",
  fb: "FB-profile", "fb-profile": "FB-profile", facebook: "FB-profile",
  threads: "Threads-profile", "threads-profile": "Threads-profile",
  wa: "WhatsApp", whatsapp: "WhatsApp",
  qr: "QR", email: "Email", website: "Website"
};
