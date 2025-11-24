import { ApiClient } from './api-client';
import { Post, CreatePost, UpdatePost, PostSchema, PostListSchema, CreatePostSchema } from '../models/post.model';

/**
 * Post Manager - Handles all Post-related API operations
 * Provides CRUD operations with Zod validation
 */
export class PostManager {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Get all posts
   */
  async list(): Promise<Post[]> {
    const response = await this.client.get('/posts');
    const data = await response.json();
    
    // Validate response with Zod
    const validatedData = PostListSchema.parse(data);
    return validatedData;
  }

  /**
   * Get posts with query parameters
   */
  async listByUserId(userId: number): Promise<Post[]> {
    const response = await this.client.get('/posts', {
      params: { userId },
    });
    const data = await response.json();
    
    // Validate response with Zod
    const validatedData = PostListSchema.parse(data);
    return validatedData;
  }

  /**
   * Get a single post by ID
   */
  async getById(id: number): Promise<Post> {
    const response = await this.client.get(`/posts/${id}`);
    const data = await response.json();
    
    // Validate response with Zod
    const validatedData = PostSchema.parse(data);
    return validatedData;
  }

  /**
   * Create a new post
   */
  async create(postData: CreatePost): Promise<Post> {
    // Validate input data
    const validatedInput = CreatePostSchema.parse(postData);
    
    const response = await this.client.post('/posts', validatedInput);
    const data = await response.json();
    
    // Validate response with Zod
    const validatedData = PostSchema.parse(data);
    return validatedData;
  }

  /**
   * Update an existing post (full update)
   */
  async update(id: number, postData: CreatePost): Promise<Post> {
    // Validate input data
    const validatedInput = CreatePostSchema.parse(postData);
    
    const response = await this.client.put(`/posts/${id}`, validatedInput);
    const data = await response.json();
    
    // Validate response with Zod
    const validatedData = PostSchema.parse(data);
    return validatedData;
  }

  /**
   * Partially update an existing post
   */
  async partialUpdate(id: number, postData: UpdatePost): Promise<Post> {
    const response = await this.client.patch(`/posts/${id}`, postData);
    const data = await response.json();
    
    // Validate response with Zod
    const validatedData = PostSchema.parse(data);
    return validatedData;
  }

  /**
   * Delete a post
   */
  async delete(id: number): Promise<void> {
    await this.client.delete(`/posts/${id}`);
  }
}

