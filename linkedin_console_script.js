(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const jobsData = [];

  function toAbsLinkedInUrl(href) {
    if (!href) return null;
    if (href.startsWith("http")) return href;
    if (href.startsWith("/")) return `https://www.linkedin.com${href}`;
    return href;
  }

  async function waitForNewJob(prevTitle, timeout = 10000) {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      const title = document
          .querySelector(".jobs-search__job-details--wrapper h1")
          ?.innerText?.trim();

      if (title && title !== prevTitle) {
        return title;
      }

      await sleep(300);
    }

    return null;
  }

  // 🔥 NUEVO: extraer location de forma robusta
  function extractLocation() {
    return (
        document.querySelector(".jobs-unified-top-card__bullet")?.innerText?.trim() ||
        document.querySelector(".jobs-unified-top-card__primary-description-container")?.innerText?.trim() ||
        document.querySelector(".jobs-search__job-details--wrapper .tvm__text")?.innerText?.trim() ||
        ""
    );
  }

  const items = Array.from(
      document.querySelectorAll("div.scaffold-layout__list ul li.ember-view")
  );

  if (!items.length) {
    console.error("❌ No se encontraron jobs");
    return;
  }

  console.log(`👉 ${items.length} jobs encontrados`);

  let lastTitle = "";

  for (let i = 0; i < items.length; i++) {
    const el = items[i];

    el.scrollIntoView({ block: "center" });

    const link = el.querySelector('a[href*="/jobs/view"]');
    const url = toAbsLinkedInUrl(link?.getAttribute("href"));

    const clickable =
        el.querySelector(".job-card-container") ||
        el.querySelector(".artdeco-entity-lockup__title") ||
        el;

    clickable.click();

    const newTitle = await waitForNewJob(lastTitle);

    if (!newTitle) {
      console.warn("⚠️ No cargó job");
      continue;
    }

    lastTitle = newTitle;

    const content =
        document.querySelector(".jobs-description__container")?.innerText ||
        document.querySelector(".jobs-description-content__text")?.innerText ||
        "";

    const location = extractLocation();

    jobsData.push({
      url,
      title: newTitle,
      location,
      content
    });

    console.log(`✅ Guardado: ${newTitle} | 📍 ${location}`);

    await sleep(1200);
  }

  console.log("\n🎯 DONE");
  window.jobsData = jobsData;

  // Luego de ejecutar el Script, copiar esto en la consola
  // copy(JSON.stringify(window.jobsData));
})();