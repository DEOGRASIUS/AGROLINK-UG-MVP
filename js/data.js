/* =========================================================
   AGROLINK UGANDA MVP
   Shared Demo Data

   IMPORTANT:
   This is prototype/demo data.
   It must not be presented as live market data,
   validated transactions, or real platform adoption.
   ========================================================= */

const AGROLINK_DATA = {
  /* =======================================================
     DEMO MARKET PRICES
     ======================================================= */

  marketPrices: [
    {
      id: "PRICE-001",
      commodity: "Dry Maize",
      location: "Kampala",
      price: 1200,
      unit: "kg",
      trend: "up",
      change: 5,
      source: "Demo market data",
      updatedAt: "2026-10-27T08:30:00"
    },
    {
      id: "PRICE-002",
      commodity: "Dry Maize",
      location: "Mukono",
      price: 1150,
      unit: "kg",
      trend: "up",
      change: 3,
      source: "Demo market data",
      updatedAt: "2026-10-27T08:30:00"
    },
    {
      id: "PRICE-003",
      commodity: "Dry Maize",
      location: "Jinja",
      price: 1180,
      unit: "kg",
      trend: "neutral",
      change: 0,
      source: "Demo market data",
      updatedAt: "2026-10-27T08:30:00"
    },
    {
      id: "PRICE-004",
      commodity: "Beans",
      location: "Kampala",
      price: 3800,
      unit: "kg",
      trend: "up",
      change: 2,
      source: "Demo market data",
      updatedAt: "2026-10-27T08:30:00"
    },
    {
      id: "PRICE-005",
      commodity: "Beans",
      location: "Mukono",
      price: 3650,
      unit: "kg",
      trend: "down",
      change: -1,
      source: "Demo market data",
      updatedAt: "2026-10-27T08:30:00"
    },
    {
      id: "PRICE-006",
      commodity: "Beans",
      location: "Jinja",
      price: 3700,
      unit: "kg",
      trend: "up",
      change: 1,
      source: "Demo market data",
      updatedAt: "2026-10-27T08:30:00"
    }
  ],

  /* =======================================================
     DEMO FARMER SUPPLY
     No direct farmer contact details are exposed.
     ======================================================= */

  produce: [
    {
      id: "SUP-001",
      farmerId: "FARMER-DEMO-001",
      farmerDisplayName: "Verified Farmer",
      commodity: "Dry Maize",
      quantity: 3000,
      availableQuantity: 3000,
      unit: "kg",
      location: "Mukono",
      expectedPrice: 1150,
      quality: "Clean and dry grain",
      moistureLevel: "Within demo quality range",
      availabilityDate: "2026-10-28",
      verificationStatus: "Verified",
      qualityStatus: "Pending inspection",
      status: "Available",
      createdAt: "2026-10-26T10:15:00",
      demo: true
    },
    {
      id: "SUP-002",
      farmerId: "FARMER-DEMO-002",
      farmerDisplayName: "Verified Farmer",
      commodity: "Dry Maize",
      quantity: 2500,
      availableQuantity: 2500,
      unit: "kg",
      location: "Jinja",
      expectedPrice: 1180,
      quality: "Dry grain, sorted",
      moistureLevel: "Pending verification",
      availabilityDate: "2026-10-29",
      verificationStatus: "Verified",
      qualityStatus: "Pending inspection",
      status: "Available",
      createdAt: "2026-10-26T12:40:00",
      demo: true
    },
    {
      id: "SUP-003",
      farmerId: "FARMER-DEMO-003",
      farmerDisplayName: "Verified Farmer",
      commodity: "Beans",
      quantity: 1800,
      availableQuantity: 1800,
      unit: "kg",
      location: "Mukono",
      expectedPrice: 3650,
      quality: "Clean, sorted beans",
      moistureLevel: "Pending verification",
      availabilityDate: "2026-10-30",
      verificationStatus: "Verified",
      qualityStatus: "Pending inspection",
      status: "Available",
      createdAt: "2026-10-26T14:20:00",
      demo: true
    }
  ],

  /* =======================================================
     DEMO BUYER DEMAND
     No direct buyer contact details are exposed.
     ======================================================= */

  demands: [
    {
      id: "DEM-001",
      buyerId: "BUYER-DEMO-001",
      buyerDisplayName: "Verified Institutional Buyer",
      commodity: "Dry Maize",
      quantity: 5000,
      fulfilledQuantity: 0,
      unit: "kg",
      location: "Kampala",
      targetPrice: 1200,
      quality: "Clean, dry grain",
      requiredDate: "2026-11-02",
      status: "Open",
      verificationStatus: "Verified",
      notes: "Bulk procurement requirement.",
      createdAt: "2026-10-26T09:00:00",
      demo: true
    },
    {
      id: "DEM-002",
      buyerId: "BUYER-DEMO-002",
      buyerDisplayName: "Verified Grain Buyer",
      commodity: "Beans",
      quantity: 2000,
      fulfilledQuantity: 0,
      unit: "kg",
      location: "Kampala",
      targetPrice: 3800,
      quality: "Clean, sorted beans",
      requiredDate: "2026-11-04",
      status: "Open",
      verificationStatus: "Verified",
      notes: "Quality subject to AgroLink verification.",
      createdAt: "2026-10-26T11:30:00",
      demo: true
    }
  ],

  /* =======================================================
     DEMO MATCHES
     AgroLink remains the intermediary.
     ======================================================= */

  matches: [
    {
      id: "MATCH-001",
      demandId: "DEM-001",
      supplyId: "SUP-001",
      commodity: "Dry Maize",
      buyerId: "BUYER-DEMO-001",
      farmerId: "FARMER-DEMO-001",
      requestedQuantity: 5000,
      matchedQuantity: 3000,
      unit: "kg",
      buyerLocation: "Kampala",
      supplyLocation: "Mukono",
      targetPrice: 1200,
      supplierPrice: 1150,
      matchScore: 94,
      supplierVerification: "Verified",
      qualityStatus: "Pending inspection",
      status: "Potential Match",
      createdAt: "2026-10-27T07:45:00",
      demo: true
    },
    {
      id: "MATCH-002",
      demandId: "DEM-002",
      supplyId: "SUP-003",
      commodity: "Beans",
      buyerId: "BUYER-DEMO-002",
      farmerId: "FARMER-DEMO-003",
      requestedQuantity: 2000,
      matchedQuantity: 1800,
      unit: "kg",
      buyerLocation: "Kampala",
      supplyLocation: "Mukono",
      targetPrice: 3800,
      supplierPrice: 3650,
      matchScore: 91,
      supplierVerification: "Verified",
      qualityStatus: "Pending inspection",
      status: "Potential Match",
      createdAt: "2026-10-27T08:10:00",
      demo: true
    }
  ],

  /* =======================================================
     DEMO TRADES / ORDERS
     Financial figures demonstrate the proposed 10%
     transaction commission model.
     ======================================================= */

  trades: [
    {
      id: "TRD-001",
      orderReference: "AGL-2026-001",
      matchId: "MATCH-001",
      demandId: "DEM-001",
      supplyId: "SUP-001",

      buyerId: "BUYER-DEMO-001",
      farmerId: "FARMER-DEMO-001",

      buyerDisplayName: "Verified Institutional Buyer",
      farmerDisplayName: "Verified Farmer",

      commodity: "Dry Maize",
      quantity: 3000,
      unit: "kg",
      agreedPrice: 1150,

      grossValue: 3450000,
      commissionRate: 0.10,
      commissionAmount: 345000,
      supplierNet: 3105000,

      pickupLocation: "Mukono",
      deliveryLocation: "Kampala",

      qualityStatus: "Awaiting Verification",
      paymentStatus: "Demo — Not Processed",
      deliveryStatus: "Awaiting Coordination",

      status: "In Progress",

      createdAt: "2026-10-27T08:30:00",

      timeline: [
        {
          label: "Supply Matched",
          description: "Potential supply identified by AgroLink.",
          status: "completed",
          date: "2026-10-27T08:30:00"
        },
        {
          label: "Verification",
          description: "Supplier and produce verification stage.",
          status: "current",
          date: null
        },
        {
          label: "Transaction Confirmation",
          description: "Buyer and supplier terms coordinated through AgroLink.",
          status: "pending",
          date: null
        },
        {
          label: "Delivery",
          description: "Delivery coordination and fulfilment.",
          status: "pending",
          date: null
        },
        {
          label: "Completed",
          description: "Transaction marked as completed.",
          status: "pending",
          date: null
        }
      ],

      demo: true
    }
  ],

  /* =======================================================
     DEMO USERS
     ======================================================= */

  users: {
    buyer: {
      id: "BUYER-DEMO-001",
      role: "buyer",
      name: "Demo Buyer",
      organization: "Kampala Grain Buyers Ltd",
      buyerType: "Institutional Buyer",
      location: "Kampala",
      verificationStatus: "Verified",
      commodities: ["Dry Maize", "Beans"],
      demo: true
    },

    farmer: {
      id: "FARMER-DEMO-001",
      role: "farmer",
      name: "Demo Farmer",
      farmName: "Mukono Grain Farm",
      location: "Mukono",
      verificationStatus: "Verified",
      commodities: ["Dry Maize", "Beans"],
      demo: true
    }
  },

  /* =======================================================
     DEMO NOTIFICATIONS
     ======================================================= */

  notifications: {
    buyer: [
      {
        id: "NOT-B-001",
        title: "Potential supply match",
        message: "3,000 kg of Dry Maize may match your open demand.",
        type: "match",
        read: false,
        createdAt: "2026-10-27T07:45:00"
      },
      {
        id: "NOT-B-002",
        title: "Verification pending",
        message: "AgroLink verification is pending for order AGL-2026-001.",
        type: "verification",
        read: false,
        createdAt: "2026-10-27T08:35:00"
      }
    ],

    farmer: [
      {
        id: "NOT-F-001",
        title: "Buyer demand available",
        message: "A verified buyer is requesting 5,000 kg of Dry Maize.",
        type: "demand",
        read: false,
        createdAt: "2026-10-27T07:40:00"
      },
      {
        id: "NOT-F-002",
        title: "Potential match",
        message: "Your Dry Maize listing may match an active buyer demand.",
        type: "match",
        read: false,
        createdAt: "2026-10-27T07:45:00"
      }
    ]
  }
};


/* =========================================================
   Expose demo data globally for the vanilla JS application.
   ========================================================= */

window.AGROLINK_DATA = AGROLINK_DATA;