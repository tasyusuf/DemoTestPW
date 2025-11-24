import { test as base } from '@playwright/test';
import { ApiClient } from '../api/api-client';
import { PostManager } from '../api/post-manager';
import { Post, CreatePost } from '../models/post.model';

/**
 * API Fixtures
 * Provides ApiClient and resource managers for API testing
 */

type ApiFixtures = {
  apiClient: ApiClient;
  postManager: PostManager;
  testPost: Post;
};

export const test = base.extend<ApiFixtures>({
  apiClient: async ({ request }, use) => {
    const client = new ApiClient(request, 'https://jsonplaceholder.typicode.com');
    await use(client);
  },

  postManager: async ({ apiClient }, use) => {
    const manager = new PostManager(apiClient);
    await use(manager);
  },

  // Test-scoped fixture: Create a fresh post for each test
  testPost: async ({ postManager }, use) => {
    // Setup: Create a test post for this specific test
    const postData: CreatePost = {
      userId: 1,
      title: 'Test Post',
      body: 'This post is created for each test and cleaned up after',
    };
    
    const createdPost = await postManager.create(postData);
    
    // Provide the post to the test
    await use(createdPost);
    
    // Teardown: Delete the created post after test completes
    await postManager.delete(createdPost.id);
  },
});

export { expect } from '@playwright/test';

