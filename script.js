(() => {
  const pages = [...document.querySelectorAll(".page")];
  const dots = [...document.querySelectorAll(".nav-dot")];
  const prev = document.getElementById("prevBtn");
  const next = document.getElementById("nextBtn");
  const currentNumber = document.getElementById("currentNumber");
  let current = 0;

  function showPage(index) {
    const target = Math.max(0, Math.min(pages.length - 1, index));
    current = target;
    pages.forEach((page, i) => {
      page.classList.toggle("active", i === current);
      page.setAttribute("aria-hidden", i === current ? "false" : "true");
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
      if (i === current) dot.setAttribute("aria-current", "page");
      else dot.removeAttribute("aria-current");
    });
    currentNumber.textContent = String(current + 1).padStart(2, "0");
    prev.disabled = current === 0;
    next.disabled = current === pages.length - 1;
    // Every new page starts at its top, including on mobile.
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector(".site-shell").scrollTo?.({ top: 0, behavior: "smooth" });
  }

  prev.addEventListener("click", () => showPage(current - 1));
  next.addEventListener("click", () => showPage(current + 1));
  document.querySelectorAll("[data-go]").forEach(control => {
    control.addEventListener("click", event => {
      const index = Number(event.currentTarget.dataset.go);
      if (Number.isInteger(index)) showPage(index);
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" && current < pages.length - 1) showPage(current + 1);
    if (event.key === "ArrowRight" && current > 0) showPage(current - 1);
  });

  showPage(0);
})();