# LinkedIn Jobs Scraper + AI Matcher

Este flujo permite:
1. Extraer ofertas de trabajo desde LinkedIn
2. Limpiar la información (centrada en lo técnico)
3. Filtrar automáticamente con una Gema (Gemini o GPT personalizado)

---

## 🧩 Requisitos

- Navegador Chrome
- Estar logueado en LinkedIn
- Tener una **Gema (Gemini) o GPT personalizado** configurado con el prompt de matching

---

## 🚀 Uso paso a paso

### 1. Abrir LinkedIn Jobs

Ir a:
👉 https://www.linkedin.com/jobs/

Aplicar los filtros que quieras (posición, remoto, etc.)

---

### 2. Ejecutar el script

1. Abrir DevTools:
    - Mac: `Cmd + Option + J`
    - Windows: `Ctrl + Shift + J`

2. Ir a la pestaña **Console**

3. Pegar el script completo y ejecutar

---

### 3. Copiar los datos

Una vez termine el script, ejecutar en la consola:

```js
copy(JSON.stringify(window.jobsData));
```
👉 Esto copiará todos los trabajos procesados al portapapeles

### 4. Guardar archivo JSON

1. Abrir un editor (VSCode, Notepad, etc.)
2. Crear un archivo:

jobs.json

3. Pegar el contenido copiado
4. Guardar

---

### 5. Usar la Gema (Gemini / GPT)

1. Abrir tu Gema personalizada
2. Subir el archivo `jobs.json`  
   (o pegar el contenido directamente)
3. Ejecutar el prompt de matching

---

## 🎯 Resultado

La Gema devolverá:

```json
[
  "https://www.linkedin.com/jobs/view/123",
  "https://www.linkedin.com/jobs/view/456"
]