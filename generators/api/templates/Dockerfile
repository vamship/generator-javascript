FROM node:13.6-alpine

ARG APP_NAME
ARG APP_DESCRIPTION
ARG APP_VERSION
ARG CONFIG_FILE_NAME
ARG BUILD_TIMESTAMP

# Metadata
LABEL org.label-schema.name=$APP_NAME \
      org.label-schema.description=$APP_DESCRIPTION \
      org.label-schema.version=$APP_VERSION \
      org.label-schema.build-date=$BUILD_TIMESTAMP \
      org.label-schema.vcs-url="https://<%= gitUrl %>" \
<% if(dockerCustomRegistry) { -%>
      org.label-schema.url= "<%= dockerCustomRegistry %>/<%= projectNamespacedName.replace(/^@/, '') %>"
<% } else { -%>
      org.label-schema.url="https://hub.docker.com/r/<%= projectNamespacedName.replace(/^@/, '') %>"
<% } -%>

RUN mkdir -p app/logs

COPY src app/src
COPY ${CONFIG_FILE_NAME} app/${CONFIG_FILE_NAME}
COPY package.json app/package.json
COPY package-lock.json app/package-lock.json

WORKDIR app

ENV NODE_ENV=production
RUN ["npm", "install"]

CMD ["npm", "start"]
