import { useState } from "react";
import { ZodObject, ZodRawShape } from "zod";

export function useFormValidate<T>(schema: ZodObject<ZodRawShape>){
    const [errors, setErrors] = useState<Partial<T>>();

    const validateField = (name: string, value:string) =>{
        // 기존의 메세지가 있다면 초기화.
        setErrors({
            ...errors,
            [name]:undefined
        })
        /**
         *  pick
         *  - 인자로 받은 값을 key값으로 넘겨줌 그 key값이 있다면 해당 필드를 가져옴.
         *  - true 타입으로 해야 동작.
         *  safeParse
         *  - 받은 name과 value를 각각 key와 value로 묶어서 /schema/useFormValidate.ts 파일에 있는 validation 확인을 함.
         */
        const parsedValue = schema.pick( { [name]: true}).safeParse({
            [name] : value,
        })
        
        if(!parsedValue.success){
            setErrors({
                ...errors,
                ...parsedValue.error.flatten().fieldErrors,
            })
        }
    };

    return {errors, validateField};
}