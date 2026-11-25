FROM nginxinc/nginx-unprivileged:1.27-alpine
USER root
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# The PaaS builder (Kaniko) ignores .dockerignore, so strip repo internals from the web root explicitly.
RUN rm -rf /usr/share/nginx/html/.git /usr/share/nginx/html/.gitignore /usr/share/nginx/html/.dockerignore /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/nginx.conf
USER 101
EXPOSE 8080
