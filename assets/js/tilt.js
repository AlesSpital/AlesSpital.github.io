(() => {
  const selectors = [
    ".tilt-card",
    ".portfolio-card",
    ".resume-item",
    ".contact-card",
    ".about-card",
    ".about-panel",
    ".about-item"
  ];
  const candidates = Array.from(document.querySelectorAll(selectors.join(",")));
  const cards = candidates.filter((el) => !candidates.some((other) => other !== el && other.contains(el)));
  if (!cards.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const maxTilt = 6;
  const perspective = 900;

  cards.forEach((card) => {
    card.classList.add("tilt-card");
    let rect = null;

    const handleMove = (event) => {
      if (event.pointerType === "touch") return;
      if (!rect) rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotateY = ((x - midX) / midX) * maxTilt;
      const rotateX = -((y - midY) / midY) * maxTilt;
      card.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    };

    const handleEnter = () => {
      rect = card.getBoundingClientRect();
      card.classList.add("is-tilting");
    };

    const handleLeave = () => {
      rect = null;
      card.classList.remove("is-tilting");
      card.style.transform = "";
    };

    card.addEventListener("pointerenter", handleEnter);
    card.addEventListener("pointermove", handleMove);
    card.addEventListener("pointerleave", handleLeave);
  });
})();
