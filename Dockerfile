## build environment
FROM node:14-alpine as react-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
# COPY ssl-nginx.crt /etc/ssl/certs/
# COPY ssl-nginx.key /etc/ssl/private/
COPY --from=react-build /frontend-diskominfo/build /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"