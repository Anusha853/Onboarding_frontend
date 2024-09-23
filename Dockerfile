# Set base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app
RUN npm run build

# Install a simple HTTP server to serve the static content
RUN npm install -g serve

# Expose port 3001 (to avoid conflict with frontend)
EXPOSE 3001

# Serve the app
CMD ["serve", "-s", "build"]
