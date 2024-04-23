import { createPostInput, CreatePostInput, updatePostInput, UpdatePostInput } from '@bkm1482004/medium-common';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono'
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string,
    }, 
    Variables: {
      userId: string
    }
}>();

blogRouter.get("/", (c) => {
    return c.text("hello")
})

blogRouter.use('/*', async (c, next) => {
    const token = c.req.header("Authorization");
    if (!token) {
      c.status(401);
      return c.text("unauthorized");
    }
  
    const jwt = token.split(" ")[1];
    const { userId } = await verify(jwt, c.env.JWT_SECRET);
    if (!userId) {
      c.status(401);
      return c.json({
        error: "unauthorized"
      })
    }
    c.set('userId', userId);
    await next();
})

blogRouter.post('/create', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    try {
        const userId = c.get('userId')

        const inputBody: CreatePostInput = await c.req.json();
        const parsedBody = createPostInput.safeParse(inputBody);

        if (!parsedBody.success) {
            return c.json({
                message: "Incorrect inputs"
            })
        }
    
        const post = await prisma.post.create({
            data: {
                title: inputBody.title,
                content: inputBody.content,
                authorId: userId
            }
        })
        
        return c.json({
            message: "post created successfully",
            id: post.id,
        })

    } catch(e) {
        return c.json({
            message: "Error inserting data",
            error: e
        })
    }
})
  
blogRouter.put('/update', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const userId = c.get('userId');
    const inputBody: UpdatePostInput = await c.req.json();
    const parsedBody = updatePostInput.safeParse(inputBody);

    if (!parsedBody.success) {
        return c.json({
            message: "Incorrect inputs"
        })
    }
    try {
        const post = await prisma.post.findFirst({
            where: {
                authorId: userId,
                id: inputBody.postId
            }
        })
        if (!post) {
            return c.json({
                message: "Post not found!"
            })
        }

        const response = await prisma.post.update({
            where: {
                id: inputBody.postId,
                authorId: userId
            },
            data: {
                title: inputBody.title,
                content: inputBody.content,
                authorId: userId,
            }
        })
        return c.json({
            message: `Updated post: ${response.id}`
        })
    } catch (e) {
        return c.json({
            message: "Error updating post",
            error: e
        })
    }
})

blogRouter.get("/bulk", async (c) => {
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const posts = await prisma.post.findMany({
            select: {
                title: true,
                content: true,
                date: true,
                author: {
                    select: {
                        name: true
                    }
                },
                id: true
            }
        });
        return c.json({
            posts: posts
        })
    } catch(e) {
        return c.json({
            message: "error fetching posts",
            error: e
        })
    } 
})

blogRouter.get('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const post = await prisma.post.findFirst({
            where: {id: c.req.param('id')},
            select: {
                title: true,
                content: true,
                date: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
    
        if (!post) {
            return c.json({
                message: "post not found"
            })
        }
        return c.json({
            post: post
        })
    } catch (e) {
        return c.json({
            message: "error fetching post",
            error: e
        })
    }  
})

