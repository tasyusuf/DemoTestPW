/**
 * Test data for E2E tests
 * Keep test data minimal and focused
 * 
 * For The Internet Herokuapp (https://the-internet.herokuapp.com/login)
 */

export const BASE_URL = 'https://the-internet.herokuapp.com';

export const TestUsers = {
  validUser: {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
  },
  invalidUser: {
    username: 'invaliduser',
    password: 'wrongpassword',
  },
};

