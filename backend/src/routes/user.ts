import { SigninInput, signinInput, signupInput, SignupInput } from '@bkm1482004/medium-common';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono'
import { sign } from 'hono/jwt';

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string,
    }, 
}>();

userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
   
    try {

      const inputBody: SignupInput = await c.req.json();
      const parsedBody = signupInput.safeParse(inputBody);

      if (!parsedBody.success) {
        return c.json({
          message: "Incorrect inputs"
        })
      }

      const user = await prisma.user.create({
        data: {
          email: inputBody.email,
          password: inputBody.password,
          name: inputBody.name
        }
      });
  
      const token = await sign({userId: user.id}, c.env.JWT_SECRET)
      return c.json({
        token: token,
        username: user.name
      })  
    } catch(e) {
      c.status(403);
      return c.json({
        message: "error while logging in"
      })
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    const inputBody: SigninInput = await c.req.json();
    const parsedBody = signinInput.safeParse(inputBody);

    if (!parsedBody.success) {
      return c.json({
        message: "Incorrect inputs"
      })
    }
    const user = await prisma.user.findUnique({
      where: {
        email: inputBody.email, password: inputBody.password
      }
    })
  
    if (!user) {
      c.status(403);
      return c.json({
        error: "user not found"
      })
    }
  
    const jwt = await sign({userId: user.id}, c.env.JWT_SECRET);
    return c.json({
      token: jwt,
      username: user.name
    })
})