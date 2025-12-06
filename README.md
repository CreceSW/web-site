# CreceSW - Consultora de Marketing y Desarrollo

Sitio web para CreceSW, una startup orientada a consultoría de marketing digital y desarrollo de software.

## Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos con variables CSS, flexbox, grid y animaciones
- **JavaScript** - Interactividad vanilla (ES6+)
- **Google Fonts** - Tipografía Inter

## Estructura del Proyecto

```
web-site/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos responsivos
├── js/
│   └── main.js         # JavaScript interactivo
├── img/                # Imágenes (vacío)
├── favicon.svg         # Icono del sitio
├── Dockerfile          # Configuración Docker
├── docker-compose.yml  # Orquestación de contenedores
└── README.md           # Este archivo
```

## Secciones

1. **Hero** - Presentación con propuesta de valor
2. **Servicios** - Desarrollo Web, Marketing Digital, Software, Analítica, Consultoría, Branding
3. **Nosotros** - Historia, visión y valores de startup emergente
4. **Capacidades** - Lo que podemos crear para ti
5. **Por qué elegirnos** - Propuesta de valor diferenciadora
6. **Contacto** - Formulario y datos de contacto

## Características

- Diseño responsivo (mobile-first)
- Navegación fija con efecto scroll
- Menú hamburguesa para móviles
- Contadores animados
- Animaciones de entrada con Intersection Observer
- Validación de formulario
- Notificaciones toast

## Ejecución Local

### Opción 1: Servidor simple

```bash
# Con Python 3
python -m http.server 8080

# Con Node.js (npx)
npx serve .

# Con PHP
php -S localhost:8080
```

Luego abre `http://localhost:8080` en tu navegador.

### Opción 2: Docker

```bash
# Construir y ejecutar
docker compose up -d

# O manualmente
docker build -t crecesw-web .
docker run -d -p 8080:80 crecesw-web
```

El sitio estará disponible en `http://localhost:8080`

### Detener Docker

```bash
docker compose down
```

## Personalización

### Colores

Los colores se pueden modificar en `css/styles.css` en las variables CSS:

```css
:root {
    --primary: #667eea;
    --secondary: #764ba2;
    --accent: #f093fb;
    /* ... */
}
```

### Contenido

Edita `index.html` para modificar:
- Textos y descripciones
- Información de contacto
- Servicios ofrecidos
- Testimonios

## Contacto

- **Email:** crecesw@proton.me
- **Teléfono:** +56 9 6903 0631
- **Ubicación:** Chile

## Licencia

© 2025 CreceSW. Todos los derechos reservados.
