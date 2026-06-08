
# Skepsis Apps - landing corporativa ajustada

Esta versión incorpora:
- Reenfoque corporativo para Skepsis Apps.
- Integración del logo en `assets/images/skepsis-logo.png`.
- Hero empresarial más compacto.
- Secciones de servicios, portafolio, metodología y contacto.
- Conservación del render dinámico desde `projects.json` mediante `app.js`.

## Ejecución local
```bash
python -m http.server 8000
```

Abrir:
`http://localhost:8000`


## Portafolios iniciales v6

- OpenLogi RFID IoT ML
- RetailOps BI ML

Para agregar nuevos casos, editar `projects.json` manteniendo la misma estructura.


## Diseños visuales

Cada proyecto puede incluir el campo `designImage` en `projects.json` para abrir una imagen de diseño desde el botón **Diseño** sin reemplazar la arquitectura tecnológica.

