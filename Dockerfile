# Imagen base de Nginx Alpine (ligera)
FROM nginx:alpine

# Metadata
LABEL maintainer="yeipills <juanpablorosasmartin@gmail.com>"
LABEL description="CreceSW - Consultora de Marketing y Desarrollo"
LABEL version="1.0"

# Eliminar configuración por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar archivos del sitio web
COPY index.html /usr/share/nginx/html/
COPY favicon.svg /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY img/ /usr/share/nginx/html/img/

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
