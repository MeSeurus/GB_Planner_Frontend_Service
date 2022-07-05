# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /gb_frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /gb_frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]