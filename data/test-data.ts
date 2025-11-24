/**
 * Test data for E2E tests
 * Centralize test data management here
 * 
 * For The Internet Herokuapp (https://the-internet.herokuapp.com/login)
 */

export const TestUsers = {
  validUser: {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
  },
  invalidUser: {
    username: 'invaliduser',
    password: 'wrongpassword',
  },
  emptyCredentials: {
    username: '',
    password: '',
  },
};

export const TestUrls = {
  base: 'https://the-internet.herokuapp.com',
  login: 'https://the-internet.herokuapp.com/login',
  secure: 'https://the-internet.herokuapp.com/secure',
  logout: 'https://the-internet.herokuapp.com/logout',
};

export const TestMessages = {
  loginSuccess: 'You logged into a secure area!',
  loginFailed: 'Your username is invalid!',
  logoutSuccess: 'You logged out of the secure area!',
};

