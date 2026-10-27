/* =========================================================
   AGROLINK UGANDA MVP
   Shared Utility Functions
   ========================================================= */

const AgroLinkUtils = (() => {
  const config = window.AGROLINK_CONFIG || {
    currency: "UGX",
    locale: "en-UG"
  };


  /* =======================================================
     NUMBER & MONEY FORMATTING
     ======================================================= */

  function formatNumber(value, options = {}) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "0";
    }

    return new Intl.NumberFormat(
      config.locale || "en-UG",
      options
    ).format(number);
  }


  function formatCurrency(value, options = {}) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "UGX 0";
    }

    const {
      decimals = 0,
      compact = false
    } = options;

    if (compact) {
      return `${config.currency || "UGX"} ${formatCompactNumber(number)}`;
    }

    return `${config.currency || "UGX"} ${formatNumber(number, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })}`;
  }


  function formatCompactNumber(value) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "0";
    }

    const absolute = Math.abs(number);

    if (absolute >= 1000000000) {
      return `${trimDecimal(number / 1000000000)}B`;
    }

    if (absolute >= 1000000) {
      return `${trimDecimal(number / 1000000)}M`;
    }

    if (absolute >= 1000) {
      return `${trimDecimal(number / 1000)}K`;
    }

    return formatNumber(number);
  }


  function trimDecimal(value) {
    return Number(value.toFixed(1)).toString();
  }


  function formatQuantity(quantity, unit = "kg") {
    return `${formatNumber(quantity)} ${unit}`;
  }


  function formatPricePerUnit(price, unit = "kg") {
    return `${formatCurrency(price)}/${unit}`;
  }


  function formatPercentage(value, decimals = 0) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "0%";
    }

    return `${number.toFixed(decimals)}%`;
  }


  /* =======================================================
     DATE FORMATTING
     ======================================================= */

  function toDate(value) {
    if (!value) {
      return null;
    }

    const date =
      value instanceof Date
        ? value
        : new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date;
  }


  function formatDate(value, options = {}) {
    const date = toDate(value);

    if (!date) {
      return "—";
    }

    const defaultOptions = {
      day: "numeric",
      month: "short",
      year: "numeric"
    };

    return new Intl.DateTimeFormat(
      config.locale || "en-UG",
      {
        ...defaultOptions,
        ...options
      }
    ).format(date);
  }


  function formatShortDate(value) {
    return formatDate(value, {
      day: "numeric",
      month: "short"
    });
  }


  function formatDateTime(value) {
    const date = toDate(value);

    if (!date) {
      return "—";
    }

    return new Intl.DateTimeFormat(
      config.locale || "en-UG",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
      }
    ).format(date);
  }


  function formatRelativeTime(value) {
    const date = toDate(value);

    if (!date) {
      return "—";
    }

    const now = new Date();

    const difference =
      date.getTime() - now.getTime();

    const seconds = Math.round(
      difference / 1000
    );

    const absoluteSeconds =
      Math.abs(seconds);

    if (absoluteSeconds < 60) {
      return seconds <= 0
        ? "Just now"
        : "In a moment";
    }

    const minutes = Math.round(
      seconds / 60
    );

    if (Math.abs(minutes) < 60) {
      return relativeTime(
        minutes,
        "minute"
      );
    }

    const hours = Math.round(
      minutes / 60
    );

    if (Math.abs(hours) < 24) {
      return relativeTime(
        hours,
        "hour"
      );
    }

    const days = Math.round(
      hours / 24
    );

    if (Math.abs(days) < 7) {
      return relativeTime(
        days,
        "day"
      );
    }

    return formatDate(date);
  }


  function relativeTime(value, unit) {
    try {
      const formatter =
        new Intl.RelativeTimeFormat(
          config.locale || "en-UG",
          {
            numeric: "auto"
          }
        );

      return formatter.format(
        value,
        unit
      );
    } catch (error) {
      return formatDate(
        new Date()
      );
    }
  }


  /* =======================================================
     TEXT HELPERS
     ======================================================= */

  function getInitials(name, max = 2) {
    if (!name) {
      return "AG";
    }

    return String(name)
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, max)
      .map((part) =>
        part.charAt(0).toUpperCase()
      )
      .join("");
  }


  function capitalize(value) {
    if (!value) {
      return "";
    }

    const string = String(value);

    return (
      string.charAt(0).toUpperCase() +
      string.slice(1)
    );
  }


  function titleCase(value) {
    if (!value) {
      return "";
    }

    return String(value)
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .map(capitalize)
      .join(" ");
  }


  function truncate(value, length = 80) {
    if (!value) {
      return "";
    }

    const string = String(value);

    if (string.length <= length) {
      return string;
    }

    return `${string.slice(
      0,
      length - 1
    ).trim()}…`;
  }


  /* =======================================================
     HTML SAFETY
     ======================================================= */

  function escapeHTML(value) {
    if (
      value === null ||
      value === undefined
    ) {
      return "";
    }

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  /* =======================================================
     STATUS HELPERS
     ======================================================= */

  function getStatusVariant(status) {
    const value = String(
      status || ""
    ).toLowerCase();

    if (
      [
        "available",
        "completed",
        "verified",
        "open",
        "active",
        "approved",
        "paid",
        "delivered"
      ].some((item) =>
        value.includes(item)
      )
    ) {
      return "success";
    }

    if (
      [
        "pending",
        "awaiting",
        "in progress",
        "processing",
        "inspection"
      ].some((item) =>
        value.includes(item)
      )
    ) {
      return "warning";
    }

    if (
      [
        "match",
        "matched",
        "potential"
      ].some((item) =>
        value.includes(item)
      )
    ) {
      return "info";
    }

    if (
      [
        "cancelled",
        "canceled",
        "failed",
        "rejected",
        "expired"
      ].some((item) =>
        value.includes(item)
      )
    ) {
      return "danger";
    }

    return "neutral";
  }


  function getStatusBadgeClass(status) {
    return `badge badge-${getStatusVariant(
      status
    )}`;
  }


  /* =======================================================
     PRICE TREND HELPERS
     ======================================================= */

  function getTrendSymbol(trend) {
    switch (
      String(trend).toLowerCase()
    ) {
      case "up":
        return "↑";

      case "down":
        return "↓";

      default:
        return "→";
    }
  }


  function getTrendText(
    trend,
    change = 0
  ) {
    const amount =
      Math.abs(Number(change)) || 0;

    const direction =
      String(trend).toLowerCase();

    if (direction === "up") {
      return `Up ${amount}%`;
    }

    if (direction === "down") {
      return `Down ${amount}%`;
    }

    return "No change";
  }


  /* =======================================================
     URL HELPERS
     ======================================================= */

  function getQueryParam(name) {
    const params =
      new URLSearchParams(
        window.location.search
      );

    return params.get(name);
  }


  function setQueryParam(
    name,
    value,
    replace = false
  ) {
    const url = new URL(
      window.location.href
    );

    url.searchParams.set(
      name,
      value
    );

    if (replace) {
      window.history.replaceState(
        {},
        "",
        url
      );
    } else {
      window.history.pushState(
        {},
        "",
        url
      );
    }
  }


  function navigate(url) {
    window.location.href = url;
  }


  /* =======================================================
     VALIDATION HELPERS
     ======================================================= */

  function isPositiveNumber(value) {
    const number = Number(value);

    return (
      Number.isFinite(number) &&
      number > 0
    );
  }


  function isValidDate(value) {
    return Boolean(toDate(value));
  }


  function isFutureOrToday(value) {
    const date = toDate(value);

    if (!date) {
      return false;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    return date >= today;
  }


  /* =======================================================
     DOM HELPERS
     ======================================================= */

  function qs(
    selector,
    scope = document
  ) {
    return scope.querySelector(selector);
  }


  function qsa(
    selector,
    scope = document
  ) {
    return Array.from(
      scope.querySelectorAll(selector)
    );
  }


  function on(
    element,
    event,
    handler,
    options
  ) {
    if (!element) {
      return;
    }

    element.addEventListener(
      event,
      handler,
      options
    );
  }


  function delegate(
    selector,
    event,
    handler,
    scope = document
  ) {
    scope.addEventListener(
      event,
      (eventObject) => {
        const target =
          eventObject.target.closest(
            selector
          );

        if (
          target &&
          scope.contains(target)
        ) {
          handler(
            eventObject,
            target
          );
        }
      }
    );
  }


  function show(element) {
    if (!element) {
      return;
    }

    element.hidden = false;
  }


  function hide(element) {
    if (!element) {
      return;
    }

    element.hidden = true;
  }


  /* =======================================================
     FORM HELPERS
     ======================================================= */

  function formToObject(form) {
    if (!form) {
      return {};
    }

    const formData =
      new FormData(form);

    return Object.fromEntries(
      formData.entries()
    );
  }


  function clearFormErrors(form) {
    if (!form) {
      return;
    }

    form
      .querySelectorAll(
        ".is-error"
      )
      .forEach((element) => {
        element.classList.remove(
          "is-error"
        );
      });

    form
      .querySelectorAll(
        ".form-error"
      )
      .forEach((element) => {
        element.remove();
      });
  }


  function setFieldError(
    field,
    message
  ) {
    if (!field) {
      return;
    }

    field.classList.add(
      "is-error"
    );

    const existing =
      field.parentElement?.querySelector(
        ".form-error"
      );

    if (existing) {
      existing.remove();
    }

    const error =
      document.createElement("div");

    error.className =
      "form-error";

    error.textContent = message;

    field.insertAdjacentElement(
      "afterend",
      error
    );
  }


  /* =======================================================
     CALCULATION HELPERS
     ======================================================= */

  function calculateTransaction(
    quantity,
    price,
    commissionRate =
      config.commissionRate || 0.10
  ) {
    const safeQuantity =
      Number(quantity) || 0;

    const safePrice =
      Number(price) || 0;

    const safeRate =
      Number(commissionRate) || 0;

    const gross =
      safeQuantity * safePrice;

    const commission =
      gross * safeRate;

    const supplierNet =
      gross - commission;

    return {
      quantity: safeQuantity,
      price: safePrice,
      gross,
      commissionRate: safeRate,
      commission,
      supplierNet
    };
  }


  /* =======================================================
     ID / REFERENCE HELPERS
     ======================================================= */

  function generateReference(
    prefix = "AGL"
  ) {
    const now = new Date();

    const date = [
      now.getFullYear(),
      String(
        now.getMonth() + 1
      ).padStart(2, "0"),
      String(
        now.getDate()
      ).padStart(2, "0")
    ].join("");

    const random = Math.floor(
      1000 + Math.random() * 9000
    );

    return `${prefix}-${date}-${random}`;
  }


  /* =======================================================
     DEBOUNCE
     Useful for market search/filtering.
     ======================================================= */

  function debounce(
    callback,
    delay = 250
  ) {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);

      timeout = setTimeout(
        () => callback(...args),
        delay
      );
    };
  }


  /* =======================================================
     PUBLIC API
     ======================================================= */

  return {
    formatNumber,
    formatCurrency,
    formatCompactNumber,
    formatQuantity,
    formatPricePerUnit,
    formatPercentage,

    formatDate,
    formatShortDate,
    formatDateTime,
    formatRelativeTime,

    getInitials,
    capitalize,
    titleCase,
    truncate,
    escapeHTML,

    getStatusVariant,
    getStatusBadgeClass,

    getTrendSymbol,
    getTrendText,

    getQueryParam,
    setQueryParam,
    navigate,

    isPositiveNumber,
    isValidDate,
    isFutureOrToday,

    qs,
    qsa,
    on,
    delegate,
    show,
    hide,

    formToObject,
    clearFormErrors,
    setFieldError,

    calculateTransaction,
    generateReference,

    debounce
  };
})();


window.AgroLinkUtils =
  AgroLinkUtils;