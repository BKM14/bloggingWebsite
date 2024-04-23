import { z } from 'zod'

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string()
});

export type SignupInput = z.infer<typeof signupInput>;

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string()
});

export type SigninInput = z.infer<typeof signinInput>;

export const createPostInput = z.object({
    title: z.string(),
    content: z.string()
});

export type CreatePostInput = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
    postId: z.string(),
    title: z.string(),
    content: z.string()
});

export type UpdatePostInput = z.infer<typeof updatePostInput>;
