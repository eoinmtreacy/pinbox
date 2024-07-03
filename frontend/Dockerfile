# Use the official Node.js 14 image as a base
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# React scripts run on port 3000 by default, expose it to the docker daemon
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]