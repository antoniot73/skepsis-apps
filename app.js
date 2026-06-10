const PROJECTS_ENDPOINT = "./projects.json";

const REQUIRED_FIELDS = ["id", "title", "category", "summary", "description", "purpose"];

const state = {
  projects: [],
  activeCategory: "Todos",
  searchTerm: "",
  sortMode: "date-desc"
};

const elements = {
  navToggle: document.querySelector("#navToggle"),
  navLinks: document.querySelector("#navLinks"),
  grid: document.querySelector("#projectGrid"),
  categoryFilters: document.querySelector("#categoryFilters"),
  searchInput: document.querySelector("#searchInput"),
  sortSelect: document.querySelector("#sortSelect"),
  statusMessage: document.querySelector("#statusMessage"),
  currentYear: document.querySelector("#currentYear"),
  metricTotalProjects: document.querySelector("#metricTotalProjects"),
  metricPublishedApps: document.querySelector("#metricPublishedApps"),
  metricRepositories: document.querySelector("#metricRepositories"),
  metricArticles: document.querySelector("#metricArticles"),
  dialog: document.querySelector("#projectDialog"),
  dialogContent: document.querySelector("#dialogContent"),
  dialogCloseButton: document.querySelector("#dialogCloseButton")
};

/**
 * Registra eventos de ejecución en consola con marca temporal.
 *
 * @param {"INFO" | "WARN" | "ERROR"} level Nivel del evento.
 * @param {string} message Descripción del evento.
 * @returns {void}
 */
function logEvent(level, message) {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} | ${level} | ${message}`);
}

/**
 * Normaliza texto para búsquedas insensibles a mayúsculas y acentos.
 *
 * @param {string | undefined | null} value Texto de entrada.
 * @returns {string} Texto normalizado.
 */
function normalizeText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .normalize("NFD")
    .replaceAll(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

/**
 * Evalúa si una URL externa es segura para renderizarse como enlace.
 *
 * @param {string | undefined | null} value URL candidata.
 * @returns {boolean} Verdadero si es una URL http/https válida.
 */
function isValidExternalUrl(value) {
  if (typeof value !== "string" || value.trim() === "") {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch (error) {
    logEvent("WARN", `URL inválida omitida: ${value}`);
    return false;
  }
}

/**
 * Crea un elemento DOM con texto seguro.
 *
 * @param {string} tagName Nombre de etiqueta HTML.
 * @param {string} text Texto a insertar con textContent.
 * @param {string | undefined} className Clase CSS opcional.
 * @returns {HTMLElement} Elemento construido.
 */
function createTextElement(tagName, text, className = undefined) {
  const element = document.createElement(tagName);
  element.textContent = text;

  if (className) {
    element.className = className;
  }

  return element;
}

/**
 * Valida un proyecto individual.
 *
 * @param {object} project Proyecto leído desde JSON.
 * @param {number} index Índice del proyecto en el arreglo.
 * @returns {boolean} Verdadero si el proyecto cumple la estructura mínima.
 * @throws {Error} Lanza error cuando falta un campo requerido.
 */
function validateProject(project, index) {
  if (typeof project !== "object" || project === null || Array.isArray(project)) {
    throw new Error(`El proyecto en posición ${index} debe ser un objeto JSON.`);
  }

  for (const field of REQUIRED_FIELDS) {
    if (typeof project[field] !== "string" || project[field].trim() === "") {
      throw new Error(`El proyecto en posición ${index} no tiene el campo requerido: ${field}.`);
    }
  }

  if (!Array.isArray(project.features)) {
    throw new Error(`El proyecto "${project.title}" debe incluir features como lista.`);
  }

  if (!Array.isArray(project.techStack)) {
    throw new Error(`El proyecto "${project.title}" debe incluir techStack como lista.`);
  }

  return true;
}

/**
 * Valida la colección completa de proyectos.
 *
 * @param {Array<object>} projects Lista de proyectos.
 * @returns {boolean} Verdadero si la colección es válida.
 * @throws {Error} Lanza error si la colección no es válida.
 */
function validateProjects(projects) {
  if (!Array.isArray(projects)) {
    throw new Error("projects.json debe contener una lista de proyectos.");
  }

  const ids = new Set();

  for (let index = 0; index < projects.length; index += 1) {
    const project = projects[index];
    validateProject(project, index);

    if (ids.has(project.id)) {
      throw new Error(`ID duplicado en projects.json: ${project.id}.`);
    }

    ids.add(project.id);
  }

  return true;
}

/**
 * Carga proyectos desde el archivo JSON.
 *
 * @returns {Promise<Array<object>>} Lista de proyectos cargada.
 */
async function loadProjects() {
  try {
    const response = await fetch(PROJECTS_ENDPOINT, { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`No se pudo cargar ${PROJECTS_ENDPOINT}. HTTP ${response.status}.`);
    }

    const projects = await response.json();
    validateProjects(projects);
    logEvent("INFO", `Proyectos cargados correctamente: ${projects.length}`);
    return projects;
  } catch (error) {
    logEvent("ERROR", error.message);
    showStatus("No fue posible cargar projects.json. Revisa formato JSON y rutas.", true);
    return [];
  }
}

/**
 * Muestra mensajes operativos en pantalla.
 *
 * @param {string} message Mensaje visible.
 * @param {boolean} isError Indica si el mensaje representa error.
 * @returns {void}
 */
function showStatus(message, isError = false) {
  elements.statusMessage.textContent = message;
  elements.statusMessage.classList.toggle("error", isError);
}

/**
 * Obtiene valores únicos de una propiedad textual.
 *
 * @param {Array<object>} projects Lista de proyectos.
 * @param {string} key Propiedad a extraer.
 * @returns {Array<string>} Valores únicos ordenados.
 */
function getUniqueValues(projects, key) {
  const values = new Set(["Todos"]);

  for (const project of projects) {
    if (typeof project[key] === "string" && project[key].trim() !== "") {
      values.add(project[key]);
    }
  }

  return Array.from(values).sort((a, b) => {
    if (a === "Todos") {
      return -1;
    }

    if (b === "Todos") {
      return 1;
    }

    return a.localeCompare(b, "es");
  });
}

/**
 * Renderiza botones de filtro reutilizables.
 *
 * @param {HTMLElement} container Contenedor DOM.
 * @param {Array<string>} values Valores de filtro.
 * @param {string} activeValue Valor activo.
 * @param {(value: string) => void} onSelect Callback al seleccionar.
 * @returns {void}
 */
function renderFilterButtons(container, values, activeValue, onSelect) {
  container.textContent = "";

  for (const value of values) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-button${value === activeValue ? " active" : ""}`;
    button.textContent = value;
    button.setAttribute("aria-pressed", value === activeValue ? "true" : "false");

    button.addEventListener("click", () => {
      onSelect(value);
    });

    container.appendChild(button);
  }
}

/**
 * Renderiza filtros de categoría.
 *
 * @returns {void}
 */
function renderFilters() {
  const categories = getUniqueValues(state.projects, "category");

  renderFilterButtons(elements.categoryFilters, categories, state.activeCategory, (value) => {
    state.activeCategory = value;
    renderFilters();
    renderProjects();
  });
}

/**
 * Calcula métricas de alto nivel para el portafolio.
 *
 * @param {Array<object>} projects Lista de proyectos.
 * @returns {{ total: number, apps: number, repositories: number, articles: number }} Métricas.
 */
function calculateMetrics(projects) {
  const metrics = {
    total: projects.length,
    apps: 0,
    repositories: 0,
    articles: 0
  };

  for (const project of projects) {
    if (isValidExternalUrl(project.appUrl)) {
      metrics.apps += 1;
    }

    if (isValidExternalUrl(project.githubUrl)) {
      metrics.repositories += 1;
    }

    if (isValidExternalUrl(project.linkedinUrl)) {
      metrics.articles += 1;
    }
  }

  return metrics;
}

/**
 * Renderiza indicadores principales.
 *
 * @returns {void}
 */
function renderMetrics() {
  const metrics = calculateMetrics(state.projects);
  elements.metricTotalProjects.textContent = String(metrics.total);
  elements.metricPublishedApps.textContent = String(metrics.apps);
  elements.metricRepositories.textContent = String(metrics.repositories);
  elements.metricArticles.textContent = String(metrics.articles);
}

/**
 * Evalúa si un proyecto cumple la búsqueda y filtros activos.
 *
 * @param {object} project Proyecto individual.
 * @returns {boolean} Verdadero si debe mostrarse.
 */
function matchesFilters(project) {
  const categoryMatches = state.activeCategory === "Todos" || project.category === state.activeCategory;

  const searchable = [
    project.title,
    project.category,
    project.summary,
    project.description,
    project.purpose,
    project.outcome,
    ...(Array.isArray(project.features) ? project.features : []),
    ...(Array.isArray(project.techStack) ? project.techStack : [])
  ].join(" ");

  const searchMatches = state.searchTerm === "" || normalizeText(searchable).includes(normalizeText(state.searchTerm));

  return categoryMatches && searchMatches;
}

/**
 * Ordena proyectos de acuerdo con la preferencia activa.
 *
 * @param {Array<object>} projects Lista de proyectos filtrada.
 * @returns {Array<object>} Nueva lista ordenada.
 */
function sortProjects(projects) {
  const sortedProjects = [...projects];

  sortedProjects.sort((a, b) => {
    if (state.sortMode === "title-asc") {
      return a.title.localeCompare(b.title, "es");
    }

    if (state.sortMode === "title-desc") {
      return b.title.localeCompare(a.title, "es");
    }

    const dateA = Date.parse(a.date || "1900-01-01");
    const dateB = Date.parse(b.date || "1900-01-01");

    if (state.sortMode === "date-asc") {
      return dateA - dateB;
    }

    return dateB - dateA;
  });

  return sortedProjects;
}

/**
 * Agrega chips del stack tecnológico.
 *
 * @param {HTMLElement} container Contenedor destino.
 * @param {Array<string>} techStack Tecnologías del proyecto.
 * @returns {void}
 */
function appendTechStack(container, techStack) {
  const stack = document.createElement("div");
  stack.className = "stack";

  for (const tech of techStack.slice(0, 6)) {
    stack.appendChild(createTextElement("span", tech));
  }

  container.appendChild(stack);
}

/**
 * Agrega un enlace externo si existe y es válido.
 *
 * @param {HTMLElement} container Contenedor destino.
 * @param {string} label Texto visible.
 * @param {string | undefined | null} url URL externa.
 * @param {boolean} isPrimary Estilo principal.
 * @returns {void}
 */
function appendExternalLink(container, label, url, isPrimary = false) {
  if (!isValidExternalUrl(url)) {
    return;
  }

  const link = document.createElement("a");
  link.className = `action-link${isPrimary ? " primary-link" : ""}`;
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = label;
  container.appendChild(link);
}

/**
 * Agrega un enlace interno hacia un recurso del sitio, como una imagen de diseño.
 *
 * @param {HTMLElement} container Contenedor destino.
 * @param {string} label Texto visible del enlace.
 * @param {string | undefined | null} path Ruta relativa del recurso.
 * @returns {void}
 */
function appendAssetLink(container, label, path) {
  if (typeof path !== "string" || path.trim() === "") {
    return;
  }

  const isUnsafePath = path.startsWith("javascript:") || path.startsWith("data:");
  if (isUnsafePath) {
    logEvent("WARN", `Ruta interna inválida omitida: ${path}`);
    return;
  }

  const link = document.createElement("a");
  link.className = "action-link";
  link.href = path;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = label;
  container.appendChild(link);
}


/**
 * Agrega enlaces adicionales declarados en el proyecto.
 *
 * @param {HTMLElement} container Contenedor destino.
 * @param {Array<object> | undefined | null} links Lista de enlaces {label, url}.
 * @returns {void}
 */
function appendExtraLinks(container, links) {
  if (!Array.isArray(links)) {
    return;
  }

  for (const linkItem of links) {
    if (typeof linkItem !== "object" || linkItem === null) {
      continue;
    }

    const label = typeof linkItem.label === "string" && linkItem.label.trim() !== ""
      ? linkItem.label.trim()
      : "Enlace";

    appendExternalLink(container, label, linkItem.url);
  }
}

/**
 * Abre una vista ampliada de una imagen interna del portafolio.
 *
 * @param {string | undefined | null} source Ruta relativa de la imagen.
 * @param {string} title Título descriptivo de la imagen.
 * @returns {void}
 */
function openImageZoom(source, title) {
  if (typeof source !== "string" || source.trim() === "") {
    return;
  }

  const isUnsafePath = source.startsWith("javascript:") || source.startsWith("data:");
  if (isUnsafePath) {
    logEvent("WARN", `Ruta de imagen inválida omitida: ${source}`);
    return;
  }

  const previousOverlay = document.querySelector(".image-zoom-overlay");
  if (previousOverlay) {
    previousOverlay.remove();
  }

  const overlay = document.createElement("div");
  overlay.className = "image-zoom-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", `Vista ampliada: ${title}`);

  const panel = document.createElement("div");
  panel.className = "image-zoom-panel";

  const header = document.createElement("div");
  header.className = "image-zoom-header";
  header.appendChild(createTextElement("h3", title));

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "image-zoom-close";
  closeButton.setAttribute("aria-label", "Cerrar zoom");
  closeButton.textContent = "×";

  const image = document.createElement("img");
  image.className = "image-zoom-img";
  image.src = source;
  image.alt = title;

  header.appendChild(closeButton);
  panel.appendChild(header);
  panel.appendChild(image);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);
  document.body.classList.add("image-zoom-open");

  const closeZoom = () => {
    overlay.remove();
    document.body.classList.remove("image-zoom-open");
  };

  closeButton.addEventListener("click", closeZoom);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeZoom();
    }
  });

  document.addEventListener("keydown", function handleZoomEscape(event) {
    if (event.key === "Escape" && document.body.contains(overlay)) {
      closeZoom();
      document.removeEventListener("keydown", handleZoomEscape);
    }
  });
}

/**
 * Agrega comportamiento de zoom a una imagen o contenedor visual.
 *
 * @param {HTMLElement} target Elemento clicable.
 * @param {string | undefined | null} source Ruta relativa de la imagen.
 * @param {string} title Título descriptivo.
 * @returns {void}
 */
function enableImageZoom(target, source, title) {
  if (typeof source !== "string" || source.trim() === "") {
    return;
  }

  target.classList.add("zoomable-image");
  target.setAttribute("role", "button");
  target.setAttribute("tabindex", "0");
  target.setAttribute("aria-label", `Ampliar ${title}`);

  target.addEventListener("click", () => openImageZoom(source, title));
  target.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openImageZoom(source, title);
    }
  });
}

/**
 * Construye tarjeta visual para un proyecto.
 *
 * @param {object} project Proyecto individual.
 * @returns {HTMLElement} Tarjeta renderizada.
 */
function buildProjectCard(project) {
  const card = document.createElement("article");
  card.className = "card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "card-image-wrap";

  const image = document.createElement("img");
  image.className = "card-image";
  image.src = project.architectureImage || "assets/images/placeholder-project.svg";
  image.alt = `Arquitectura tecnológica del proyecto ${project.title}`;
  image.loading = "lazy";
  image.onerror = () => {
    image.src = "assets/images/placeholder-project.svg";
  };

  const zoomHint = document.createElement("span");
  zoomHint.className = "zoom-hint";
  zoomHint.textContent = "Click para ampliar";
  imageWrap.appendChild(image);
  imageWrap.appendChild(zoomHint);
  enableImageZoom(imageWrap, image.src, `Arquitectura tecnológica de ${project.title}`);
  card.appendChild(imageWrap);

  const body = document.createElement("div");
  body.className = "card-body";

  const meta = document.createElement("div");
  meta.className = "card-meta";
  meta.appendChild(createTextElement("span", project.category || "Proyecto", "badge"));
  body.appendChild(meta);

  body.appendChild(createTextElement("h3", project.title));
  body.appendChild(createTextElement("p", project.summary, "card-summary"));

  appendTechStack(body, Array.isArray(project.techStack) ? project.techStack : []);

  const actions = document.createElement("div");
  actions.className = "card-actions";

  appendExternalLink(actions, "App", project.appUrl, true);
  appendExtraLinks(actions, project.extraLinks);
  appendExternalLink(actions, "GitHub", project.githubUrl);
  appendExternalLink(actions, "Dataset", project.datasetUrl);
  appendExternalLink(actions, "Artículo", project.linkedinUrl);
  appendAssetLink(actions, "Diseño", project.designImage);

  const detailsButton = document.createElement("button");
  detailsButton.type = "button";
  detailsButton.className = "details-button";
  detailsButton.textContent = "Ver resumen";
  detailsButton.addEventListener("click", () => openProjectDialog(project));

  actions.appendChild(detailsButton);
  body.appendChild(actions);
  card.appendChild(body);

  return card;
}

/**
 * Renderiza estado vacío cuando no hay resultados.
 *
 * @returns {HTMLElement} Elemento de estado vacío.
 */
function buildEmptyState() {
  const empty = document.createElement("div");
  empty.className = "empty-state";
  empty.appendChild(createTextElement("h3", "No hay proyectos con estos filtros"));
  empty.appendChild(createTextElement("p", "Ajusta la búsqueda, cambia la categoría o agrega nuevos proyectos en projects.json."));
  return empty;
}

/**
 * Renderiza proyectos en la grilla.
 *
 * @returns {void}
 */
function renderProjects() {
  const filtered = sortProjects(state.projects.filter(matchesFilters));
  elements.grid.textContent = "";

  if (filtered.length === 0) {
    elements.grid.appendChild(buildEmptyState());
    showStatus("No se encontraron proyectos con los filtros actuales.");
    return;
  }

  for (const project of filtered) {
    elements.grid.appendChild(buildProjectCard(project));
  }

  showStatus(`Mostrando ${filtered.length} de ${state.projects.length} proyecto(s).`);
}

/**
 * Crea lista HTML de funcionalidades.
 *
 * @param {Array<string>} features Lista de funcionalidades.
 * @returns {HTMLElement} Lista construida.
 */
function buildFeatureList(features) {
  const list = document.createElement("ul");
  list.className = "feature-list";

  for (const feature of features) {
    list.appendChild(createTextElement("li", feature));
  }

  return list;
}

/**
 * Construye una sección del diálogo de detalle.
 *
 * @param {string} title Título de sección.
 * @param {string | HTMLElement} content Contenido textual o nodo.
 * @returns {HTMLElement} Sección renderizada.
 */
function buildDialogSection(title, content) {
  const section = document.createElement("section");
  section.className = "dialog-section";
  section.appendChild(createTextElement("h3", title));

  if (typeof content === "string") {
    section.appendChild(createTextElement("p", content));
  } else {
    section.appendChild(content);
  }

  return section;
}

/**
 * Abre el modal de resumen ejecutivo del proyecto.
 *
 * @param {object} project Proyecto seleccionado.
 * @returns {void}
 */
function openProjectDialog(project) {
  elements.dialogContent.textContent = "";

  const layout = document.createElement("div");
  layout.className = "dialog-layout";

  const body = document.createElement("div");
  body.className = "dialog-body";

  body.appendChild(createTextElement("p", project.category, "eyebrow"));

  const title = createTextElement("h2", project.title);
  title.id = "dialogTitle";
  body.appendChild(title);

  body.appendChild(createTextElement("p", project.summary));

  body.appendChild(buildDialogSection("Propósito", project.purpose));
  body.appendChild(buildDialogSection("Descripción", project.description));

  const architectureFigure = document.createElement("figure");
  architectureFigure.className = "dialog-architecture";

  architectureFigure.appendChild(createTextElement("h3", "Arquitectura de integración tecnológica"));

  const image = document.createElement("img");
  image.className = "dialog-image";
  image.src = project.architectureImage || "assets/images/placeholder-project.svg";
  image.alt = `Arquitectura de integración tecnológica de ${project.title}`;
  image.loading = "lazy";
  image.onerror = () => {
    image.src = "assets/images/placeholder-project.svg";
  };

  enableImageZoom(image, image.src, `Arquitectura tecnológica de ${project.title}`);
  architectureFigure.appendChild(image);
  body.appendChild(architectureFigure);

  if (Array.isArray(project.features) && project.features.length > 0) {
    body.appendChild(buildDialogSection("Funcionalidades relevantes", buildFeatureList(project.features)));
  }

  if (project.outcome) {
    body.appendChild(buildDialogSection("Resultado / impacto", project.outcome));
  }

  const stackContainer = document.createElement("div");
  appendTechStack(stackContainer, Array.isArray(project.techStack) ? project.techStack : []);
  body.appendChild(buildDialogSection("Stack tecnológico", stackContainer));

  const linkList = document.createElement("div");
  linkList.className = "link-list";
  appendExternalLink(linkList, "Abrir app", project.appUrl, true);
  appendExtraLinks(linkList, project.extraLinks);
  appendExternalLink(linkList, "Repositorio GitHub", project.githubUrl);
  appendExternalLink(linkList, "Dataset", project.datasetUrl);
  appendExternalLink(linkList, "Artículo LinkedIn", project.linkedinUrl);
  appendAssetLink(linkList, "Diseño de la solución", project.designImage);

  if (linkList.children.length > 0) {
    body.appendChild(buildDialogSection("Evidencia pública", linkList));
  }

  layout.appendChild(body);
  elements.dialogContent.appendChild(layout);

  try {
    elements.dialog.showModal();
    document.body.classList.add("dialog-open");
  } catch (error) {
    logEvent("WARN", `No se pudo abrir dialog nativo: ${error.message}`);
    elements.dialog.setAttribute("open", "open");
    document.body.classList.add("dialog-open");
  }
}

/**
 * Cierra el modal de detalle.
 *
 * @returns {void}
 */
function closeProjectDialog() {
  try {
    elements.dialog.close();
  } catch (error) {
    elements.dialog.removeAttribute("open");
  }

  document.body.classList.remove("dialog-open");
}

/**
 * Inicializa eventos de interfaz.
 *
 * @returns {void}
 */
function initializeEvents() {
  elements.searchInput.addEventListener("input", (event) => {
    state.searchTerm = event.target.value;
    renderProjects();
  });

  elements.sortSelect.addEventListener("change", (event) => {
    state.sortMode = event.target.value;
    renderProjects();
  });

  elements.dialogCloseButton.addEventListener("click", closeProjectDialog);

  elements.dialog.addEventListener("click", (event) => {
    if (event.target === elements.dialog) {
      closeProjectDialog();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && elements.dialog.open) {
      closeProjectDialog();
    }
  });

  elements.navToggle.addEventListener("click", () => {
    const isOpen = elements.navLinks.classList.toggle("open");
    elements.navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  for (const link of elements.navLinks.querySelectorAll("a")) {
    link.addEventListener("click", () => {
      elements.navLinks.classList.remove("open");
      elements.navToggle.setAttribute("aria-expanded", "false");
    });
  }
}

/**
 * Función principal de ejecución de la landing.
 *
 * @returns {Promise<void>}
 */
async function main() {
  logEvent("INFO", "Inicializando landing page dinámica.");
  elements.currentYear.textContent = String(new Date().getFullYear());

  initializeEvents();

  state.projects = await loadProjects();

  renderMetrics();
  renderFilters();
  renderProjects();

  logEvent("INFO", "Landing page lista.");
}

main();
