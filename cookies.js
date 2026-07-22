/* InmoVox AI — Banner de cookies + Google Consent Mode v2
   Cumple RGPD/AEPD: Analytics no guarda cookies hasta que el usuario acepta,
   y "Rechazar" está a un solo clic, igual de accesible que "Aceptar". */
(function () {
  "use strict";

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }

  var KEY = "inmovox_cookie_consent";
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}

  function grant() {
    gtag("consent", "update", { analytics_storage: "granted" });
  }
  function deny() {
    gtag("consent", "update", { analytics_storage: "denied" });
  }
  function save(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  // Si ya hay decisión previa, la aplicamos y no mostramos el banner.
  if (stored === "granted") { grant(); return; }
  if (stored === "denied") { deny(); return; }

  function buildBanner() {
    var wrap = document.createElement("div");
    wrap.className = "cookie-banner";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-live", "polite");
    wrap.setAttribute("aria-label", "Aviso de cookies");
    wrap.innerHTML =
      '<div class="cookie-inner">' +
        '<div class="cookie-text">' +
          '<strong>Cuidamos tu experiencia 🍪</strong>' +
          '<span>Usamos cookies propias y de Google Analytics para entender qué te resulta útil y mejorar la web para ti. ' +
          'Nos ayuda muchísimo que las aceptes. Puedes cambiar de opinión cuando quieras.</span>' +
        '</div>' +
        '<div class="cookie-actions">' +
          '<button type="button" class="cookie-btn cookie-reject" id="cookieReject">Rechazar</button>' +
          '<button type="button" class="cookie-btn cookie-accept" id="cookieAccept">Aceptar y mejorar la web</button>' +
        '</div>' +
      '</div>';
    return wrap;
  }

  function show() {
    if (document.querySelector(".cookie-banner")) return;
    var banner = buildBanner();
    document.body.appendChild(banner);
    // pequeña animación de entrada
    requestAnimationFrame(function () { banner.classList.add("cookie-visible"); });

    function close(choice) {
      if (choice === "granted") { grant(); } else { deny(); }
      save(choice);
      banner.classList.remove("cookie-visible");
      setTimeout(function () { if (banner.parentNode) banner.parentNode.removeChild(banner); }, 300);
    }

    document.getElementById("cookieAccept").addEventListener("click", function () { close("granted"); });
    document.getElementById("cookieReject").addEventListener("click", function () { close("denied"); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", show);
  } else {
    show();
  }
})();
