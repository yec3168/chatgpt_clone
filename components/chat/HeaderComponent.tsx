import { MobileComponent } from "./MoblieComponent";
import { ModelSelectComponent } from "./ModelSelectComponent";

export function HeaderComponent(){
    return(
        <header className="flex items-center p-2">
            {/* 모바일 메뉴영역 */}
            <MobileComponent />
            {/* 모델 선택 영역 */}
            <ModelSelectComponent />
        </header>
    );
}