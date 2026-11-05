/* ============ مودال انتخاب آدرس ============ */
(function () {
  const modal = document.getElementById("addressModal");
  const openBtn = document.getElementById("openAddressModal");
  const closeBtn = document.getElementById("closeAddressModal");
  const submitBtn = document.getElementById("submitAddress");
  const label = document.getElementById("selectedAddressLabel");
  const input = document.getElementById("addrSearchInput");
  const map = document.getElementById("addrMap");

  if (!modal || !openBtn) return;

  const DEFAULT_LABEL = label.textContent.trim();

  const open = () => {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    openBtn.setAttribute("aria-expanded", "true");
    input.focus();
  };

  const close = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
    openBtn.setAttribute("aria-expanded", "false");
    openBtn.focus();
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);

  // کلیک روی پس‌زمینه‌ی تیره
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  // Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) close();
  });

  // ثبت موقعیت
  submitBtn.addEventListener("click", () => {
    label.textContent = input.value.trim() || "موقعیت انتخاب‌شده";
    close();
  });

  // Enter داخل جستجو = ثبت
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitBtn.click();
  });

  // جابه‌جایی نقشه‌ی نمایشی با درگ
  let drag = null;
  let bx = 0;
  let by = 0;

  map.addEventListener("pointerdown", (e) => {
    drag = { x: e.clientX, y: e.clientY, bx, by };
    map.classList.add("dragging");
    map.setPointerCapture(e.pointerId);
  });

  map.addEventListener("pointermove", (e) => {
    if (!drag) return;
    bx = drag.bx + e.clientX - drag.x;
    by = drag.by + e.clientY - drag.y;
    // هر ۶ لایه‌ی پس‌زمینه با هم حرکت می‌کنن
    map.style.backgroundPosition = `${bx}px ${by}px`;
  });

  ["pointerup", "pointercancel"].forEach((type) =>
    map.addEventListener(type, () => {
      drag = null;
      map.classList.remove("dragging");
    }),
  );
})();
