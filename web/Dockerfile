# Use Node 22 (Active LTS), which is fully compatible with Angular 19
FROM node:22-alpine

WORKDIR /app

# Install the exact Angular CLI version you are using
RUN npm install -g @angular/cli@19.0.6

# Copy package management files first to leverage Docker layer caching
COPY package*.json ./
RUN npm install

# Copy the rest of your frontend code
COPY . .

EXPOSE 4200

# Run the dev server bound to all interfaces so Docker can expose it
CMD ["ng", "serve", "--host", "0.0.0.0"]