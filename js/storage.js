/* =========================================================
   AGROLINK UGANDA MVP
   Local Storage Service

   Provides lightweight persistence for the prototype.
   No backend/database is used in this MVP.
   ========================================================= */

const AgroLinkStorage = (() => {
  const config = window.AGROLINK_CONFIG;
  const demoData = window.AGROLINK_DATA;

  if (!config) {
    console.error("AgroLinkStorage: AGROLINK_CONFIG is not loaded.");
  }

  if (!demoData) {
    console.error("AgroLinkStorage: AGROLINK_DATA is not loaded.");
  }

  const KEYS = config?.storageKeys || {
    user: "agrolink_user",
    demands: "agrolink_demands",
    produce: "agrolink_produce",
    matches: "agrolink_matches",
    trades: "agrolink_trades"
  };

  const EXTRA_KEYS = {
    notifications: "agrolink_notifications",
    initialized: "agrolink_demo_initialized"
  };


  /* =======================================================
     INTERNAL HELPERS
     ======================================================= */

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function read(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);

      if (value === null) {
        return clone(fallback);
      }

      return JSON.parse(value);
    } catch (error) {
      console.error(`AgroLinkStorage: Could not read "${key}".`, error);
      return clone(fallback);
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`AgroLinkStorage: Could not write "${key}".`, error);
      return false;
    }
  }

  function remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`AgroLinkStorage: Could not remove "${key}".`, error);
      return false;
    }
  }

  function generateId(prefix = "AGL") {
    const time = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).slice(2, 7).toUpperCase();

    return `${prefix}-${time}-${random}`;
  }


  /* =======================================================
     INITIALIZATION
     ======================================================= */

  function initializeDemoData() {
    if (!demoData) {
      return false;
    }

    /*
      Seed each collection independently.

      This is intentional. If one localStorage key is removed
      during development, it can be restored without wiping
      all other demo activity.
    */

    if (localStorage.getItem(KEYS.demands) === null) {
      write(KEYS.demands, demoData.demands || []);
    }

    if (localStorage.getItem(KEYS.produce) === null) {
      write(KEYS.produce, demoData.produce || []);
    }

    if (localStorage.getItem(KEYS.matches) === null) {
      write(KEYS.matches, demoData.matches || []);
    }

    if (localStorage.getItem(KEYS.trades) === null) {
      write(KEYS.trades, demoData.trades || []);
    }

    if (localStorage.getItem(EXTRA_KEYS.notifications) === null) {
      write(
        EXTRA_KEYS.notifications,
        demoData.notifications || {
          buyer: [],
          farmer: []
        }
      );
    }

    if (localStorage.getItem(KEYS.user) === null) {
      write(KEYS.user, demoData.users?.buyer || null);
    }

    write(EXTRA_KEYS.initialized, true);

    return true;
  }


  /* =======================================================
     CURRENT USER
     ======================================================= */

  function getCurrentUser() {
    return read(KEYS.user, demoData?.users?.buyer || null);
  }

  function setCurrentUser(user) {
    return write(KEYS.user, user);
  }

  function setDemoRole(role) {
    if (!demoData?.users) {
      return null;
    }

    let user = null;

    if (role === config.roles.BUYER) {
      user = clone(demoData.users.buyer);
    }

    if (role === config.roles.FARMER) {
      user = clone(demoData.users.farmer);
    }

    if (!user) {
      return null;
    }

    write(KEYS.user, user);

    return user;
  }


  /* =======================================================
     DEMANDS
     ======================================================= */

  function getDemands() {
    return read(KEYS.demands, demoData?.demands || []);
  }

  function getDemandById(id) {
    return getDemands().find((item) => item.id === id) || null;
  }

  function addDemand(demand) {
    const demands = getDemands();

    const record = {
      id: demand.id || generateId("DEM"),
      buyerId: demand.buyerId || getCurrentUser()?.id || "BUYER-DEMO",
      buyerDisplayName:
        demand.buyerDisplayName ||
        "Verified Buyer",
      commodity: demand.commodity,
      quantity: Number(demand.quantity) || 0,
      fulfilledQuantity: Number(demand.fulfilledQuantity) || 0,
      unit: demand.unit || "kg",
      location: demand.location || "",
      targetPrice: Number(demand.targetPrice) || 0,
      quality: demand.quality || "",
      requiredDate: demand.requiredDate || "",
      status: demand.status || "Open",
      verificationStatus:
        demand.verificationStatus || "Demo Verified",
      notes: demand.notes || "",
      createdAt: demand.createdAt || new Date().toISOString(),
      demo: true
    };

    demands.unshift(record);

    write(KEYS.demands, demands);

    return record;
  }

  function updateDemand(id, updates = {}) {
    const demands = getDemands();

    const index = demands.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    demands[index] = {
      ...demands[index],
      ...updates,
      id: demands[index].id
    };

    write(KEYS.demands, demands);

    return demands[index];
  }

  function removeDemand(id) {
    const demands = getDemands();
    const filtered = demands.filter((item) => item.id !== id);

    write(KEYS.demands, filtered);

    return filtered.length !== demands.length;
  }


  /* =======================================================
     PRODUCE / SUPPLY
     ======================================================= */

  function getProduce() {
    return read(KEYS.produce, demoData?.produce || []);
  }

  function getProduceById(id) {
    return getProduce().find((item) => item.id === id) || null;
  }

  function addProduce(produce) {
    const items = getProduce();

    const record = {
      id: produce.id || generateId("SUP"),
      farmerId:
        produce.farmerId ||
        getCurrentUser()?.id ||
        "FARMER-DEMO",
      farmerDisplayName:
        produce.farmerDisplayName ||
        "Verified Farmer",
      commodity: produce.commodity,
      quantity: Number(produce.quantity) || 0,
      availableQuantity:
        Number(produce.availableQuantity ?? produce.quantity) || 0,
      unit: produce.unit || "kg",
      location: produce.location || "",
      expectedPrice: Number(produce.expectedPrice) || 0,
      quality: produce.quality || "",
      moistureLevel:
        produce.moistureLevel || "Pending verification",
      availabilityDate: produce.availabilityDate || "",
      verificationStatus:
        produce.verificationStatus || "Demo Verified",
      qualityStatus:
        produce.qualityStatus || "Pending inspection",
      status: produce.status || "Available",
      createdAt: produce.createdAt || new Date().toISOString(),
      demo: true
    };

    items.unshift(record);

    write(KEYS.produce, items);

    return record;
  }

  function updateProduce(id, updates = {}) {
    const items = getProduce();

    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    items[index] = {
      ...items[index],
      ...updates,
      id: items[index].id
    };

    write(KEYS.produce, items);

    return items[index];
  }

  function removeProduce(id) {
    const items = getProduce();
    const filtered = items.filter((item) => item.id !== id);

    write(KEYS.produce, filtered);

    return filtered.length !== items.length;
  }


  /* =======================================================
     MATCHING
     ======================================================= */

  function getMatches() {
    return read(KEYS.matches, demoData?.matches || []);
  }

  function getMatchById(id) {
    return getMatches().find((item) => item.id === id) || null;
  }

  function addMatch(match) {
    const matches = getMatches();

    const record = {
      id: match.id || generateId("MATCH"),
      demandId: match.demandId,
      supplyId: match.supplyId,
      commodity: match.commodity,
      buyerId: match.buyerId,
      farmerId: match.farmerId,
      requestedQuantity: Number(match.requestedQuantity) || 0,
      matchedQuantity: Number(match.matchedQuantity) || 0,
      unit: match.unit || "kg",
      buyerLocation: match.buyerLocation || "",
      supplyLocation: match.supplyLocation || "",
      targetPrice: Number(match.targetPrice) || 0,
      supplierPrice: Number(match.supplierPrice) || 0,
      matchScore: Number(match.matchScore) || 0,
      supplierVerification:
        match.supplierVerification || "Demo Verified",
      qualityStatus:
        match.qualityStatus || "Pending inspection",
      status: match.status || "Potential Match",
      createdAt: match.createdAt || new Date().toISOString(),
      demo: true
    };

    matches.unshift(record);

    write(KEYS.matches, matches);

    return record;
  }

  function updateMatch(id, updates = {}) {
    const matches = getMatches();

    const index = matches.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    matches[index] = {
      ...matches[index],
      ...updates,
      id: matches[index].id
    };

    write(KEYS.matches, matches);

    return matches[index];
  }


  /* =======================================================
     SIMPLE MVP MATCHING ENGINE
     ======================================================= */

  function calculateMatchScore(demand, supply) {
    if (!demand || !supply) {
      return 0;
    }

    if (demand.commodity !== supply.commodity) {
      return 0;
    }

    let score = 60;

    /*
      Price compatibility
    */

    if (
      Number(supply.expectedPrice) <=
      Number(demand.targetPrice)
    ) {
      score += 20;
    } else {
      const difference =
        Number(supply.expectedPrice) -
        Number(demand.targetPrice);

      const percentage =
        Number(demand.targetPrice) > 0
          ? difference / Number(demand.targetPrice)
          : 1;

      if (percentage <= 0.05) {
        score += 12;
      } else if (percentage <= 0.10) {
        score += 6;
      }
    }

    /*
      Quantity compatibility
    */

    const demandQuantity =
      Math.max(
        Number(demand.quantity) -
          Number(demand.fulfilledQuantity || 0),
        0
      );

    const supplyQuantity =
      Number(
        supply.availableQuantity ??
        supply.quantity
      );

    if (supplyQuantity >= demandQuantity) {
      score += 12;
    } else if (
      demandQuantity > 0 &&
      supplyQuantity >= demandQuantity * 0.5
    ) {
      score += 8;
    } else if (supplyQuantity > 0) {
      score += 4;
    }

    /*
      Location compatibility.
      Same location receives a small boost.
      Different locations are still valid because
      AgroLink coordinates trade between locations.
    */

    if (
      String(demand.location).toLowerCase() ===
      String(supply.location).toLowerCase()
    ) {
      score += 8;
    } else {
      score += 4;
    }

    return Math.min(Math.round(score), 100);
  }


  function findMatchesForDemand(demandId) {
    const demand = getDemandById(demandId);

    if (!demand) {
      return [];
    }

    const supplyItems = getProduce();

    return supplyItems
      .filter((supply) => {
        return (
          supply.status === "Available" &&
          supply.commodity === demand.commodity &&
          Number(
            supply.availableQuantity ??
            supply.quantity
          ) > 0
        );
      })
      .map((supply) => {
        const remainingDemand =
          Math.max(
            Number(demand.quantity) -
              Number(demand.fulfilledQuantity || 0),
            0
          );

        const availableSupply =
          Number(
            supply.availableQuantity ??
            supply.quantity
          );

        return {
          demand,
          supply,
          matchedQuantity: Math.min(
            remainingDemand,
            availableSupply
          ),
          score: calculateMatchScore(demand, supply)
        };
      })
      .filter((result) => result.score >= 65)
      .sort((a, b) => b.score - a.score);
  }


  function createMatchesForDemand(demandId) {
    const demand = getDemandById(demandId);
    const candidates = findMatchesForDemand(demandId);

    if (!demand) {
      return [];
    }

    const existingMatches = getMatches();
    const created = [];

    candidates.forEach((candidate) => {
      const alreadyExists = existingMatches.some(
        (match) =>
          match.demandId === demand.id &&
          match.supplyId === candidate.supply.id
      );

      if (alreadyExists) {
        return;
      }

      const match = addMatch({
        demandId: demand.id,
        supplyId: candidate.supply.id,
        commodity: demand.commodity,
        buyerId: demand.buyerId,
        farmerId: candidate.supply.farmerId,
        requestedQuantity: demand.quantity,
        matchedQuantity: candidate.matchedQuantity,
        unit: demand.unit,
        buyerLocation: demand.location,
        supplyLocation: candidate.supply.location,
        targetPrice: demand.targetPrice,
        supplierPrice: candidate.supply.expectedPrice,
        matchScore: candidate.score,
        supplierVerification:
          candidate.supply.verificationStatus,
        qualityStatus:
          candidate.supply.qualityStatus,
        status: "Potential Match"
      });

      created.push(match);
      existingMatches.push(match);
    });

    return created;
  }


  /* =======================================================
     TRADES / ORDERS
     ======================================================= */

  function getTrades() {
    return read(KEYS.trades, demoData?.trades || []);
  }

  function getTradeById(id) {
    return getTrades().find((item) => item.id === id) || null;
  }

  function addTrade(trade) {
    const trades = getTrades();

    const quantity = Number(trade.quantity) || 0;
    const agreedPrice = Number(trade.agreedPrice) || 0;

    const grossValue =
      Number(trade.grossValue) ||
      quantity * agreedPrice;

    const commissionRate =
      Number(
        trade.commissionRate ??
        config.commissionRate
      ) || 0;

    const commissionAmount =
      Number(trade.commissionAmount) ||
      grossValue * commissionRate;

    const supplierNet =
      Number(trade.supplierNet) ||
      grossValue - commissionAmount;

    const record = {
      id: trade.id || generateId("TRD"),

      orderReference:
        trade.orderReference ||
        `AGL-${new Date().getFullYear()}-${String(
          trades.length + 1
        ).padStart(3, "0")}`,

      matchId: trade.matchId || null,
      demandId: trade.demandId || null,
      supplyId: trade.supplyId || null,

      buyerId: trade.buyerId || null,
      farmerId: trade.farmerId || null,

      buyerDisplayName:
        trade.buyerDisplayName ||
        "Verified Buyer",

      farmerDisplayName:
        trade.farmerDisplayName ||
        "Verified Farmer",

      commodity: trade.commodity || "",
      quantity,
      unit: trade.unit || "kg",
      agreedPrice,

      grossValue,
      commissionRate,
      commissionAmount,
      supplierNet,

      pickupLocation: trade.pickupLocation || "",
      deliveryLocation: trade.deliveryLocation || "",

      qualityStatus:
        trade.qualityStatus ||
        "Awaiting Verification",

      paymentStatus:
        trade.paymentStatus ||
        "Demo — Not Processed",

      deliveryStatus:
        trade.deliveryStatus ||
        "Awaiting Coordination",

      status: trade.status || "In Progress",

      createdAt:
        trade.createdAt ||
        new Date().toISOString(),

      timeline:
        trade.timeline || [
          {
            label: "Supply Matched",
            description:
              "Potential supply identified by AgroLink.",
            status: "completed",
            date: new Date().toISOString()
          },
          {
            label: "Verification",
            description:
              "Supplier and produce verification stage.",
            status: "current",
            date: null
          },
          {
            label: "Transaction Confirmation",
            description:
              "Buyer and supplier terms coordinated through AgroLink.",
            status: "pending",
            date: null
          },
          {
            label: "Delivery",
            description:
              "Delivery coordination and fulfilment.",
            status: "pending",
            date: null
          },
          {
            label: "Completed",
            description:
              "Transaction marked as completed.",
            status: "pending",
            date: null
          }
        ],

      demo: true
    };

    trades.unshift(record);

    write(KEYS.trades, trades);

    return record;
  }

  function updateTrade(id, updates = {}) {
    const trades = getTrades();

    const index = trades.findIndex(
      (item) => item.id === id
    );

    if (index === -1) {
      return null;
    }

    trades[index] = {
      ...trades[index],
      ...updates,
      id: trades[index].id
    };

    write(KEYS.trades, trades);

    return trades[index];
  }


  /* =======================================================
     NOTIFICATIONS
     ======================================================= */

  function getNotifications(role = null) {
    const notifications = read(
      EXTRA_KEYS.notifications,
      demoData?.notifications || {
        buyer: [],
        farmer: []
      }
    );

    if (!role) {
      return notifications;
    }

    return notifications[role] || [];
  }

  function addNotification(role, notification) {
    const notifications = getNotifications();

    if (!notifications[role]) {
      notifications[role] = [];
    }

    const record = {
      id:
        notification.id ||
        generateId("NOT"),
      title: notification.title || "Notification",
      message: notification.message || "",
      type: notification.type || "info",
      read: false,
      createdAt:
        notification.createdAt ||
        new Date().toISOString()
    };

    notifications[role].unshift(record);

    write(
      EXTRA_KEYS.notifications,
      notifications
    );

    return record;
  }

  function markNotificationRead(role, id) {
    const notifications = getNotifications();

    if (!notifications[role]) {
      return false;
    }

    const notification =
      notifications[role].find(
        (item) => item.id === id
      );

    if (!notification) {
      return false;
    }

    notification.read = true;

    write(
      EXTRA_KEYS.notifications,
      notifications
    );

    return true;
  }


  /* =======================================================
     DASHBOARD HELPERS
     ======================================================= */

  function getBuyerDashboardStats(
    buyerId = getCurrentUser()?.id
  ) {
    const demands = getDemands().filter(
      (item) => item.buyerId === buyerId
    );

    const matches = getMatches().filter(
      (item) => item.buyerId === buyerId
    );

    const trades = getTrades().filter(
      (item) => item.buyerId === buyerId
    );

    return {
      openDemands: demands.filter(
        (item) => item.status === "Open"
      ).length,

      potentialMatches: matches.filter(
        (item) =>
          item.status === "Potential Match"
      ).length,

      activeOrders: trades.filter(
        (item) =>
          item.status === "In Progress"
      ).length,

      completedOrders: trades.filter(
        (item) =>
          item.status === "Completed"
      ).length
    };
  }


  function getFarmerDashboardStats(
    farmerId = getCurrentUser()?.id
  ) {
    const produce = getProduce().filter(
      (item) => item.farmerId === farmerId
    );

    const matches = getMatches().filter(
      (item) => item.farmerId === farmerId
    );

    const trades = getTrades().filter(
      (item) => item.farmerId === farmerId
    );

    return {
      activeListings: produce.filter(
        (item) => item.status === "Available"
      ).length,

      potentialMatches: matches.filter(
        (item) =>
          item.status === "Potential Match"
      ).length,

      activeTrades: trades.filter(
        (item) =>
          item.status === "In Progress"
      ).length,

      completedTrades: trades.filter(
        (item) =>
          item.status === "Completed"
      ).length
    };
  }


  /* =======================================================
     RESET DEMO
     Useful before an investor demonstration.
     ======================================================= */

  function resetDemoData() {
    write(KEYS.demands, demoData?.demands || []);
    write(KEYS.produce, demoData?.produce || []);
    write(KEYS.matches, demoData?.matches || []);
    write(KEYS.trades, demoData?.trades || []);

    write(
      EXTRA_KEYS.notifications,
      demoData?.notifications || {
        buyer: [],
        farmer: []
      }
    );

    write(
      KEYS.user,
      demoData?.users?.buyer || null
    );

    write(EXTRA_KEYS.initialized, true);

    return true;
  }


  /* =======================================================
     INITIALIZE AUTOMATICALLY
     ======================================================= */

  initializeDemoData();


  /* =======================================================
     PUBLIC API
     ======================================================= */

  return {
    generateId,

    initializeDemoData,
    resetDemoData,

    getCurrentUser,
    setCurrentUser,
    setDemoRole,

    getDemands,
    getDemandById,
    addDemand,
    updateDemand,
    removeDemand,

    getProduce,
    getProduceById,
    addProduce,
    updateProduce,
    removeProduce,

    getMatches,
    getMatchById,
    addMatch,
    updateMatch,

    calculateMatchScore,
    findMatchesForDemand,
    createMatchesForDemand,

    getTrades,
    getTradeById,
    addTrade,
    updateTrade,

    getNotifications,
    addNotification,
    markNotificationRead,

    getBuyerDashboardStats,
    getFarmerDashboardStats
  };
})();


window.AgroLinkStorage = AgroLinkStorage;