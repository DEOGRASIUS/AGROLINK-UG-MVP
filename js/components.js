/* =========================================================
   AGROLINK UGANDA MVP
   Shared UI Components & Application Shell
   ========================================================= */

const AgroLinkComponents = (() => {
  const config = window.AGROLINK_CONFIG;
  const storage = window.AgroLinkStorage;
  const utils = window.AgroLinkUtils;

  /* =======================================================
     ICONS
     Inline SVG keeps the MVP dependency-free.
     ======================================================= */

  const icons = {
    home: `
      <svg width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 10.5 12 3l9 7.5"></path>
        <path d="M5 9.5V21h14V9.5"></path>
        <path d="M9 21v-6h6v6"></path>
      </svg>
    `,

    market: `
      <svg width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19V9"></path>
        <path d="M10 19V5"></path>
        <path d="M16 19v-7"></path>
        <path d="M22 19H2"></path>
      </svg>
    `,

    demand: `
      <svg width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="2"></rect>
        <path d="M8 8h8"></path>
        <path d="M8 12h5"></path>
        <path d="M8 16h3"></path>
        <path d="M16 14v4"></path>
        <path d="M14 16h4"></path>
      </svg>
    `,

    match: `
      <svg width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <circle cx="8" cy="12" r="4"></circle>
        <circle cx="16" cy="12" r="4"></circle>
        <path d="M10.5 9a4 4 0 0 1 3 0"></path>
        <path d="M10.5 15a4 4 0 0 0 3 0"></path>
      </svg>
    `,

    orders: `
      <svg width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 3h12v18H6z"></path>
        <path d="M9 7h6"></path>
        <path d="M9 11h6"></path>
        <path d="M9 15h4"></path>
      </svg>
    `,

    profile: `
      <svg width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="8" r="4"></circle>
        <path d="M4 21a8 8 0 0 1 16 0"></path>
      </svg>
    `,

    prices: `
      <svg width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 18 9 12l4 4 8-10"></path>
        <path d="M15 6h6v6"></path>
      </svg>
    `,

    produce: `
      <svg width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 21V10"></path>
        <path d="M12 13c-5 0-7-3-7-7 5 0 7 3 7 7Z"></path>
        <path d="M12 16c5 0 7-3 7-7-5 0-7 3-7 7Z"></path>
      </svg>
    `,

    trades: `
      <svg width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 7h11"></path>
        <path d="m15 4 3 3-3 3"></path>
        <path d="M17 17H6"></path>
        <path d="m9 14-3 3 3 3"></path>
      </svg>
    `,

    bell: `
      <svg width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path>
        <path d="M10 21h4"></path>
      </svg>
    `,

    chevronDown: `
      <svg width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    `,

    logout: `
      <svg width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 17l5-5-5-5"></path>
        <path d="M15 12H3"></path>
        <path d="M14 3h7v18h-7"></path>
      </svg>
    `,

    check: `
      <svg width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2.4"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="m5 12 4 4L19 6"></path>
      </svg>
    `,

    info: `
      <svg width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M12 11v5"></path>
        <path d="M12 8h.01"></path>
      </svg>
    `,

    close: `
      <svg width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round">
        <path d="m6 6 12 12"></path>
        <path d="m18 6-12 12"></path>
      </svg>
    `
  };


  /* =======================================================
     NAVIGATION DEFINITIONS
     ======================================================= */

  const navigation = {
    buyer: [
      {
        key: "dashboard",
        label: "Dashboard",
        mobileLabel: "Home",
        icon: "home",
        href: "dashboard.html"
      },
      {
        key: "market",
        label: "Market",
        mobileLabel: "Market",
        icon: "market",
        href: "market.html"
      },
      {
        key: "post-demand",
        label: "Post Demand",
        mobileLabel: "Demand",
        icon: "demand",
        href: "post-demand.html"
      },
      {
        key: "matches",
        label: "Matches",
        icon: "match",
        href: "matches.html"
      },
      {
        key: "orders",
        label: "Orders",
        mobileLabel: "Orders",
        icon: "orders",
        href: "orders.html"
      },
      {
        key: "profile",
        label: "Profile",
        mobileLabel: "Profile",
        icon: "profile",
        href: "profile.html"
      }
    ],

    farmer: [
      {
        key: "dashboard",
        label: "Dashboard",
        mobileLabel: "Home",
        icon: "home",
        href: "dashboard.html"
      },
      {
        key: "prices",
        label: "Market Prices",
        mobileLabel: "Prices",
        icon: "prices",
        href: "prices.html"
      },
      {
        key: "demand",
        label: "Buyer Demand",
        mobileLabel: "Demand",
        icon: "demand",
        href: "demand.html"
      },
      {
        key: "post-produce",
        label: "Post Produce",
        mobileLabel: "Sell",
        icon: "produce",
        href: "post-produce.html"
      },
      {
        key: "trades",
        label: "Trades",
        mobileLabel: "Trades",
        icon: "trades",
        href: "trades.html"
      },
      {
        key: "profile",
        label: "Profile",
        mobileLabel: "Profile",
        icon: "profile",
        href: "profile.html"
      }
    ]
  };


  /* =======================================================
     PAGE INFORMATION
     ======================================================= */

  const pageInformation = {
    buyer: {
      dashboard: {
        title: "Buyer Dashboard",
        subtitle: "Procurement intelligence and supply opportunities."
      },
      market: {
        title: "Market",
        subtitle: "Explore available produce and market intelligence."
      },
      "post-demand": {
        title: "Post Demand",
        subtitle: "Tell AgroLink what your organization needs."
      },
      matches: {
        title: "Supply Matches",
        subtitle: "Review potential supply matched to your requirements."
      },
      orders: {
        title: "Orders",
        subtitle: "Track procurement coordinated through AgroLink."
      },
      "order-details": {
        title: "Order Details",
        subtitle: "Review verification, transaction and delivery progress."
      },
      profile: {
        title: "Buyer Profile",
        subtitle: "Manage your demo procurement profile."
      }
    },

    farmer: {
      dashboard: {
        title: "Farmer Dashboard",
        subtitle: "Market intelligence, demand and trading opportunities."
      },
      prices: {
        title: "Market Prices",
        subtitle: "Compare demo grain prices across selected markets."
      },
      demand: {
        title: "Buyer Demand",
        subtitle: "Explore verified procurement requirements."
      },
      "post-produce": {
        title: "Post Produce",
        subtitle: "List produce for matching through AgroLink."
      },
      trades: {
        title: "Trades",
        subtitle: "Track transactions coordinated through AgroLink."
      },
      "trade-details": {
        title: "Trade Details",
        subtitle: "Review verification and transaction progress."
      },
      profile: {
        title: "Farmer Profile",
        subtitle: "Manage your demo farmer profile."
      }
    }
  };


  /* =======================================================
     PAGE CONTEXT
     Pages will use:
     <body data-role="buyer" data-page="dashboard">
     ======================================================= */

  function getPageContext() {
    const role =
      document.body.dataset.role ||
      storage?.getCurrentUser()?.role ||
      config?.roles?.BUYER ||
      "buyer";

    const page =
      document.body.dataset.page ||
      "dashboard";

    return {
      role,
      page
    };
  }


  function getPageInfo(role, page) {
    return (
      pageInformation?.[role]?.[page] || {
        title: config?.appName || "AgroLink Uganda",
        subtitle:
          "Agricultural intelligence for better trade decisions."
      }
    );
  }


  /* =======================================================
     BRAND
     Uses logo image if available, with graceful fallback.
     ======================================================= */

  function brandMarkup(role) {
    const roleLabel =
      role === "farmer"
        ? "Farmer Portal"
        : "Buyer Portal";

    return `
      <a class="sidebar-brand" href="dashboard.html" aria-label="AgroLink Uganda">
        <div
          class="avatar"
          style="
            background:#ffffff;
            color:var(--green-900);
            font-size:15px;
          "
        >
          AL
        </div>

        <div class="sidebar-brand-text">
          <span class="sidebar-brand-name">
            AgroLink
          </span>

          <span class="sidebar-brand-label">
            ${roleLabel}
          </span>
        </div>
      </a>
    `;
  }


  /* =======================================================
     SIDEBAR
     ======================================================= */

  function renderSidebar(role, currentPage) {
    const items =
      navigation[role] ||
      navigation.buyer;

    const mainItems =
      items.filter(
        (item) => item.key !== "profile"
      );

    const profileItem =
      items.find(
        (item) => item.key === "profile"
      );

    const navItems =
      mainItems
        .map((item) => {
          const active =
            item.key === currentPage ||
            (
              currentPage === "order-details" &&
              item.key === "orders"
            ) ||
            (
              currentPage === "trade-details" &&
              item.key === "trades"
            );

          return `
            <a
              class="sidebar-link ${active ? "active" : ""}"
              href="${item.href}"
              ${active ? 'aria-current="page"' : ""}
            >
              <span class="sidebar-link-icon">
                ${icons[item.icon] || ""}
              </span>

              <span>${item.label}</span>
            </a>
          `;
        })
        .join("");

    const profileMarkup =
      profileItem
        ? `
          <a
            class="sidebar-link ${
              currentPage === "profile"
                ? "active"
                : ""
            }"
            href="${profileItem.href}"
          >
            <span class="sidebar-link-icon">
              ${icons.profile}
            </span>

            <span>Profile</span>
          </a>
        `
        : "";

    return `
      <aside class="sidebar">
        ${brandMarkup(role)}

        <nav
          class="sidebar-nav"
          aria-label="${utils?.capitalize(role) || role} navigation"
        >
          <div class="sidebar-nav-section">
            Workspace
          </div>

          ${navItems}

          <div class="sidebar-nav-section">
            Account
          </div>

          ${profileMarkup}
        </nav>

        <div class="sidebar-footer">
          <div
            style="
              padding:12px;
              background:rgba(255,255,255,.06);
              border:1px solid rgba(255,255,255,.08);
              border-radius:12px;
            "
          >
            <div
              style="
                color:#fff;
                font-size:11px;
                font-weight:800;
              "
            >
              MVP Demo
            </div>

            <div
              style="
                margin-top:4px;
                color:rgba(255,255,255,.55);
                font-size:9px;
                line-height:1.45;
              "
            >
              Prototype data for demonstration only.
            </div>
          </div>
        </div>
      </aside>
    `;
  }


  /* =======================================================
     TOP HEADER
     ======================================================= */

  function renderHeader(role, currentPage) {
    const pageInfo =
      getPageInfo(role, currentPage);

    const user =
      storage?.getCurrentUser() || {};

    const notifications =
      storage?.getNotifications(role) || [];

    const unreadCount =
      notifications.filter(
        (item) => !item.read
      ).length;

    const initials =
      utils?.getInitials(user.name) ||
      "AG";

    const roleText =
      role === "farmer"
        ? "Farmer"
        : user.buyerType || "Buyer";

    return `
      <header class="app-header">
        <div class="header-left">
          <div>
            <div class="page-title">
              ${utils?.escapeHTML(pageInfo.title) || pageInfo.title}
            </div>

            <div class="page-subtitle">
              ${utils?.escapeHTML(pageInfo.subtitle) || pageInfo.subtitle}
            </div>
          </div>
        </div>

        <div class="header-right">
          <button
            type="button"
            class="icon-btn notification-button"
            id="notificationButton"
            aria-label="Notifications"
            title="Notifications"
          >
            ${icons.bell}

            ${
              unreadCount > 0
                ? `<span class="notification-dot"></span>`
                : ""
            }
          </button>

          <div class="dropdown" id="userDropdown">
            <button
              type="button"
              class="user-menu"
              id="userMenuButton"
              aria-expanded="false"
            >
              <div class="avatar">
                ${utils?.escapeHTML(initials) || initials}
              </div>

              <div class="user-details">
                <div class="user-name">
                  ${utils?.escapeHTML(user.name || "Demo User")}
                </div>

                <div class="user-role">
                  ${utils?.escapeHTML(roleText)}
                </div>
              </div>

              ${icons.chevronDown}
            </button>

            <div class="dropdown-menu">
              <a
                class="dropdown-item"
                href="profile.html"
              >
                ${icons.profile}
                Profile
              </a>

              <button
                type="button"
                class="dropdown-item"
                data-action="reset-demo"
              >
                ${icons.info}
                Reset demo data
              </button>

              <button
                type="button"
                class="dropdown-item"
                data-action="demo-exit"
              >
                ${icons.logout}
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    `;
  }


  /* =======================================================
     MOBILE HEADER
     ======================================================= */

  function renderMobileHeader(role) {
    const notifications =
      storage?.getNotifications(role) || [];

    const unreadCount =
      notifications.filter(
        (item) => !item.read
      ).length;

    return `
      <header class="mobile-header">
        <a
          class="mobile-brand"
          href="dashboard.html"
        >
          <div
            class="avatar avatar-sm"
            style="
              background:var(--green-900);
              color:#fff;
            "
          >
            AL
          </div>

          <span class="mobile-brand-name">
            AgroLink
          </span>
        </a>

        <div class="mobile-header-actions">
          <button
            type="button"
            class="icon-btn notification-button"
            data-mobile-notifications
            aria-label="Notifications"
          >
            ${icons.bell}

            ${
              unreadCount > 0
                ? `<span class="notification-dot"></span>`
                : ""
            }
          </button>
        </div>
      </header>
    `;
  }


  /* =======================================================
     MOBILE BOTTOM NAVIGATION
     Exactly five items per role.
     ======================================================= */

  function getMobileNavigation(role) {
    if (role === "farmer") {
      return [
        navigation.farmer.find(
          (item) => item.key === "dashboard"
        ),
        navigation.farmer.find(
          (item) => item.key === "prices"
        ),
        navigation.farmer.find(
          (item) => item.key === "post-produce"
        ),
        navigation.farmer.find(
          (item) => item.key === "trades"
        ),
        navigation.farmer.find(
          (item) => item.key === "profile"
        )
      ];
    }

    return [
      navigation.buyer.find(
        (item) => item.key === "dashboard"
      ),
      navigation.buyer.find(
        (item) => item.key === "market"
      ),
      navigation.buyer.find(
        (item) => item.key === "post-demand"
      ),
      navigation.buyer.find(
        (item) => item.key === "orders"
      ),
      navigation.buyer.find(
        (item) => item.key === "profile"
      )
    ];
  }


  function renderMobileNavigation(
    role,
    currentPage
  ) {
    const items =
      getMobileNavigation(role);

    return `
      <nav
        class="mobile-bottom-nav"
        aria-label="Mobile navigation"
      >
        ${items
          .map((item) => {
            if (!item) {
              return "";
            }

            const active =
              item.key === currentPage ||
              (
                currentPage === "order-details" &&
                item.key === "orders"
              ) ||
              (
                currentPage === "trade-details" &&
                item.key === "trades"
              );

            return `
              <a
                href="${item.href}"
                class="mobile-nav-link ${
                  active ? "active" : ""
                }"
                ${active ? 'aria-current="page"' : ""}
              >
                <span class="mobile-nav-icon">
                  ${icons[item.icon] || ""}
                </span>

                <span>
                  ${
                    utils?.escapeHTML(
                      item.mobileLabel ||
                      item.label
                    ) ||
                    item.mobileLabel ||
                    item.label
                  }
                </span>
              </a>
            `;
          })
          .join("")}
      </nav>
    `;
  }


  /* =======================================================
     DEMO BANNER
     ======================================================= */

  function renderDemoBanner() {
    return `
      <div class="demo-banner">
        ${icons.info}

        <span>
          AgroLink MVP — prototype workflow and demo market data
        </span>
      </div>
    `;
  }


  /* =======================================================
     APPLICATION SHELL
     HTML pages only need:
       #app-sidebar
       #app-mobile-header
       #app-header
       #app-mobile-nav
       #demo-banner
     ======================================================= */

  function renderAppShell() {
    const {
      role,
      page
    } = getPageContext();

    /*
      Ensure correct demo identity for the page being viewed.
      This is useful when demonstrating Buyer and Farmer
      experiences in the same browser.
    */

    const currentUser =
      storage?.getCurrentUser();

    if (
      storage &&
      currentUser?.role !== role
    ) {
      storage.setDemoRole(role);
    }

    const sidebar =
      document.getElementById(
        "app-sidebar"
      );

    const header =
      document.getElementById(
        "app-header"
      );

    const mobileHeader =
      document.getElementById(
        "app-mobile-header"
      );

    const mobileNav =
      document.getElementById(
        "app-mobile-nav"
      );

    const demoBanner =
      document.getElementById(
        "demo-banner"
      );

    if (sidebar) {
      sidebar.innerHTML =
        renderSidebar(role, page);
    }

    if (header) {
      header.innerHTML =
        renderHeader(role, page);
    }

    if (mobileHeader) {
      mobileHeader.innerHTML =
        renderMobileHeader(role);
    }

    if (mobileNav) {
      mobileNav.innerHTML =
        renderMobileNavigation(
          role,
          page
        );
    }

    if (demoBanner) {
      demoBanner.innerHTML =
        renderDemoBanner();
    }

    bindSharedInteractions();
  }


  /* =======================================================
     BADGES
     ======================================================= */

  function statusBadge(
    status,
    options = {}
  ) {
    const {
      dot = true
    } = options;

    const className =
      utils?.getStatusBadgeClass(
        status
      ) || "badge badge-neutral";

    return `
      <span
        class="${className} ${
          dot ? "badge-dot" : ""
        }"
      >
        ${utils?.escapeHTML(status || "Unknown")}
      </span>
    `;
  }


  function verifiedBadge(
    text = "Verified"
  ) {
    return `
      <span class="verified-badge">
        <span class="verified-icon">
          ${icons.check}
        </span>

        ${utils?.escapeHTML(text)}
      </span>
    `;
  }


  function demoLabel(
    text = "Demo data"
  ) {
    return `
      <span class="demo-label">
        ${utils?.escapeHTML(text)}
      </span>
    `;
  }


  /* =======================================================
     PRICE CARD
     ======================================================= */

  function priceCard(price) {
    const trend =
      String(
        price.trend || "neutral"
      ).toLowerCase();

    return `
      <article class="price-card">
        <div class="price-card-header">
          <div class="commodity-info">
            <div class="commodity-icon">
              ${
                price.commodity === "Beans"
                  ? "◉"
                  : "◆"
              }
            </div>

            <div>
              <div class="commodity-name">
                ${utils.escapeHTML(price.commodity)}
              </div>

              <div class="commodity-location">
                ${utils.escapeHTML(price.location)}
              </div>
            </div>
          </div>

          ${demoLabel()}
        </div>

        <div>
          <span class="price-value">
            ${utils.formatCurrency(price.price)}
          </span>

          <span class="price-unit">
            /${utils.escapeHTML(price.unit)}
          </span>
        </div>

        <div class="price-trend ${trend}">
          <span>
            ${utils.getTrendSymbol(trend)}
          </span>

          <span>
            ${utils.getTrendText(
              trend,
              price.change
            )}
          </span>
        </div>
      </article>
    `;
  }


  /* =======================================================
     TOASTS
     ======================================================= */

  function ensureToastContainer() {
    let container =
      document.querySelector(
        ".toast-container"
      );

    if (!container) {
      container =
        document.createElement("div");

      container.className =
        "toast-container";

      container.setAttribute(
        "aria-live",
        "polite"
      );

      document.body.appendChild(
        container
      );
    }

    return container;
  }


  function showToast(
    message,
    options = {}
  ) {
    const {
      title = "AgroLink",
      type = "success",
      duration = 3500
    } = options;

    const container =
      ensureToastContainer();

    const toast =
      document.createElement("div");

    toast.className =
      `toast toast-${type}`;

    toast.innerHTML = `
      <div style="flex:1;min-width:0;">
        <div class="toast-title">
          ${utils.escapeHTML(title)}
        </div>

        <div class="toast-message">
          ${utils.escapeHTML(message)}
        </div>
      </div>

      <button
        type="button"
        class="btn-ghost"
        aria-label="Close notification"
        style="
          padding:2px;
          min-height:auto;
        "
      >
        ${icons.close}
      </button>
    `;

    container.appendChild(toast);

    const removeToast = () => {
      toast.style.opacity = "0";
      toast.style.transform =
        "translateX(20px)";

      setTimeout(
        () => toast.remove(),
        180
      );
    };

    toast
      .querySelector("button")
      ?.addEventListener(
        "click",
        removeToast
      );

    setTimeout(
      removeToast,
      duration
    );

    return toast;
  }


  /* =======================================================
     CONFIRMATION MODAL
     ======================================================= */

  function confirm(options = {}) {
    const {
      title = "Confirm action",
      message = "Are you sure you want to continue?",
      confirmText = "Continue",
      cancelText = "Cancel",
      danger = false
    } = options;

    return new Promise((resolve) => {
      const backdrop =
        document.createElement("div");

      backdrop.className =
        "modal-backdrop";

      backdrop.innerHTML = `
        <div
          class="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="agrolinkConfirmTitle"
        >
          <div class="modal-header">
            <div>
              <div
                class="modal-title"
                id="agrolinkConfirmTitle"
              >
                ${utils.escapeHTML(title)}
              </div>
            </div>

            <button
              type="button"
              class="icon-btn"
              data-modal-close
              aria-label="Close"
            >
              ${icons.close}
            </button>
          </div>

          <div class="modal-body">
            <p>
              ${utils.escapeHTML(message)}
            </p>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-modal-cancel
            >
              ${utils.escapeHTML(cancelText)}
            </button>

            <button
              type="button"
              class="btn ${
                danger
                  ? "btn-danger"
                  : "btn-primary"
              }"
              data-modal-confirm
            >
              ${utils.escapeHTML(confirmText)}
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(
        backdrop
      );

      document.body.classList.add(
        "no-scroll"
      );

      requestAnimationFrame(() => {
        backdrop.classList.add(
          "show"
        );
      });

      let settled = false;

      const close = (result) => {
        if (settled) {
          return;
        }

        settled = true;

        backdrop.classList.remove(
          "show"
        );

        document.body.classList.remove(
          "no-scroll"
        );

        setTimeout(() => {
          backdrop.remove();
        }, 200);

        resolve(result);
      };

      backdrop
        .querySelector(
          "[data-modal-confirm]"
        )
        ?.addEventListener(
          "click",
          () => close(true)
        );

      backdrop
        .querySelector(
          "[data-modal-cancel]"
        )
        ?.addEventListener(
          "click",
          () => close(false)
        );

      backdrop
        .querySelector(
          "[data-modal-close]"
        )
        ?.addEventListener(
          "click",
          () => close(false)
        );

      backdrop.addEventListener(
        "click",
        (event) => {
          if (
            event.target === backdrop
          ) {
            close(false);
          }
        }
      );
    });
  }


  /* =======================================================
     NOTIFICATION PREVIEW
     ======================================================= */

  function showNotifications(role) {
    const notifications =
      storage?.getNotifications(role) || [];

    if (!notifications.length) {
      showToast(
        "You have no demo notifications.",
        {
          type: "info",
          title: "Notifications"
        }
      );

      return;
    }

    const unread =
      notifications.filter(
        (item) => !item.read
      );

    const latest =
      unread[0] ||
      notifications[0];

    showToast(
      latest.message,
      {
        title: latest.title,
        type: "info",
        duration: 5000
      }
    );

    if (!latest.read) {
      storage.markNotificationRead(
        role,
        latest.id
      );
    }
  }


  /* =======================================================
     SHARED INTERACTIONS
     ======================================================= */

  function bindSharedInteractions() {
    const {
      role
    } = getPageContext();

    const dropdown =
      document.getElementById(
        "userDropdown"
      );

    const userButton =
      document.getElementById(
        "userMenuButton"
      );

    if (
      dropdown &&
      userButton &&
      !userButton.dataset.bound
    ) {
      userButton.dataset.bound =
        "true";

      userButton.addEventListener(
        "click",
        (event) => {
          event.stopPropagation();

          const open =
            dropdown.classList.toggle(
              "open"
            );

          userButton.setAttribute(
            "aria-expanded",
            String(open)
          );
        }
      );
    }

    if (
      !document.body.dataset
        .agrolinkSharedBound
    ) {
      document.body.dataset
        .agrolinkSharedBound = "true";

      document.addEventListener(
        "click",
        (event) => {
          if (
            dropdown &&
            !dropdown.contains(
              event.target
            )
          ) {
            dropdown.classList.remove(
              "open"
            );

            userButton?.setAttribute(
              "aria-expanded",
              "false"
            );
          }
        }
      );

      document.addEventListener(
        "click",
        async (event) => {
          const resetButton =
            event.target.closest(
              '[data-action="reset-demo"]'
            );

          if (resetButton) {
            const accepted =
              await confirm({
                title: "Reset demo data?",
                message:
                  "This will restore the original AgroLink prototype data and remove changes made during this browser demo.",
                confirmText:
                  "Reset demo",
                danger: true
              });

            if (accepted) {
              storage.resetDemoData();

              storage.setDemoRole(
                role
              );

              showToast(
                "Demo data has been restored.",
                {
                  title:
                    "Demo reset complete",
                  type: "success"
                }
              );

              setTimeout(() => {
                window.location.reload();
              }, 650);
            }
          }

          const exitButton =
            event.target.closest(
              '[data-action="demo-exit"]'
            );

          if (exitButton) {
            window.location.href =
              "../auth/welcome.html";
          }

          const notificationButton =
            event.target.closest(
              "#notificationButton, [data-mobile-notifications]"
            );

          if (notificationButton) {
            showNotifications(role);
          }
        }
      );
    }
  }


  /* =======================================================
     INITIALIZE COMPONENTS
     ======================================================= */

  function init() {
    renderAppShell();
  }


  /* =======================================================
     PUBLIC API
     ======================================================= */

  return {
    icons,
    navigation,

    init,
    renderAppShell,

    statusBadge,
    verifiedBadge,
    demoLabel,
    priceCard,

    showToast,
    confirm
  };
})();


window.AgroLinkComponents =
  AgroLinkComponents;