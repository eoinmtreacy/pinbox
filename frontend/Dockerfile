# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Make the app's port available to the outside world
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
