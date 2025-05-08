# 1. Use the official Node.js image
FROM node:18

# 2. Set the working directory
WORKDIR /app

# 3. Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of the app
COPY . .

# 5. Expose the port the app runs on
EXPOSE 5000

# 6. Command to run the app
CMD ["node", "index.js"]
