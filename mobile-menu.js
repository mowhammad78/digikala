/* منوی همبرگری + آکاردئون مگامنو — فقط وقتی عرض ≤ 1100px فعاله */
(function () {
  var header = document.querySelector(".header");
  var toggle = document.querySelector(".menu-toggle");
  if (!header || !toggle) return;

  var mq = window.matchMedia("(max-width: 1100px)");
  var bottomCenter = header.querySelector(".header-bottom-center");

  var backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  header.appendChild(backdrop);

  var head = document.createElement("div");
  head.className = "nav-drawer-head";
  head.innerHTML =
    '<span>منو</span><button type="button" class="nav-close" aria-label="بستن منو">×</button>';
  if (bottomCenter) bottomCenter.insertBefore(head, bottomCenter.firstChild);

  function setOpen(open) {
    header.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) {
      header.querySelectorAll(".open").forEach(function (el) {
        el.classList.remove("open");
      });
    }
  }

  toggle.setAttribute("aria-expanded", "false");
  toggle.addEventListener("click", function () {
    setOpen(!header.classList.contains("nav-open"));
  });
  backdrop.addEventListener("click", function () { setOpen(false); });
  head.querySelector(".nav-close").addEventListener("click", function () { setOpen(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  // «دسته بندی کالا» → باز/بسته شدن لیست دسته‌ها
  var mega = header.querySelector(".has-megamenu");
  if (mega) {
    mega.querySelector(":scope > .navbar-link").addEventListener("click", function (e) {
      if (!mq.matches) return;
      e.preventDefault();
      mega.classList.toggle("open");
    });
  }

  // هر دسته → باز شدن زیرمجموعه‌هاش (فقط یکی همزمان)
  header.querySelectorAll(".submenu-right-item > .submenu-right-link").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (!mq.matches) return;
      e.preventDefault();
      var item = link.parentElement;
      var willOpen = !item.classList.contains("open");
      header.querySelectorAll(".submenu-right-item.open").forEach(function (el) {
        el.classList.remove("open");
      });
      if (willOpen) item.classList.add("open");
    });
  });

  // اگه کاربر پنجره رو بزرگ کرد، همه‌چی ریست بشه
  function onChange() { if (!mq.matches) setOpen(false); }
  if (mq.addEventListener) mq.addEventListener("change", onChange);
  else mq.addListener(onChange);
})();
