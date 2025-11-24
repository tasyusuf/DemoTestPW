import { test, expect } from '@playwright/test';

/**
 * API Testing Example
 * Demonstrates how to perform API tests with Playwright
 */

test.describe('API Tests', () => {
  
  test('should perform GET request', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('title');
  });

  test('should perform POST request', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'Test Post',
        body: 'This is a test post',
        userId: 1,
      },
    });
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    
    const data = await response.json();
    expect(data.title).toBe('Test Post');
  });

  test('should validate response schema', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    
    expect(response.ok()).toBeTruthy();
    
    const user = await response.json();
    
    // Validate response structure
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('address');
    expect(user.address).toHaveProperty('street');
    expect(user.address).toHaveProperty('city');
  });
});

