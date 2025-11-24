import { z } from 'zod';

/**
 * Post Model with Zod Schema Validation
 * For JSONPlaceholder API
 */

// Zod Schema for Post
export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

// Zod Schema for Create Post Request
export const CreatePostSchema = z.object({
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});

// Zod Schema for Update Post Request
export const UpdatePostSchema = z.object({
  userId: z.number().optional(),
  title: z.string().optional(),
  body: z.string().optional(),
});

// Zod Schema for Post List Response
export const PostListSchema = z.array(PostSchema);

// TypeScript Types (inferred from Zod schemas)
export type Post = z.infer<typeof PostSchema>;
export type CreatePost = z.infer<typeof CreatePostSchema>;
export type UpdatePost = z.infer<typeof UpdatePostSchema>;
export type PostList = z.infer<typeof PostListSchema>;

