FROM node:16.18

ENV PORT 3001

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install
RUN npm install -g env-cmd

# Copying source files
COPY . /usr/src/app

RUN npm run build:uat

# Building app
EXPOSE 3001

# Running the app
CMD "npm" "run" "start:uat"