FROM nginx:alpine

COPY config-cache.conf /etc/nginx/conf.d/config-cache.conf

COPY index.html pricing.html docs.html privacy.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY assets/ /usr/share/nginx/html/assets/
COPY motion/ /usr/share/nginx/html/motion/

EXPOSE 80
