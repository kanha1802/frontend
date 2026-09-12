FROM nginx:alpine

# Default backend private IP placeholder (overridden during docker run)
ENV BACKEND_PRIVATE_IP=10.0.2.194

# Copy NGINX template for runtime variable substitution
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy all static assets into NGINX web root
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
