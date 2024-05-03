# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# clean install & omit the dev dependencies
RUN npm ci --omit=dev

# Copy the rest of the project files to the working directory
COPY . .

# Expose a port (if your Node.js app listens on a specific port)
EXPOSE 5000

# Define the command to run your Node.js app
CMD [ "npm", "start" ]