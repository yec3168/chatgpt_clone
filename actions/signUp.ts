"use server";

import { getUserByEmail } from "@/data/user";
import db from "@/db";
import { user } from "@/db/schema";
import { SignUpSchema } from "@/schema/auth";
import * as bcrypt from 'bcrypt';
import { redirect } from "next/navigation";

/**
 *  param 1 : 이전 스테이트
 *  param 2 : 데이터
 * 
//  * 아래 함수는 이전스테이트를 사용하지 않기때문에 _표시 타입은 any로 지정.
 */
export const signUp = async (_:unknown, formData: FormData) =>{
    /**
     *  1. validation Fields 
        -필드의 유형성 검사를 진행.
     */
    const validateFields = SignUpSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

     if(!validateFields.success){
        return{
            errorMessage: "잘못된 입력값이 있습니다."
        };
     }

     //  2. 존재하는 사용자인지 검증
    const {name, email, password} = validateFields.data;


    try{
        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return{
                errorMessage:"이미 존재하는 사용자입니다."
            }
        }
        
        // 2-1. 비밀번호 암호화
        /**
         * hash(data: string | Buffer, saltOrRounds: string | number)
         * 
         * saltOrRounds: 연산 반복 횟수.(일반적으로 10을 많이 사용함.)
         */
        const hashedPassword = await bcrypt.hash(password, 10) 
    
         //  3. db에 회원정보를 저장.
        await db.insert(user).values({name, email, password:hashedPassword});
        

        // 3-1. redirect login
        redirect("/login")
    }catch(error){
        console.error("error ", error)
        return { errorMessage : "사용자 인증 중 문제가 발생하였습니다."} 
    }

   

     //  4. 성공/실패처리.
    

}