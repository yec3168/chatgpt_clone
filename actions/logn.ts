"use server";

import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schema/auth";
import * as bcrypt from 'bcrypt';

export const login = async(_:unknown, formData:FormData) =>{
   
    // 1. validation check
    const validateFields = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

     if(!validateFields.success){
        return{
            errorMessage: "잘못된 입력값이 있습니다."
        };
     }
    // 2. db에서 회원정보가 존재하는지
    const {email, password} = validateFields.data;

    try{
        const existingUser = await getUserByEmail(email);
        if(!existingUser){
            return{
                errorMessage:"존재하지 않는 사용자입니다. 회원가입을 진행해주세요."
            }
        }

        const {id, name, password:userPassword} = existingUser;
        
        // 비밀번호 검증
        const passwordMatch = await bcrypt.compare(password, userPassword)

        if(!passwordMatch){
            return({
                errorMessage:"아이디혹은 비밀번호가 틀렸습니다."
            })
        }
    }catch(error){
        console.error("login error ", error)
        return ({
            errorMessage:"로그인에 실패하였습니다."
        });
    }
    // 3. 성공 / 실패처리.
}