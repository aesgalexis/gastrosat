# Gastrosat

Sitio web corporativo público de Gastrosat, empresa comercial especializada en asistencia técnica y equipamiento profesional para hostelería en Mallorca.

La web pública está disponible en [gastrosat.com](https://gastrosat.com/). El proyecto es una aplicación estática desarrollada con HTML, CSS y JavaScript, y se publica mediante GitHub Pages utilizando un dominio personalizado.

## Estructura

- `index.html`, `servicios.html`, `financiacion.html`, `contacto.html` y `privacidad.html`: páginas públicas.
- `assets/css/`: hoja de estilos pública.
- `assets/img/brand/`: logotipo de Gastrosat.
- `assets/img/providers/`: logotipos de proveedores.
- `assets/icons/`: favicons y manifest.
- `CNAME`, `robots.txt` y `sitemap.xml`: configuración pública del sitio.

## Ejecución local

Desde la raíz del repositorio:

```bash
python -m http.server 8080
```

Después, abre <http://localhost:8080/> en el navegador.

## Publicación

La rama `main` se publica mediante GitHub Pages. El archivo `CNAME` conserva el dominio personalizado `gastrosat.com`.

## Derechos de uso

El código se publica para facilitar la transparencia del sitio, pero este repositorio no concede permiso de reutilización comercial. La marca, el logotipo, los textos, el diseño, los activos comerciales, el contenido y la identidad visual de Gastrosat están protegidos y no pueden copiarse, redistribuirse ni explotarse sin autorización expresa.
