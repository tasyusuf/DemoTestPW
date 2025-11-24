FROM mcr.microsoft.com/playwright:v1.56.1-jammy
WORKDIR /app
COPY package*.json ./

# Install dependencies
RUN npm ci
RUN npx playwright install chromium --with-deps
COPY . .
ENV CI=true
ENV NODE_ENV=test
RUN mkdir -p test-results playwright-report allure-results
CMD ["npm", "test"]

