'use client'
import { ChangeEvent, useActionState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormCard } from "./FormCard";
import { SubmitComponent } from "./SumbitComponent";
import { useFormValidate } from "@/hooks/useFormValidate";
import { SignUpSchema } from "@/schema/auth";
import { TSignUpFormError } from "@/types/form";
import { FormMessage } from "./FormMessage";

import { signUp } from "@/actions/signUp";
import toast from "react-hot-toast";

export function SignUpComponent(){
    /**
     * useFormState
     * - 서버 action.
     * - form 제출 or data mutation에 사용한다.
     */
    const[error, action] = useActionState(signUp, undefined)

    const {errors, validateField} = useFormValidate<TSignUpFormError>(SignUpSchema);

    const handleChange = (e : ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target; 
        validateField(name, value);

    }

    useEffect( () => {
        //form submit시 에러가 발생하면 Toast로 알려줌
        if(error?.errorMessage){
            toast.error(error.errorMessage);
        }
    }, [error])

   return (
        <>
            <FormCard title="계정 만들기" footer={{label:"이미 계정이 있으신가요?",  href:"/login"}}>
                <form action={action}className="space-y-6">
                    {/* 이름*/}
                    <div className="space-y-1">
                        <Label htmlFor="name">이름</Label>
                        <Input id="name" name="name" placeholder="이름을 입력하세요." onChange={handleChange} error={!!errors?.name}/>
                        <FormMessage message={errors?.name && <>{errors?.name[0]}</>} />
                    </div>
                    
                    {/* 이메일*/}
                    <div className="space-y-1">
                        <Label htmlFor="email">이메일</Label>
                        <Input id="email" name="email" type="email" placeholder="이메일을 입력하세요." onChange={handleChange} error={!!errors?.email}/>
                        <FormMessage message={errors?.email && <>{errors?.email[0]}</>} />
                    </div>

                    {/* 비밀번호*/}
                    <div className="space-y-1">
                        <Label htmlFor="password">비밀번호</Label>
                        <Input id="password" name="password" type="password" placeholder="비밀번호를 입력하세요." onChange={handleChange} error={!!errors?.password}/>
                        <FormMessage message={errors?.password && <>{errors?.password[0]}</>} />
                    </div>

                    <SubmitComponent className="w-100">
                        가입하기
                    </SubmitComponent>
                </form>
            </FormCard>
        </>
    );
}