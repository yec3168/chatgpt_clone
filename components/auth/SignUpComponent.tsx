import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormCard } from "./FormCard";
import { SubmitComponent } from "./SumbitComponent";

export function SignUpComponent(){
   return (
        <>
            <FormCard title="계정 만들기" footer={{label:"이미 계정이 있으신가요?",  href:"/login"}}>
                <form className="space-y-6">
                    {/* 이름*/}
                    <div className="space-y-1">
                        <Label htmlFor="name">이름</Label>
                        <Input id="name" name="name" placeholder="이름을 입력하세요."/>
                    </div>
                    
                    {/* 이메일*/}
                    <div className="space-y-1">
                        <Label htmlFor="email">이메일</Label>
                        <Input id="email" name="email" type="email" placeholder="이메일을 입력하세요."/>
                    </div>

                    {/* 비밀번호*/}
                    <div className="space-y-1">
                        <Label htmlFor="password">비밀번호</Label>
                        <Input id="password" name="password" type="password" placeholder="비밀번호를 입력하세요."/>
                    </div>

                    <SubmitComponent className="w-100">
                        가입하기
                    </SubmitComponent>
                </form>
            </FormCard>
        </>
    );
}