FROM mcr.microsoft.com/playwright:v1.56.1-jammy

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Install Playwright Chromium (ARM64 compatible)
RUN npx playwright install chromium --with-deps

# Copy project files
COPY . .

# Set environment variables
ENV CI=true
ENV NODE_ENV=test

# Create directories for outputs
RUN mkdir -p test-results playwright-report allure-results

# Run tests by default
CMD ["npm", "test"]

