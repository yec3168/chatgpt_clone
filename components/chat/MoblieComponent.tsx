
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { SidebarComponent } from "./SidebarComponent";

export function MobileComponent(){
    return(
        <div className="md:hidden">
            <Sheet >
                <SheetTrigger>
                    <Menu/>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <SidebarComponent />
                </SheetContent>
            </Sheet>
        </div>

    )
}