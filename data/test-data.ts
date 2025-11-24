/**
 * Test data for E2E tests
 * Centralize test data management here
 */

export const TestUsers = {
  validUser: {
    username: process.env.TEST_USERNAME || 'testuser',
    password: process.env.TEST_PASSWORD || 'testpass',
  },
  invalidUser: {
    username: 'invalid@example.com',
    password: 'wrongpassword',
  },
  adminUser: {
    username: 'admin@example.com',
    password: 'adminpass',
  },
};

export const TestUrls = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  profile: '/profile',
};

export const TestMessages = {
  loginSuccess: 'Login successful',
  loginFailed: 'Invalid credentials',
  requiredField: 'This field is required',
};

