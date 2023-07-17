# base image
FROM node:18.12.1

# set working directory
WORKDIR /app
# install and cache app dependencies
COPY package.json /app/package.json
RUN yarn install
RUN yarn install -g @angular/cli@latest

# add app
COPY . /app

# start app
CMD ng serve --host 0.0.0.0