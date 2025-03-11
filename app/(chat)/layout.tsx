import { SidebarComponent } from "@/components/chat/SidebarComponent";
import React from "react";

export default function ChatLayout ({children}: {children:React.ReactNode}){
    return (
        <div className="md:flex h-full">
            {/* 
                사이드바 영역 
                    - 모바일에서는 보이지 않아야 하기때문에 hidden
                    - 768px이상일때는 desktop으로 간주
            */}
            <div className="hidden md:block w-[250px]">
                <SidebarComponent />
            </div>
            {/* Header + chat 영역 */}
            {children}
        </div>
    )
}