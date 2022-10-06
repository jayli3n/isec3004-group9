FROM node:14.18.0

ENV DB_HOSTNAME='isec3004group9-db-build'

# set working directory
WORKDIR /app

# install app dependencies
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci

# Add source code
COPY ./ ./

# Build
CMD [ "npm", "run", "dev" ]
