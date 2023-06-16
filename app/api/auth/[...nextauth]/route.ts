import NextAuth, {Awaitable, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@/utils/database';
import User from '@/models/user';

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
      user: {
        /** The user's postal address. */
        id: string
        name: string
        email: string
      }
    }
  }

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        })
    ],
    callbacks: {
        async session({ session, token, user }):Promise<Session>{
            const sessionUser = await User.findOne({
                email: session?.user?.email
            })
    
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
        async signIn({profile}:any){
            try {
                //serverless
                await connectToDB();
    
                //check if a user already exist
                const userExists = await User.findOne({
                    email: profile.email
                })
                //if not, create a new user
                if(!userExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
    
                    })
                }
    
                return true;
                
            } catch (error) {
             console.log(error);
             return false
            }
        }
    }
   
});

export { handler as GET, handler as POST };