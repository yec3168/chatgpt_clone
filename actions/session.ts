"use server"

import {jwtVerify, SignJWT} from 'jose'

import { cookies  } from 'next/headers';
import { redirect } from 'next/navigation';

const secretKey = process.env.SESSION_SECRET;
const encodeKey = new TextEncoder().encode(secretKey);

type SessionPayload ={
    id: string;
    name: string;
}

//JWT 생성
export const encrypt = async (payload: SessionPayload) =>{
    return new SignJWT(payload) .setProtectedHeader({alg:'HS256'})
                                .setIssuedAt()  //발급시간 현재시각으로 설정.
                                .setExpirationTime("1d") // 만기 시각 설정.(하루로 설정)
                                .sign(encodeKey)
}

//JWT 검증하고 유효한 경우 페이로드 반환
// SignJWT 생성시 string 형태로 전달됨.
export const verify = async( session : string | undefined = "") =>{
    try{
        /**
         * jwtVerify
         *  param1 = jwt(session)
         *  param2 = encodeKey
         *  param3 = option( ex. 알고리즘 옵션 HS256)
         */
        const {payload} = await jwtVerify<SessionPayload>(session, encodeKey, {
                algorithms: ["HS256"]
        }) 


        return payload;

    }catch(error){
        console.error("토근 검증에 실패하였습니다.", error)
        return 
    }
}


//session 생성
export const createSession = async(payload:SessionPayload) => {
    const expireAt = new Date(Date.now() * 24 * 60 * 60 * 1000); // 1d
    
    //jwt 생성
    const session = await encrypt(payload);

    //next header에 있는 cookies함수를 가져옴
    /**
     * httpOnly : 자바스크립트에서 접근할 수 없도록 함.
     * secure : http 연결에서만 쿠키가 전송되도록 함.
     * expire : 쿠키가 만료되는 시간은 설정.
     * sameSites: 크로스브라우징에서 같은 사이트로 접근시 쿠키가 전송되는 방식을 지정함
     *      lax     : 사용자가 링크를 클릭해서 이동하는 경우만 일부 허용
     *      strict  : 동일한 사이트 내에서만 쿠키가 전송
     *      none    : 모든 크로스 사이트 요청 허용
     * path : 쿠키가 유효한 URL 경로를 지정하는데 사용하는 옵션, 특정경로나 경로 패턴을 지정할 수 있음.
     *  "/"를 넣으면 모든 경로에 쿠키가 유효하게 설정.
     */
    (await cookies()).set('session', session, {
        httpOnly: true,
        secure:true,
        expires: expireAt,
        sameSite: 'lax',
        path:"/", 
    })
}

// Session delete
export const deleteSession  = async() =>{

    (await cookies()).delete("session");
}


export const verifySession = async() =>{
    const cookie = (await cookies()).get('session')?.value;
    const session = await verify(cookie);

    if(!session?.id){
        redirect("/login")
    }

    return session
}