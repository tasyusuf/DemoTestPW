import { test, expect } from '../../fixtures/api-fixtures';
import { CreatePost } from '../../models/post.model';

/**
 * API Tests for JSONPlaceholder
 * Demonstrates API Client, Manager pattern, and Zod validation
 */

test.describe('API Tests - Post Resource', () => {
  test('should create a new post', async ({ postManager }) => {
    const newPost: CreatePost = {
      userId: 1,
      title: 'Test Post from Playwright',
      body: 'This is a test post created by automated tests',
    };

    const createdPost = await postManager.create(newPost);

    // Verify created post (Zod already validated)
    expect(createdPost.id).toBeDefined();
    expect(createdPost.userId).toBe(newPost.userId);
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
  });
});
