FROM node:13.6-alpine

ARG APP_NAME
ARG APP_DESCRIPTION
ARG APP_VERSION
ARG BUILD_TIMESTAMP

# Metadata
LABEL org.label-schema.name=$APP_NAME \
      org.label-schema.description=$APP_DESCRIPTION \
      org.label-schema.version=$APP_VERSION \
      org.label-schema.build-date=$BUILD_TIMESTAMP \
      org.label-schema.vcs-url="https://<%= gitUrl %>" \
      org.label-schema.url="https://<%= dockerRepoHome %>"

RUN mkdir -p app/logs

COPY src app/src
COPY package.json app/package.json
COPY package-lock.json app/package-lock.json

WORKDIR app

ENV NODE_ENV=production
RUN ["npm", "install"]

CMD ["npm", "start"]
