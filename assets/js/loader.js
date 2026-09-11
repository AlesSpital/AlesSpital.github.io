(() => {
  const loader = document.getElementById("page-loader");
  if (!loader) return;

  document.body.classList.add("is-loading");

  const finish = () => {
    loader.classList.add("is-done");
    document.body.classList.remove("is-loading");
    window.setTimeout(() => loader.remove(), 220);
  };

  // Keep the visual transition brief; the portfolio should become usable immediately.
  if (document.readyState === "complete") {
    window.setTimeout(finish, 120);
  } else {
    window.addEventListener("load", () => window.setTimeout(finish, 120), { once: true });
    window.setTimeout(finish, 700);
  }
})();
