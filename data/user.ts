import db from "@/db";
import { user } from "@/db/schema";
import { User } from "@/types/db";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) : Promise<User| null | undefined> =>{
    try{
        const existingUser = await db.query.user.findFirst({
            where:eq(user.email, email)
        });

        if(!existingUser)
            return null
        
        return existingUser;
    }catch(error){
        console.log("user.ts ::     " ,error);
    }
};