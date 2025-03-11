import { BASE_URL, CHAT_ROUTES } from "@/constants/routes";
import { LogoComponent } from "./LogoComponent";
import { MessagesSquare, Plus } from "lucide-react";
import { SidebarItemComponent } from "./SidebarItemComponent";
import { LogoutComponent } from "./LogoutComponent";
const DUMYY_DATA =[
    {
        id : "new",
        label :"새로운 대화",
        icon : <Plus />,
        href : BASE_URL
    },
    {
        id : "1",
        label :"긴 대화 예시입니다 긴 대화 예시입니다 긴 대화 예시입니다 긴 대화 예시입니다",
        icon : <MessagesSquare/>,
        href : `${CHAT_ROUTES.CONVERSATION}/1`
    },  {
        id : "2",
        label :"일반대화",
        icon : <MessagesSquare/>,
        href : `${CHAT_ROUTES.CONVERSATION}/2`
    }

]

export  function SidebarComponent () {
    return(
        <nav className="h-full p-3 bg-black flex flex-col text-white">
            {/* 로고 + 메뉴 아이템 */}
            <div className="flex-1 overflow-y-auto">
                <LogoComponent />
                {/* 메뉴 */}
                <div className="flex flex-col gap-2 mt-10">
                    {DUMYY_DATA.map((item) => (
                        <SidebarItemComponent key={item.id} item={item}/>
                    ))}
                </div>
            </div>
            {/* 로그아웃 버튼 영역 */}
            <div className="flex justify-center">
                <LogoutComponent />
            </div>
        </nav>
    );
}