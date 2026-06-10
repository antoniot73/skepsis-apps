# Sképsis Apps — Landing Corporativa y Portafolio de Soluciones IA

Landing corporativa estática para **Sképsis Apps**, orientada a presentar servicios tecnológicos, metodología de trabajo y un portafolio dinámico de soluciones de inteligencia artificial, ciencia de datos, automatización, analítica, dashboards, APIs y prototipos funcionales.

El sitio está diseñado para desplegarse en **GitHub Pages** sin backend. Los proyectos del portafolio se administran desde `projects.json`, lo que permite agregar, editar o retirar casos sin modificar la estructura HTML principal.

---

## Estado del proyecto

- **Versión integral:** v13
- **Sitio objetivo:** `https://antoniot73.github.io/skepsis-apps/`
- **Repositorio:** `https://github.com/antoniot73/skepsis-apps`
- **Tipo de proyecto:** landing estática + portafolio dinámico
- **Despliegue recomendado:** GitHub Pages
- **Última actualización documental:** 2026-06-10

---

## Objetivo

Presentar a **Sképsis Apps** como una organización especializada en transformar datos, ideas y procesos en soluciones tecnológicas inteligentes, mediante una landing clara, minimalista y funcional que permita:

- Comunicar la propuesta de valor corporativa.
- Mostrar capacidades de IA aplicada, ciencia de datos, automatización y aplicaciones empresariales.
- Documentar portafolios técnicos con arquitectura, propósito, descripción, funcionalidades y enlaces.
- Exponer demos, repositorios, datasets, artículos y diseños visuales de cada proyecto.
- Facilitar contacto comercial mediante WhatsApp.

---

## Propuesta de valor

**Sképsis Apps transforma datos, ideas y procesos en soluciones tecnológicas inteligentes.**

La landing presenta servicios orientados a:

- Inteligencia artificial aplicada.
- Ciencia de datos.
- Automatización de procesos.
- Desarrollo de aplicaciones empresariales.
- Dashboards inteligentes.
- APIs predictivas.
- Modelos de Machine Learning.
- Flujos ETL.
- Prototipos funcionales.
- Arquitecturas cloud.
- Soluciones de análisis y visualización de datos.

---

## Tecnologías del sitio

Este repositorio no requiere framework de frontend ni proceso de build.

| Capa | Tecnología |
|---|---|
| Estructura | HTML5 |
| Estilos | CSS3 |
| Interactividad | JavaScript |
| Datos del portafolio | JSON |
| Hosting | GitHub Pages |
| Validación auxiliar | Python |
| Activos visuales | SVG, PNG |
| Control de versiones | Git + GitHub |

---

## Estructura del repositorio

```text
.
├── index.html
├── styles.css
├── app.js
├── projects.json
├── README.md
├── .nojekyll
├── assets/
│   ├── images/
│   │   ├── skepsis-logo.png
│   │   ├── favicon.svg
│   │   ├── og-image.svg
│   │   ├── hero-bg.svg
│   │   ├── placeholder-project.svg
│   │   └── profile-placeholder.svg
│   ├── architectures/
│   │   ├── openlogi-rfid-iot-ml-architecture.svg
│   │   ├── retailops-bi-ml-architecture.svg
│   │   ├── optiscada-ml-complete-architecture.svg
│   │   ├── ames-housing-streamlit-architecture.svg
│   │   ├── ames-housing-python-r-cloud-architecture.svg
│   │   ├── stockpredict-mvp-ml-architecture.svg
│   │   └── industrial-ai-prototype-architecture.svg
│   └── designs/
│       ├── OpenLogi_RFDI_IoT_ML.png
│       ├── retailops-bi-olist_ML.png
│       ├── OptiSCADA_ML_UPDATED.PNG
│       ├── Arquitectura Ames Housing Streamlit.PNG
│       ├── Arquitectura Ames Housing Render.PNG
│       ├── Arquitectura Stock Predict MVP ML.PNG
│       └── Industrial AI Prototype.PNG
└── tools/
    └── validate_projects.py
```

---

## Archivos principales

### `index.html`

Define la estructura de la landing:

- Navegación principal.
- Hero corporativo.
- Indicadores.
- Servicios.
- Metodología.
- Soluciones desarrolladas.
- Tecnologías principales.
- Valor diferencial.
- Portafolio dinámico.
- Contacto.

La sección de portafolio contiene los contenedores que `app.js` utiliza para renderizar proyectos desde `projects.json`.

### `styles.css`

Contiene el diseño visual del sitio:

- Layout responsivo.
- Tarjetas de servicios y portafolio.
- Modal de resumen.
- Visor ampliado de arquitectura.
- Botones.
- Etiquetas de tecnología.
- Secciones corporativas.
- Ajustes para evitar solapes en escritorio y móvil.

### `app.js`

Controla la lógica del sitio:

- Carga dinámica de `projects.json`.
- Renderizado de tarjetas de portafolio.
- Filtros por categoría y estado.
- Búsqueda de proyectos.
- Ordenamiento.
- Métricas dinámicas.
- Modal de resumen ejecutivo.
- Zoom de arquitectura al hacer clic.
- Botón **Diseño** como enlace separado hacia imagen PNG.
- Botones para App, GitHub, Dataset, Artículo y enlaces adicionales como SCADA, API o R Plumber.

### `projects.json`

Fuente principal de datos del portafolio. Cada objeto representa un proyecto y contiene información técnica, narrativa, visual y enlaces externos.

### `tools/validate_projects.py`

Script auxiliar para validar que `projects.json` sea un JSON correcto y que los proyectos mantengan una estructura mínima esperada.

---

## Portafolios incluidos

| Proyecto | Categoría | Estado | Enlaces |
|---|---|---|---|
| OpenLogi RFID IoT ML | Logística / IoT / Machine Learning | Publicado | [App](https://openlogi-rfid-iot-demo-ml.streamlit.app/), [GitHub](https://github.com/antoniot73/openlogi-rfid-iot-demo-ml), [Dataset](https://www.kaggle.com/datasets/shashwatwork/dataco-smart-supply-chain-for-big-data-analysis?resource=download), [Artículo](https://www.linkedin.com/posts/antonio-toro-vzla_datascience-machinelearning-logistics-activity-7469426033159553024-l7al), [Diseño](assets/designs/OpenLogi_RFDI_IoT_ML.png) |
| RetailOps BI ML | Retail / BI / Machine Learning | Publicado | [App](https://retailops-bi-ml.streamlit.app/), [GitHub](https://github.com/antoniot73/retailops-bi-ml), [Dataset](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce?phase=FinishSSORegistration), [Artículo](https://www.linkedin.com/posts/antonio-toro-vzla_dataanalytics-businessintelligence-machinelearning-activity-7469264507815661568-fIBA), [Diseño](assets/designs/retailops-bi-olist_ML.png) |
| OptiSCADA ML Complete | Industria 4.0 / IoT / Machine Learning | Publicado | [App](https://optiscada-ml.streamlit.app/), [GitHub](https://github.com/antoniot73/OptiSCADA_ML_Complete), [Artículo](https://www.linkedin.com/posts/antonio-toro-vzla_industria40-machinelearning-iot-activity-7466738871968538624-ApkT), [Diseño](assets/designs/OptiSCADA_ML_UPDATED.PNG) |
| Ames Housing Price Predictor | Inmobiliario / Machine Learning / Streamlit | Publicado | [App](https://ames-housing-predictor.streamlit.app/), [GitHub](https://github.com/antoniot73/ames_housing_streamlit_demo), [Dataset](https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques?utm_source=chatgpt.com), [Artículo](https://www.linkedin.com/posts/antonio-toro-vzla_machinelearning-datascience-artificialintelligence-activity-7466589186507218944-h92F), [Diseño](assets/designs/Arquitectura Ames Housing Streamlit.PNG) |
| Ames Housing Price Predictor (Python + R Cloud Edition) | Python + R / FastAPI / Machine Learning | Publicado | [App](https://ames-python-web-app.onrender.com/), [GitHub](https://github.com/antoniot73/ames-housing-price-predictor), [Dataset](https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques), [Artículo](https://www.linkedin.com/posts/antonio-toro-vzla_machinelearning-datascience-python-activity-7470498339340591104-lisB), [Diseño](assets/designs/Arquitectura Ames Housing Render.PNG) |
| StockPredict MVP | Inventarios / Demanda / Machine Learning | Publicado | [App](https://stockpredict-mvp-ml.streamlit.app/), [GitHub](https://github.com/antoniot73/stockpredict_mvp_ml), [Artículo](https://www.linkedin.com/posts/antonio-toro-vzla_artificialintelligence-machinelearning-datascience-activity-7466534727055966208-Uq2i), [Diseño](assets/designs/Arquitectura Stock Predict MVP ML.PNG) |
| Industrial AI Prototype | Industria 4.0 / FastAPI / Streamlit / ML | Publicado | [App](https://industrial-ai-dashboard-qqdn.onrender.com/), [GitHub](https://github.com/antoniot73/industrial-ai-prototype), [Artículo](https://www.linkedin.com/posts/antonio-toro-vzla_artificialintelligence-machinelearning-python-activity-7465641588292038656-CbZP), [Diseño](assets/designs/Industrial AI Prototype.PNG) |

---

## Resumen técnico de los portafolios

### 1. OpenLogi RFID IoT ML

Demo web end-to-end para convertir datos logísticos de e-commerce retail en una torre de control con trazabilidad RFID simulada, monitoreo IoT, inventario WMS sintético y predicción de riesgo de entrega tardía.

**Tecnologías:** Python, Streamlit, Pandas, scikit-learn, RFID simulado, IoT simulado, GitHub, Streamlit Cloud.

### 2. RetailOps BI ML

Solución analítica para transformar datos crudos de e-commerce en indicadores comerciales, análisis logístico, control de calidad y predicción de entregas tardías.

**Tecnologías:** Python, Streamlit, PostgreSQL, Neon, SQL, Pandas, scikit-learn, GitHub, Streamlit Cloud.

### 3. OptiSCADA ML Complete

Plataforma demostrativa de Industria 4.0 con SCADA virtual, telemetría IoT, MQTT, Machine Learning, optimización y retroalimentación inteligente.

**Tecnologías:** Node-RED, MQTT, HiveMQ Cloud, Python, Streamlit, Plotly, scikit-learn, Random Forest, Isolation Forest, Render, GitHub.

### 4. Ames Housing Price Predictor

Aplicación Streamlit 100 % Python para estimar precios inmobiliarios con Elastic Net Regression y exportación de historial de predicciones.

**Tecnologías:** Python, Streamlit, Pandas, NumPy, scikit-learn, Elastic Net, Matplotlib, OpenPyXL, CSV, GitHub, Streamlit Cloud.

### 5. Ames Housing Price Predictor — Python + R Cloud Edition

Arquitectura distribuida con FastAPI en Python y R Plumber para exponer un servicio analítico con modelo Elastic Net desarrollado con `glmnet`.

**Tecnologías:** Python, R, FastAPI, Jinja2, Pydantic, Plumber, glmnet, ggplot2, REST API, JSON, Docker, Render, GitHub.

### 6. StockPredict MVP

Sistema inteligente para gestión de inventarios, predicción de demanda, análisis ABC, punto de reorden, riesgo de quiebre y segmentación automática de SKU.

**Tecnologías:** Python, Streamlit, Pandas, NumPy, Plotly, Random Forest Regressor, K-Means Clustering, Statsmodels, Pytest, GitHub.

### 7. Industrial AI Prototype

Prototipo SCADA-like para monitoreo industrial en tiempo real, historian SQLite, API FastAPI, dashboard Streamlit y predicción de temperatura industrial con Machine Learning.

**Tecnologías:** Python, FastAPI, Streamlit, SQLite, scikit-learn, RandomForestRegressor, Docker, Render, GitHub.

---

## Modelo de datos de `projects.json`

Cada proyecto puede usar los siguientes campos:

```json
{
  "id": "identificador-unico",
  "title": "Nombre del proyecto",
  "category": "Categoría técnica",
  "status": "Publicado",
  "summary": "Resumen corto para tarjeta",
  "description": "Descripción extendida para modal",
  "purpose": "Propósito del proyecto",
  "features": [
    "Funcionalidad 1",
    "Funcionalidad 2"
  ],
  "architectureImage": "assets/architectures/archivo.svg",
  "designImage": "assets/designs/archivo.png",
  "techStack": [
    "Python",
    "Streamlit"
  ],
  "appUrl": "https://...",
  "githubUrl": "https://...",
  "datasetUrl": "https://...",
  "linkedinUrl": "https://...",
  "extraLinks": [
    {
      "label": "API",
      "url": "https://..."
    }
  ],
  "date": "YYYY-MM-DD",
  "outcome": "Resultado o impacto del proyecto",
  "articleTitle": "Título del artículo"
}
```

### Campos obligatorios recomendados

- `id`
- `title`
- `category`
- `status`
- `summary`
- `description`
- `purpose`
- `features`
- `architectureImage`
- `techStack`

### Campos opcionales

- `designImage`
- `appUrl`
- `githubUrl`
- `datasetUrl`
- `linkedinUrl`
- `extraLinks`
- `date`
- `outcome`
- `articleTitle`

---

## Cómo agregar un nuevo portafolio

1. Crear o guardar la imagen de arquitectura en:

```text
assets/architectures/
```

2. Guardar el diseño visual, si existe, en:

```text
assets/designs/
```

3. Agregar un nuevo objeto en `projects.json`.

4. Validar el JSON:

```powershell
py tools/validate_projects.py
```

5. Probar localmente:

```powershell
py -m http.server 8000
```

6. Abrir:

```text
http://localhost:8000/
```

7. Recargar con:

```text
Ctrl + F5
```

---

## Ejecución local

Desde PowerShell:

```powershell
cd "D:\DISCO C\Antonio Toro\Proyectos_IA\Proyecto_1_LP_Skepsis_Apps\LP_Skepsis_Apps"
py -m http.server 8000
```

Abrir en el navegador:

```text
http://localhost:8000/
```

Para forzar actualización de caché:

```text
Ctrl + F5
```

---

## Validación de portafolios

Ejecutar:

```powershell
py tools/validate_projects.py
```

Resultado esperado:

```text
projects.json es válido
```

Si el JSON tiene errores, revisar especialmente:

- Comas faltantes o sobrantes.
- Comillas mal cerradas.
- Rutas de imágenes incorrectas.
- Campos `features` o `techStack` que no sean listas.
- URLs vacías donde debería existir un enlace.

---

## Despliegue en GitHub Pages

### 1. Confirmar cambios

```powershell
git status
git add .
git commit -m "Actualizar landing integral de Skepsis Apps"
```

### 2. Subir al repositorio

```powershell
git push
```

### 3. Configurar GitHub Pages

En GitHub:

```text
Settings
→ Pages
→ Build and deployment
→ Source: Deploy from a branch
→ Branch: main
→ Folder: /root
→ Save
```

### 4. URL pública

```text
https://antoniot73.github.io/skepsis-apps/
```

---

## Reglas de mantenimiento

- No reemplazar `architectureImage` por `designImage`.
- La arquitectura se muestra en tarjeta y modal.
- El botón **Diseño** debe abrir la imagen PNG aparte.
- Mantener nombres de archivos consistentes con las rutas declaradas en `projects.json`.
- Evitar espacios problemáticos en nuevos archivos; si se usan espacios, deben coincidir exactamente en JSON.
- Validar siempre `projects.json` antes de subir a GitHub.
- Probar en local antes de hacer `git push`.
- Usar `Ctrl + F5` para evitar problemas de caché en navegador.
- Mantener `.nojekyll` para que GitHub Pages publique correctamente carpetas y archivos estáticos.

---

## Flujo de trabajo recomendado

```text
Editar contenido
     ↓
Actualizar projects.json
     ↓
Agregar imágenes en assets/
     ↓
Validar projects.json
     ↓
Probar localmente
     ↓
Commit en Git
     ↓
Push a GitHub
     ↓
Verificar GitHub Pages
```

---

## Contacto comercial configurado en la landing

La sección de contacto orienta al usuario a iniciar conversación por WhatsApp:

- México: `+52 55 6574 1576`
- Venezuela: `+58 424 403 55 99`

---

## Licencia y uso

Este repositorio corresponde a la landing corporativa y portafolio técnico de **Sképsis Apps**. Su contenido, identidad visual, textos, diseños y referencias de portafolio deben gestionarse conforme a los criterios internos del propietario del proyecto.

---

## Autoría

**Sképsis Apps**  
Soluciones tecnológicas inteligentes basadas en inteligencia artificial, ciencia de datos, automatización y desarrollo aplicado.

Portafolio técnico desarrollado y documentado por:

**Antonio Nicolás Toro González**
