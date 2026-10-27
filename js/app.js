/* =========================================================
   AGROLINK UGANDA MVP
   Global Application Bootstrap
   ========================================================= */

const AgroLinkApp = (() => {
  const config = window.AGROLINK_CONFIG;
  const data = window.AGROLINK_DATA;
  const storage = window.AgroLinkStorage;
  const utils = window.AgroLinkUtils;
  const components = window.AgroLinkComponents;


  /* =======================================================
     DEPENDENCY CHECK
     ======================================================= */

  function checkDependencies() {
    const dependencies = [
      {
        name: "AGROLINK_CONFIG",
        value: config
      },
      {
        name: "AGROLINK_DATA",
        value: data
      },
      {
        name: "AgroLinkStorage",
        value: storage
      },
      {
        name: "AgroLinkUtils",
        value: utils
      },
      {
        name: "AgroLinkComponents",
        value: components
      }
    ];

    const missing = dependencies
      .filter((dependency) => !dependency.value)
      .map((dependency) => dependency.name);

    if (missing.length) {
      console.error(
        "AgroLink could not initialize. Missing:",
        missing.join(", ")
      );

      return false;
    }

    return true;
  }


  /* =======================================================
     PAGE CONTEXT
     ======================================================= */

  function getPageContext() {
    return {
      role:
        document.body.dataset.role ||
        storage.getCurrentUser()?.role ||
        config.roles.BUYER,

      page:
        document.body.dataset.page ||
        "dashboard"
    };
  }


  /* =======================================================
     ROLE SYNCHRONIZATION
     ======================================================= */

  function synchronizeDemoRole() {
    const {
      role
    } = getPageContext();

    const currentUser =
      storage.getCurrentUser();

    if (
      role &&
      currentUser?.role !== role
    ) {
      storage.setDemoRole(role);
    }

    return storage.getCurrentUser();
  }


  /* =======================================================
     DEMO MODE INDICATOR
     ======================================================= */

  function exposeDemoState() {
    document.documentElement.dataset.demo =
      config.demoMode
        ? "true"
        : "false";
  }


  /* =======================================================
     PAGE EVENTS
     ======================================================= */

  function dispatchReadyEvent() {
    const context =
      getPageContext();

    const event =
      new CustomEvent(
        "agrolink:ready",
        {
          detail: {
            ...context,
            user:
              storage.getCurrentUser()
          }
        }
      );

    document.dispatchEvent(event);
  }


  /* =======================================================
     GLOBAL ERROR HANDLING
     Keep the demo from failing silently.
     ======================================================= */

  function installErrorHandlers() {
    window.addEventListener(
      "error",
      (event) => {
        console.error(
          "AgroLink runtime error:",
          event.error ||
          event.message
        );
      }
    );

    window.addEventListener(
      "unhandledrejection",
      (event) => {
        console.error(
          "AgroLink promise error:",
          event.reason
        );
      }
    );
  }


  /* =======================================================
     COMMON ACTIONS
     ======================================================= */

  function refreshShell() {
    components.renderAppShell();
  }


  function notify(
    message,
    options = {}
  ) {
    return components.showToast(
      message,
      options
    );
  }


  function resetDemo() {
    storage.resetDemoData();

    synchronizeDemoRole();

    refreshShell();

    return true;
  }


  /* =======================================================
     INITIALIZATION
     ======================================================= */

  function init() {
    if (!checkDependencies()) {
      return false;
    }

    exposeDemoState();

    synchronizeDemoRole();

    components.init();

    dispatchReadyEvent();

    document.documentElement.classList.add(
      "agrolink-ready"
    );

    return true;
  }


  /* =======================================================
     PUBLIC API
     ======================================================= */

  return {
    init,
    getPageContext,
    refreshShell,
    notify,
    resetDemo
  };
})();


window.AgroLinkApp =
  AgroLinkApp;


/* =========================================================
   AUTOMATIC STARTUP
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    AgroLinkApp.init();
  }
);