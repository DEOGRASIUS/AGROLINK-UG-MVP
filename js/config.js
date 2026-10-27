const AGROLINK_CONFIG = {
  appName: "AgroLink Uganda",
  tagline: "Agricultural Intelligence. Better Decisions. Better Trade.",

  demoMode: true,

  currency: "UGX",
  locale: "en-UG",

  commissionRate: 0.10,

  defaultLocation: "Kampala",

  commodities: [
    "Dry Maize",
    "Beans"
  ],

  roles: {
    FARMER: "farmer",
    BUYER: "buyer"
  },

  storageKeys: {
    user: "agrolink_user",
    demands: "agrolink_demands",
    produce: "agrolink_produce",
    matches: "agrolink_matches",
    trades: "agrolink_trades"
  }
};
window.AGROLINK_CONFIG = AGROLINK_CONFIG;