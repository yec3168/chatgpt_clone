'use client'

import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { FormCard } from "./FormCard";
import { FormMessage } from "./FormMessage";
import { SubmitComponent } from "./SumbitComponent";
import toast from "react-hot-toast";
import { ChangeEvent, useActionState, useEffect } from "react";
import { useFormValidate } from "@/hooks/useFormValidate";
import { TLoginFormError } from "@/types/form";
import { LoginSchema } from "@/schema/auth";
import { login } from "@/actions/logn";

export function LoginForm(){
  /**
     * useFormState
     * - 서버 action.
     * - form 제출 or data mutation에 사용한다.
     */
  const[error, action] = useActionState(login, undefined)

  const {errors, validateField} = useFormValidate<TLoginFormError>(LoginSchema);

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
          <FormCard title="로그인" footer={{label:"아직 계정이 없으신가요?",  href:"/signup"}}>
              <form action={action}className="space-y-6">
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
                      로그인
                  </SubmitComponent>
              </form>
          </FormCard>
      </>
  );
}